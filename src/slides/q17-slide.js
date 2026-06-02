const q17Image = "./assets/images/slides/slide-17/image-2.png";

const q17Items = [
  { key: "prayer-left", value: "prayer-left", label: "🙏🏼", kind: "emoji", glyph: "🙏🏼" },
  { key: "fire", value: "fire", label: "🔥", kind: "emoji", glyph: "🔥" },
  { key: "mind-blown", value: "mind-blown", label: "🤯", kind: "emoji", glyph: "🤯" },
  { key: "smile", value: "smile", label: "🙂", kind: "emoji", glyph: "🙂" },
  { key: "image", value: "aesthetic-image", label: "Billed-emoji", kind: "image" },
  { key: "thumbs-up", value: "thumbs-up", label: "👍", kind: "emoji", glyph: "👍" },
  { key: "denmark", value: "denmark", label: "🇩🇰", kind: "emoji", glyph: "🇩🇰" },
  { key: "smiling-face", value: "smiling-face", label: "😊", kind: "emoji", glyph: "😊" },
  { key: "point-down", value: "point-down", label: "👇", kind: "emoji", glyph: "👇" },
  { key: "no-emojis", value: "no-emojis", label: "Jeg bruger ikke emojis", kind: "text", exclusive: true },
  { key: "blue-heart", value: "blue-heart", label: "💙", kind: "emoji", glyph: "💙" },
  { key: "prayer-right", value: "prayer-right", label: "🙏🏼", kind: "emoji", glyph: "🙏🏼" },
  { key: "goat", value: "goat", label: "🐐", kind: "emoji", glyph: "🐐" },
  { key: "arrow-right", value: "arrow-right", label: "➡️", kind: "emoji", glyph: "➡️" },
  { key: "adaptive", value: "adaptive", label: "Jeg tilpasser min emoji-brug til situationen", kind: "text", exclusive: true },
  { key: "coffee", value: "coffee", label: "☕️", kind: "emoji", glyph: "☕️" },
  { key: "handshake", value: "handshake", label: "🤝", kind: "emoji", glyph: "🤝" },
  { key: "writing", value: "writing", label: "✍", kind: "emoji", glyph: "✍" },
  { key: "sunglasses", value: "sunglasses", label: "😎", kind: "emoji", glyph: "😎" },
  { key: "green-heart", value: "green-heart", label: "💚", kind: "emoji", glyph: "💚" },
  { key: "no-time", value: "no-time", label: "Det har jeg ikke tid til", kind: "text", exclusive: true },
  { key: "angry", value: "angry", label: "😠", kind: "emoji large", glyph: "😠" },
  { key: "megaphone", value: "megaphone", label: "📣", kind: "emoji large", glyph: "📣" },
  { key: "muscle", value: "muscle", label: "💪", kind: "emoji", glyph: "💪" }
];

export function renderQ17Slide({ slide, selectedValues = [], onAnswer }) {
  const selected = new Set(selectedValues);
  const section = document.createElement("section");
  section.className = "slide q17-slide";
  section.setAttribute("aria-labelledby", "q17-title");

  section.innerHTML = `
    <h2 class="q17-title" id="q17-title">${slide.title}</h2>
    <div class="q17-options" role="group" aria-labelledby="q17-title" aria-describedby="q17-help">
      <p class="visually-hidden" id="q17-help">Vælg op til tre emojis.</p>
      ${q17Items.map((item) => `
        <button
          class="q17-option q17-option--${item.key} ${selected.has(item.value) ? "is-selected" : ""}"
          type="button"
          data-value="${item.value}"
          data-exclusive="${item.exclusive ? "true" : "false"}"
          aria-pressed="${selected.has(item.value) ? "true" : "false"}"
          aria-label="${item.label}"
        >
          ${renderItemContent(item)}
        </button>
      `).join("")}
    </div>
    <div class="q17-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q17-progress-segment ${index < 10 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  const buttons = Array.from(section.querySelectorAll(".q17-option"));

  function syncSelection(nextValues) {
    const nextSelected = new Set(nextValues);
    buttons.forEach((button) => {
      const isSelected = nextSelected.has(button.dataset.value);
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;

      if (button.dataset.exclusive === "true") {
        syncSelection([value]);
        onAnswer([value]);
        return;
      }

      const currentValues = buttons
        .filter((item) => item.classList.contains("is-selected") && item.dataset.exclusive !== "true")
        .map((item) => item.dataset.value);

      let nextValues;
      if (currentValues.includes(value)) {
        nextValues = currentValues.filter((item) => item !== value);
      } else {
        if (currentValues.length >= slide.maxChoices) {
          return;
        }
        nextValues = [...currentValues, value];
      }

      syncSelection(nextValues);

      if (nextValues.length === slide.maxChoices) {
        onAnswer(nextValues);
      }
    });
  });

  return section;
}

function renderItemContent(item) {
  if (item.kind === "image") {
    return `<img class="q17-image-emoji" src="${q17Image}" alt="">`;
  }

  if (item.kind.startsWith("emoji")) {
    return `<span class="q17-emoji ${item.kind.includes("large") ? "q17-emoji--large" : ""}">${item.glyph}</span>`;
  }

  return `<span class="q17-text">${item.label}</span>`;
}
