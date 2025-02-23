let quizData = [
  {
    question: "Gagasan utama paragraf pertama adalah ….",
    options: [
      "Kerusakan alam dan lingkungan hidup akibat ulah manusia",
      "Terancamnya eksistensi planet bumi akibat krisis lingkungan",
      "Adanya banjir tahunan akibat kerusakan lingkungan hidup",
      "Adanya krisis lingkungan dalam skala nasional dan global"
    ],
    correct: "Kerusakan alam dan lingkungan hidup akibat ulah manusia",
    explanation: "Gagasan utama paragraf tersebut ada pada kalimat pertama, yaitu 'kerusakan alam dan lingkungan hidup sebagai akibat ulah manusia'."
  },
  {
    question: "Penggunaan diksi yang tidak tepat terdapat pada kalimat ….",
    options: ["(1)", "(3)", "(4)", "(6)"],
    correct: "(3)",
    explanation: "Kata 'degradasi lahan' seharusnya diganti dengan 'degradasi lingkungan' karena lebih sesuai dalam konteks perusakan alam."
  },
  {
    question: "Kesalahan penggunaan tanda baca terdapat pada kalimat ….",
    options: ["(11)", "(12)", "(13)", "(14)"],
    correct: "(14)",
    explanation: "Seharusnya ada koma setelah kata 'Padahal' dalam kalimat (14), yaitu: 'Padahal, lahan dengan sumber dayanya berfungsi sebagai penyangga kehidupan…'"
  },
  {
    question: "Apakah penyebab utama terjadinya kerusakan lingkungan?",
    options: [
      "Manusia memandang alam sebagai bagian dari kehidupannya.",
      "Adanya kesalahan cara pandang manusia terhadap alam.",
      "Cara pandang seseorang memengaruhi perilakunya.",
      "Cara pandang manusia terhadap alam berbeda-beda."
    ],
    correct: "Adanya kesalahan cara pandang manusia terhadap alam.",
    explanation: "Dijelaskan dalam teks bahwa kesalahan cara pandang manusia tentang lingkungan berkontribusi besar terhadap kerusakan lingkungan."
  },
  {
    question: "Kalimat yang tidak efektif adalah kalimat ….",
    options: ["(1) dan (3)", "(2) dan (5)", "(6) dan (8)", "(5) dan (8)"],
    correct: "(5) dan (8)",
    explanation: "Kalimat (5) dan (8) tidak efektif karena tidak memiliki kesejajaran struktur dan redundansi kata."
  },
  {
    question: "Apa simpulan isi teks tersebut?",
    options: [
      "Kerusakan lingkungan selalu disebabkan oleh ulah manusia.",
      "Kerusakan alam dan lingkungan terjadi dalam lingkungan nasional dan global.",
      "Ada banyak faktor penyebab terjadinya kerusakan alam dan lingkungan.",
      "Krisis lingkungan sudah sampai mengancam eksistensi planet bumi."
    ],
    correct: "Kerusakan lingkungan selalu disebabkan oleh ulah manusia.",
    explanation: "Simpulan teks menunjukkan bahwa manusia menjadi faktor utama dalam kerusakan lingkungan."
  },
  {
    question: "Apa judul yang tepat untuk teks tentang kebiasaan membaca sejak dini?",
    options: [
      "Pengenalan Kebiasaan Membaca sejak Dini",
      "Balita dan Kebiasaan Mendengarkan Cerita",
      "Pembiasaan Anak dalam Mendengarkan Cerita",
      "Peningkatan Kinerja Otak melalui Membaca"
    ],
    correct: "Pengenalan Kebiasaan Membaca sejak Dini",
    explanation: "Judul yang paling menggambarkan isi teks adalah 'Pengenalan Kebiasaan Membaca sejak Dini'."
  },
  {
    question: "Kalimat yang TIDAK efektif dalam teks kebiasaan membaca adalah?",
    options: ["(1) dan (7)", "(2) dan (8)", "(3) dan (9)", "(4) dan (10)"],
    correct: "(4) dan (10)",
    explanation: "Kalimat (4) dan (10) tidak efektif karena struktur dan ejaan yang kurang tepat."
  },
  {
    question: "Bagaimana hubungan isi antarparagraf dalam teks membaca?",
    options: [
      "Paragraf ke-2 memaparkan simpulan penelitian yang dibahas pada paragraf ke-1.",
      "Paragraf ke-2 memerinci temuan penelitian yang dipaparkan pada paragraf ke-1.",
      "Paragraf ke-2 memaparkan perbedaan perilaku yang dibahas pada paragraf ke-1.",
      "Paragraf ke-1 memaparkan penelitian terhadap balita yang diuraikan pada paragraf ke-2."
    ],
    correct: "Paragraf ke-2 memerinci temuan penelitian yang dipaparkan pada paragraf ke-1.",
    explanation: "Paragraf kedua memberikan rincian lebih lanjut dari penelitian yang disebutkan di paragraf pertama."
  },
  {
    question: "Apa simpulan dari teks tentang kebiasaan membaca?",
    options: [
      "Anak-anak yang belajar membaca pada usia 3 – 5 tahun akan mempercepat perkembangan otaknya.",
      "Semakin awal kebiasaan membaca buku diperkenalkan, semakin aktif otak anak bekerja.",
      "Anak-anak yang mulai belajar membaca sejak balita akan menjadi anak-anak yang otak kirinya lebih aktif.",
      "Kebiasaan mendengarkan cerita dan membaca sejak usia balita berdampak positif untuk perkembangan otak."
    ],
    correct: "Kebiasaan mendengarkan cerita dan membaca sejak usia balita berdampak positif untuk perkembangan otak.",
    explanation: "Simpulan utama dari teks adalah dampak positif kebiasaan membaca terhadap perkembangan otak anak."
  }
];

// Fungsi untuk menampilkan soal
const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 10;
  const timerDisplay = document.querySelector(".quiz-container .timer");

  timerDisplay.textContent = `Time Left: ${secondsLeft} seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft} seconds`;
    secondsLeft--;

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `${quizData[questionNumber].question}`;

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

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  e.target.classList.add(userAnswer === quizData[questionNumber].correct ? "correct" : "incorrect");

  const explanation = document.createElement("p");
  explanation.textContent = `Pembahasan: ${quizData[questionNumber].explanation}`;
  options.appendChild(explanation);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => o.classList.add("disabled"));
};

nextBtn.addEventListener("click", () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    return;
  }
  questionNumber++;
  createQuestion();
});

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});
