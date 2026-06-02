const q16Image = "./assets/images/slides/slide-16/instagram-aesthetic-updated.png?v=20260516-q16";

const q16Hotspots = [
  { key: "mom", label: "far.insta123" },
  { key: "far", label: "rejsmedmig" },
  { key: "sporty", label: "SportyType" },
  { key: "travel", label: "influencerliv" }
];

export function renderQ16Slide({ slide, options, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q16-slide";
  section.setAttribute("aria-labelledby", "q16-title");

  section.innerHTML = `
    <h2 class="visually-hidden" id="q16-title">${slide.title}</h2>
    <img class="q16-design-image" src="${q16Image}" alt="">
    <div class="q16-options" role="radiogroup" aria-labelledby="q16-title">
      ${options.map((option, index) => {
        const hotspot = q16Hotspots[index];
        return `
          <button
            class="q16-hotspot q16-hotspot--${hotspot.key}"
            type="button"
            data-value="${option.value}"
            aria-label="${option.label}"
            title="${hotspot.label}"
          ></button>
        `;
      }).join("")}
    </div>
  `;

  section.querySelectorAll(".q16-hotspot").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".q16-hotspot").forEach((option) => {
        option.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
      onAnswer(button.dataset.value);
    });
  });

  return section;
}
