/**
 * Konten statis situs. Saat backend siap, ganti sumber data ini dengan
 * pemanggilan API/CMS tanpa mengubah komponen tampilan.
 * Teks dalam [kurung siku] adalah placeholder yang perlu diisi data resmi.
 * Setiap teks yang tampil ke pengunjung ditulis dwibahasa: { id: 'Indonesia', en: 'English' }.
 */

import type { Bi } from './i18n';

export type IconKey = 'book' | 'heart' | 'sprout';

export type Program = { name: string; short: Bi; long: Bi; target: Bi; featured?: boolean };

export type Pillar = {
  id: 'pendidikan' | 'sosial' | 'lingkungan';
  no: string;
  title: Bi;
  desc: Bi;
  longDesc: Bi;
  answers: Bi;
  icon: IconKey;
  programs: Program[];
};

export const pillars: Pillar[] = [
  {
    id: 'pendidikan',
    no: '01',
    title: { id: 'Pendidikan & Kapasitas', en: 'Education & Capacity' },
    desc: {
      id: 'Membuka akses belajar bagi siswa prasejahtera dan mengasah kapasitas pemuda.',
      en: 'Opening access to learning for low-income students and building the capacity of young people.',
    },
    longDesc: {
      id: 'Membuka akses belajar bagi siswa prasejahtera, sekaligus mengasah kapasitas pemuda agar siap memimpin.',
      en: 'Opening access to learning for low-income students while building young people’s capacity to lead.',
    },
    answers: { id: 'kemiskinan & putus sekolah', en: 'poverty & school dropout' },
    icon: 'book',
    programs: [
      {
        name: 'ThreeL Mengajar',
        short: {
          id: 'Bimbingan belajar gratis bagi siswa prasejahtera, didanai model subsidi silang.',
          en: 'Free tutoring for low-income students, funded by a cross-subsidy model.',
        },
        long: {
          id: 'Bimbingan belajar gratis bagi siswa prasejahtera. Biayanya ditopang kelas persiapan PTN dan materi TPB ITB berbayar melalui model subsidi silang.',
          en: 'Free tutoring for low-income students. Its costs are covered by paid university entrance prep classes and ITB first-year (TPB) courses through a cross-subsidy model.',
        },
        target: {
          id: 'Siswa SMA prasejahtera (gratis); siswa dan mahasiswa tingkat awal (berbayar)',
          en: 'Low-income high school students (free), plus students and first-year undergraduates (paid)',
        },
        featured: true,
      },
      {
        name: 'ThreeL Mengasah',
        short: {
          id: 'Pelatihan keterampilan, kepemimpinan, dan teknologi untuk pemuda.',
          en: 'Skills, leadership, and technology training for young people.',
        },
        long: {
          id: 'Pelatihan keterampilan, kepemimpinan, dan teknologi. Membentuk pemuda yang siap memimpin aksi di lapangan.',
          en: 'Skills, leadership, and technology training that prepares young people to lead action in the field.',
        },
        target: { id: 'Anggota ThreeL, pelajar, dan mahasiswa', en: 'ThreeL members, high school and university students' },
      },
    ],
  },
  {
    id: 'sosial',
    no: '02',
    title: { id: 'Aksi Sosial & Kesehatan', en: 'Social Action & Health' },
    desc: {
      id: 'Aksi langsung untuk kebutuhan mendesak masyarakat dan kesehatan remaja.',
      en: 'Direct action for urgent community needs and adolescent health.',
    },
    longDesc: {
      id: 'Aksi langsung untuk kebutuhan mendesak masyarakat, kesehatan remaja, dan ketersediaan darah.',
      en: 'Direct action for urgent community needs, adolescent health, and blood supply.',
    },
    answers: { id: 'krisis kesehatan mental & fisik remaja', en: 'the adolescent mental & physical health crisis' },
    icon: 'heart',
    programs: [
      {
        name: 'ThreeL Hope',
        short: { id: 'Kampanye dan pendampingan kesehatan mental remaja.', en: 'Adolescent mental health campaigns and support.' },
        long: {
          id: 'Kampanye dan pendampingan kesehatan mental remaja. Membuka ruang aman untuk bercerita dan mencari bantuan.',
          en: 'Adolescent mental health campaigns and support, creating safe spaces to talk and seek help.',
        },
        target: { id: 'Remaja usia sekolah', en: 'School-age adolescents' },
      },
      {
        name: 'ThreeL Berbagi',
        short: { id: 'Penyaluran kebutuhan pokok dan perlengkapan sekolah.', en: 'Distribution of basic necessities and school supplies.' },
        long: {
          id: 'Penyaluran kebutuhan pokok dan perlengkapan sekolah, berbasis pendataan penerima manfaat.',
          en: 'Distribution of basic necessities and school supplies, based on beneficiary data collection.',
        },
        target: { id: 'Keluarga prasejahtera', en: 'Low-income families' },
      },
      {
        name: 'ThreeL Blood',
        short: { id: 'Donor darah rutin bersama PMI dan rumah sakit mitra.', en: 'Regular blood drives with PMI and partner hospitals.' },
        long: {
          id: 'Donor darah rutin bersama PMI dan rumah sakit mitra untuk menjaga ketersediaan stok darah.',
          en: 'Regular blood drives with PMI (Indonesian Red Cross) and partner hospitals to keep blood supplies available.',
        },
        target: { id: 'Pendonor umum dan relawan', en: 'Public donors and volunteers' },
      },
      {
        name: 'Society Impact',
        short: { id: 'Proyek pemberdayaan berbasis kebutuhan desa binaan.', en: 'Empowerment projects based on the needs of partner villages.' },
        long: {
          id: 'Proyek pemberdayaan berbasis kebutuhan desa binaan, dirancang bersama warga agar berkelanjutan.',
          en: 'Empowerment projects based on the needs of partner villages, designed with residents to be sustainable.',
        },
        target: { id: 'Masyarakat desa binaan', en: 'Partner village communities' },
      },
    ],
  },
  {
    id: 'lingkungan',
    no: '03',
    title: { id: 'Lingkungan & Literasi', en: 'Environment & Literacy' },
    desc: {
      id: 'Menumbuhkan kepedulian lingkungan dan budaya literasi sejak dini.',
      en: 'Growing environmental awareness and a reading culture from an early age.',
    },
    longDesc: {
      id: 'Menumbuhkan kepedulian lingkungan, ketahanan pangan kota, dan budaya literasi sejak dini.',
      en: 'Growing environmental awareness, urban food resilience, and a reading culture from an early age.',
    },
    answers: { id: 'kebutuhan transisi energi', en: 'the need for an energy transition' },
    icon: 'sprout',
    programs: [
      {
        name: 'ThreeL Berakar',
        short: { id: 'Pertanian kota dan penghijauan lingkungan.', en: 'Urban farming and greening.' },
        long: {
          id: 'Pertanian kota dan penghijauan. Mengubah lahan sempit menjadi sumber pangan dan ruang belajar.',
          en: 'Urban farming and greening that turns small plots of land into food sources and learning spaces.',
        },
        target: { id: 'Warga perkotaan dan sekolah', en: 'City residents and schools' },
      },
      {
        name: 'ThreeL Bertumbuh',
        short: {
          id: 'Edukasi lingkungan dan literasi hijau untuk anak dan remaja.',
          en: 'Environmental education and green literacy for children and teens.',
        },
        long: {
          id: 'Edukasi lingkungan dan literasi hijau, termasuk pengenalan energi terbarukan untuk anak dan remaja.',
          en: 'Environmental education and green literacy, including an introduction to renewable energy for children and teens.',
        },
        target: { id: 'Anak dan remaja', en: 'Children and teens' },
      },
      {
        name: 'ThreeL Berkelana',
        short: {
          id: 'Jelajah literasi ke daerah yang minim akses bacaan.',
          en: 'Literacy trips to areas with little access to books.',
        },
        long: {
          id: 'Jelajah literasi ke daerah: membawa buku dan kegiatan membaca ke komunitas yang minim akses bacaan.',
          en: 'Literacy trips that bring books and reading activities to communities with little access to reading material.',
        },
        target: { id: 'Anak di daerah dengan akses bacaan terbatas', en: 'Children in areas with limited access to books' },
      },
    ],
  },
];

