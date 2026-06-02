import { formatAnswerLabel } from "../utils/format-label.js";

export function renderQ2Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q2-slide";
  section.setAttribute("aria-labelledby", "q2-title");

  section.innerHTML = `
    <h2 class="q2-title" id="q2-title">${slide.text}</h2>
    <div class="q2-options" role="radiogroup" aria-labelledby="q2-title">
      ${options.map((option, index) => `
        <button class="q2-option q2-option--${index + 1}" type="button" data-value="${option.value}">
          ${formatAnswerLabel(option.label)}
        </button>
      `).join("")}
    </div>
    <div class="progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="progress-segment ${index === 0 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q2-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q2-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
