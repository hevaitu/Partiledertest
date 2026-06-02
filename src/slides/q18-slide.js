import { formatAnswerLabel } from "../utils/format-label.js";

const q18Keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

export function renderQ18Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q18-slide";
  section.setAttribute("aria-labelledby", "q18-title");

  section.innerHTML = `
    <h2 class="q18-title" id="q18-title">${slide.title}</h2>
    <div class="q18-options" role="radiogroup" aria-labelledby="q18-title">
      ${options.map((option, index) => `
        <button
          class="q18-option q18-option--${q18Keys[index]}"
          type="button"
          data-value="${option.value}"
        >
          ${formatAnswerLabel(option.label)}
        </button>
      `).join("")}
    </div>
    <div class="q18-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q18-progress-segment ${index < 12 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q18-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q18-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