/**
 * Lima program unggulan untuk carousel halaman Program. Foto dan kreditnya:
 * public/images/program/CREDITS.md.
 */
export type FeaturedProgram = {
  slug: string;
  name: string;
  pillar: Pillar['id'];
  photo: string;
  tagline: Bi;
  story: Bi[];
  target: Bi;
  /** Kredit foto yang lisensinya mewajibkan atribusi tampil di halaman. */
  credit?: string;
};

export const featuredPrograms: FeaturedProgram[] = [
  {
    slug: 'mengasah',
    name: 'ThreeL Mengasah',
    pillar: 'pendidikan',
    photo: '/images/program/mengasah.webp',
    tagline: { id: 'Pemuda yang siap memimpin aksi', en: 'Young people ready to lead action' },
    story: [
      {
        id: 'Niat baik saja tidak cukup untuk menggerakkan perubahan. Di ThreeL Mengasah, pemuda belajar hal-hal yang jarang diajarkan di kelas: memimpin rapat, menyusun rencana program, membaca data lapangan, dan memakai teknologi untuk bekerja lebih rapi.',
        en: 'Good intentions alone do not move change. In ThreeL Mengasah, young people learn what classrooms rarely teach: running a meeting, planning a program, reading field data, and using technology to work better.',
      },
      {
        id: 'Pelatihannya dibuat praktis. Peserta langsung mencoba apa yang dipelajari di program ThreeL lainnya, sehingga setiap sesi berujung pada orang-orang yang siap turun ke lapangan.',
        en: 'The training is hands-on. Participants put what they learn to work in other ThreeL programs, so every session ends with people ready to go into the field.',
      },
    ],
    target: { id: 'Anggota ThreeL, pelajar, dan mahasiswa', en: 'ThreeL members, high school and university students' },
  },
  {
    slug: 'hope',
    name: 'ThreeL Hope',
    pillar: 'sosial',
    photo: '/images/program/hope.webp',
    tagline: { id: 'Ruang aman untuk bercerita', en: 'A safe space to talk' },
    story: [
      {
        id: 'Banyak remaja memendam beban sendirian karena tidak tahu harus bercerita ke siapa. ThreeL Hope hadir untuk mengubah itu, lewat kampanye yang membuat kesehatan mental tidak lagi tabu dibicarakan di sekolah.',
        en: 'Many teenagers carry their burdens alone because they do not know who to talk to. ThreeL Hope exists to change that, with campaigns that make mental health something schools can talk about openly.',
      },
      {
        id: 'Selain kampanye, kami membuka ruang aman untuk bercerita dan membantu remaja menemukan jalur bantuan yang tepat ketika mereka membutuhkannya.',
        en: 'Beyond campaigns, we open safe spaces to talk and help teenagers find the right support when they need it.',
      },
    ],
    target: { id: 'Remaja usia sekolah', en: 'School-age adolescents' },
  },
  {
    slug: 'blood',
    name: 'ThreeL Blood',
    pillar: 'sosial',
    photo: '/images/program/blood.webp',
    tagline: { id: 'Setetes darah, satu nyawa', en: 'One donation, one life' },
    story: [
      {
        id: 'Stok darah sering menipis justru saat paling dibutuhkan. Lewat ThreeL Blood, kami menggelar donor darah rutin bersama PMI dan rumah sakit mitra supaya pasien tidak perlu menunggu.',
        en: 'Blood supplies often run low exactly when they are needed most. Through ThreeL Blood, we hold regular blood drives with PMI (Indonesian Red Cross) and partner hospitals so patients do not have to wait.',
      },
      {
        id: 'Relawan ThreeL mengurus semuanya, dari mengajak pendonor baru sampai mendampingi mereka di hari kegiatan. Banyak yang datang sekali, lalu kembali lagi di kegiatan berikutnya.',
        en: 'ThreeL volunteers handle everything, from inviting new donors to accompanying them on the day. Many come once and return for the next drive.',
      },
    ],
    target: { id: 'Pendonor umum dan relawan', en: 'Public donors and volunteers' },
  },
  {
    slug: 'berakar',
    name: 'ThreeL Berakar',
    pillar: 'lingkungan',
    photo: '/images/program/berakar.webp',
    tagline: { id: 'Menanam pangan di tengah kota', en: 'Growing food in the city' },
    story: [
      {
        id: 'Lahan sempit di kota bukan alasan untuk tidak menanam. ThreeL Berakar mengajak warga dan sekolah mengubah halaman, atap, dan sudut kosong menjadi kebun kecil yang menghasilkan pangan.',
        en: 'Small urban plots are no excuse not to grow. ThreeL Berakar invites residents and schools to turn yards, rooftops, and empty corners into small gardens that produce food.',
      },
      {
        id: 'Kebun ini juga menjadi ruang belajar. Anak-anak melihat sendiri bagaimana sayur tumbuh, dan warga punya alasan baru untuk berkumpul dan merawat lingkungannya bersama.',
        en: 'These gardens double as classrooms. Children see for themselves how vegetables grow, and neighbours gain a new reason to gather and care for their surroundings together.',
      },
    ],
    target: { id: 'Warga perkotaan dan sekolah', en: 'City residents and schools' },
  },
  {
    slug: 'berkelana',
    name: 'ThreeL Berkelana',
    pillar: 'lingkungan',
    photo: '/images/program/berkelana.webp',
    tagline: { id: 'Membawa buku sampai ke pelosok', en: 'Bringing books to remote places' },
    story: [
      {
        id: 'Di banyak daerah, buku bacaan anak masih sulit ditemukan. ThreeL Berkelana membawa buku dan kegiatan membaca langsung ke komunitas yang jauh dari perpustakaan dan toko buku.',
        en: 'In many areas, children’s books are still hard to find. ThreeL Berkelana brings books and reading activities straight to communities far from libraries and bookshops.',
      },
      {
        id: 'Relawan membacakan cerita, menemani anak-anak membaca, dan meninggalkan buku agar kebiasaan itu terus berjalan setelah kami pulang.',
        en: 'Volunteers read stories aloud, read alongside the children, and leave books behind so the habit continues after we leave.',
      },
    ],
    target: { id: 'Anak di daerah dengan akses bacaan terbatas', en: 'Children in areas with limited access to books' },
  },
];

/**
 * Konteks masalah di beranda. Angka diperbarui September 2026; setiap angka punya sumber
 * yang bisa dibuka pengunjung di tampilan lengkap. Teks di dalam **dua bintang** ditebalkan.
 */
export type ProblemTone = 'brand' | 'gold' | 'rose';

export type Problem = {
  no: string;
  tone: ProblemTone;
  label: Bi;
  value: Bi;
  statement: Bi;
  photo: string;
  intro: Bi;
  points: Bi[];
  sources: { label: string; url: string }[];
};

