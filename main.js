let quizData = [];
let usedQuestions = JSON.parse(localStorage.getItem("usedQuestions")) || []; // Simpan soal yang sudah digunakan

fetch("https://raw.githubusercontent.com/QuizSNBT/KuisSNBT/refs/heads/main/quizdata.json")
  .then(response => response.json())
  .then(data => {
    quizData = data.filter(q => !usedQuestions.includes(q.question)); // Ambil soal yang belum digunakan
    quizData = shuffleArray(quizData).slice(0, 10); // Acak & ambil 10 soal
    usedQuestions.push(...quizData.map(q => q.question)); // Simpan soal yang sudah digunakan
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions)); // Simpan di localStorage
    startQuiz();
  })
  .catch(error => console.error("Gagal mengambil data:", error));

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10; // Jumlah soal per sesi
let timerInterval;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

const resetLocalStorage = () => {
  localStorage.removeItem("usedQuestions"); // Reset semua soal
  window.location.reload(); // Reload halaman agar soal ter-reset
};

// Cek jawaban
const checkAnswer = (e) => {
  let userAnswer = e.target.innerHTML;
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

// Menampilkan soal baru
const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 59;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Time Left: 60 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2, "0")} seconds`;
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
  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

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

// Tampilkan popup hasil skor
const displayQuizResult = () => {
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector("#popup-score").style.display = "flex";

  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = `Kamu menjawab benar ${score} dari ${MAX_QUESTIONS} soal.`;

  document.getElementById("popup-ok").addEventListener("click", () => {
    document.querySelector("#popup-score").style.display = "none";
    document.querySelector(".quiz-result").style.display = "flex";
    showAnswerReview();
  });
};

// Menampilkan pembahasan jawaban
const showAnswerReview = () => {
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

  // Tombol untuk mengulang kuis
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Ulangi Kuis";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

// Mulai ulang kuis dengan soal yang belum pernah dikerjakan
const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  fetch("https://raw.githubusercontent.com/username/soal-kuis/main/quizData.json")
    .then(response => response.json())
    .then(data => {
      quizData = data.filter(q => !usedQuestions.includes(q.question)); // Ambil soal yang belum digunakan
      if (quizData.length < MAX_QUESTIONS) {
        alert("Semua soal telah dikerjakan! Mengulang dari awal.");
        resetLocalStorage(); // Reset jika semua soal sudah dipakai
      } else {
        quizData = shuffleArray(quizData).slice(0, 10); // Ambil 10 soal baru
        usedQuestions.push(...quizData.map(q => q.question)); // Simpan soal yang sudah digunakan
        localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions)); // Update localStorage
        startQuiz();
        quizResult.style.display = "none";
        quizContainer.style.display = "block";
      }
    })
    .catch(error => console.error("Gagal mengambil data:", error));
};

// Event listener tombol mulai
startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
});

// Event listener tombol next
nextBtn.addEventListener("click", () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
});
