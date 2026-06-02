const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export function renderQ3Slide({ slide, options, selectedValues, onToggle }) {
  const section = document.createElement("section");
  section.className = "slide q3-slide";
  section.setAttribute("aria-labelledby", "q3-title");

  section.innerHTML = `
    <h2 class="q3-title" id="q3-title">${slide.text}</h2>
    <div class="q3-options" aria-labelledby="q3-title">
      ${options.map((option, index) => `
        <button class="q3-option q3-option--${index + 1} ${selectedValues.includes(option.value) ? "is-selected" : ""}" type="button" data-value="${option.value}" aria-pressed="${selectedValues.includes(option.value)}">
          <strong>${letters[index]}:</strong>
          <span>${option.label}</span>
        </button>
      `).join("")}
    </div>
    <div class="q3-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q3-progress-segment ${index < 2 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".q3-option").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-selected");
      button.setAttribute("aria-pressed", String(button.classList.contains("is-selected")));
      onToggle(button.dataset.value);
    });
  });

  return section;
}
