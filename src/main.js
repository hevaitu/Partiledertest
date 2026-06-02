import { quizData } from "./data/results.js";
import { renderStartSlide } from "./slides/start-slide.js";
import { renderQ1Slide } from "./slides/q1-slide.js";
import { renderQ2Slide } from "./slides/q2-slide.js";
import { renderQ3Slide } from "./slides/q3-slide.js";
import { renderQ3InfoSlide } from "./slides/q3-info-slide.js";
import { renderQ4Slide } from "./slides/q4-slide.js";
import { renderQ5Slide } from "./slides/q5-slide.js";
import { renderQ6Slide } from "./slides/q6-slide.js?v=20260515-q6-live";
import { renderQ7Slide } from "./slides/q7-slide.js";
import { renderQ8Slide } from "./slides/q8-slide.js";
import { renderQ9Slide } from "./slides/q9-slide.js?v=transparent-bg";
import { renderQ10Slide } from "./slides/q10-slide.js";
import { renderQ11Slide } from "./slides/q11-slide.js?v=20260529-independent-blazer";
import { renderQ12Slide } from "./slides/q12-slide.js?v=transparent-bg";
import { renderQ13Slide } from "./slides/q13-slide.js";
import { renderQ14Slide } from "./slides/q14-slide.js";
import { renderQ15Slide } from "./slides/q15-slide.js";
import { renderQ16Slide } from "./slides/q16-slide.js?v=20260516-q16";
import { renderQ17Slide } from "./slides/q17-slide.js";
import { renderQ18Slide } from "./slides/q18-slide.js";
import { renderQ19Slide } from "./slides/q19-slide.js";
import { renderQ20Slide } from "./slides/q20-slide.js";
import { renderQ21Slide } from "./slides/q21-slide.js?v=percent-slider";
import { renderQ22Slide } from "./slides/q22-slide.js?v=20260515-result-images";

const app = document.querySelector("#app");

const state = {
  currentSlideIndex: 0,
  answers: {}
};

