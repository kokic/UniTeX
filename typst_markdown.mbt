///|
pub fn render_typst_markdown(source : String) -> String {
  let options = @cmark.enable_math()
  options.insert(@cmark.enable_tables())
  options.insert(@cmark.enable_strikethrough())
  options.insert(@cmark.enable_tasklists())
  options.insert(@cmark.enable_footnotes())
  let events = @cmark.parse(source, options) catch {
    _ => return typst_raw(source, block=true)
  }
  let footnotes : Map[String, ArrayView[@cmark.Event]] = Map([])
  for i, event in events {
    if event is Start(FootnoteDefinition(label)) && !footnotes.contains(label) {
      footnotes[label] = events.exact_view(start=i + 1)
    }
  }
  TypstMarkdown::{
    events: events.iter(),
    footnotes,
    macro_store: @katex.Macros::make(),
  }.body()
}

///|
priv struct TypstMarkdown {
  events : Iter[@cmark.Event]
  footnotes : Map[String, ArrayView[@cmark.Event]]
  macro_store : @katex.Macros
}

///|
fn TypstMarkdown::body(
  self : TypstMarkdown,
  task~ : Ref[Bool?]? = None,
) -> String {
  let flow : TextFlow = { blocks: [], inline: StringBuilder(), }
  let text = StringBuilder()
  while self.events.next() is Some(event) {
    if event is Text(s) {
      text.write_string(s)
      continue
    }
    let comment = match event {
      InlineHtml(s) => split_html_comment(s[:]).map(parts => parts.0)
      _ => None
    }
    if !text.is_empty() {
      flow.inline.write_string(
        typst_markup(text.to_string(), before_comment=comment is Some(_)),
      )
      text.reset()
    }
    if comment is Some(body) {
      flow.inline.write_string(typst_comment(body))
      continue
    }
    match event {
      End(_) => break
      Start(tag) =>
        match tag {
          Paragraph => flow.block(self.body(task~))
          Heading(level~, ..) => {
            let rank = match level {
              H1 => 1
              H2 => 2
              H3 => 3
              H4 => 4
              H5 => 5
              H6 => 6
            }
            let marker = "=".repeat(rank)
            let title = self.body()
            flow.block(
              if title.is_empty() {
                marker
              } else {
                "\{marker} \{title}"
              },
            )
          }
          Emphasis => flow.inline.write_string("#emph[\{self.body()}]")
          Strong => flow.inline.write_string("#strong[\{self.body()}]")
          Strikethrough => flow.inline.write_string("#strike[\{self.body()}]")
          Link(dest_url~, ..) =>
            flow.inline.write_string(
              "#link(\{typst_string(dest_url)})[\{self.body()}]",
            )
          Image(dest_url~, ..) =>
            flow.inline.write_string(typst_image(dest_url, self.literal_body()))
          BlockQuote(_) => flow.block("#quote(block: true)[\{self.body()}]")
          List(start) => flow.block(self.list(start))
          Table(alignments) => flow.block(self.table(alignments))
          CodeBlock(info) => {
            let lang = StringBuilder()
            lang.write_iter(
              info.trim().iter().take_while(c => !c.is_whitespace()),
            )
            flow.block(
              typst_raw(self.literal_body(), block=true, lang=lang.to_string()),
            )
          }
          HtmlBlock => flow.block(typst_html_block(self.literal_body()))
          FootnoteDefinition(_) => self.skip_footnote_definition()
          _ => flow.block(self.body())
        }
      Code(s) => flow.inline.write_string(typst_raw(s))
      InlineMath(tex) => flow.inline.write_string(self.math(tex, false))
      DisplayMath(tex) => flow.block(self.math(tex, true))
      Html(s) | InlineHtml(s) => flow.inline.write_string(typst_markup(s))
      SoftBreak => flow.inline.write_char(' ')
      HardBreak => flow.inline.write_string("#linebreak()")
      Rule => flow.block("#line(length: 100%)")
      FootnoteReference(label) => flow.inline.write_string(self.footnote(label))
      TaskListMarker(checked) =>
        if task is Some(state) {
          state.val = Some(checked)
        }
      Text(_) => ()
    }
  }
  if !text.is_empty() {
    flow.inline.write_string(typst_markup(text.to_string()))
  }
  flow.flush()
  flow.blocks.join("\n\n")
}

