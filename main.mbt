///|
pub fn commands_json() -> String {
  @katex.builtin_commands_json().stringify()
}

///|
priv enum MathBackend {
  Unicode
  MathML
  HTML
}

///|
pub fn render_markdown(source : String, math_backend : String) -> String {
  let backend = match math_backend {
    "mathml" => MathML
    "html" => HTML
    _ => Unicode
  }
  let options = @cmark.enable_math()
  options.insert(@cmark.enable_tables())
  let events = @cmark.parse(source, options) catch {
    // An incomplete Markdown edit can fail to parse before any HTML is produced.
    _ => return "<pre>\{escape_html_text(source)}</pre>"
  }
  let macro_store = @katex.Macros::make()
  @cmark_html.render(
    events,
    hooks=@cmark_html.Hooks::new(math=(tex, kind) => {
      render_math(tex, kind is @cmark_html.Display, backend, macro_store)
    }),
  )
}

///|
fn parse_math(
  tex : String,
  display : Bool,
  macro_store : @katex.Macros,
) -> Array[@katex.ParseNode]? {
  let settings = @katex.Settings::make(
    display_mode=display,
    global_group=true,
    macro_store~,
  )
  Some(@katex.parse(tex, settings~)) catch {
    _ => None
  }
}

///|
fn render_math(
  tex : String,
  display : Bool,
  backend : MathBackend,
  macro_store : @katex.Macros,
) -> String? {
  guard parse_math(tex, display, macro_store) is Some(nodes) else {
    return None
  }
  Some(
    match backend {
      Unicode => {
        let class = if display {
          "unicode-math unicode-math-display"
        } else {
          "unicode-math"
        }
        "<span class=\"\{class}\">\{escape_html_text(@unicode.render(nodes))}</span>"
      }
      MathML =>
        @mathml.render(
          nodes,
          config=@mathml.RenderConfig::make(display_mode=display),
        )
      HTML =>
        @katex_html.render(
          nodes,
          config=@katex_html.RenderConfig::make(display_mode=display),
        )
    },
  )
}

///|
fn escape_html_text(text : String) -> String {
  let escaped = StringBuilder()
  for char in text {
    match char {
      '&' => escaped.write_string("&amp;")
      '<' => escaped.write_string("&lt;")
      '>' => escaped.write_string("&gt;")
      _ => escaped.write_char(char)
    }
  }
  escaped.to_string()
}
