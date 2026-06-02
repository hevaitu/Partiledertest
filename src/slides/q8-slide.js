const breakfastPoliticianImage = "./assets/images/slides/slide-8/breakfast-politician.png";
const hungerBubbleImage = "./assets/images/slides/slide-8/hunger-bubble.png";

export function renderQ8Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q8-slide";
  section.setAttribute("aria-labelledby", "q8-title");
  section.tabIndex = 0;

  section.innerHTML = `
    <img class="q8-breakfast-image" src="${breakfastPoliticianImage}" alt="${slide.media[0].alt}">
    <img class="q8-hunger-bubble" src="${hungerBubbleImage}" alt="${slide.media[1].alt}">
    <p class="q8-hunger-label">*Sulten*</p>
    <h2 class="q8-title" id="q8-title">
      <span>Der er lagt en slagplan for skandalen.</span>
      <span>Klokken er 6.37 og nu er det blevet tid til morgenmad</span>
    </h2>
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
