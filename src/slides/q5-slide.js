const q5Image = "./assets/images/slides/slide-5/skaermbillede-2026-03-25-kl-10-13-53.png";

export function renderQ5Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q5-slide";
  section.setAttribute("aria-labelledby", "q5-title");

  section.innerHTML = `
    <img class="q5-image" src="${q5Image}" alt="${slide.media[0].alt}">
    <h2 class="q5-title" id="q5-title">${slide.title}</h2>
    <div class="q5-card">
      <p>${slide.body[0]}</p>
      <p>${slide.body[1]}</p>
    </div>
    <button class="q5-start-day" type="button">[Begynd din dag på borgen]</button>
  `;

  section.querySelector(".q5-start-day").addEventListener("click", onNext);

  return section;
}
