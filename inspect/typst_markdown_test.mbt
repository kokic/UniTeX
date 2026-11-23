///|
test "Typst block comments retain the rest of the closing line" {
  let source =
    #|<!-- first
    #|second --> <p>visible</p>
    #|
  let expected =
    #|/* first
    #|second */
    #|#raw(" <p>visible</p>\n", block: true)
  inspect(@UniTeX.render_typst_markdown(source), content=expected)
}

///|
test "Typst inline comments keep surrounding text and neutralize delimiters" {
  inspect(
    @UniTeX.render_typst_markdown("a/<!-- /* */ /-->b"),
    content="a\\//* / * * / / */b",
  )
}

///|
test "Typst leaves HTML tags and code examples literal" {
  let source =
    #|<!-- note -->
    #|<p>visible</p>
    #|
    #|`<!-- example -->` and <span>text</span>
  let expected =
    #|/* note */
    #|
    #|#raw("<p>visible</p>\n", block: true)
    #|
    #|#raw("<!-- example -->") and \<span>text\</span>
  inspect(@UniTeX.render_typst_markdown(source), content=expected)
}

///|
test "Typst image labels omit HTML comments" {
  inspect(
    @UniTeX.render_typst_markdown(
      "![a<!-- note -->b](https://example.com/image.png)",
    ),
    content="#link(\"https://example.com/image.png\")[ab]",
  )
}

///|
test "Typst keeps a multiline block comment inside its quoted list item" {
  let source =
    #|> - first
    #|>
    #|>   <!-- comment
    #|>   [x] $y$ -->
    #|>
    #|>   second
    #|> - third
    #|
    #|After.
  let output = @UniTeX.render_typst_markdown(source)
  assert_true(output.has_prefix("#quote(block: true)[#list("), msg=output)
  assert_true(
    output.contains(
      (
        #|[first
        #|
        #|/* comment
        #|[x] $y$ */
        #|
        #|second],
      ),
    ),
    msg=output,
  )
  assert_true(output.contains("[third],"), msg=output)
  assert_true(
    output.has_suffix(
      (
        #|)]
        #|
        #|After.
      ),
    ),
    msg=output,
  )
}

///|
test "Typst keeps an inline comment inside its link and table cell" {
  let source =
    #|| heading | second |
    #|| --- | --- |
    #|| **[left<!-- ] -->right](https://example.org)** | next |
    #|| sibling | last |
    #|
    #|After.
  let output = @UniTeX.render_typst_markdown(source)
  assert_true(
    output.contains(
      "[#strong[#link(\"https://example.org\")[left/* ] */right]]], [next],",
    ),
    msg=output,
  )
  assert_true(output.contains("[sibling], [last],"), msg=output)
  assert_true(
    output.has_suffix(
      (
        #|)
        #|
        #|After.
      ),
    ),
    msg=output,
  )
}

///|
test "Typst footnote comments stay inside the definition when it is rendered inline" {
  let source =
    #|Main[^n], still here.
    #|
    #|[^n]: [left/<!-- multiline
    #|    ] #panic("hidden") [ -->right](https://example.org)
    #|
    #|    <!-- block note -->
    #|
    #|    final paragraph.
    #|
    #|Outside.
  let output = @UniTeX.render_typst_markdown(source)
  assert_true(
    output.has_prefix(
      "Main#footnote[#link(\"https://example.org\")[left\\//* multiline",
    ),
    msg=output,
  )
  assert_true(output.contains("] #panic(\"hidden\") [ */right]"), msg=output)
  assert_true(
    output.has_suffix(
      (
        #|/* block note */
        #|
        #|final paragraph.], still here.
        #|
        #|Outside.
      ),
    ),
    msg=output,
  )
}

///|
test "Typst converts consecutive comments without swallowing the remaining HTML" {
  let source =
    #|<!-- first --> <!-- second -->  <i>tail</i>
    #|
    #|left<!-->middle<!--->right
  let expected =
    #|/* first *//* second */
    #|#raw("  <i>tail</i>\n", block: true)
    #|
    #|left/**/middle/**/right
  inspect(@UniTeX.render_typst_markdown(source), content=expected)
}

///|
test "Typst does not convert comment syntax in fences, escaped text, or raw HTML" {
  let source =
    #|```html
    #|<!-- in a fence -->
    #|```
    #|
    #|\<!-- escaped opener -->
    #|
    #|<div title="<!-- attribute -->">
    #|<!-- inside raw HTML -->
    #|</div>
  let output = @UniTeX.render_typst_markdown(source)
  assert_true(
    output.contains(
      "#raw(\"<!-- in a fence -->\\n\", block: true, lang: \"html\")",
    ),
    msg=output,
  )
  assert_true(output.contains("\\<!\\-- escaped opener \\-->"), msg=output)
  assert_true(
    output.contains(
      "#raw(\"<div title=\\\"<!-- attribute -->\\\">\\n<!-- inside raw HTML -->\\n</div>\", block: true)",
    ),
    msg=output,
  )
}
