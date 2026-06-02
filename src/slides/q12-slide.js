import { formatAnswerLabel } from "../utils/format-label.js";

const q12Cards = [
  {
    key: "a",
    image: "figma-q12-a-road-bike.png?v=figma-q12",
    imageClass: "q12-card-image--road-bike"
  },
  {
    key: "b",
    image: "figma-q12-b-puch-maxi.png?v=figma-q12",
    imageClass: "q12-card-image--puch-maxi"
  },
  {
    key: "c",
    image: "figma-q12-c-minister-car.png?v=figma-q12",
    imageClass: "q12-card-image--minister-car"
  },
  {
    key: "d",
    image: "figma-q12-d-bike-basket.png?v=figma-q12",
    imageClass: "q12-card-image--bike-basket"
  },
  {
    key: "e",
    image: "figma-q12-e-car.png?v=figma-q12",
    imageClass: "q12-card-image--car"
  },
  {
    key: "f",
    image: "figma-q12-f-rental-bike.png?v=figma-q12",
    imageClass: "q12-card-image--rental-bike"
  }
];

export function renderQ12Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q12-slide";
  section.setAttribute("aria-labelledby", "q12-title");

  section.innerHTML = `
    <h2 class="q12-title" id="q12-title">${slide.text}</h2>
    <div class="q12-options" role="radiogroup" aria-labelledby="q12-title">
      ${options.map((option, index) => {
        const card = q12Cards[index];
        return `
          <button class="q12-card q12-card--${card.key}" type="button" data-value="${option.value}" aria-label="${option.label}">
            <span class="q12-card-copy">${formatAnswerLabel(option.label)}</span>
            <img
              class="q12-card-image ${card.imageClass}"
              src="./assets/images/slides/slide-12/${card.image}"
              alt=""
              aria-hidden="true"
            >
          </button>
        `;
      }).join("")}
    </div>
    <div class="q12-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q12-progress-segment ${index < 11 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q12-card").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q12-card").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
