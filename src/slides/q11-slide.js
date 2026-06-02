const itemClasses = {
  "almindelige-briller": "q11-image--glasses",
  solbriller: "q11-image--sunglasses",
  cykelhjelm: "q11-image--bike-helmet",
  kasket: "q11-image--cap",
  blazer: "q11-image--blazer",
  "t-shirt": "q11-image--tshirt",
  "sweater-skjorte": "q11-image--sweater",
  kjole: "q11-image--dress",
  jeans: "q11-image--jeans",
  nederdel: "q11-image--skirt",
  bukser: "q11-image--trousers",
  stoevle: "q11-image--boot",
  sneaker: "q11-image--sneaker",
  loafer: "q11-image--loafer",
  "mary-jane": "q11-image--mary-jane"
};

const itemPositions = {
  "almindelige-briller": "q11-choice--glasses",
  solbriller: "q11-choice--sunglasses",
  cykelhjelm: "q11-choice--bike-helmet",
  kasket: "q11-choice--cap",
  blazer: "q11-choice--blazer",
  "t-shirt": "q11-choice--tshirt",
  "sweater-skjorte": "q11-choice--sweater",
  kjole: "q11-choice--dress",
  jeans: "q11-choice--jeans",
  nederdel: "q11-choice--skirt",
  bukser: "q11-choice--trousers",
  stoevle: "q11-choice--boot",
  sneaker: "q11-choice--sneaker",
  loafer: "q11-choice--loafer",
  "mary-jane": "q11-choice--mary-jane"
};

const itemImages = {
  "almindelige-briller": "figma-q11-almindelige-briller.svg",
  solbriller: "figma-q11-solbriller.svg",
  cykelhjelm: "figma-q11-cykelhjelm.svg",
  kasket: "figma-q11-kasket.svg",
  blazer: "figma-q11-blazer.svg",
  "t-shirt": "figma-q11-t-shirt.svg",
  "sweater-skjorte": "figma-q11-sweater-skjorte.svg",
  kjole: "figma-q11-kjole.svg",
  jeans: "figma-q11-jeans.svg",
  nederdel: "figma-q11-nederdel.svg",
  bukser: "figma-q11-bukser.svg",
  stoevle: "figma-q11-stoevle.svg",
  sneaker: "figma-q11-sneaker.svg",
  loafer: "figma-q11-loafer.svg",
  "mary-jane": "figma-q11-mary-jane.svg"
};

function renderWearable(option) {
  return `
    <img
      class="q11-wearable ${itemClasses[option.value]}"
      src="./assets/images/slides/slide-11/${itemImages[option.value] || `${option.value}.png`}?v=figma-q11"
      alt=""
      aria-hidden="true"
      draggable="false"
    >
  `;
}

export function renderQ11Slide({ slide, options, selectedValues, onChange, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q11-slide";
  section.setAttribute("aria-labelledby", "q11-title");

  const selected = new Set(selectedValues);
  const maxChoices = slide.maxChoices || 4;

  section.innerHTML = `
    <h2 class="visually-hidden" id="q11-title">${slide.title}</h2>
    <img class="q11-avatar" src="./assets/images/slides/slide-11/figma-q11-avatar.svg?v=figma-q11" alt="" aria-hidden="true" draggable="false">
    <div class="q11-dropzone q11-dropzone--head" aria-hidden="true"></div>
    <div class="q11-dropzone q11-dropzone--body" aria-hidden="true"></div>
    <div class="q11-options" role="group" aria-labelledby="q11-title">
      <button
        class="q11-choice q11-choice--blazer-alt ${selected.has("blazer-alt") ? "is-selected" : ""}"
        type="button"
        data-value="blazer-alt"
        aria-pressed="${selected.has("blazer-alt") ? "true" : "false"}"
        aria-label="Blazer"
      >
        <img
          class="q11-wearable q11-image--blazer-alt"
          src="./assets/images/slides/slide-11/figma-q11-blazer-over-bukser.svg?v=figma-q11"
          alt=""
          aria-hidden="true"
          draggable="false"
        >
      </button>
      ${options.map((option) => `
        <button
          class="q11-choice ${itemPositions[option.value]} ${selected.has(option.value) ? "is-selected" : ""}"
          type="button"
          data-value="${option.value}"
          aria-pressed="${selected.has(option.value) ? "true" : "false"}"
          aria-label="${option.label}"
        >
          ${renderWearable(option)}
        </button>
      `).join("")}
    </div>
    <button class="q11-next-button" type="button">Videre</button>
    <div class="q11-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q11-progress-segment ${index < 7 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  const buttons = [...section.querySelectorAll(".q11-choice")];

  function syncUi() {
    buttons.forEach((button) => {
      const isSelected = selected.has(button.dataset.value);
      const isDisabled = selected.size >= maxChoices && !isSelected;
      button.classList.toggle("is-selected", isSelected);
      button.disabled = isDisabled;
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    onChange([...selected]);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (selected.has(value)) {
        selected.delete(value);
      } else if (selected.size < maxChoices) {
        selected.add(value);
      }
      syncUi();
    });
  });

  section.querySelector(".q11-next-button").addEventListener("click", onNext);

  syncUi();
  return section;
}
