import { formatAnswerLabel } from "../utils/format-label.js";

export function renderQ20Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q20-slide";
  section.setAttribute("aria-labelledby", "q20-title");

  section.innerHTML = `
    <h2 class="q20-title" id="q20-title">${slide.title}</h2>
    <div class="q20-options" role="radiogroup" aria-labelledby="q20-title">
      ${options.map((option, index) => `
        <button class="q20-option q20-option--${index + 1}" type="button" data-value="${option.value}">
          <span class="q20-option-copy">${formatAnswerLabel(option.label)}</span>
        </button>
      `).join("")}
    </div>
    <div class="q20-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q20-progress-segment ${index < 14 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q20-option").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q20-option").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