export const problems: Problem[] = [
  {
    no: '01',
    tone: 'brand',
    photo: '/images/konteks/kemiskinan.webp',
    label: { id: 'Kemiskinan & Putus Sekolah', en: 'Poverty & School Dropout' },
    value: { id: '8,07%', en: '8.07%' },
    statement: {
      id: 'penduduk Indonesia masih hidup di bawah garis kemiskinan.',
      en: 'of Indonesians still live below the poverty line.',
    },
    intro: {
      id: 'Angka kemiskinan memang terus turun. Namun di balik penurunan itu, jutaan anak masih tumbuh di keluarga yang harus memilih antara biaya sekolah dan kebutuhan sehari-hari.',
      en: 'Poverty keeps falling. Yet behind that decline, millions of children still grow up in families forced to choose between school fees and daily needs.',
    },
    points: [
      {
        id: 'Per Maret 2026 masih ada **22,93 juta orang** yang hidup di bawah garis kemiskinan.',
        en: 'As of March 2026, **22.93 million people** still live below the poverty line.',
      },
      {
        id: 'Desa jauh tertinggal: tingkat kemiskinannya **10,67%**, hampir dua kali lipat kota yang **6,34%**.',
        en: 'Villages lag far behind: their poverty rate is **10.67%**, nearly double the **6.34%** in cities.',
      },
      {
        id: 'Jenjang SMA sederajat punya angka putus sekolah tertinggi, **0,86%** pada tahun ajaran 2024/2025, saat tekanan untuk ikut membantu ekonomi keluarga makin besar.',
        en: 'Senior high school has the highest dropout rate, **0.86%** in the 2024/2025 school year, just as the pressure to help support the family grows.',
      },
      {
        id: '**1 dari 5** anak yang tidak sekolah (20,35%) menyebut tidak ada biaya sebagai alasannya.',
        en: '**1 in 5** out-of-school children (20.35%) say they simply cannot afford it.',
      },
    ],
    sources: [
      {
        label: 'BPS, Profil Kemiskinan Indonesia Maret 2026',
        url: 'https://www.bps.go.id/id/pressrelease/2026/08/05/2594/persentase-penduduk-miskin-maret-2026-turun-menjadi-8-07-persen-.html',
      },
      {
        label: 'BPS, Indikator Kesejahteraan Rakyat 2025 (data Kemendikdasmen)',
        url: 'https://data.goodstats.id/statistic/jenjang-sma-sederajat-dominasi-angka-putus-sekolah-2025-QrI6P',
      },
      { label: 'BPS, Susenas 2025', url: 'https://www.kompas.id/artikel/biaya-pendidikan-sandungan-masa-depan-anak' },
    ],
  },
  {
    no: '02',
    tone: 'gold',
    photo: '/images/konteks/energi.webp',
    label: { id: 'Transisi Energi', en: 'Energy Transition' },
    value: { id: '15,75%', en: '15.75%' },
    statement: {
      id: 'bauran energi terbarukan Indonesia pada 2025, jauh dari target awal 23%.',
      en: 'renewable share of Indonesia’s energy mix in 2025, well short of the original 23% target.',
    },
    intro: {
      id: 'Indonesia sudah lama berjanji beralih ke energi bersih, tetapi lajunya belum secepat yang dibutuhkan. Mengejar ketertinggalan ini butuh lebih dari pembangkit baru: butuh generasi muda yang paham teknologi hijau dan peduli lingkungan sejak dari kampung halamannya.',
      en: 'Indonesia pledged long ago to move to clean energy, but progress is slower than needed. Catching up takes more than new power plants: it takes young people who understand green technology and care for the environment, starting at home.',
    },
    points: [
      {
        id: 'Sejak 2014, pemerintah menargetkan **23%** energi terbarukan pada 2025 lewat Kebijakan Energi Nasional.',
        en: 'Since 2014, the government aimed for **23%** renewable energy by 2025 under the National Energy Policy.',
      },
      {
        id: 'Kenyataannya, bauran EBT hanya naik dari **14,65%** pada 2024 menjadi **15,75%** pada 2025.',
        en: 'In reality, the renewable share only rose from **14.65%** in 2024 to **15.75%** in 2025.',
      },
      {
        id: 'Kapasitas pembangkit EBT yang terpasang baru **15.630 MW** per Desember 2025, sebagian besar dari tenaga air.',
        en: 'Installed renewable capacity reached only **15,630 MW** by December 2025, mostly from hydropower.',
      },
      {
        id: 'Target itu kini digeser: **19–23%** pada 2030 dan **70–72%** pada 2060, lewat PP 40/2025.',
        en: 'The target has now moved: **19–23%** by 2030 and **70–72%** by 2060, under Government Regulation 40/2025.',
      },
    ],
    sources: [
      {
        label: 'Kementerian ESDM, Capaian Positif Tahun 2025',
        url: 'https://www.esdm.go.id/id/media-center/arsip-berita/capaian-positif-tahun-2025-negara-hadir-penuhi-kebutuhan-energi-masyarakat',
      },
      { label: 'PP No. 40 Tahun 2025 tentang Kebijakan Energi Nasional', url: 'https://peraturan.bpk.go.id/Details/328789/pp-no-40-tahun-2025' },
    ],
  },
  {
    no: '03',
    tone: 'rose',
    photo: '/images/konteks/remaja.webp',
    label: { id: 'Kesehatan Remaja', en: 'Adolescent Health' },
    value: { id: '1 dari 3', en: '1 in 3' },
    statement: {
      id: 'remaja usia 10–17 tahun mengalami masalah kesehatan mental dalam setahun terakhir.',
      en: 'adolescents aged 10–17 had a mental health problem in the past year.',
    },
    intro: {
      id: 'Survei kesehatan mental remaja nasional pertama di Indonesia membuka gambaran yang jarang dibicarakan: banyak remaja berjuang sendirian, dan tubuh mereka pun butuh perhatian.',
      en: 'Indonesia’s first national adolescent mental health survey revealed a picture rarely discussed: many teenagers struggle alone, and their bodies need attention too.',
    },
    points: [
      {
        id: 'Sekitar **15,5 juta remaja** (34,9%) mengalami masalah kesehatan mental dalam 12 bulan terakhir.',
        en: 'About **15.5 million adolescents** (34.9%) had a mental health problem in the past 12 months.',
      },
      {
        id: '**1 dari 20 remaja** (5,5%) bahkan memiliki gangguan mental yang terdiagnosis.',
        en: '**1 in 20 adolescents** (5.5%) had a diagnosable mental disorder.',
      },
      {
        id: 'Dari mereka yang bermasalah, hanya **2,6%** yang pernah mendapat layanan konseling.',
        en: 'Of those struggling, only **2.6%** ever received counselling.',
      },
      {
        id: 'Anemia masih dialami **15,5%** remaja usia 15–24 tahun, dan ikut menurunkan konsentrasi belajar.',
        en: 'Anaemia still affects **15.5%** of people aged 15–24, weakening their focus at school.',
      },
    ],
    sources: [
      {
        label: 'I-NAMHS 2022, Indonesia National Adolescent Mental Health Survey',
        url: 'https://ugm.ac.id/en/news/23169-burden-of-adolescent-mental-disorders-in-indonesia-results-from-indonesia-s-first-national-mental-health-survey/',
      },
      {
        label: 'Kemenkes, Survei Kesehatan Indonesia (SKI) 2023',
        url: 'https://ayosehat.kemkes.go.id/remaja-bebas-anemia-konsentrasi-belajar-meningkat-bebas-prestasi',
      },
    ],
  },
];

export const impactMetrics: Array<{ value: string; label: Bi; note: Bi; accent: boolean }> = [
  {
    value: '[0.000]+',
    label: { id: 'Penerima manfaat', en: 'Beneficiaries' },
    note: { id: 'Per [bulan tahun]', en: 'As of [month year]' },
    accent: false,
  },
  {
    value: '[000]',
    label: { id: 'Kantong darah terkumpul', en: 'Blood bags collected' },
    note: { id: 'Data ThreeL Blood per [bulan tahun]', en: 'ThreeL Blood data as of [month year]' },
    accent: false,
  },
  {
    value: '[00]',
    label: { id: 'Desa binaan', en: 'Partner villages' },
    note: { id: 'Data Society Impact per [bulan tahun]', en: 'Society Impact data as of [month year]' },
    accent: false,
  },
  {
    value: '[000]+',
    label: { id: 'Relawan ThreeLearnian', en: 'ThreeLearnian volunteers' },
    note: { id: 'Per [bulan tahun]', en: 'As of [month year]' },
    accent: true,
  },
];

