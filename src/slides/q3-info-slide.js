const q3InfoCopy = {
  drama: "Hmm... så du er vædder. Interessant. Du opfører dig i hvertfald sådan",
  snacks: "Hmm... så du er tyr. Interessant. Du opfører dig i hvertfald sådan",
  "skifter-mening": "Hmm... så du er tvilling. Interessant. Du opfører dig i hvertfald sådan",
  "tager-personligt": "Hmm... så du er krebs. Interessant. Du opfører dig i hvertfald sådan",
  opmaerksomhed: "Hmm... så du er løve. Interessant. Du opfører dig i hvertfald sådan",
  "retter-alt": "Hmm... så du er jomfru. Interessant. Du opfører dig i hvertfald sådan",
  "kan-ikke-vaelge": "Hmm... så du er vægt. Interessant. Du opfører dig i hvertfald sådan",
  "baerer-nag": "Hmm... så du er skorpion. Interessant. Du opfører dig i hvertfald sådan",
  "undgaar-ansvar": "Hmm... så du er skytte. Interessant. Du opfører dig i hvertfald sådan",
  workaholic: "Hmm... så du er stenbuk. Interessant. Du opfører dig i hvertfald sådan",
  unik: "Hmm... så du er vandmand. Interessant. Du opfører dig i hvertfald sådan",
  "graeder-musik": "Hmm... så du er fisk. Interessant. Du opfører dig i hvertfald sådan"
};

export function renderQ3InfoSlide({ selectedValue, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q3-info-slide";
  section.setAttribute("aria-labelledby", "q3-info-text");
  section.tabIndex = 0;

  section.innerHTML = `
    <p class="q3-info-text" id="q3-info-text">${q3InfoCopy[selectedValue] || q3InfoCopy.drama}</p>
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
