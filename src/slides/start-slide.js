const startImage = "./assets/images/slides/slide-1/skaermbillede-2026-03-26-kl-09-52-04.png";

export function renderStartSlide({ onStart }) {
  const section = document.createElement("section");
  section.className = "slide start-slide";
  section.setAttribute("aria-labelledby", "start-title");

  section.innerHTML = `
    <div class="title-chip title-chip--who"></div>
    <div class="title-chip title-chip--you"></div>
    <div class="title-chip title-chip--borg"></div>

    <h1 class="visually-hidden" id="start-title">Hvem er du på Christiansborg?</h1>
    <p class="title-text title-text--who" aria-hidden="true">Hvem er</p>
    <p class="title-text title-text--you" aria-hidden="true">du på</p>
    <p class="title-text title-text--borg" aria-hidden="true">Christiansborg?</p>

    <figure class="start-image">
      <img src="${startImage}" alt="Christiansborg motiv">
    </figure>

    <button class="start-button" type="button" data-start-test>
      <span>TEST MIG</span>
    </button>
  `;

  section.querySelector("[data-start-test]").addEventListener("click", onStart);

  return section;
}