///|
fn TypstMarkdown::footnote(self : TypstMarkdown, label : String) -> String {
  guard self.footnotes.get(label) is Some(note) else {
    return typst_markup("[^\{label}]")
  }
  self.footnotes.remove(label)
  let body = TypstMarkdown::{
    events: note.iter(),
    footnotes: self.footnotes,
    macro_store: self.macro_store,
  }.body()
  "#footnote[\{body}]"
}

///|
fn TypstMarkdown::skip_footnote_definition(self : TypstMarkdown) -> Unit {
  let mut depth = 1
  while depth > 0 && self.events.next() is Some(event) {
    match event {
      Start(FootnoteDefinition(_)) => depth += 1
      End(FootnoteDefinition) => depth -= 1
      _ => ()
    }
  }
}

///|
fn TypstMarkdown::literal_body(self : TypstMarkdown) -> String {
  let text = StringBuilder()
  let mut depth = 0
  while self.events.next() is Some(event) {
    match event {
      Start(_) => depth += 1
      End(_) => {
        guard depth > 0 else { break }
        depth -= 1
      }
      InlineHtml(s) if split_html_comment(s[:]) is Some(_) => ()
      Text(s) | Code(s) | Html(s) | InlineHtml(s) => text.write_string(s)
      InlineMath(tex) | DisplayMath(tex) => text.write_string(tex)
      SoftBreak | HardBreak => text.write_char('\n')
      _ => ()
    }
  }
  text.to_string()
}

///|
fn TypstMarkdown::list(self : TypstMarkdown, start : Int64?) -> String {
  let items : Array[(String, Bool?)] = []
  while self.events.next() is Some(Start(Item)) {
    let task : Ref[Bool?] = Ref(None)
    let content = self.body(task=Some(task))
    items.push((content, task.val))
  }
  let custom_markers = start is None &&
    items.iter().any(item => item.1 is Some(_))
  let args = []
  let name = match start {
    Some(first) => {
      args.push("start: \{first},")
      "enum"
    }
    None => {
      if custom_markers {
        args.push("marker: [],")
      }
      "list"
    }
  }
  for item in items {
    let (content, task) = item
    let marker = task.map_or(if custom_markers { "• " } else { "" }, checked => {
      if checked {
        "☑ "
      } else {
        "☐ "
      }
    })
    args.push("[\{marker}\{content}],")
  }
  "#\{name}(\n  \{args.join("\n  ")}\n)"
}

///|
fn TypstMarkdown::table(
  self : TypstMarkdown,
  alignments : Array[@cmark.Alignment],
) -> String {
  let align = alignments
    .map(a => {
      match a {
        Center => "center"
        Right => "right"
        _ => "left"
      }
    })
    .join(", ")
  let lines = [
    "#table(",
    "  columns: \{alignments.length()},",
    "  align: (\{align},),",
  ]
  while self.events.next() is Some(Start(TableHead | TableRow as row)) {
    let cells = []
    while self.events.next() is Some(Start(TableCell)) {
      cells.push("[\{self.body()}]")
    }
    let args = cells.join(", ")
    lines.push(
      if row is TableHead {
        "  table.header(\{args}),"
      } else {
        "  \{args},"
      },
    )
  }
  lines.push(")")
  lines.join("\n")
}

///|
fn TypstMarkdown::math(
  self : TypstMarkdown,
  tex : String,
  display : Bool,
) -> String {
  let delimiter = if display { "$$" } else { "$" }
  guard parse_math(tex, display, self.macro_store) is Some(nodes) else {
    return typst_raw("\{delimiter}\{tex}\{delimiter}", block=display)
  }
  let math = @typst.render(nodes)
  guard !math.is_empty() else { return "" }
  if display {
    "$ \{math} $"
  } else {
    "$\{math}$"
  }
}