export const lookLearnLead: Array<{ no: string; title: 'Look' | 'Learn' | 'Lead'; desc: Bi; detail: Bi; tag: Bi }> = [
  {
    no: '01',
    title: 'Look',
    desc: { id: 'Membaca masalah langsung dari lapangan dan data.', en: 'Reading problems directly from the field and the data.' },
    detail: {
      id: 'Turun ke lapangan dan membaca data untuk memahami akar masalah sebelum bergerak.',
      en: 'Going into the field and reading the data to understand the root of a problem before we act.',
    },
    tag: { id: 'Riset & survei lapangan', en: 'Research & field surveys' },
  },
  {
    no: '02',
    title: 'Learn',
    desc: {
      id: 'Membekali pemuda dengan ilmu, keterampilan, dan teknologi.',
      en: 'Equipping young people with knowledge, skills, and technology.',
    },
    detail: {
      id: 'Membekali pemuda dengan ilmu, keterampilan, dan teknologi yang dibutuhkan untuk menjawab masalah itu.',
      en: 'Equipping young people with the knowledge, skills, and technology needed to solve that problem.',
    },
    tag: { id: 'Kelas & mentoring', en: 'Classes & mentoring' },
  },
  {
    no: '03',
    title: 'Lead',
    desc: {
      id: 'Memimpin aksi yang terukur dan berkelanjutan bagi masyarakat prasejahtera.',
      en: 'Leading measurable, sustainable action for low-income communities.',
    },
    detail: {
      id: 'Memimpin aksi nyata yang terukur dan berkelanjutan bersama masyarakat prasejahtera.',
      en: 'Leading real, measurable, and sustainable action together with low-income communities.',
    },
    tag: { id: 'Aksi & evaluasi dampak', en: 'Action & impact evaluation' },
  },
];

/**
 * Misi ThreeL. `label` judul misi, `tagline` subjudul bahasa Inggris (nama resmi misi),
 * `text` penjelasan yang muncul saat kartu dipilih, `image` jadi latarnya.
 */
export const missions: Array<{ label: Bi; tagline: string; text: Bi; image: string }> = [
  {
    label: { id: 'Menempa Kapasitas Pemuda', en: 'Building Youth Capacity' },
    tagline: 'Shaping Changemakers',
    text: {
      id: 'Membangun ekosistem pembinaan yang sehat dan inklusif guna mencetak kader muda yang berkarakter, berdaya nalar kritis, dan tangguh dalam menghadapi tantangan sosial.',
      en: 'Building a healthy and inclusive mentoring ecosystem that raises young leaders of strong character, critical thinking, and resilience in the face of social challenges.',
    },
    image: '/images/misi/pendidikan.webp',
  },
  {
    label: { id: 'Menghadirkan Solusi Tepat Guna', en: 'Delivering Practical Solutions' },
    tagline: 'Solution-Oriented Innovation',
    text: {
      id: 'Mengembangkan program pendidikan alternatif dan rekayasa teknologi aplikatif yang menjawab kebutuhan dasar masyarakat di bidang pendidikan, energi, dan kesehatan.',
      en: 'Developing alternative education programs and applied technology that answer people’s basic needs in education, energy, and health.',
    },
    image: '/images/misi/kepemimpinan-teknologi.webp',
  },
  {
    label: { id: 'Mendorong Keberlanjutan Lingkungan dan Sosial', en: 'Driving Environmental and Social Sustainability' },
    tagline: 'Sustainable Impact',
    text: {
      id: 'Menginisiasi gerakan sosial yang berorientasi pada pelestarian lingkungan, peningkatan kualitas hidup masyarakat rentan, serta pencapaian Tujuan Pembangunan Berkelanjutan (SDGs).',
      en: 'Initiating social movements focused on environmental conservation, better quality of life for vulnerable communities, and the Sustainable Development Goals (SDGs).',
    },
    image: '/images/misi/kolaborasi.webp',
  },
  {
    label: { id: 'Membangun Kolaborasi Multi-Pihak', en: 'Building Multi-Stakeholder Collaboration' },
    tagline: 'Strategic Synergy',
    text: {
      id: 'Menjalin kemitraan yang setara dan berkelanjutan dengan pemerintah, akademisi, sektor swasta, dan komunitas untuk memperluas jangkauan dampak positif.',
      en: 'Forming equal and lasting partnerships with government, academia, the private sector, and communities to widen the reach of positive impact.',
    },
    image: '/images/misi/aksi-sosial.webp',
  },
];

/** `photo` opsional: isi dengan path di /public/images (mis. '/images/nilai/solutioner.jpg'). */
export const coreValues: Array<{ title: string; desc: Bi; photo?: string }> = [
  {
    title: 'Stay Connected to God',
    desc: { id: 'Setiap langkah berangkat dari iman dan integritas.', en: 'Every step starts from faith and integrity.' },
  },
  {
    title: 'Solutioner',
    desc: { id: 'Fokus pada jalan keluar, bukan sekadar menyoroti masalah.', en: 'Focusing on solutions, not just pointing out problems.' },
  },
  {
    title: 'Caring & Happiness',
    desc: {
      id: 'Peduli pada sesama dan menjaga kebahagiaan dalam berkarya.',
      en: 'Caring for others and staying joyful in our work.',
    },
  },
  {
    title: 'Committed',
    desc: {
      id: 'Menepati janji kepada tim, mitra, dan penerima manfaat.',
      en: 'Keeping our promises to our team, partners, and beneficiaries.',
    },
  },
  {
    title: 'Collaborative',
    desc: { id: 'Bekerja lintas latar belakang, kampus, dan keahlian.', en: 'Working across backgrounds, campuses, and expertise.' },
  },
  {
    title: 'Synergy',
    desc: {
      id: 'Menyatukan kekuatan agar dampak yang dihasilkan berlipat.',
      en: 'Combining our strengths to multiply our impact.',
    },
  },
];

/**
 * Pimpinan C-Level. `name`, `photo`, dan `quote` masih DRAF: ganti dengan nama asli,
 * path foto di /public/images/tim (mis. '/images/tim/cmo.jpg'), dan kutipan dari orangnya langsung.
 */
