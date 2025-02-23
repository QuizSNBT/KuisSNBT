let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 1; // Set ke jumlah soal yang diambil tiap sesi
let timerInterval;
let quizData = [];

// **Subtes A (30 Soal)**
const subtesA = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Surabaya", "Medan", "Makassar"],
    correct: "Jakarta"
  },
  // Tambahkan 29 soal lagi di sini...
];

// **Subtes B (1 Soal sebagai contoh)**
const subtesB = [

];

// **Fungsi Memulai Kuis berdasarkan subtes**
const startQuiz = (subtest) => {
  if (subtest === "A") {
    quizData = [...subtesA]; // Load soal subtes A
  } else {
    quizData = [...subtesB]; // Load soal subtes B
  }

  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData).slice(0, MAX_QUESTIONS); // Ambil 10 soal acak
  resetLocalStorage();

  document.querySelector(".start-btn-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";

  createQuestion();
};

// **Fungsi lainnya (Tidak berubah dari sebelumnya)**

// Acak array soal
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Hapus jawaban sebelumnya di localStorage
const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
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
  allOptions.forEach((o) => o.classList.add("disabled"));
};

// Menampilkan soal
const createQuestion = () => {
  clearInterval(timerInterval);

  if (questionNumber >= quizData.length) {
    displayQuizResult();
    return;
  }

  let question = document.querySelector(".quiz-container .question");
  let options = document.querySelector(".quiz-container .options");
  options.innerHTML = "";
  question.innerHTML = `${questionNumber + 1}. ${quizData[questionNumber].question}`;

  quizData[questionNumber].options.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => checkAnswer(e));
    options.appendChild(option);
  });
};

// Menampilkan hasil
const displayQuizResult = () => {
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector(".quiz-result").style.display = "block";
  document.querySelector(".quiz-result").innerHTML = `Kamu menjawab benar ${score} dari ${quizData.length} soal.`;
};

// Pindah ke soal berikutnya
document.querySelector(".quiz-container .next-btn").addEventListener("click", () => {
  questionNumber++;
  createQuestion();
});