const defaultHonesty = 50;

export function renderQ21Slide({ slide, selectedValue, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q21-slide";
  section.setAttribute("aria-labelledby", "q21-title");

  const initialValue = typeof selectedValue === "number" ? selectedValue : defaultHonesty;

  section.innerHTML = `
    <h2 class="q21-title" id="q21-title">${slide.title}</h2>
    <div class="q21-slider-wrap">
      <span class="q21-scale-label q21-scale-label--min">0%</span>
      <span class="q21-scale-label q21-scale-label--max">100%</span>
      <div class="q21-track" aria-hidden="true">
        <span class="q21-track-fill"></span>
        <output class="q21-value" for="q21-slider">${initialValue}%</output>
      </div>
      <input
        id="q21-slider"
        class="q21-slider"
        type="range"
        min="0"
        max="100"
        step="1"
        value="${initialValue}"
        aria-label="Hvor ærligt du har svaret i procent"
      >
    </div>
    <button class="q21-next-button" type="button">Videre</button>
  `;

  const slider = section.querySelector(".q21-slider");
  const fill = section.querySelector(".q21-track-fill");
  const valueOutput = section.querySelector(".q21-value");
  const nextButton = section.querySelector(".q21-next-button");

  const updateSlider = () => {
    const value = Number(slider.value);
    const percentage = `${value}%`;
    fill.style.width = percentage;
    valueOutput.textContent = percentage;
    section.style.setProperty("--q21-value", percentage);
    slider.setAttribute("aria-valuetext", `${value} procent`);
  };

  slider.addEventListener("input", updateSlider);
  nextButton.addEventListener("click", () => {
    onAnswer(Number(slider.value));
  });

  updateSlider();

  return section;
}
