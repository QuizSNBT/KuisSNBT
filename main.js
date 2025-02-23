let quizData = [];

fetch("https://raw.githubusercontent.com/QuizSNBT/KuisSNBT/main/quizdata.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Gagal mengambil data soal!");
    }
    return response.json();
  })
  .then(data => {
    console.log("Data berhasil dimuat:", data); // Debugging: Pastikan JSON terbaca
    quizData = shuffleArray(data).slice(0, 10); // Ambil 10 soal acak
    startQuiz(); // Memulai kuis setelah soal berhasil dimuat
  })
  .catch(error => console.error("Gagal mengambil data:", error));

function startQuiz() {
  console.log("Soal digunakan:", quizData); // Debugging: Pastikan 10 soal diambil
  createQuestion();
}

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;

const createQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS) {
    displayQuizResult();
    return;
  }

  clearInterval(timerInterval);
  let secondsLeft = 59;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.textContent = `Time Left: 60 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2, "0")} seconds`;
    if (--secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span> ${quizData[questionNumber].question}`;
  options.innerHTML = "";

  quizData[questionNumber].options.forEach((opt) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = opt;
    option.addEventListener("click", checkAnswer);
    options.appendChild(option);
  });
};

const checkAnswer = (e) => {
  let userAnswer = e.target.innerHTML;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  document.querySelectorAll(".option").forEach(o => o.classList.add("disabled"));
};

const displayNextQuestion = () => {
  questionNumber++;
  createQuestion();
};

const displayQuizResult = () => {
  quizContainer.style.display = "none";
  document.querySelector(".quiz-result").innerHTML = `<h2>Hasil: ${score} dari ${MAX_QUESTIONS}</h2>`;
  document.querySelector(".quiz-result").style.display = "block";
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
});
