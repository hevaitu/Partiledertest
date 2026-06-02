import { formatAnswerLabel } from "../utils/format-label.js";

export function renderQ7Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q7-slide";
  section.setAttribute("aria-labelledby", "q7-title");

  section.innerHTML = `
    <h2 class="q7-title" id="q7-title">${slide.text}</h2>
    <div class="q7-options" role="radiogroup" aria-labelledby="q7-title">
      ${options.map((option, index) => `
        <button class="q7-option q7-option--${index + 1}" type="button" data-value="${option.value}">
          <span class="q7-option-label">${formatAnswerLabel(option.label)}</span>
          <span class="q7-option-description">${option.description}</span>
        </button>
      `).join("")}
    </div>
    <div class="q7-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q7-progress-segment ${index < 5 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q7-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q7-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
