const q19MapImage = "./assets/images/slides/slide-19/europe-map.jpg";

export function renderQ19Slide({ slide, selectedValue, onAnswer }) {
  const section = document.createElement("section");
  section.className = "slide q19-slide";
  section.setAttribute("aria-labelledby", "q19-title");

  const existingPin = selectedValue && typeof selectedValue.x === "number" && typeof selectedValue.y === "number"
    ? selectedValue
    : null;

  section.innerHTML = `
    <h2 class="q19-title" id="q19-title">${slide.title}</h2>
    <button class="q19-map" type="button" aria-label="Sæt en pin på kortet">
      <img class="q19-map-image" src="${q19MapImage}" alt="Europakort">
      <span
        class="q19-pin ${existingPin ? "is-visible" : ""}"
        aria-hidden="true"
        style="${existingPin ? `left: ${existingPin.x}%; top: ${existingPin.y}%;` : ""}"
      ></span>
    </button>
    <div class="q19-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, (_, index) => `
        <span class="q19-progress-segment ${index < 13 ? "is-active" : ""}"></span>
      `).join("")}
    </div>
  `;

  const map = section.querySelector(".q19-map");
  const pin = section.querySelector(".q19-pin");
  let advanceTimer;

  map.addEventListener("click", (event) => {
    const rect = map.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    const value = {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2))
    };

    pin.style.left = `${value.x}%`;
    pin.style.top = `${value.y}%`;
    pin.classList.add("is-visible");

    window.clearTimeout(advanceTimer);
    advanceTimer = window.setTimeout(() => {
      onAnswer(value);
    }, 650);
  });

  return section;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
