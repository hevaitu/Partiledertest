export function matchPoliticians({ answers, politicians, politicianAnswers }) {
  const normalizedPoliticians = normalizePoliticians(politicians);

  if (normalizedPoliticians.length === 0) {
    return {
      best: emptyMatch(),
      worst: emptyMatch(),
      hasData: false
    };
  }

  const matches = normalizedPoliticians.map((politician) => {
    const referenceAnswers = politicianAnswers[politician.id] || politicianAnswers[politician.name] || {};
    const score = scoreAnswers(answers, referenceAnswers);

    return {
      ...politician,
      ...score
    };
  });

  matches.sort((a, b) => b.score - a.score || b.answered - a.answered || a.name.localeCompare(b.name, "da"));

  return {
    best: matches[0] || emptyMatch(),
    worst: matches[matches.length - 1] || emptyMatch(),
    hasData: true
  };
}

function normalizePoliticians(politicians) {
  if (!Array.isArray(politicians)) {
    return [];
  }

  return politicians.map((politician) => {
    if (typeof politician === "string") {
      return { id: politician, name: politician };
    }

    return {
      id: politician.id || politician.slug || politician.name,
      name: politician.name || politician.id || "Ukendt politiker"
    };
  }).filter((politician) => politician.id);
}

function scoreAnswers(userAnswers, referenceAnswers) {
  let matched = 0;
  let answered = 0;

  Object.entries(referenceAnswers).forEach(([questionId, referenceValue]) => {
    const userValue = userAnswers[questionId];

    if (userValue === undefined) {
      return;
    }

    answered += 1;
    matched += scoreValue(userValue, referenceValue);
  });

  return {
    score: answered === 0 ? 0 : matched / answered,
    matched,
    answered,
    percentage: answered === 0 ? 0 : Math.round((matched / answered) * 100)
  };
}

function scoreValue(userValue, referenceValue) {
  const userValues = Array.isArray(userValue) ? userValue : [userValue];
  const referenceValues = Array.isArray(referenceValue) ? referenceValue : [referenceValue];

  if (isMapPin(userValues[0]) && isMapPin(referenceValues[0])) {
    return scoreMapPins(userValues[0], referenceValues[0]);
  }

  if (typeof userValues[0] === "number" && typeof referenceValues[0] === "number") {
    return Math.max(0, 1 - Math.abs(userValues[0] - referenceValues[0]) / 100);
  }

  const normalizedUser = [...new Set(userValues.map(normalizeValue))];
  const normalizedReference = [...new Set(referenceValues.map(normalizeValue))];
  const userSet = new Set(normalizedUser);
  const matches = normalizedReference.filter((value) => userSet.has(value)).length;

  return normalizedReference.length === 0 ? 0 : matches / normalizedReference.length;
}

function normalizeValue(value) {
  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }

  const safeValue = String(value);

  if (safeValue === "blazer-alt") {
    return "blazer";
  }

  return safeValue;
}

function isMapPin(value) {
  return value
    && typeof value === "object"
    && typeof value.x === "number"
    && typeof value.y === "number";
}

function scoreMapPins(userPin, referencePin) {
  const distance = Math.hypot(userPin.x - referencePin.x, userPin.y - referencePin.y);
  const maxDistance = 10;

  return Math.max(0, 1 - distance / maxDistance);
}

function emptyMatch() {
  return {
    id: "",
    name: "Mangler politikerdata",
    score: 0,
    matched: 0,
    answered: 0,
    percentage: 0
  };
}
