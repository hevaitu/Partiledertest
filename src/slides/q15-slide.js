const q15Image = "./assets/images/slides/slide-15/politician-door.png";

export function renderQ15Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q15-slide";
  section.setAttribute("aria-labelledby", "q15-title");
  section.tabIndex = 0;

  section.innerHTML = `
    <h2 class="q15-title" id="q15-title">${slide.title}</h2>
    <div class="q15-image-frame" aria-hidden="true">
      <img class="q15-image" src="${q15Image}" alt="">
    </div>
    <div class="q15-message-card">
      <p>Du har nu oplevet en vaske ægte dag som politiker.</p>
      <p aria-hidden="true">&nbsp;</p>
      <p>Forhåbentlig har du truffet valg, du kan stå inde for...</p>
    </div>
  `;

  if (onNext) {
    section.addEventListener("click", onNext);
    section.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onNext();
      }
    });
  }

  return section;
}
