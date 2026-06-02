import { matchPoliticians } from "../results/match-politicians.js";

const politicianImages = {
  "mette-frederiksen": "./assets/images/results/mette-frederiksen.png",
  "troels-lund-poulsen": "./assets/images/results/troels-lund-poulsen.png",
  "lars-loekke-rasmussen": "./assets/images/results/lars-loekke-rasmussen.png",
  "pia-olsen-dyhr": "./assets/images/results/pia-olsen-dyhr.png",
  "alex-vanopslagh": "./assets/images/results/alex-vanopslagh.png",
  "pelle-dragsted": "./assets/images/results/pelle-dragsted.png",
  "mona-juul": "./assets/images/results/mona-juul.png",
  "lars-boje-mathiesen": "./assets/images/results/lars-boje-mathiesen.png",
  "morten-messerschmidt": "./assets/images/results/morten-messerschmidt.png",
  "inger-stoejberg": "./assets/images/results/inger-stoejberg.png",
  "franciska-rosenkilde": "./assets/images/results/franciska-rosenkilde.png",
  "martin-lidegaard": "./assets/images/results/martin-lidegaard.png"
};

export function renderQ22Slide({ slide, answers, politicians, politicianAnswers, resultCopy, onRestart }) {
  const section = document.createElement("section");
  section.className = "slide q22-slide";
  section.setAttribute("aria-labelledby", "q22-title");

  const result = matchPoliticians({ answers, politicians, politicianAnswers });
  const bestCopy = getResultCopy(resultCopy, result.best, "most");
  const worstCopy = getResultCopy(resultCopy, result.worst, "least");

  section.innerHTML = `
    ${renderResultCard({
      type: "best",
      label: "Mest ens med",
      match: result.best,
      copy: bestCopy
    })}

    ${renderResultCard({
      type: "worst",
      label: "Mindst ens med",
      match: result.worst,
      copy: worstCopy
    })}

    <div class="q22-progress-strip" aria-hidden="true">
      ${Array.from({ length: 16 }, () => `
        <span class="q22-progress-segment is-active"></span>
      `).join("")}
    </div>

    <button class="q22-restart-button" type="button">Tag testen igen</button>
  `;

  section.querySelector(".q22-restart-button").addEventListener("click", onRestart);

  return section;
}

function renderResultCard({ type, label, match, copy }) {
  const party = copy.party ? `<span class="q22-result-party">${escapeHtml(copy.party)}</span>` : "";
  const image = politicianImages[match.id]
    ? `<img class="q22-result-image" src="${politicianImages[match.id]}" alt="${escapeHtml(match.name)}">`
    : "";

  return `
    <article class="q22-result q22-result--${type}">
      ${image}
      <header class="q22-result-header">
        <span class="q22-result-label">${label}</span>
        <strong class="q22-result-name">${escapeHtml(match.name)}</strong>
        ${party}
      </header>
      <div class="q22-result-copy">
        ${copy.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </article>
  `;
}

function getResultCopy(resultCopy, match, variant) {
  const fallback = {
    party: "",
    paragraphs: [`Du matcher ${match.name}.`]
  };
  const politicianCopy = resultCopy?.[match.id];
  const paragraphs = politicianCopy?.[variant];

  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    return fallback;
  }

  return {
    party: politicianCopy.party || "",
    paragraphs
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
