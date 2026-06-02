export function formatAnswerLabel(label) {
  const safeLabel = escapeHtml(label);
  const match = safeLabel.match(/^([A-ZÆØÅ]):\s*(.+)$/u);

  if (!match) {
    return `<span class="answer-text">${safeLabel}</span>`;
  }

  return `<span class="answer-prefix">${match[1]}:</span> <span class="answer-text">${match[2]}</span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