export const cLevels: Array<{
  code: string;
  title: string;
  initial: string;
  value: string;
  scope: Bi;
  name: string;
  campus?: string;
  photo?: string;
  /** Rasio lebar:tinggi foto (lebar/tinggi), supaya tiap foto mengisi tinggi penuh di carousel
   * meski posenya beda-beda (misal tangan di pinggang lebih lebar dari tangan terlipat). */
  photoAspect?: number;
  quote: Bi;
}> = [
  {
    code: 'CMO',
    title: 'Chief Marketing Officer',
    initial: 'M',
    value: 'cmo',
    scope: {
      id: 'Memimpin strategi komunikasi, branding, dan media ThreeL.',
      en: 'Leads ThreeL’s communications, branding, and media strategy.',
    },
    name: '[Nama CMO]',
    quote: {
      id: 'Cerita yang jujur dari lapangan adalah cara terbaik mengajak lebih banyak orang ikut bergerak.',
      en: 'Honest stories from the field are the best way to invite more people to take action.',
    },
  },
  {
    code: 'CHRO',
    title: 'Chief Human Resources Officer',
    initial: 'H',
    value: 'chro',
    scope: {
      id: 'Memimpin rekrutmen, pengembangan anggota, dan budaya organisasi.',
      en: 'Leads recruitment, member development, and organizational culture.',
    },
    name: 'Hanif',
    campus: 'Institut Teknologi Bandung',
    photo: '/images/tim/chro-hanif.webp',
    photoAspect: 0.477,
    quote: {
      id: 'Aku percaya menentukan arah yang jelas lebih penting daripada bergerak cepat tanpa tujuan, tapi setelah arah ditentukan, jangan biarkan terlalu banyak berpikir menjadi alasan untuk tidak segera melangkah.',
      en: "I believe setting a clear direction matters more than moving fast without one, but once that direction is set, don't let overthinking become an excuse not to act.",
    },
  },
  {
    code: 'CFO',
    title: 'Chief Finance Officer',
    initial: 'F',
    value: 'cfo',
    scope: {
      id: 'Memimpin penganggaran, pelaporan keuangan, dan keberlanjutan dana, termasuk kelas berbayar ThreeL Mengajar.',
      en: 'Leads budgeting, financial reporting, and funding sustainability, including the paid ThreeL Mengajar classes.',
    },
    name: 'Athar',
    campus: 'Institut Teknologi Bandung',
    photo: '/images/tim/cfo-athar.webp',
    photoAspect: 0.505,
    quote: {
      id: 'Ide itu ibarat modal. Gak bakal ngasilin cuan perubahan kalau nggak diputer bareng tim yang tepat. Low risk, high impact, dan selalu siap growth bareng.',
      en: "Ideas are like capital. They won't yield the returns of change unless they're put to work with the right team. Low risk, high impact, and always ready to grow together.",
    },
  },
  {
    code: 'COO',
    title: 'Chief Operation Officer',
    initial: 'O',
    value: 'coo',
    scope: {
      id: 'Memimpin eksekusi program dan operasional lapangan di tiga pilar.',
      en: 'Leads program execution and field operations across the three pillars.',
    },
    name: 'Rakha',
    campus: 'Institut Teknologi Bandung',
    photo: '/images/tim/coo-rakha.webp',
    photoAspect: 0.782,
    quote: {
      id: 'Buatku, bertumbuh bukan tentang menjadi yang paling hebat, tapi tentang terus belajar, mencoba, dan tumbuh bersama orang-orang di sekitar.',
      en: "To me, growing isn't about being the best, but about continuously learning, trying, and growing together with the people around me.",
    },
  },
  {
    code: 'CID',
    title: 'Chief Innovation and Development',
    initial: 'I',
    value: 'cid',
    scope: {
      id: 'Memimpin inovasi program dan pengembangan inisiatif baru.',
      en: 'Leads program innovation and the development of new initiatives.',
    },
    name: 'Jordan',
    campus: 'Institut Teknologi Bandung',
    photo: '/images/tim/cid-jordan.webp',
    photoAspect: 0.523,
    quote: {
      id: 'Inovasi sejati memberdayakan potensi manusia. Ketika kita menggerakkan komunitas berbasis anak muda untuk mengubah perilaku terhadap lingkungan, di situlah kita menyalakan dampak yang mendefinisikan ulang pembangunan masa depan.',
      en: 'True innovation empowers human capability. When we empower youth-driven communities to shift environmental behavior, we ignite the impact that redefines future development.',
    },
  },
];

/** Founder, ditampilkan terpisah di bawah jajaran C-Level. Data masih DRAF. */
export const founder: { name: string; role: string; campus?: string; photo?: string; quote: Bi; highlight: string } = {
  name: 'Natanael',
  role: 'Founder & CEO',
  campus: 'Institut Teknologi Bandung',
  photo: '/images/tim/founder-natanael.webp',
  quote: {
    id: 'ThreeL lahir dari keresahan nyata di lingkungan masyarakat dan tumbuh karena anak muda yang memilih untuk bergerak dengan potensi mereka masing-masing.',
    en: 'ThreeL was born from real concerns in our communities and grew because young people chose to act, each with their own potential.',
  },
  highlight: 'ThreeL',
};

/** Unit Manager Associate, dikelompokkan per C-Level yang membawahinya. */
export const divisions: Array<{ value: string; group: string; label: string; skills: Bi[]; porto: Bi }> = [
  {
    value: 'academic-units',
    group: 'COO',
    label: 'Academic Units Management',
    skills: [
      { id: 'Koordinasi unit akademik', en: 'Academic unit coordination' },
      { id: 'Penjadwalan kelas', en: 'Class scheduling' },
      { id: 'Manajemen pengajar', en: 'Tutor management' },
    ],
    porto: {
      id: 'Lampirkan contoh jadwal, SOP, atau laporan unit akademik yang pernah kamu kelola.',
      en: 'Attach a sample schedule, SOP, or academic unit report you have managed.',
    },
  },
  {
    value: 'logistic',
    group: 'COO',
    label: 'Logistic',
    skills: [
      { id: 'Logistik lapangan', en: 'Field logistics' },
      { id: 'Pengadaan', en: 'Procurement' },
      { id: 'Inventaris', en: 'Inventory' },
    ],
    porto: {
      id: 'Lampirkan daftar kebutuhan, rencana pengadaan, atau laporan logistik kegiatan.',
      en: 'Attach a needs list, procurement plan, or event logistics report.',
    },
  },
  {
    value: 'event',
    group: 'COO',
    label: 'Event Management',
    skills: [
      { id: 'Manajemen acara', en: 'Event management' },
      { id: 'Rundown', en: 'Rundowns' },
      { id: 'Koordinasi relawan', en: 'Volunteer coordination' },
    ],
    porto: {
      id: 'Lampirkan laporan kegiatan atau rundown acara yang pernah kamu pegang.',
      en: 'Attach an event report or rundown you have handled.',
    },
  },
  {
    value: 'public-relation',
    group: 'CMO',
    label: 'Public Relation',
    skills: [
      { id: 'Hubungan media', en: 'Media relations' },
      { id: 'Kemitraan', en: 'Partnerships' },
      { id: 'Komunikasi publik', en: 'Public communication' },
    ],
    porto: {
      id: 'Lampirkan rilis pers, proposal kerja sama, atau liputan yang pernah kamu tangani.',
      en: 'Attach a press release, partnership proposal, or media coverage you have handled.',
    },
  },
  {
    value: 'social-media',
    group: 'CMO',
    label: 'Social Media and Content Analyst',
    skills: [
      { id: 'Strategi konten', en: 'Content strategy' },
      { id: 'Analitik media sosial', en: 'Social media analytics' },
      { id: 'Copywriting', en: 'Copywriting' },
    ],
    porto: {
      id: 'Lampirkan akun atau laporan performa konten yang pernah kamu kelola.',
      en: 'Attach an account or content performance report you have managed.',
    },
  },
  {
    value: 'graphic-design',
    group: 'CMO',
    label: 'Graphic Design',
    skills: [
      { id: 'Desain grafis', en: 'Graphic design' },
      { id: 'Identitas visual', en: 'Visual identity' },
      { id: 'Layout publikasi', en: 'Publication layout' },
    ],
    porto: {
      id: 'Behance atau folder Drive berisi desain terbaikmu.',
      en: 'A Behance profile or Drive folder with your best designs.',
    },
  },
  {
    value: 'talent-growth',
    group: 'CHRO',
    label: 'Talent Growth',
    skills: [
      { id: 'Pengembangan anggota', en: 'Member development' },
      { id: 'Pelatihan', en: 'Training' },
      { id: 'Budaya organisasi', en: 'Organizational culture' },
    ],
    porto: {
      id: 'Lampirkan program kaderisasi atau pelatihan internal yang pernah kamu rancang.',
      en: 'Attach a development or internal training program you have designed.',
    },
  },
  {
    value: 'talent-strategist',
    group: 'CHRO',
    label: 'Talent Strategist',
    skills: [
      { id: 'Rekrutmen', en: 'Recruitment' },
      { id: 'Perencanaan SDM', en: 'HR planning' },
      { id: 'Evaluasi kinerja', en: 'Performance evaluation' },
    ],
    porto: {
      id: 'Lampirkan alur rekrutmen atau kerangka evaluasi anggota yang pernah kamu susun.',
      en: 'Attach a recruitment flow or member evaluation framework you have built.',
    },
  },
  {
    value: 'finsight',
    group: 'CFO',
    label: 'FinSight',
    skills: [
      { id: 'Penganggaran', en: 'Budgeting' },
      { id: 'Pelaporan keuangan', en: 'Financial reporting' },
      { id: 'Analisis keuangan', en: 'Financial analysis' },
    ],
    porto: {
      id: 'Lampirkan contoh RAB, laporan keuangan kegiatan, atau analisis anggaran yang pernah kamu susun.',
      en: 'Attach a sample budget plan, event financial report, or budget analysis you have prepared.',
    },
  },
  {
    value: 'sponsorship',
    group: 'CFO',
    label: 'Sponsorship',
    skills: [
      { id: 'Penggalangan dana', en: 'Fundraising' },
      { id: 'Proposal sponsor', en: 'Sponsorship proposals' },
      { id: 'Relasi mitra', en: 'Partner relations' },
    ],
    porto: {
      id: 'Lampirkan proposal sponsor atau rekap pendanaan yang pernah kamu dapatkan.',
      en: 'Attach a sponsorship proposal or a summary of funding you have secured.',
    },
  },
  {
    value: 'curriculum',
    group: 'CID',
    label: 'Curriculum',
    skills: [
      { id: 'Penyusunan kurikulum', en: 'Curriculum development' },
      { id: 'Materi ajar', en: 'Teaching materials' },
      { id: 'Desain pembelajaran', en: 'Learning design' },
    ],
    porto: {
      id: 'Lampirkan contoh kurikulum, silabus, atau materi ajar buatanmu.',
      en: 'Attach a sample curriculum, syllabus, or teaching material you made.',
    },
  },
  {
    value: 'learning-research',
    group: 'CID',
    label: 'Learning Research',
    skills: [
      { id: 'Riset pendidikan', en: 'Education research' },
      { id: 'Analisis data', en: 'Data analysis' },
      { id: 'Evaluasi program', en: 'Program evaluation' },
    ],
    porto: {
      id: 'Lampirkan tulisan riset, laporan survei, atau evaluasi program.',
      en: 'Attach a research paper, survey report, or program evaluation.',
    },
  },
  {
    value: 'product-design',
    group: 'CID',
    label: 'Product & Website Design',
    skills: [
      { id: 'UI/UX', en: 'UI/UX' },
      { id: 'Pengembangan website', en: 'Website development' },
      { id: 'Prototyping', en: 'Prototyping' },
    ],
    porto: {
      id: 'Tautan Figma, Behance, GitHub, atau website yang pernah kamu buat.',
      en: 'A link to Figma, Behance, GitHub, or a website you have built.',
    },
  },
];

