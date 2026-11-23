///|
pub fn render_unicode_markdown(source : String) -> String {
  let options = @cmark.enable_math()
  options.insert(@cmark.enable_tables())
  options.insert(@cmark.enable_strikethrough())
  options.insert(@cmark.enable_tasklists())
  let events = @cmark.parse(source, options) catch { _ => return source }
  let renderer : UnicodeMarkdown = {
    events,
    cursor: 0,
    macro_store: @katex.Macros::make(),
  }
  renderer.body()
}

///|
priv struct UnicodeMarkdown {
  events : Array[@cmark.Event]
  mut cursor : Int32
  macro_store : @katex.Macros
}

///|
fn UnicodeMarkdown::next(self : UnicodeMarkdown) -> @cmark.Event? {
  let event = self.events.get(self.cursor)
  self.cursor += 1
  event
}

///|
priv struct TextFlow {
  blocks : Array[String]
  inline : StringBuilder
}

///|
fn TextFlow::flush(self : TextFlow) -> Unit {
  if !self.inline.is_empty() {
    self.blocks.push(self.inline.to_string())
    self.inline.reset()
  }
}

///|
fn TextFlow::block(self : TextFlow, text : String) -> Unit {
  if !text.is_empty() {
    self.flush()
    self.blocks.push(text)
  }
}

///|
// A nested call starts after a Start event and consumes its matching End.
fn UnicodeMarkdown::body(
  self : UnicodeMarkdown,
  font~ : String? = None,
  strike~ : Bool = false,
  task~ : Ref[Bool?]? = None,
) -> String {
  let flow : TextFlow = { blocks: [], inline: StringBuilder(), }
  while true {
    guard self.next() is Some(event) else { break }
    match event {
      End(_) => break
      Start(tag) =>
        match tag {
          Emphasis =>
            flow.inline.write_string(self.body(font=Some("mathit"), strike~))
          Strong =>
            flow.inline.write_string(self.body(font=Some("mathbf"), strike~))
          Strikethrough =>
            flow.inline.write_string(self.body(font~, strike=true))
          Link(link_type=Autolink | Email, dest_url~, ..) =>
            flow.inline.write_string(link_text(self.body(), dest_url))
          Link(dest_url~, ..) | Image(dest_url~, ..) =>
            flow.inline.write_string(
              link_text(self.body(font~, strike~), dest_url),
            )
          CodeBlock(_) | HtmlBlock => {
            let text = self.body()
            flow.block(text.strip_suffix("\n").map_or(text, s => s.to_owned()))
          }
          BlockQuote(_) => flow.block(prefix_lines(self.body(), "│ ", "│ "))
          List(start) => flow.block(self.list(start))
          Table(alignments) => flow.block(self.table(alignments))
          Paragraph => flow.block(self.body(task~))
          _ => flow.block(self.body())
        }
      Text(s) => flow.inline.write_string(styled_text(s, font, strike))
      Code(s) =>
        flow.inline.write_string(styled_text(s, Some("mathtt"), strike))
      Html(s) | InlineHtml(s) => flow.inline.write_string(s)
      InlineMath(tex) => flow.inline.write_string(self.math(tex, false))
      DisplayMath(tex) => flow.block(self.math(tex, true))
      SoftBreak | HardBreak => flow.inline.write_char('\n')
      Rule => flow.block("────────")
      FootnoteReference(label) => flow.inline.write_string("[\{label}]")
      TaskListMarker(checked) =>
        if task is Some(state) {
          state.val = Some(checked)
        }
    }
  }
  flow.flush()
  flow.blocks.join("\n\n")
}

