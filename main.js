const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");

let selectedSubtest = [];
let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 20; // Jumlah soal per sesi

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const quizData = {
  pbm: [
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nIndonesia akan mengalami peningkatan pangsa pasar serta penambahan jumlah startup serta berbagai produk dan layanan baru berbasis digital pada 2020, terutama dalam kategori teknologi finansial. Banyak orang berfikir bahwa tren itu pun menyiapkan banyak lapangan pekerjaan tahun depan. Hal itu turut mendongkrak potensi kenaikan gaji para profesional di bidang teknologi dan digital bila pindah bekerja dalam industri yang sama tahun depan. Potensi kenaikannya bahkan hingga 50%.\n\nSurvei Michael Page Indonesia Salary Benchmark 2020 menyatat sebanyak 73% responden merasa positif tentang lapangan kerja yang tersedia. Berdasarkan laporan itu, peningkatan gaji saat pindah kerja bervariasi di setiap industri. Untuk mereka yang berpindah ke pekerjaan baru dalam industri yang sama di 2020, kenaikan gaji paling tinggi hingga 50% ditawarkan oleh industri digital dan teknologi, yang sejalan dengan pertumbuhan kedua sektor itu pada tiga tahun terakhir.\n\nPeningkatan itu disebabkan oleh bertambahnya permintaan akan sejumlah posisi di dalam industri tersebut, seperti di level pimpinan di bidang teknis (engineering), pengembangan usaha digital, penganalisa data, manajer pemasaran, dan manajer produk digital. Selain itu, terdapat tiga bidang yang paling banyak memberikan kesempatan pada pengembangan karier, [...] teknik (engineering), sales, dan marketing. Industri digital dan teknologi selalu mencari kandidat-kandidat yang berpotensi di bidang teknis dan manajer produk. Hal ini yang juga perlu diantisipasi oleh para kandidat.\n\nMemahami dinamika usaha sangatlah penting bagi semua orang yang terlibat di dalam industri. Perlu dicatat oleh para profesional di Indonesia bahwa lanjutan imeiniar soft skills juga sangat penting agar [...] pertimbangan utama dari para pemilik usaha atau pemberi kerja.\n\nSelain melaporkan adanya kenaikan gaji saat pindah kerja di dalam industri digital dan teknologi, Michael Page Indonesia Salary Benchmark 2020 juga melihat adanya kenaikan gaji di sektor lainnya. Profesional di dalam industri bisnis dan layanan keuangan serta dari industri konsumsi dan retail diharapkan adanya kenaikan gaji rata-rata hingga 25%, sementara industri properti dan konstruksi menawarkan kenaikan antara 20-35% lebih tinggi bagi pencari kerja dengan latar belakang pengalaman teknik sipil dan desain, sales di sektor real estate dan commercial estate, serta pemegang sertifikasi PMP (Project Management Professional).\n(Sumber: diadaptasi dari https://mediaindonesia.com/)\n\nJudul yang paling tepat untuk melengkapi bacaan di atas adalah ....",
      options: [
        "Peningkatan Pangsa Pasar di Indonesia pada Tahun 2020",
        "Penambahan Jumlah Lapangan Kerja di Sektor Digital dan Teknologi",
        "Peluang Kenaikan Lapangan Kerja 2020",
        "Kenaikan Gaji di Sektor Digital dan Teknologi",
      ],
      correct: "Penambahan Jumlah Lapangan Kerja di Sektor Digital dan Teknologi",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nIndonesia akan mengalami peningkatan pangsa pasar serta penambahan jumlah startup serta berbagai produk dan layanan baru berbasis digital pada 2020, terutama dalam kategori teknologi finansial. Banyak orang berfikir bahwa tren itu pun menyiapkan banyak lapangan pekerjaan tahun depan. Hal itu turut mendongkrak potensi kenaikan gaji para profesional di bidang teknologi dan digital bila pindah bekerja dalam industri yang sama tahun depan. Potensi kenaikannya bahkan hingga 50%.\n\nKata yang salah digunakan pada paragraf pertama adalah ....",
      options: ["digital", "berfikir", "mendongkrak", "menyiapkan"],
      correct: "berfikir",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nSurvei Michael Page Indonesia Salary Benchmark 2020 menyatat sebanyak 73% responden merasa positif tentang lapangan kerja yang tersedia. Berdasarkan laporan itu, peningkatan gaji saat pindah kerja bervariasi di setiap industri. Untuk mereka yang berpindah ke pekerjaan baru dalam industri yang sama di 2020, kenaikan gaji paling tinggi hingga 50% ditawarkan oleh industri digital dan teknologi, yang sejalan dengan pertumbuhan kedua sektor itu pada tiga tahun terakhir.\n\nKata berimbuhan yang tidak tepat pada paragraf kedua adalah ....",
      options: ["menyatat", "bervariasi", "peningkatan", "kenaikan"],
      correct: "menyatat",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nPeningkatan itu disebabkan oleh bertambahnya permintaan akan sejumlah posisi di dalam industri tersebut, seperti di level pimpinan di bidang teknis (engineering), pengembangan usaha digital, penganalisa data, manajer pemasaran, dan manajer produk digital. Selain itu, terdapat tiga bidang yang paling banyak memberikan kesempatan pada pengembangan karier, [...] teknik (engineering), sales, dan marketing. Industri digital dan teknologi selalu mencari kandidat-kandidat yang berpotensi di bidang teknis dan manajer produk. Hal ini yang juga perlu diantisipasi oleh para kandidat.\n\nKata berimbuhan yang tidak tepat pada paragraf ketiga adalah ....",
      options: ["permintaan", "pengembangan", "penganalisa", "memberikan"],
      correct: "penganalisa",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nMemahami dinamika usaha sangatlah penting bagi semua orang yang terlibat di dalam industri. Perlu dicatat oleh para profesional di Indonesia bahwa lanjutan imeiniar soft skills juga sangat penting agar [...] pertimbangan utama dari para pemilik usaha atau pemberi kerja.\n\nKata yang paling tepat untuk melengkapi titik-titik pada kalimat kedua paragraf ketiga adalah ....",
      options: ["yaitu", "membuat", "memikirkan", "menjadi"],
      correct: "yaitu",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 1 sampai 7!\n\nSelain melaporkan adanya kenaikan gaji saat pindah kerja di dalam industri digital dan teknologi, Michael Page Indonesia Salary Benchmark 2020 juga melihat adanya kenaikan gaji di sektor lainnya. Profesional di dalam industri bisnis dan layanan keuangan serta dari industri konsumsi dan retail diharapkan adanya kenaikan gaji rata-rata hingga 25%, sementara industri properti dan konstruksi menawarkan kenaikan antara 20-35% lebih tinggi bagi pencari kerja dengan latar belakang pengalaman teknik sipil dan desain, sales di sektor real estate dan commercial estate, serta pemegang sertifikasi PMP (Project Management Professional).\n\nKata berimbuhan yang salah pada paragraf kelima adalah ....",
      options: ["melaporkan", "diharapkan", "adanya", "menawarkan"],
      correct: "diharapkan",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 8 sampai 14!\n\nMisi penyelidikan matahari yang dilakukan wahana penjelajah Parker berhasil mengumpulkan sejumlah data penting. Wahana yang dikirim NASA pada Agustus 2018 itu mengumpulkan sejumlah data menggunakan instrumen ilmiah (9) mutahir dari jarak 15 juta mil. Apa yang dilakukan NASA dengan wahana penjelajah Parker tercatat sebagai teknologi bikinan manusia yang berada sangat dekat dengan matahari. Kini, ilmuwan mulai (10) terilis temuan apa saja yang diperoleh wahana Parker.\n\nData yang diterbitkan dalam 4 makalah di jurnal Nature mengungkap, bagaimana memahami cara bintang lahir, berevolusi, mati, serta pemahaman mengenai matahari itu sendiri. Ada beberapa temuan dari data yang dihasilkan wahana penjelajah Parker bahwa matahari menghasilkan angin matahari yang terus-menerus membombardir medan magnet Bumi. Terkadang, angin tersebut mengakibatkan gangguan (11) kepada sistem satelit dan komunikasi. Hal ini memberi pemahaman yang lebih baik terkait bagaimana angin matahari dihasilkan. Ini juga dapat membantu para peneliti menemukan cara untuk melindungi Bumi dari badai matahari di masa depan.\n\nPengamatan (12) menunjukkan kalau angin matahari berasal dari lubang besar di korona. Namun, bagaimana proses (13) pembentukkannya, para ahli pun belum mengetahuinya dan memerlukan studi lebih lanjut. Selain itu, Justin Kasper, peneliti dari University of Michigan mengungkap bahwa angin matahari berputar mengelilingi matahari dengan kecepatan hampir sepuluh kali lebih... 4 besar dari yang diperkirakan. Temuan lain yang (14) mengejutkan adalah mengenai perilaku aneh medan magnet yang memancar dari matahari. Medan magnet itu tiba-tiba berputar bolak-balik.\n(Sumber: diadaptasi dari https://sains.kompas.com/)\n\nJudul yang tepat untuk bacaan tersebut adalah ....",
      options: ["Misi NASA Sentuh Matahari", "Misi Penyelidikan Satelit NASA", "Penelitian Unsur Inti Matahari", "Wahana Penjelajah Parker"],
      correct: "Wahana Penjelajah Parker",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 8 sampai 14!\n\nMisi penyelidikan matahari yang dilakukan wahana penjelajah Parker berhasil mengumpulkan sejumlah data penting. Wahana yang dikirim NASA pada Agustus 2018 itu mengumpulkan sejumlah data menggunakan instrumen ilmiah (9) mutahir dari jarak 15 juta mil. Apa yang dilakukan NASA dengan wahana penjelajah Parker tercatat sebagai teknologi bikinan manusia yang berada sangat dekat dengan matahari. Kini, ilmuwan mulai (10) terilis temuan apa saja yang diperoleh wahana Parker.\n\nInstrumen ilmiah (9) ....",
      options: ["TIDAK PERLU DIPERBAIKI", "“mutahir”", "mutahir", "mutakhir"],
      correct: "mutakhir",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 8 sampai 14!\n\nMisi penyelidikan matahari yang dilakukan wahana penjelajah Parker berhasil mengumpulkan sejumlah data penting. Wahana yang dikirim NASA pada Agustus 2018 itu mengumpulkan sejumlah data menggunakan instrumen ilmiah (9) mutahir dari jarak 15 juta mil. Apa yang dilakukan NASA dengan wahana penjelajah Parker tercatat sebagai teknologi bikinan manusia yang berada sangat dekat dengan matahari. Kini, ilmuwan mulai (10) terilis temuan apa saja yang diperoleh wahana Parker.\n\nKini, ilmuwan mulai (10) ....",
      options: ["TIDAK PERLU DIPERBAIKI", "merilis", "dirilis", "perilisan"],
      correct: "merilis",
    },
    {
      question: "Teks berikut untuk menjawab soal nomor 8 sampai 14!\n\nData yang diterbitkan dalam 4 makalah di jurnal Nature mengungkap, bagaimana memahami cara bintang lahir, berevolusi, mati, serta pemahaman mengenai matahari itu sendiri. Ada beberapa temuan dari data yang dihasilkan wahana penjelajah Parker bahwa matahari menghasilkan angin matahari yang terus-menerus membombardir medan magnet Bumi. Terkadang, angin tersebut mengakibatkan gangguan (11) kepada sistem satelit dan komunikasi. Hal ini memberi pemahaman yang lebih baik terkait bagaimana angin matahari dihasilkan. Ini juga dapat membantu para peneliti menemukan cara untuk melindungi Bumi dari badai matahari di masa depan.\n\nTerkaadang, angin tersebut mengakibatkan gangguan (11) ....",
      options: ["TIDAK PERLU DIPERBAIKI", "untuk", "atas", "pada"],
      correct: "pada",
    },
    {
      question: "Pilihlah kata yang paling tepat untuk melengkapi kalimat berikut: Meskipun hujan deras, ... anak-anak tetap bermain di lapangan.",
      options: ["namun", "tetapi", "sehingga", "karena"],
      correct: "tetapi",
    },
    {
      question: "Mana yang bukan merupakan kalimat efektif?",
      options: ["Saya pergi ke pasar membeli sayur.", "Saya pergi ke pasar untuk membeli sayur.", "Saya akan pergi ke pasar untuk membeli sayur.", "Saya sudah pergi ke pasar untuk membeli sayur."],
      correct: "Saya pergi ke pasar membeli sayur.",
    },
    {
      question: "Antonim dari kata 'maju' adalah...",
      options: ["berkembang", "mundur", "meningkat", "pesat"],
      correct: "mundur",
    },
    {
      question: "Sinonim dari kata 'bahagia' adalah...",
      options: ["sedih", "gembira", "marah", "kecewa"],
      correct: "gembira",
    },
    {
      question: "Peribahasa yang tepat untuk menggambarkan situasi 'sudah jatuh tertimpa tangga' adalah...",
      options: ["air beriak tanda tak dalam", "bagai air di daun talas", "habis manis sepah dibuang", "sudah jatuh tertimpa tangga"],
      correct: "sudah jatuh tertimpa tangga",
    },
    {
      question: "Pilihlah kalimat yang menggunakan tanda baca yang tepat.",
      options: ["Siapa nama mu?", "Siapa namamu?", "Siapa, namamu?", "Siapa nama, mu?"],
      correct: "Siapa namamu?",
    },
    {
      question: "Apa perbedaan antara 'daripada' dan 'dari pada'?",
      options: ["Tidak ada perbedaan", "'daripada' untuk perbandingan, 'dari pada' untuk tempat", "'daripada' untuk tempat, 'dari pada' untuk perbandingan", "Keduanya bisa digunakan secara bergantian"],
      correct: "'daripada' untuk perbandingan, 'dari pada' untuk tempat",
    },
    {
      question: "Pilihlah kata yang tepat untuk mengisi titik-titik: ... dia tidak datang, acara tetap berlangsung meriah.",
      options: ["Karena", "Meskipun", "Sehingga", "Akibatnya"],
      correct: "Meskipun",
    },
    {
      question: "Tentukan ide pokok dari paragraf berikut: Teknologi semakin berkembang pesat. Hal ini membawa dampak positif dan negatif bagi kehidupan manusia. Oleh karena itu, kita harus bijak dalam menggunakan teknologi.",
      options: ["Perkembangan teknologi", "Dampak positif teknologi", "Dampak negatif teknologi", "Bijak menggunakan teknologi"],
      correct: "Perkembangan teknologi",
    },
  ],
  pu: [
    {
      question: "Berapa hasil dari 8 × 7?",
      options: ["49", "54", "56", "64"],
      correct: "56",
    },
    {
      question: "Jika x = 5 dan y = 3, berapakah x² + y²?",
      options: ["25", "34", "50", "28"],
      correct: "34",
    },
    {
      question: "Semua kucing adalah mamalia. Sebagian mamalia adalah hewan peliharaan. Kesimpulan yang tepat adalah...",
      options: ["Semua kucing adalah hewan peliharaan", "Sebagian kucing adalah hewan peliharaan", "Semua hewan peliharaan adalah kucing", "Tidak ada kesimpulan yang pasti"],
      correct: "Tidak ada kesimpulan yang pasti",
    },
    {
      question: "Jika A > B dan C < B, maka...",
      options: ["A > C", "A < C", "A = C", "Tidak dapat ditentukan"],
      correct: "A > C",
    },
    {
      question: "Sebuah toko memberikan diskon 20% untuk semua barang. Jika harga sebuah baju sebelum diskon adalah Rp150.000, berapa harga baju setelah diskon?",
      options: ["Rp120.000", "Rp130.000", "Rp110.000", "Rp100.000"],
      correct: "Rp120.000",
    },
    {
      question: "Jika semua X adalah Y, dan tidak ada Y yang Z, maka...",
      options: ["Semua X adalah Z", "Tidak ada X yang Z", "Beberapa X adalah Z", "Beberapa X bukan Z"],
      correct: "Tidak ada X yang Z",
    },
    {
      question: "Urutan angka berikut: 2, 6, 12, 20, ... Angka selanjutnya adalah...",
      options: ["24", "28", "30", "32"],
      correct: "30",
    },
    {
      question: "Jika seorang pelari berlari dengan kecepatan 10 km/jam, berapa lama waktu yang dibutuhkan untuk menempuh jarak 5 km?",
      options: ["15 menit", "20 menit", "30 menit", "45 menit"],
      correct: "30 menit",
    },
    {
      question: "Semua siswa kelas A lulus ujian. Beberapa siswa kelas A mendapatkan beasiswa. Maka...",
      options: ["Semua siswa yang lulus ujian mendapatkan beasiswa", "Beberapa siswa yang lulus ujian mendapatkan beasiswa", "Tidak ada siswa yang lulus ujian mendapatkan beasiswa", "Semua siswa kelas A tidak mendapatkan beasiswa"],
      correct: "Beberapa siswa yang lulus ujian mendapatkan beasiswa",
    },
    {
      question: "Jika hari ini adalah hari Senin, maka 10 hari lagi adalah hari...",
      options: ["Selasa", "Rabu", "Kamis", "Jumat"],
      correct: "Rabu",
    },
    {
      question: "Modus Ponens: Jika P maka Q. P benar. Maka...",
      options: ["Q benar", "Q salah", "P salah", "Tidak dapat ditentukan"],
      correct: "Q benar",
    },
    {
      question: "Modus Tollens: Jika P maka Q. Q salah. Maka...",
      options: ["P benar", "P salah", "Q benar", "Tidak dapat ditentukan"],
      correct: "P salah",
    },
    {
      question: "Jika semua burung bisa terbang dan penguin adalah burung, maka...",
      options: ["Penguin bisa terbang", "Penguin tidak bisa terbang", "Semua penguin bisa terbang", "Tidak dapat ditentukan"],
      correct: "Penguin bisa terbang",
    },
    {
      question: "Jika x adalah bilangan genap dan y adalah bilangan ganjil, mana yang selalu benar?",
      options: ["x + y adalah genap", "x + y adalah ganjil", "x * y adalah ganjil", "x / y adalah genap"],
      correct: "x + y adalah ganjil",
    },
    {
      question: "Sebuah bus berangkat dari kota A pukul 08:00 dan tiba di kota B pukul 11:00. Jika jarak antara kota A dan B adalah 150 km, berapa kecepatan rata-rata bus?",
      options: ["40 km/jam", "50 km/jam", "60 km/jam", "70 km/jam"],
      correct: "50 km/jam",
    },
    {
      question: "Jika A adalah ayah dari B dan B adalah ibu dari C, maka A adalah ... dari C",
      options: ["Kakek", "Nenek", "Paman", "Bibi"],
      correct: "Kakek",
    },
    {
      question: "Jika semua mahasiswa memakai jaket dan Andi adalah mahasiswa, maka...",
      options: ["Andi pasti memakai topi", "Andi pasti memakai jaket", "Andi mungkin tidak memakai jaket", "Tidak ada kesimpulan yang pasti"],
      correct: "Andi pasti memakai jaket",
    },
    {
      question: "Seorang pedagang membeli 10 kg apel dengan harga Rp20.000/kg. Jika ia menjualnya dengan harga Rp25.000/kg, berapa keuntungannya?",
      options: ["Rp25.000", "Rp50.000", "Rp75.000", "Rp100.000"],
      correct: "Rp50.000",
    },
    {
      question: "Jika P -> Q bernilai benar, dan P bernilai salah, maka Q...",
      options: ["Pasti benar", "Pasti salah", "Bisa benar atau salah", "Tidak dapat ditentukan"],
      correct: "Bisa benar atau salah",
    },
    {
      question: "Jika setiap hari hujan, maka jalanan basah. Hari ini jalanan tidak basah, maka...",
      options: ["Setiap hari hujan", "Hari ini tidak hujan", "Mungkin hari ini hujan", "Tidak dapat disimpulkan"],
      correct: "Hari ini tidak hujan",
    },
  ],
};

const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

const checkAnswer = (e) => {
  let userAnswer = e.target.innerHTML;
  if (userAnswer === selectedSubtest[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
  document.querySelectorAll(".quiz-container .option").forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  if (questionNumber >= selectedSubtest.length) {
    displayQuizResult();
    return;
  }

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${questionNumber +
    1}/${MAX_QUESTIONS}</span> ${selectedSubtest[questionNumber].question}`;

  shuffleArray(selectedSubtest[questionNumber].options).forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", checkAnswer);
    options.appendChild(option);
  });
};

const displayQuizResult = () => {
  quizContainer.style.display = "none";
  quizResult.style.display = "block";
  quizResult.innerHTML = `<h2>Skor Kamu: ${score} dari ${MAX_QUESTIONS}</h2>`;

  selectedSubtest.forEach((q, i) => {
    const userAnswer = localStorage.getItem(`userAnswer_${i}`) || "Tidak Dijawab";
    const correctAnswer = q.correct;
    const isCorrect = userAnswer === correctAnswer;

    quizResult.innerHTML += `
      <div class="question-container ${isCorrect ? "correct" : "incorrect"}">
        <div class="question">${i + 1}. ${q.question}</div>
        <div class="user-answer">Jawaban Kamu: ${userAnswer}</div>
        <div class="correct-answer">Jawaban Benar: ${correctAnswer}</div>
      </div>
    `;
  });

let timer;
let timeLeft = 60;

const startTimer = () => {
  clearInterval(timer); // Reset timer jika sebelumnya ada
  timeLeft = 60;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      displayNextQuestion(); // Otomatis lanjut ke soal berikutnya jika waktu habis
    }
  }, 1000);
};

const updateTimerDisplay = () => {
  const timerDisplay = document.querySelector(".timer");
  if (timerDisplay) {
    timerDisplay.textContent = `Waktu tersisa: ${timeLeft}s`;
    timerDisplay.style.color = timeLeft <= 5 ? "red" : "black"; // Ubah warna ke merah saat <5 detik
  }
};

// Perbaiki createQuestion agar selalu memulai timer baru
const createQuestion = () => {
  if (questionNumber >= selectedSubtest.length) {
    displayQuizResult();
    return;
  }

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span> ${selectedSubtest[questionNumber].question}`;

  shuffleArray(selectedSubtest[questionNumber].options).forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", checkAnswer);
    options.appendChild(option);
  });

  startTimer(); // Selalu mulai ulang timer saat soal baru muncul
};

const displayNextQuestion = () => {
  if (questionNumber < selectedSubtest.length - 1) {
    questionNumber++;
    createQuestion();
  } else {
    displayQuizResult();
  }
};
  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Ulangi Kuis";
  retakeBtn.addEventListener("click", () => location.reload());
  quizResult.appendChild(retakeBtn);
};

function openSubtestPopup() {
  document.getElementById("subtest-popup").classList.add("show");
}

function closeSubtestPopup() {
  document.getElementById("subtest-popup").classList.remove("show");
}

function startQuiz(subtest) {
  selectedSubtest = shuffleArray([...quizData[subtest]]).slice(0, MAX_QUESTIONS);
  questionNumber = 0;
  score = 0;

  startBtnContainer.style.display = "none";
  document.getElementById("subtest-popup").classList.remove("show");
  quizContainer.style.display = "block";

  createQuestion();
}

nextBtn.addEventListener("click", () => {
  if (questionNumber < selectedSubtest.length - 1) {
    questionNumber++;
    createQuestion();
  } else {
    displayQuizResult();
  }
});

