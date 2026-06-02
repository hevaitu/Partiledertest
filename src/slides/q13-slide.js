import { formatAnswerLabel } from "../utils/format-label.js";

export function renderQ13Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q13-slide";
  section.setAttribute("aria-labelledby", "q13-title");

  section.innerHTML = `
    <h2 class="q13-title" id="q13-title">${slide.title}</h2>
    <div class="q13-prompt-card">
      <p>${slide.text}</p>
    </div>
    <div class="q13-options" role="radiogroup" aria-labelledby="q13-title">
      ${options.map((option, index) => `
        <button class="q13-option q13-option--${index + 1}" type="button" data-value="${option.value}">
          ${formatAnswerLabel(option.label)}
        </button>
      `).join("")}
    </div>
    <div class="q13-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q13-progress-segment ${index < 9 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q13-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q13-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
