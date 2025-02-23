let quizData = [];
const MAX_QUESTIONS_PER_SESSION = 10; // Jumlah soal per sesi

// Ambil soal dari GitHub JSON
fetch("https://raw.githubusercontent.com/QuizSNBT/KuisSNBT/main/quizdata.json")
  .then(response => {
    if (!response.ok) throw new Error("Gagal mengambil data soal!");
    return response.json();
  })
  .then(data => {
    quizData = shuffleArray(data).slice(0, MAX_QUESTIONS_PER_SESSION);
    console.log("✅ Soal berhasil dimuat:", quizData);
  })
  .catch(error => console.error("❌ ERROR:", error));

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");
const popupScore = document.querySelector("#popup-score");
const popupOk = document.querySelector("#popup-ok");

let questionNumber = 0;
let score = 0;
let timerInterval;

// Fungsi untuk mengacak array (shuffle)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Reset jawaban sebelumnya
function resetLocalStorage() {
  for (let i = 0; i < MAX_QUESTIONS_PER_SESSION; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
}

resetLocalStorage();

// Fungsi untuk mengecek jawaban
function checkAnswer(e) {
  let userAnswer = e.target.innerHTML;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => o.classList.add("disabled"));
}

// Fungsi untuk menampilkan soal
function createQuestion() {
  if (questionNumber >= quizData.length) {
    displayQuizResult();
    return;
  }

  clearInterval(timerInterval);
  let secondsLeft = 59;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Time Left: 60 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2, "0")} seconds`;
    secondsLeft--;

    if (secondsLeft < 3) timerDisplay.classList.add("danger");
    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${quizData.length}</span> ${quizData[questionNumber].question}`;

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
}

// Fungsi untuk menampilkan hasil skor
function displayQuizResult() {
  quizContainer.style.display = "none";
  popupScore.style.display = "flex";

  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = `Kamu menjawab benar ${score} dari ${quizData.length} soal.`;
}

// Fungsi untuk menampilkan pembahasan jawaban
function showAnswerReview() {
  quizResult.innerHTML = "";
  quizResult.style.display = "flex";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Pembahasan Jawaban`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < quizData.length; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`) || "Tidak Dijawab";
    const correctAnswer = quizData[i].correct;
    const isCorrect = userAnswer === correctAnswer;

    if (!isCorrect) resultItem.classList.add("incorrect");

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
}

// Fungsi untuk menampilkan soal berikutnya
function displayNextQuestion() {
  questionNumber++;
  createQuestion();
}

// Fungsi untuk mengulang kuis
function retakeQuiz() {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData).slice(0, MAX_QUESTIONS_PER_SESSION);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  popupScore.style.display = "none";
  quizContainer.style.display = "block";
}

// Event listener untuk tombol mulai
startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});

// Event listener untuk tombol OK di popup
popupOk.addEventListener("click", () => {
  popupScore.style.display = "none";
  showAnswerReview(); // Menampilkan pembahasan setelah popup ditutup
});

// Event listener untuk tombol next
nextBtn.addEventListener("click", displayNextQuestion);