export const divisionGroups: Record<string, string> = {
  COO: 'Chief Operation Officer (COO)',
  CMO: 'Chief Marketing Officer (CMO)',
  CHRO: 'Chief Human Resources Officer (CHRO)',
  CFO: 'Chief Finance Officer (CFO)',
  CID: 'Chief Innovation and Development (CID)',
};

export const workflow: Array<{ no: string; tag: Bi; title: Bi; desc: Bi; gold: boolean }> = [
  {
    no: '01',
    tag: { id: 'LOOK', en: 'LOOK' },
    title: { id: 'Asesmen kebutuhan', en: 'Needs assessment' },
    desc: {
      id: 'Survei lapangan dan data sekunder untuk memetakan masalah.',
      en: 'Field surveys and secondary data to map the problem.',
    },
    gold: true,
  },
  {
    no: '02',
    tag: { id: 'LEARN', en: 'LEARN' },
    title: { id: 'Perancangan & pelatihan', en: 'Design & training' },
    desc: {
      id: 'Menyusun program, anggaran, dan membekali relawan.',
      en: 'Designing the program and budget, and preparing volunteers.',
    },
    gold: true,
  },
  {
    no: '03',
    tag: { id: 'LEAD', en: 'LEAD' },
    title: { id: 'Eksekusi aksi', en: 'Action' },
    desc: {
      id: 'Program berjalan di lapangan bersama mitra dan relawan.',
      en: 'The program runs in the field with partners and volunteers.',
    },
    gold: true,
  },
  {
    no: '04',
    tag: { id: 'UKUR', en: 'MEASURE' },
    title: { id: 'Evaluasi dampak', en: 'Impact evaluation' },
    desc: {
      id: 'Mengukur capaian terhadap target dan mendokumentasikan kegiatan.',
      en: 'Measuring results against targets and documenting activities.',
    },
    gold: false,
  },
  {
    no: '05',
    tag: { id: 'LAPOR', en: 'REPORT' },
    title: { id: 'Laporan terbuka', en: 'Open reporting' },
    desc: {
      id: 'Laporan dampak dan keuangan dibagikan ke mitra dan publik.',
      en: 'Impact and financial reports are shared with partners and the public.',
    },
    gold: false,
  },
];

export type PartnerType = {
  id: string;
  icon: 'building' | 'medical' | 'users';
  photo: string;
  title: Bi;
  desc: Bi;
  /** Penjelasan lengkap yang muncul saat kartu dibuka. */
  detail: Bi;
  forms: Bi[];
  /** Kredit foto bila lisensinya mewajibkan atribusi tampil di halaman. */
  credit?: string;
};

export const partnerTypes: PartnerType[] = [
  {
    id: 'csr',
    icon: 'building',
    photo: '/images/mitra/jenis-csr.webp',
    title: { id: 'Korporasi (CSR)', en: 'Companies (CSR)' },
    desc: {
      id: 'Salurkan program CSR ke inisiatif yang terukur di bidang pendidikan, kesehatan, dan lingkungan.',
      en: 'Channel your CSR program into measurable initiatives in education, health, and the environment.',
    },
    detail: {
      id: 'Kami membantu perusahaan menyalurkan CSR ke program yang dampaknya bisa diukur, dari beasiswa bimbel sampai aksi lingkungan. Karyawanmu juga bisa ikut turun langsung, dan setiap dana tercatat dalam laporan dampak serta keuangan yang terbuka.',
      en: 'We help companies channel CSR into programs with measurable impact, from tutoring scholarships to environmental action. Your employees can join in the field, and every contribution is recorded in open impact and financial reports.',
    },
    forms: [
      { id: 'Pendanaan program atau beasiswa bimbel', en: 'Program funding or tutoring scholarships' },
      { id: 'Employee volunteering', en: 'Employee volunteering' },
      { id: 'Sponsor kegiatan lapangan', en: 'Field activity sponsorship' },
    ],
  },
  {
    id: 'medis',
    icon: 'medical',
    photo: '/images/mitra/jenis-medis.webp',
    title: { id: 'Instansi Medis (PMI / RS)', en: 'Medical Institutions (PMI / Hospitals)' },
    desc: {
      id: 'Kolaborasi aksi donor darah dan edukasi kesehatan bersama jaringan relawan muda.',
      en: 'Collaborate on blood drives and health education with a network of young volunteers.',
    },
    detail: {
      id: 'Instansi medis fokus pada layanan, relawan ThreeL mengurus sisanya: mengajak pendonor baru, menyiapkan acara di kampus dan lingkungan warga, sampai menjangkau remaja lewat edukasi kesehatan yang dekat dengan keseharian mereka.',
      en: 'Medical institutions focus on care while ThreeL volunteers handle the rest: recruiting new donors, organizing events on campuses and in neighbourhoods, and reaching teenagers with health education that fits their daily lives.',
    },
    forms: [
      { id: 'Penyelenggaraan donor darah (ThreeL Blood)', en: 'Hosting blood drives (ThreeL Blood)' },
      { id: 'Pemeriksaan kesehatan dan bakti sosial', en: 'Health checks and community service' },
      { id: 'Edukasi kesehatan remaja', en: 'Adolescent health education' },
    ],
  },
  {
    id: 'kampus',
    icon: 'users',
    photo: '/images/mitra/jenis-kampus.webp',
    title: { id: 'Kampus & Komunitas', en: 'Universities & Communities' },
    desc: {
      id: 'Tukar pengetahuan dan jalankan program bersama antarorganisasi pemuda.',
      en: 'Share knowledge and run joint programs between youth organizations.',
    },
    detail: {
      id: 'Sesama organisasi pemuda bisa saling menguatkan. Kita bisa bertukar cara mengelola organisasi, menggarap acara bersama, atau turun ke desa binaan dalam satu program pengabdian yang dirancang bareng.',
      en: 'Youth organizations grow stronger together. We can exchange ways of running an organization, co-host events, or serve partner villages through a community program we design together.',
    },
    forms: [
      { id: 'Studi banding organisasi', en: 'Organizational benchmarking visits' },
      { id: 'Kolaborasi program dan acara', en: 'Program and event collaboration' },
      { id: 'Pengabdian masyarakat bersama', en: 'Joint community service' },
    ],
  },
];

