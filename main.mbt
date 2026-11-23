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
      Some(render_math(tex, kind is @cmark_html.Display, backend, macro_store))
    }),
  )
}

///|
fn parse_math(
  tex : String,
  display : Bool,
  macro_store : @katex.Macros,
) -> Array[@katex.ParseNode] raise @katex.ParseFailure {
  let settings = @katex.Settings::make(
    display_mode=display,
    global_group=true,
    macro_store~,
  )
  @katex.parse(tex, settings~)
}

///|
fn render_math(
  tex : String,
  display : Bool,
  backend : MathBackend,
  macro_store : @katex.Macros,
) -> String {
  let nodes = parse_math(tex, display, macro_store) catch {
    error => {
      let source = escape_html_text(delimited_tex(tex, display))
      let message = escape_html_text(tex_error_message(error))
      return "<span class=\"math-error\"><code>\{source}</code> (\{message})</span>"
    }
  }
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
  }
}

///|
fn delimited_tex(tex : String, display : Bool) -> String {
  let delimiter = if display { "$$" } else { "$" }
  "\{delimiter}\{tex}\{delimiter}"
}

///|
fn tex_error_message(error : @katex.ParseFailure) -> String {
  match error {
    UnexpectedCharacter(message~, ..) | InvalidArgument(message~, ..) => message
    ExpectedToken(expected~, actual~) =>
      "Expected \{tex_token_name(expected)}, got \{tex_token_name(actual.text)}"
    UndefinedControlSequence(name~, ..) => "Undefined control sequence: \{name}"
    DoubleSuperscript(..) => "Double superscript"
    DoubleSubscript(..) => "Double subscript"
    ExpectedGroupAfter(symbol~, ..) => "Expected a group after '\{symbol}'"
    FunctionNotAllowed(func_name~, context~, ..) =>
      "\{func_name} is not allowed in \{context}"
    MissingFunctionHandler(func_name~, ..) =>
      "Unsupported function: \{func_name}"
    TooManyExpansions(limit~) => "Too many macro expansions (limit: \{limit})"
    InternalInvariant(message~) => "Internal TeX parser error: \{message}"
  }
}

///|
fn tex_token_name(token : String) -> String {
  if token == "EOF" {
    "end of input"
  } else {
    "'\{token}'"
  }
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
