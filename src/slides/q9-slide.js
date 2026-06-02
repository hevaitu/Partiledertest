const q9Images = {
  aLeft: "./assets/images/slides/slide-9/figma-q9-a-newspaper.png?v=figma-q9",
  aRight: "./assets/images/slides/slide-9/figma-q9-a-coffee-press.png?v=figma-q9",
  bLeft: "./assets/images/slides/slide-9/figma-q9-b-fruit.png?v=figma-q9",
  bRight: "./assets/images/slides/slide-9/figma-q9-b-yoghurt.png?v=figma-q9",
  cLeft: "./assets/images/slides/slide-9/figma-q9-c-coffee.png?v=figma-q9",
  cRight: "./assets/images/slides/slide-9/figma-q9-c-sandwich.png?v=figma-q9",
  dLeft: "./assets/images/slides/slide-9/figma-q9-d-water.png?v=figma-q9",
  dRight: "./assets/images/slides/slide-9/d-food-right.png?v=transparent-bg",
  eLeft: "./assets/images/slides/slide-9/figma-q9-e-cereal.png?v=figma-q9",
  eRight: "./assets/images/slides/slide-9/figma-q9-e-dua-lipa.png?v=figma-q9",
  f: "./assets/images/slides/slide-9/figma-q9-f-porridge.png?v=figma-q9"
};

const q9Cards = [
  {
    key: "a",
    images: [
      { className: "q9-food-image q9-food-image--a-left", src: q9Images.aLeft, alt: "Morgenmad A venstre" },
      { className: "q9-food-image q9-food-image--a-right", src: q9Images.aRight, alt: "Morgenmad A højre" }
    ]
  },
  {
    key: "b",
    images: [
      { className: "q9-food-image q9-food-image--b-left", src: q9Images.bLeft, alt: "Morgenmad B venstre" },
      { className: "q9-food-image q9-food-image--b-right", src: q9Images.bRight, alt: "Morgenmad B højre" }
    ]
  },
  {
    key: "c",
    images: [
      { className: "q9-food-image q9-food-image--c-left", src: q9Images.cLeft, alt: "Morgenmad C venstre" },
      { className: "q9-food-image q9-food-image--c-right", src: q9Images.cRight, alt: "Morgenmad C højre" }
    ]
  },
  {
    key: "d",
    images: [
      { className: "q9-food-image q9-food-image--d-left", src: q9Images.dLeft, alt: "Morgenmad D venstre" },
      { className: "q9-food-image q9-food-image--d-right", src: q9Images.dRight, alt: "Morgenmad D højre" }
    ]
  },
  {
    key: "e",
    images: [
      { className: "q9-food-image q9-food-image--e-left", src: q9Images.eLeft, alt: "Morgenmad E venstre" },
      { className: "q9-food-image q9-food-image--e-right", src: q9Images.eRight, alt: "Morgenmad E højre" }
    ]
  },
  {
    key: "f",
    images: [
      { className: "q9-food-image q9-food-image--f", src: q9Images.f, alt: "Morgenmad F" }
    ]
  }
];

export function renderQ9Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q9-slide";
  section.setAttribute("aria-labelledby", "q9-title");

  section.innerHTML = `
    <h2 class="q9-title" id="q9-title">${slide.title}</h2>
    <p class="q9-prompt">${slide.text}</p>
    <div class="q9-options" role="radiogroup" aria-labelledby="q9-title">
      ${options.map((option, index) => {
        const card = q9Cards[index];
        return `
          <button class="q9-card q9-card--${card.key}" type="button" data-value="${option.value}" aria-label="${option.label}">
            <span class="q9-card-label">${option.label}:</span>
            ${card.images.map((image) => `
              <img class="${image.className}" src="${image.src}" alt="${image.alt}">
            `).join("")}
          </button>
        `;
      }).join("")}
    </div>
    <div class="q9-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q9-progress-segment ${index < 6 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q9-card").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q9-card").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
