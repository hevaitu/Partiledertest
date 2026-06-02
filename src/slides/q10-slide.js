export function renderQ10Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q10-slide";
  section.setAttribute("aria-labelledby", "q10-title");

  section.innerHTML = `
    <h2 class="q10-title" id="q10-title">${slide.title}</h2>
    <p class="q10-prompt">${slide.text}</p>
    <div class="q10-avatar" aria-hidden="true">
      <span class="q10-avatar-head"></span>
      <span class="q10-avatar-neck"></span>
      <span class="q10-avatar-body"></span>
      <span class="q10-avatar-arm q10-avatar-arm--left"></span>
      <span class="q10-avatar-arm q10-avatar-arm--right"></span>
      <span class="q10-avatar-hand q10-avatar-hand--left"></span>
      <span class="q10-avatar-hand q10-avatar-hand--right"></span>
      <span class="q10-avatar-leg q10-avatar-leg--left"></span>
      <span class="q10-avatar-leg q10-avatar-leg--right"></span>
      <span class="q10-avatar-foot q10-avatar-foot--left"></span>
      <span class="q10-avatar-foot q10-avatar-foot--right"></span>
    </div>
    <button class="q10-make-button" type="button" aria-label="Lav mig">
      <span class="q10-make-body">LAV MIG</span>
    </button>
  `;

  section.querySelector(".q10-make-button").addEventListener("click", onNext);

  return section;
}
