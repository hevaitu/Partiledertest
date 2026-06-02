export function renderQ1Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q1-slide";
  section.setAttribute("aria-labelledby", "q1-title");
  section.tabIndex = 0;

  section.innerHTML = `
    <p class="q1-text" id="q1-title">${slide.body[0]}</p>
  `;

  section.addEventListener("click", onNext);
  section.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNext();
    }
  });

  return section;
}