function renderCurrentSlide() {
  const slide = quizData.questions[state.currentSlideIndex];
  let slideElement;

  if (!slide || slide.id === "start") {
    setStageTheme(false);
    app.replaceChildren(renderStartSlide({ onStart: goToNextSlide }));
    return;
  }

  if (slide.id === "Q1") {
    slideElement = renderQ1Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q2") {
    slideElement = renderQ2Slide({
      slide,
      options: quizData.answerOptions.Q2,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q3") {
    slideElement = renderQ3Slide({
      slide,
      options: quizData.answerOptions.Q3,
      selectedValues: state.answers.Q3 || [],
      onToggle: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q3_INFO") {
    slideElement = renderQ3InfoSlide({
      selectedValue: state.answers.Q3?.[0],
      onNext: goToNextSlide
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q4") {
    slideElement = renderQ4Slide({
      slide,
      options: quizData.answerOptions.Q4,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q5") {
    slideElement = renderQ5Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q6") {
    slideElement = renderQ6Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q7") {
    slideElement = renderQ7Slide({
      slide,
      options: quizData.answerOptions.Q7,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q8") {
    slideElement = renderQ8Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q9") {
    slideElement = renderQ9Slide({
      slide,
      options: quizData.answerOptions.Q9,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q10") {
    slideElement = renderQ10Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q11") {
    slideElement = renderQ11Slide({
      slide,
      options: quizData.answerOptions.Q11,
      selectedValues: state.answers.Q11 || [],
      onChange: (values) => {
        state.answers.Q11 = values;
      },
      onNext: goToNextSlide
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q12") {
    slideElement = renderQ12Slide({
      slide,
      options: quizData.answerOptions.Q12,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q13") {
    slideElement = renderQ13Slide({
      slide,
      options: quizData.answerOptions.Q13,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q14") {
    slideElement = renderQ14Slide({
      slide,
      options: quizData.answerOptions.Q14,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q15") {
    slideElement = renderQ15Slide({ slide, onNext: goToNextSlide });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q16") {
    slideElement = renderQ16Slide({
      slide,
      options: quizData.answerOptions.Q16,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q17") {
    slideElement = renderQ17Slide({
      slide,
      selectedValues: state.answers.Q17 || [],
      onAnswer: (values) => {
        state.answers.Q17 = values;
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q18") {
    slideElement = renderQ18Slide({
      slide,
      options: quizData.answerOptions.Q18,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q19") {
    slideElement = renderQ19Slide({
      slide,
      selectedValue: state.answers.Q19?.[0],
      onAnswer: (value) => {
        state.answers.Q19 = [value];
        if (quizData.questions[state.currentSlideIndex]?.id === "Q19") {
          goToNextSlide();
        }
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q20") {
    slideElement = renderQ20Slide({
      slide,
      options: quizData.answerOptions.Q20,
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q21") {
    slideElement = renderQ21Slide({
      slide,
      selectedValue: state.answers.Q21?.[0],
      onAnswer: (value) => {
        answerCurrentSlide(value);
        goToNextSlide();
      }
    });
    renderFramedSlide(slideElement);
    return;
  }

  if (slide.id === "Q22") {
    slideElement = renderQ22Slide({
      slide,
      answers: state.answers,
      politicians: quizData.politicians,
      politicianAnswers: quizData.politicianAnswers,
      resultCopy: quizData.resultCopy,
      onRestart: restartQuiz
    });
    renderFramedSlide(slideElement);
  }
}

function renderFramedSlide(slideElement) {
  setStageTheme(usesBlueFrame());
  const frame = document.createElement("div");
  frame.className = `quiz-frame${usesBlueFrame() ? " quiz-frame--blue" : ""}`;
  frame.append(slideElement, renderNavigation(), renderProgress());
  app.replaceChildren(frame);
}

function setStageTheme(isBlue) {
  app.classList.toggle("is-blue-stage", isBlue);
  document.body.classList.toggle("is-blue-stage", isBlue);
}

function usesBlueFrame() {
  const slide = quizData.questions[state.currentSlideIndex];
  if (slide.id === "Q3_INFO") {
    return false;
  }

  const questionNumber = getQuestionNumber();
  return questionNumber >= 5 && questionNumber <= 15;
}

function renderNavigation() {
  const nav = document.createElement("nav");
  nav.className = "quiz-navigation";
  nav.setAttribute("aria-label", "Quiz navigation");

  const slide = quizData.questions[state.currentSlideIndex];
  const backButton = createNavButton("back", "‹", "Gå tilbage");
  backButton.addEventListener("click", goToPreviousSlide);
  nav.append(backButton);

  if (!["Q5", "Q10"].includes(slide.id) && state.currentSlideIndex < quizData.questions.length - 1) {
    const forwardButton = createNavButton("forward", "›", "Gå frem");
    forwardButton.addEventListener("click", goToNextSlide);
    nav.append(forwardButton);
  }

  return nav;
}

function createNavButton(direction, text, label) {
  const button = document.createElement("button");
  button.className = `quiz-nav-button quiz-nav-button--${direction}`;
  button.type = "button";
  button.textContent = text;
  button.setAttribute("aria-label", label);
  return button;
}

function renderProgress() {
  const progress = document.createElement("div");
  progress.className = "quiz-progress-strip";
  progress.setAttribute("aria-hidden", "true");

  const questionNumber = getQuestionNumber();
  progress.innerHTML = Array.from({ length: 22 }, (_, index) => `
    <span class="quiz-progress-segment ${index < questionNumber ? "is-active" : ""}"></span>
  `).join("");

  return progress;
}

function getQuestionNumber() {
  return quizData.questions
    .slice(0, state.currentSlideIndex + 1)
    .filter((slide) => slide.id !== "start" && slide.id !== "Q3_INFO").length;
}

function goToNextSlide() {
  if (state.currentSlideIndex >= quizData.questions.length - 1) {
    return;
  }
  state.currentSlideIndex += 1;
  renderCurrentSlide();
}

function goToPreviousSlide() {
  if (state.currentSlideIndex <= 0) {
    return;
  }
  state.currentSlideIndex -= 1;
  renderCurrentSlide();
}

function answerCurrentSlide(value) {
  const slide = quizData.questions[state.currentSlideIndex];
  state.answers[slide.id] = [value];
}

function restartQuiz() {
  state.currentSlideIndex = 0;
  state.answers = {};
  renderCurrentSlide();
}

renderCurrentSlide();
