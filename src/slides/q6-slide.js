const notifications = [
  {
    icon: "message",
    sender: "Rådgiver",
    body: "27 ubesvaret opkald"
  },
  {
    icon: "message",
    sender: "Kollega",
    body: "Hvad fanden har du lavet? Det her kan altså godt blive ret alvorligt for dig."
  },
  {
    icon: "press",
    sender: "Pressen",
    body: "Du kan ikke gemme dig for evigt. Kan du svare på et par spørgsmål?"
  },
  {
    icon: "message",
    sender: "Partiformand",
    body: "Hvis du ikke snart ringer tilbage med en forklaring bliver jeg nødt til at melde dig af holdet."
  },
  {
    icon: "call",
    sender: "Partiformand",
    body: "9 ubesvaret opkald"
  },
  {
    icon: "message",
    sender: "Mor <3",
    body: "Hvorfor har Ekstra Bladet ringet til mig? Er du okay min skat?"
  }
];

function renderNotification(item) {
  return `
    <div class="q6-notification">
      <span class="q6-notification-icon q6-notification-icon--${item.icon}" aria-hidden="true"></span>
      <span class="q6-notification-copy">
        <strong>${item.sender}</strong>
        <span>${item.body}</span>
      </span>
    </div>
  `;
}

export function renderQ6Slide({ slide, onNext }) {
  const section = document.createElement("section");
  section.className = "slide q6-slide";
  section.setAttribute("aria-labelledby", "q6-title");
  section.tabIndex = 0;

  section.innerHTML = `
    <h2 class="q6-prompt" id="q6-title">${slide.title}</h2>
    <div class="q6-vibration q6-vibration--top" aria-hidden="true"></div>
    <div class="q6-vibration q6-vibration--bottom" aria-hidden="true"></div>
    <div class="q6-phone" aria-hidden="true">
      <div class="q6-phone-screen">
        <div class="q6-notch"></div>
        <div class="q6-time">06:07</div>
        <div class="q6-notification-stack">
          ${notifications.map(renderNotification).join("")}
        </div>
      </div>
    </div>
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
