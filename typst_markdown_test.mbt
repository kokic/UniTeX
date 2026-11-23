///|
test "Typst block comments retain the rest of the closing line" {
  inspect(
    @UniTeX.render_typst_markdown("<!-- first\nsecond --> <p>visible</p>\n"),
    content="/* first\nsecond */\n#raw(\" <p>visible</p>\\n\", block: true)",
  )
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
  inspect(
    @UniTeX.render_typst_markdown(
      "<!-- note -->\n<p>visible</p>\n\n`<!-- example -->` and <span>text</span>",
    ),
    content="/* note */\n\n#raw(\"<p>visible</p>\\n\", block: true)\n\n#raw(\"<!-- example -->\") and \\<span>text\\</span>",
  )
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