export const partnerSteps: Array<{ no: string; title: Bi; desc: Bi }> = [
  {
    no: '01',
    title: { id: 'Ajukan', en: 'Apply' },
    desc: {
      id: 'Setiap kerja sama berawal dari satu pesan. Isi formulir di halaman ini atau kirim email ke tim kemitraan, lalu ceritakan siapa kamu dan dampak seperti apa yang ingin kamu dorong.',
      en: 'Every partnership starts with a single message. Fill in the form on this page or email our partnerships team, and tell us who you are and the impact you want to drive.',
    },
  },
  {
    no: '02',
    title: { id: 'Diskusi kebutuhan', en: 'Discuss needs' },
    desc: {
      id: 'Tim kami menghubungimu dalam [x] hari kerja. Bersama, kita menyelaraskan tujuan, sasaran penerima manfaat, dan pilar program yang paling cocok.',
      en: 'Our team contacts you within [x] working days. Together we align on goals, the people we want to reach, and the program pillar that fits best.',
    },
  },
  {
    no: '03',
    title: { id: 'Kesepakatan', en: 'Agreement' },
    desc: {
      id: 'Hasil diskusi kami tuangkan dalam proposal program lengkap dengan rencana anggarannya. Setelah disetujui bersama, kerja sama diresmikan lewat MoU atau PKS.',
      en: 'We turn our discussion into a program proposal with a full budget plan. Once both sides agree, the partnership is made official through an MoU or cooperation agreement.',
    },
  },
  {
    no: '04',
    title: { id: 'Pelaksanaan & laporan', en: 'Delivery & reporting' },
    desc: {
      id: 'Program berjalan di lapangan bersama relawan ThreeL. Mitra menerima laporan dampak dan keuangan yang terbuka, jadi setiap kontribusi bisa dipertanggungjawabkan.',
      en: 'The program runs in the field with ThreeL volunteers. Partners receive open impact and financial reports, so every contribution is accounted for.',
    },
  },
];

export type NewsCategory = 'berita' | 'artikel' | 'rilis' | 'arsip';

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  title: Bi;
  program: Bi;
  date: Bi;
  excerpt: Bi;
  /** Foto sampul di /public/images/kabar (kredit: public/images/kabar/CREDITS.md). */
  cover: string;
  /** Kredit foto bila lisensinya mewajibkan atribusi tampil di halaman. */
  coverCredit?: string;
  featured?: boolean;
};

export const newsCategories: Record<NewsCategory, { label: Bi; cta: Bi }> = {
  berita: { label: { id: 'Berita', en: 'News' }, cta: { id: 'Baca berita', en: 'Read news' } },
  artikel: { label: { id: 'Artikel', en: 'Article' }, cta: { id: 'Baca artikel', en: 'Read article' } },
  rilis: { label: { id: 'Rilis Pers', en: 'Press Release' }, cta: { id: 'Baca rilis', en: 'Read release' } },
  arsip: { label: { id: 'Arsip Publikasi', en: 'Publication Archive' }, cta: { id: 'Lihat dokumen', en: 'View document' } },
};

const draftDate: Bi = { id: '[dd Bulan 2026]', en: '[Month dd, 2026]' };

export const news: NewsItem[] = [
  {
    slug: 'threel-blood-pmi',
    cover: '/images/kabar/threel-blood-pmi.webp',
    category: 'rilis',
    featured: true,
    title: {
      id: 'ThreeL Blood bersama PMI: [jumlah] kantong darah terkumpul di [lokasi]',
      en: 'ThreeL Blood and PMI collect [number] blood bags in [location]',
    },
    program: { id: 'ThreeL Blood', en: 'ThreeL Blood' },
    date: draftDate,
    excerpt: {
      id: '[Ringkasan rilis: jumlah pendonor, mitra yang terlibat, dan tindak lanjut kegiatan.]',
      en: '[Release summary: number of donors, partners involved, and follow-up activities.]',
    },
  },
  {
    slug: 'subsidi-silang-threel-mengajar',
    cover: '/images/kabar/subsidi-silang-threel-mengajar.webp',
    category: 'artikel',
    title: {
      id: 'Cara kerja subsidi silang ThreeL Mengajar, dari kelas TPB ITB ke bimbel gratis',
      en: 'How the ThreeL Mengajar cross-subsidy works, from ITB first-year classes to free tutoring',
    },
    program: { id: 'ThreeL Mengajar', en: 'ThreeL Mengajar' },
    date: draftDate,
    excerpt: {
      id: '[Ringkasan artikel tentang model subsidi silang.]',
      en: '[Article summary about the cross-subsidy model.]',
    },
  },
  {
    slug: 'threel-berakar-kebun-kota',
    cover: '/images/kabar/threel-berakar-kebun-kota.webp',
    category: 'rilis',
    title: {
      id: 'ThreeL Berakar menanam [jumlah] bibit di kebun kota [lokasi]',
      en: 'ThreeL Berakar plants [number] seedlings in the [location] city garden',
    },
    program: { id: 'ThreeL Berakar', en: 'ThreeL Berakar' },
    date: draftDate,
    excerpt: { id: '[Ringkasan kegiatan penanaman.]', en: '[Summary of the planting activity.]' },
  },
  {
    slug: 'look-learn-lead-kerangka-relawan',
    cover: '/images/kabar/look-learn-lead-kerangka-relawan.webp',
    category: 'artikel',
    title: {
      id: 'Look, Learn, Lead: kerangka kerja relawan ThreeL di lapangan',
      en: 'Look, Learn, Lead: the ThreeL volunteer framework in the field',
    },
    program: { id: 'Organisasi', en: 'Organization' },
    date: draftDate,
    excerpt: {
      id: '[Ringkasan artikel tentang kerangka kerja relawan.]',
      en: '[Article summary about the volunteer framework.]',
    },
  },
  {
    slug: 'laporan-dampak-semester',
    cover: '/images/kabar/laporan-dampak-semester.webp',
    category: 'arsip',
    title: { id: 'Laporan Dampak Semester [I/II] [tahun]', en: 'Semester [I/II] Impact Report [year]' },
    program: { id: 'Laporan resmi', en: 'Official report' },
    date: draftDate,
    excerpt: { id: '[Ringkasan isi laporan dampak.]', en: '[Summary of the impact report.]' },
  },
  {
    slug: 'threel-berbagi-paket-bantuan',
    cover: '/images/kabar/threel-berbagi-paket-bantuan.webp',
    coverCredit: 'Foto: Midori, CC BY 3.0, via Wikimedia Commons',
    category: 'rilis',
    title: {
      id: 'ThreeL Berbagi menyalurkan [jumlah] paket bantuan untuk keluarga prasejahtera',
      en: 'ThreeL Berbagi delivers [number] aid packages to low-income families',
    },
    program: { id: 'ThreeL Berbagi', en: 'ThreeL Berbagi' },
    date: draftDate,
    excerpt: { id: '[Ringkasan kegiatan penyaluran.]', en: '[Summary of the distribution activity.]' },
  },
  {
    slug: 'kesehatan-mental-remaja-threel-hope',
    cover: '/images/kabar/kesehatan-mental-remaja-threel-hope.webp',
    category: 'artikel',
    title: {
      id: 'Kesehatan mental remaja: pelajaran dari ThreeL Hope',
      en: 'Adolescent mental health: lessons from ThreeL Hope',
    },
    program: { id: 'ThreeL Hope', en: 'ThreeL Hope' },
    date: draftDate,
    excerpt: { id: '[Ringkasan artikel ThreeL Hope.]', en: '[ThreeL Hope article summary.]' },
  },
  {
    slug: 'profil-organisasi',
    cover: '/images/kabar/profil-organisasi.webp',
    category: 'arsip',
    title: { id: 'Profil Organisasi ThreeL Community [tahun]', en: 'ThreeL Community Organization Profile [year]' },
    program: { id: 'Dokumen kemitraan', en: 'Partnership document' },
    date: draftDate,
    excerpt: { id: '[Ringkasan profil organisasi.]', en: '[Organization profile summary.]' },
  },
  {
    slug: 'threel-berkelana-jelajah-literasi',
    cover: '/images/kabar/threel-berkelana-jelajah-literasi.webp',
    category: 'berita',
    title: {
      id: 'ThreeL Berkelana membawa [jumlah] buku ke [lokasi]',
      en: 'ThreeL Berkelana brings [number] books to [location]',
    },
    program: { id: 'ThreeL Berkelana', en: 'ThreeL Berkelana' },
    date: draftDate,
    excerpt: {
      id: '[Ringkasan berita: jumlah anak yang ikut membaca, relawan yang terlibat, dan rencana kunjungan berikutnya.]',
      en: '[News summary: how many children joined the reading session, the volunteers involved, and the next visit.]',
    },
  },
];

