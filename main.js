let quizData = [];

fetch("https://raw.githubusercontent.com/quizsnbt/soal-kuis/main/quizData.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    startQuiz(); // Memulai kuis setelah soal berhasil dimuat
  })
  .catch(error => console.error("Gagal mengambil data:", error));

function startQuiz() {
  console.log("Soal berhasil dimuat:", quizData);
  createQuestion(); // Menampilkan soal pertama
}

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 2; // ✅ Diperbaiki dari error sebelumnya
let timerInterval;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.innerHTML; // ✅ Gunakan innerHTML agar cocok dengan teks di HTML
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 59;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Time Left: 60 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft
      .toString()
      .padStart(2, "0")} seconds`;
    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector("#popup-score").style.display = "flex";

  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = `Kamu menjawab benar ${score} dari ${MAX_QUESTIONS} soal.`;

  document.getElementById("popup-ok").addEventListener("click", () => {
    document.querySelector("#popup-score").style.display = "none";
    showAnswerReview(); // Panggil pembahasan setelah popup ditutup
  });
};

const showAnswerReview = () => {
  const quizResult = document.querySelector(".quiz-result");
  quizResult.innerHTML = ""; // Bersihkan isi sebelumnya
  quizResult.style.display = "flex";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Pembahasan Jawaban`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");
const showAnswerReview = () => {
  const quizResult = document.querySelector(".quiz-result");
  quizResult.innerHTML = ""; // Bersihkan isi sebelumnya

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Pembahasan Jawaban`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`) || "Tidak Dijawab";
    const correctAnswer = quizData[i].correct;
    const isCorrect = userAnswer === correctAnswer;

    if (!isCorrect) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `
      <div class="question">Soal ${i + 1}: ${quizData[i].question}</div>
      <div class="user-answer">Jawaban Kamu: ${userAnswer}</div>
      <div class="correct-answer">Jawaban Benar: ${correctAnswer}</div>
    `;

    quizResult.appendChild(resultItem);
  }

  // Tambahkan tombol ulangi kuis
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Ulangi Kuis";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};
    const userAnswer = localStorage.getItem(`userAnswer_${i}`) || "Tidak Dijawab";
    const correctAnswer = quizData[i].correct;
    const isCorrect = userAnswer === correctAnswer;

    if (!isCorrect) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `
      <div class="question">Soal ${i + 1}: ${quizData[i].question}</div>
      <div class="user-answer">Jawaban Kamu: ${userAnswer}</div>
      <div class="correct-answer">Jawaban Benar: ${correctAnswer}</div>
    `;

    quizResult.appendChild(resultItem);
  }

  // Tombol untuk mengulang kuis
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Ulangi Kuis";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn)
};

document.querySelector(".start-btn").addEventListener("click", () => {
  document.querySelector(".start-btn-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  document.querySelector(".donation-btn").style.display = "none"; // Sembunyikan tombol donasi
});
