export function escapeHtmlFragment (html) {
  return html.replace(/>/g, '&gt;').replace(/</g, '&lt;')
}
