///|
test "TeX preview shows the failing formula and continues rendering" {
  let source = "before $\\badcommand$ and $x$ after."
  for
    (backend, rendered_math) in [
      ("html", "class=\"katex\""),
      ("mathml", "<math "),
    ] {
    let output = @UniTeX.render_markdown(source, backend)
    assert_true(
      output.contains(
        "<code>$\\badcommand$</code> (Undefined control sequence: \\badcommand)",
      ),
      msg=output,
    )
    assert_true(output.contains(rendered_math), msg=output)
    assert_true(output.contains(" after.</p>"), msg=output)
  }
}

///|
test "TeX preview escapes both the display formula and the error message" {
  let output = @UniTeX.render_markdown("$$\\rule{<b>&}{1em}$$", "html")
  assert_true(
    output.contains("<code>$$\\rule{&lt;b&gt;&amp;}{1em}$$</code>"),
    msg=output,
  )
  assert_true(output.contains("(Invalid size: '&lt;b&gt;&amp;')"), msg=output)
  assert_false(output.contains("<b>"), msg=output)
}

///|
test "TeX export fallbacks preserve inline and display source without diagnostics" {
  let source =
    #|before $\badcommand$ after.
    #|
    #|$$\badcommand$$
  let typst =
    #|before #raw("$\\badcommand$") after.
    #|
    #|#raw("$$\\badcommand$$", block: true)
  inspect(@UniTeX.render_typst_markdown(source), content=typst)
  inspect(@UniTeX.render_unicode_markdown(source), content=source)
}
