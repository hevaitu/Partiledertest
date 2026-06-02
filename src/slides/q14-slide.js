import { formatAnswerLabel } from "../utils/format-label.js";

const q14Cards = [
  {
    key: "a",
    images: [
      {
        imageClass: "licorice-pieces",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-a-licorice-pieces.png?v=figma-q14",
        imageAlt: "Lakrids"
      },
      {
        imageClass: "licorice-roll",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-a-licorice-roll.png?v=figma-q14",
        imageAlt: ""
      }
    ]
  },
  {
    key: "b",
    images: [
      {
        imageClass: "taquito",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-b-taquito.png?v=figma-q14",
        imageAlt: "Taquito med spicy chicken"
      }
    ]
  },
  {
    key: "c",
    images: [
      {
        imageClass: "cola-zero",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-c-cola-zero.png?v=figma-q14",
        imageAlt: "Cola Zero"
      }
    ]
  },
  {
    key: "d",
    images: [
      {
        imageClass: "coffee",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-d-coffee.png?v=figma-q14",
        imageAlt: "Kaffe"
      }
    ]
  },
  {
    key: "e",
    images: [
      {
        imageClass: "beer-can",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-e-beer-can.png?v=figma-q14",
        imageAlt: "Øl"
      },
      {
        imageClass: "beer-glass",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-e-beer-glass.png?v=figma-q14",
        imageAlt: ""
      }
    ]
  },
  {
    key: "f",
    images: [
      {
        imageClass: "smorrebrod",
        imageSrc: "./assets/images/slides/slide-14/figma-q14-f-smorrebrod.png?v=figma-q14",
        imageAlt: "Smørrebrød"
      }
    ]
  }
];

export function renderQ14Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q14-slide";
  section.setAttribute("aria-labelledby", "q14-title");

  section.innerHTML = `
    <h2 class="q14-title" id="q14-title">${slide.title}</h2>
    <p class="q14-prompt">${slide.text}</p>
    <div class="q14-options" role="radiogroup" aria-labelledby="q14-title">
      ${options.map((option, index) => {
        const card = q14Cards[index];
        return `
          <button class="q14-card q14-card--${card.key}" type="button" data-value="${option.value}">
            <span class="q14-card-copy q14-card-copy--${card.key}">${formatAnswerLabel(option.label)}</span>
            ${card.images.map((image) => `
              <img
                class="q14-card-image q14-card-image--${image.imageClass}"
                src="${image.imageSrc}"
                alt="${image.imageAlt}"
              >
            `).join("")}
          </button>
        `;
      }).join("")}
    </div>
    <div class="q14-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q14-progress-segment ${index < 6 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q14-card").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q14-card").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
