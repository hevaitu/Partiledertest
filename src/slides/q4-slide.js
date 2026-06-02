import { formatAnswerLabel } from "../utils/format-label.js";

export function renderQ4Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q4-slide";
  section.setAttribute("aria-labelledby", "q4-title");

  section.innerHTML = `
    <h2 class="q4-title" id="q4-title">${slide.text}</h2>
    <div class="q4-options" role="radiogroup" aria-labelledby="q4-title">
      ${options.map((option, index) => `
        <button class="q4-option q4-option--${index + 1}" type="button" data-value="${option.value}">
          ${formatAnswerLabel(option.label)}
        </button>
      `).join("")}
    </div>
    <div class="q4-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q4-progress-segment ${index < 9 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q4-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q4-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