/** Pertanyaan yang sering diajukan, tampil di halaman /faq. Jawaban hanya memuat informasi yang sudah ada di situs. */
export const faqs: Array<{ q: Bi; a: Bi }> = [
  {
    q: { id: 'Apa itu ThreeL Community?', en: 'What is ThreeL Community?' },
    a: {
      id: 'ThreeL Community adalah organisasi pemuda nirlaba yang bergerak di pengentasan kemiskinan lewat pendidikan, teknologi, dan pemberdayaan sosial. Kami menjalankan sembilan program dalam tiga pilar, yaitu Pendidikan & Kapasitas, Aksi Sosial & Kesehatan, serta Lingkungan & Literasi.',
      en: 'ThreeL Community is a nonprofit youth organization working to end poverty through education, technology, and social empowerment. We run nine programs across three pillars, namely Education & Capacity, Social Action & Health, and Environment & Literacy.',
    },
  },
  {
    q: { id: 'Bagaimana cara bergabung dengan ThreeL?', en: 'How do I join ThreeL?' },
    a: {
      id: 'Buka halaman Daftar lalu pilih satu dari tiga jalur, yaitu Board of Director, Associate, atau Member (relawan ThreeLearnian). Setiap jalur punya formulir dan proses seleksinya sendiri.',
      en: 'Open the Join page and choose one of three paths, namely Board of Director, Associate, or Member (ThreeLearnian volunteer). Each path has its own form and selection process.',
    },
  },
  {
    q: { id: 'Apa bedanya Board of Director, Associate, dan Member?', en: 'What is the difference between Board of Director, Associate, and Member?' },
    a: {
      id: 'Board of Director memegang arah strategis organisasi dengan komitmen 15–20 jam per minggu. Associate adalah manager dan staf divisi yang bekerja sesuai keahlian, sekitar 8–12 jam per minggu. Member adalah relawan yang ikut aksi sosial dengan waktu fleksibel, per kegiatan.',
      en: 'The Board of Director sets the organization’s strategic direction and commits 15–20 hours per week. Associates are division managers and staff who work in their area of expertise for about 8–12 hours per week. Members are volunteers who join social actions on a flexible, per-activity basis.',
    },
  },
  {
    q: { id: 'Seperti apa proses seleksinya?', en: 'What does the selection process look like?' },
    a: {
      id: 'Untuk Board of Director dan Associate, tahapannya adalah seleksi berkas, Focus Group Discussion, wawancara, mini presentation, lalu onboarding. Untuk Member, seleksi cukup melalui FGD tanpa perlu CV atau esai.',
      en: 'For the Board of Director and Associates, the stages are document screening, a Focus Group Discussion, an interview, a mini presentation, and then onboarding. For Members, selection is through an FGD only, with no CV or essay required.',
    },
  },
  {
    q: { id: 'Pendaftaran sedang ditutup. Apakah saya masih bisa mendaftar?', en: 'Registration is closed. Can I still apply?' },
    a: {
      id: 'Bisa. Saat sebuah jalur berstatus Closed, formulirnya tetap bisa diisi dan kamu akan masuk daftar tunggu. Kami akan menghubungimu saat batch berikutnya dibuka.',
      en: 'Yes. When a path is marked Closed, you can still fill in the form and you will join the waitlist. We will contact you when the next batch opens.',
    },
  },
  {
    q: { id: 'Bagaimana institusi saya bisa bermitra dengan ThreeL?', en: 'How can my institution partner with ThreeL?' },
    a: {
      id: 'Isi formulir kemitraan di halaman Bermitra atau kirim email ke tim kami. Setelah itu tim akan menghubungi untuk diskusi kebutuhan, dilanjutkan penyusunan proposal dan MoU, lalu pelaksanaan program beserta laporannya.',
      en: 'Fill in the partnership form on the Partner page or email our team. We will then reach out to discuss your needs, followed by a proposal and MoU, and finally program delivery with reporting.',
    },
  },
  {
    q: { id: 'Siapa saja yang bisa menjadi mitra?', en: 'Who can become a partner?' },
    a: {
      id: 'Korporasi melalui program CSR, instansi medis seperti PMI dan rumah sakit, kampus, komunitas, dan organisasi lain yang ingin berdampak bersama di bidang pendidikan, kesehatan, dan lingkungan.',
      en: 'Companies through CSR programs, medical institutions such as PMI and hospitals, universities, communities, and other organizations that want to make an impact together in education, health, and the environment.',
    },
  },
  {
    q: { id: 'Bagaimana ThreeL Mengajar bisa gratis?', en: 'How can ThreeL Mengajar be free?' },
    a: {
      id: 'ThreeL Mengajar memakai model subsidi silang. Kelas persiapan PTN dan pendampingan materi TPB ITB dibuka berbayar, dan pendapatannya membiayai bimbingan belajar gratis bagi siswa prasejahtera. Dengan begitu program tidak bergantung penuh pada donasi.',
      en: 'ThreeL Mengajar uses a cross-subsidy model. University entrance prep and ITB first-year tutoring are offered as paid classes, and that income funds free tutoring for low-income students. This way the program does not rely entirely on donations.',
    },
  },
  {
    q: { id: 'Bagaimana dampak program dilaporkan?', en: 'How is program impact reported?' },
    a: {
      id: 'Setiap program ditutup dengan laporan dampak yang bisa diverifikasi. Angka dampak diperbarui setiap akhir semester, dan laporan dampak serta keuangan dibagikan kepada mitra dan publik.',
      en: 'Every program closes with a verifiable impact report. Impact figures are updated at the end of every semester, and impact and financial reports are shared with partners and the public.',
    },
  },
  {
    q: { id: 'Bagaimana cara menghubungi ThreeL?', en: 'How can I contact ThreeL?' },
    a: {
      id: 'Kirim email ke community.threel@gmail.com atau kirim pesan lewat Instagram @threel.comm. Kabar kegiatan dan pengumuman rekrutmen terbaru juga kami bagikan di Instagram.',
      en: 'Email us at community.threel@gmail.com or send a message on Instagram @threel.comm. We also share activity updates and the latest recruitment announcements on Instagram.',
    },
  },
];

export const contact = {
  email: 'community.threel@gmail.com',
  instagram: 'threel.comm',
  instagramUrl: 'https://www.instagram.com/threel.comm',
};