///|
fn typst_image(url : String, alt : String) -> String {
  let dest = typst_string(url)
  // Typst's image function reads a local asset, not a remote URL.
  if url.contains("://") || url.has_prefix("//") || url.has_prefix("data:") {
    let label = typst_markup(if alt.is_empty() { url } else { alt })
    "#link(\{dest})[\{label}]"
  } else {
    "#image(\{dest}, alt: \{typst_string(alt)})"
  }
}

///|
fn typst_raw(
  text : String,
  block~ : Bool = false,
  lang~ : String = "",
) -> String {
  let quoted = typst_string(text)
  guard block else { return "#raw(\{quoted})" }
  if lang.is_empty() {
    "#raw(\{quoted}, block: true)"
  } else {
    "#raw(\{quoted}, block: true, lang: \{typst_string(lang)})"
  }
}

///|
fn split_html_comment(source : StringView) -> (StringView, StringView)? {
  guard source.has_prefix("<!--") &&
    source.split_once("-->") is Some((head, tail)) else {
    return None
  }
  // cmark accepts empty comments whose opening and closing markers overlap.
  Some((head.strip_prefix("<!--").unwrap_or(""), tail))
}

///|
fn typst_html_block(source : String) -> String {
  let out = StringBuilder()
  let mut rest = source[:]
  while split_html_comment(rest.trim_start()) is Some((body, tail)) {
    out.write_string(typst_comment(body))
    rest = tail
  }
  if out.is_empty() {
    return typst_raw(source, block=true)
  }
  if !rest.trim().is_empty() {
    out.write_char('\n')
    out.write_string(typst_raw(rest.to_owned(), block=true))
  }
  out.to_string()
}

///|
fn typst_comment(body : StringView) -> String {
  let out = StringBuilder()
  out.write_string("/*")
  let mut prev = ' '
  for ch in body {
    // Typst block comments nest; HTML comment text cannot introduce delimiters.
    if (prev == '/' && ch == '*') || (prev == '*' && ch == '/') {
      out.write_char(' ')
    }
    out.write_char(ch)
    prev = ch
  }
  if prev == '/' {
    out.write_char(' ')
  }
  out.write_string("*/")
  out.to_string()
}

///|
fn typst_markup(text : String, before_comment~ : Bool = false) -> String {
  let out = StringBuilder()
  let chars = text.iter().to_array()
  let mut line_start = true
  let mut prev = ' '
  for i, c in chars {
    let next = chars.get(i + 1).unwrap_or('\n')
    let escape = match c {
      '\\' | '#' | '[' | ']' | '$' | '*' | '_' | '<' | '@' | '`' | '~' => true
      '/' =>
        next is ('/' | '*') ||
        (line_start && next.is_whitespace()) ||
        (before_comment && i == chars.length() - 1)
      '=' => line_start
      '+' => line_start && next.is_whitespace()
      '-' =>
        next is ('-' | '?') ||
        next.is_numeric() ||
        (line_start && next.is_whitespace())
      '.' => next == '.' || (prev.is_ascii_digit() && next.is_whitespace())
      _ => false
    }
    if escape {
      out.write_char('\\')
    }
    out.write_char(c)
    line_start = c == '\n' || (line_start && c.is_whitespace())
    prev = c
  }
  out.to_string()
}

///|
fn typst_string(text : String) -> String {
  let out = StringBuilder()
  out.write_char('"')
  for c in text {
    match c {
      '\\' => out.write_string("\\\\")
      '"' => out.write_string("\\\"")
      '\n' => out.write_string("\\n")
      '\r' => out.write_string("\\r")
      '\t' => out.write_string("\\t")
      _ if c.is_control() =>
        out.write_string("\\u{\{c.to_int().to_string(radix=16)}}")
      _ => out.write_char(c)
    }
  }
  out.write_char('"')
  out.to_string()
}