///|
fn styled_text(text : String, font : String?, strike : Bool) -> String {
  guard font is Some(_) || strike else { return text }
  let out = StringBuilder()
  for ch in text {
    let original = ch.to_string()
    let glyph = match font {
      // Italic h uses ℎ; its slot in the mathematical alphabet is unassigned.
      Some("mathit") if ch == 'h' => "ℎ"
      Some(f) => @katex.unicode_font_character(f, original).unwrap_or(original)
      None => original
    }
    out.write_string(glyph)
    if strike && !ch.is_whitespace() && @unicode.display_width(original) > 0 {
      out.write_char('\u0336')
    }
  }
  out.to_string()
}

///|
fn link_text(text : String, url : String) -> String {
  if url.is_empty() || text == url {
    text
  } else if text.is_empty() {
    url
  } else {
    "\{text}（\{url}）"
  }
}

///|
fn UnicodeMarkdown::math(
  self : UnicodeMarkdown,
  tex : String,
  display : Bool,
) -> String {
  @unicode.render(parse_math(tex, display, self.macro_store)) catch {
    _ => delimited_tex(tex, display)
  }
}

///|
fn prefix_lines(text : String, first : String, rest : String) -> String {
  let out = StringBuilder()
  let mut first_line = true
  for line in text.split("\n") {
    let prefix = if first_line { first } else { rest }
    if !first_line {
      out.write_char('\n')
    }
    out.write_view(if line.is_empty() { prefix.trim_end() } else { prefix[:] })
    out.write_view(line)
    first_line = false
  }
  out.to_string()
}

///|
fn UnicodeMarkdown::list(self : UnicodeMarkdown, start : Int64?) -> String {
  let items : Array[String] = []
  while true {
    guard self.next() is Some(Start(Item)) else { break }
    let task : Ref[Bool?] = Ref(None)
    let text = self.body(task=Some(task))
    let checkbox = task.val.map(checked => if checked { "☑ " } else { "☐ " })
    let marker = match start {
      None => checkbox.unwrap_or("• ")
      Some(first) =>
        "\{first + items.length().to_int64()}. " + checkbox.unwrap_or("")
    }
    let indent = " ".repeat(@unicode.display_width(marker))
    items.push(prefix_lines(text, marker, indent))
  }
  items.join("\n")
}

///|
fn UnicodeMarkdown::table(
  self : UnicodeMarkdown,
  alignments : Array[@cmark.Alignment],
) -> String {
  let rows : Array[Array[@unicode.Block]] = []
  while true {
    guard self.next() is Some(Start(TableHead | TableRow)) else { break }
    let cells : Array[@unicode.Block] = []
    while true {
      guard self.next() is Some(Start(TableCell)) else { break }
      cells.push(@unicode.Block::from(self.body()))
    }
    rows.push(cells)
  }
  boxed_table(rows, alignments)
}

///|
fn boxed_table(
  rows : Array[Array[@unicode.Block]],
  alignments : Array[@cmark.Alignment],
) -> String {
  let widths = Array::make(alignments.length(), 0)
  for row in rows {
    for col in 0..<widths.length() {
      if row.get(col) is Some(cell) {
        widths[col] = widths[col].max(cell.width())
      }
    }
  }
  let rules = widths.map(width => "─".repeat(width + 2))
  let lines = ["┌" + rules.join("┬") + "┐"]
  for i, row in rows {
    if i == 1 {
      lines.push("├" + rules.join("┼") + "┤")
    }
    let height = row.fold(init=1, (height, cell) => height.max(cell.height()))
    for line in 0..<height {
      let cells = Array::makei(widths.length(), col => {
        let (text, width) = match row.get(col) {
          Some(cell) if cell.lines.get(line) is Some(text) =>
            (text, cell.width())
          _ => ("", 0)
        }
        let spare = widths[col] - width
        let left = match alignments[col] {
          Right => spare
          Center => spare / 2
          _ => 0
        }
        " ".repeat(left + 1) + text + " ".repeat(spare - left + 1)
      })
      lines.push("│" + cells.join("│") + "│")
    }
  }
  lines.push("└" + rules.join("┴") + "┘")
  lines.join("\n")
}
