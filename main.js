let quizData = [];
const MAX_QUESTIONS = 10; // Ambil 10 soal setiap sesi
let currentQuestions = [];
let questionNumber = 0;
let score = 0;
let timerInterval;

// **🔹 Ambil Soal dari GitHub JSON**
fetch("https://raw.githubusercontent.com/QuizSNBT/KuisSNBT/main/quizdata.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    startQuiz(); // **Mulai kuis setelah soal berhasil dimuat**
  })
  .catch(error => console.error("Gagal mengambil data:", error));

// **🔹 Acak Array**
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// **🔹 Mulai Kuis**
function startQuiz() {
  console.log("Soal berhasil dimuat:", quizData);

  if (quizData.length < MAX_QUESTIONS) {
    console.error("Jumlah soal di JSON kurang dari 10!");
    return;
  }

  currentQuestions = shuffleArray([...quizData]).slice(0, MAX_QUESTIONS);
  questionNumber = 0;
  score = 0;
  resetLocalStorage();
  createQuestion();
}

// **🔹 Reset Local Storage (Simpan Jawaban)**
const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

// **🔹 Tampilkan Soal**
const createQuestion = () => {
  clearInterval(timerInterval);

  if (questionNumber >= MAX_QUESTIONS) {
    displayQuizResult();
    return;
  }

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

  const questionEl = document.querySelector(".quiz-container .question");
  const optionsEl = document.querySelector(".quiz-container .options");
  
  questionEl.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${currentQuestions[questionNumber].question}`;
  optionsEl.innerHTML = "";

  shuffleArray(currentQuestions[questionNumber].options).forEach(optionText => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option");
    optionBtn.innerHTML = optionText;
    optionBtn.addEventListener("click", (e) => checkAnswer(e, optionText));
    optionsEl.appendChild(optionBtn);
  });
};

// **🔹 Cek Jawaban**
const checkAnswer = (e, userAnswer) => {
  if (userAnswer === currentQuestions[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
  document.querySelectorAll(".quiz-container .option").forEach(o => o.classList.add("disabled"));
};

// **🔹 Tampilkan Hasil**
const displayQuizResult = () => {
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector("#popup-score").style.display = "flex";

  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = `Kamu menjawab benar ${score} dari ${MAX_QUESTIONS} soal.`;

  document.getElementById("popup-ok").addEventListener("click", () => {
    document.querySelector("#popup-score").style.display = "none";
    showAnswerReview();
  });
};

// **🔹 Tampilkan Pembahasan Jawaban**
const showAnswerReview = () => {
  const quizResult = document.querySelector(".quiz-result");
  quizResult.innerHTML = "";
  quizResult.style.display = "flex";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Pembahasan Jawaban`;
  quizResult.appendChild(resultHeading);

  currentQuestions.forEach((question, i) => {
    const userAnswer = localStorage.getItem(`userAnswer_${i}`) || "Tidak Dijawab";
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    if (userAnswer !== question.correct) resultItem.classList.add("incorrect");

    resultItem.innerHTML = `
      <div class="question">Soal ${i + 1}: ${question.question}</div>
      <div class="user-answer">Jawaban Kamu: ${userAnswer}</div>
      <div class="correct-answer">Jawaban Benar: ${question.correct}</div>
    `;

    quizResult.appendChild(resultItem);
  });

  // Tombol ulangi kuis
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Ulangi Kuis";
  retakeBtn.addEventListener("click", startQuiz);
  quizResult.appendChild(retakeBtn);
};

// **🔹 Event Listener Tombol Start**
document.querySelector(".start-btn").addEventListener("click", () => {
  document.querySelector(".start-btn-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  document.querySelector(".donation-btn").style.display = "none"; // Sembunyikan tombol donasi
});

// **🔹 Event Listener Tombol Next**
document.querySelector(".next-btn").addEventListener("click", () => {
  questionNumber++;
  createQuestion();
});
