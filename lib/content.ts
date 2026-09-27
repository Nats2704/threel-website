/**
 * Konten statis situs. Saat backend siap, ganti sumber data ini dengan
 * pemanggilan API/CMS tanpa mengubah komponen tampilan.
 * Teks dalam [kurung siku] adalah placeholder yang perlu diisi data resmi.
 */

export type IconKey = 'book' | 'heart' | 'sprout';

export type Program = { name: string; short: string; long: string; target: string; featured?: boolean };

export type Pillar = {
  id: 'pendidikan' | 'sosial' | 'lingkungan';
  no: string;
  title: string;
  desc: string;
  longDesc: string;
  answers: string;
  icon: IconKey;
  programs: Program[];
};

export const pillars: Pillar[] = [
  {
    id: 'pendidikan',
    no: '01',
    title: 'Pendidikan & Kapasitas',
    desc: 'Membuka akses belajar bagi siswa prasejahtera dan mengasah kapasitas pemuda.',
    longDesc:
      'Membuka akses belajar bagi siswa prasejahtera, sekaligus mengasah kapasitas pemuda agar siap memimpin.',
    answers: 'kemiskinan & putus sekolah',
    icon: 'book',
    programs: [
      {
        name: 'ThreeL Mengajar',
        short: 'Bimbingan belajar gratis bagi siswa prasejahtera, didanai model subsidi silang.',
        long: 'Bimbingan belajar gratis bagi siswa prasejahtera. Biayanya ditopang kelas persiapan PTN dan materi TPB ITB berbayar melalui model subsidi silang.',
        target: 'Siswa SMA prasejahtera (gratis); siswa dan mahasiswa tingkat awal (berbayar)',
        featured: true,
      },
      {
        name: 'ThreeL Mengasah',
        short: 'Pelatihan keterampilan, kepemimpinan, dan teknologi untuk pemuda.',
        long: 'Pelatihan keterampilan, kepemimpinan, dan teknologi. Membentuk pemuda yang siap memimpin aksi di lapangan.',
        target: 'Anggota ThreeL, pelajar, dan mahasiswa',
      },
    ],
  },
  {
    id: 'sosial',
    no: '02',
    title: 'Aksi Sosial & Kesehatan',
    desc: 'Aksi langsung untuk kebutuhan mendesak masyarakat dan kesehatan remaja.',
    longDesc: 'Aksi langsung untuk kebutuhan mendesak masyarakat, kesehatan remaja, dan ketersediaan darah.',
    answers: 'krisis kesehatan mental & fisik remaja',
    icon: 'heart',
    programs: [
      {
        name: 'ThreeL Hope',
        short: 'Kampanye dan pendampingan kesehatan mental remaja.',
        long: 'Kampanye dan pendampingan kesehatan mental remaja. Membuka ruang aman untuk bercerita dan mencari bantuan.',
        target: 'Remaja usia sekolah',
      },
      {
        name: 'ThreeL Berbagi',
        short: 'Penyaluran kebutuhan pokok dan perlengkapan sekolah.',
        long: 'Penyaluran kebutuhan pokok dan perlengkapan sekolah, berbasis pendataan penerima manfaat.',
        target: 'Keluarga prasejahtera',
      },
      {
        name: 'ThreeL Blood',
        short: 'Donor darah rutin bersama PMI dan rumah sakit mitra.',
        long: 'Donor darah rutin bersama PMI dan rumah sakit mitra untuk menjaga ketersediaan stok darah.',
        target: 'Pendonor umum dan relawan',
      },
      {
        name: 'Society Impact',
        short: 'Proyek pemberdayaan berbasis kebutuhan desa binaan.',
        long: 'Proyek pemberdayaan berbasis kebutuhan desa binaan, dirancang bersama warga agar berkelanjutan.',
        target: 'Masyarakat desa binaan',
      },
    ],
  },
  {
    id: 'lingkungan',
    no: '03',
    title: 'Lingkungan & Literasi',
    desc: 'Menumbuhkan kepedulian lingkungan dan budaya literasi sejak dini.',
    longDesc: 'Menumbuhkan kepedulian lingkungan, ketahanan pangan kota, dan budaya literasi sejak dini.',
    answers: 'kebutuhan transisi energi',
    icon: 'sprout',
    programs: [
      {
        name: 'ThreeL Berakar',
        short: 'Pertanian kota dan penghijauan lingkungan.',
        long: 'Pertanian kota dan penghijauan. Mengubah lahan sempit menjadi sumber pangan dan ruang belajar.',
        target: 'Warga perkotaan dan sekolah',
      },
      {
        name: 'ThreeL Bertumbuh',
        short: 'Edukasi lingkungan dan literasi hijau untuk anak dan remaja.',
        long: 'Edukasi lingkungan dan literasi hijau, termasuk pengenalan energi terbarukan untuk anak dan remaja.',
        target: 'Anak dan remaja',
      },
      {
        name: 'ThreeL Berkelana',
        short: 'Jelajah literasi ke daerah yang minim akses bacaan.',
        long: 'Jelajah literasi ke daerah: membawa buku dan kegiatan membaca ke komunitas yang minim akses bacaan.',
        target: 'Anak di daerah dengan akses bacaan terbatas',
      },
    ],
  },
];

export type Stat = {
  label: string;
  value: string;
  statement: string;
  body: string;
  bar: { kind: 'fill'; pct: number; color: 'brand' | 'gold' } | { kind: 'segments'; filled: number; total: number };
  extraLabel: string;
  response: string;
  href: string;
  source: string;
};

export const stats: Stat[] = [
  {
    label: 'Kemiskinan & Putus Sekolah',
    value: '9,03%',
    statement: 'Penduduk Indonesia hidup di bawah garis kemiskinan.',
    body: 'Keterbatasan ekonomi keluarga menjadi salah satu penyebab utama anak berhenti sekolah.',
    bar: { kind: 'fill', pct: 9.03, color: 'brand' },
    extraLabel: 'Angka putus sekolah',
    response: 'Pilar Pendidikan & Kapasitas',
    href: '/program#pendidikan',
    source: 'Sumber: BPS, Maret 2024',
  },
  {
    label: 'Transisi Energi',
    value: '23%',
    statement: 'Target bauran energi baru terbarukan (EBT) nasional pada 2025.',
    body: 'Transisi energi butuh talenta muda yang melek teknologi dan peduli lingkungan, dari kota hingga desa.',
    bar: { kind: 'fill', pct: 23, color: 'gold' },
    extraLabel: 'Realisasi terkini',
    response: 'Pilar Lingkungan & Literasi',
    href: '/program#lingkungan',
    source: 'Sumber: Kebijakan Energi Nasional, PP No. 79/2014',
  },
  {
    label: 'Kesehatan Remaja',
    value: '1 dari 3',
    statement: 'Remaja usia 10–17 tahun mengalami masalah kesehatan mental dalam 12 bulan terakhir.',
    body: 'Kesehatan mental dan fisik remaja memengaruhi kemampuan belajar dan peluang masa depan mereka.',
    bar: { kind: 'segments', filled: 1, total: 3 },
    extraLabel: 'Kesehatan fisik remaja',
    response: 'Pilar Aksi Sosial & Kesehatan',
    href: '/program#sosial',
    source: 'Sumber: I-NAMHS 2022',
  },
];

export const impactMetrics = [
  { value: '[0.000]+', label: 'Penerima manfaat', note: 'Per [bulan tahun]', accent: false },
  { value: '[000]', label: 'Kantong darah terkumpul', note: 'ThreeL Blood · per [bulan tahun]', accent: false },
  { value: '[00]', label: 'Desa binaan', note: 'Society Impact · per [bulan tahun]', accent: false },
  { value: '[000]+', label: 'Relawan ThreeLearnian', note: 'Per [bulan tahun]', accent: true },
];

export const lookLearnLead = [
  {
    no: '01',
    title: 'Look',
    desc: 'Membaca masalah langsung dari lapangan dan data.',
    detail: 'Turun ke lapangan dan membaca data untuk memahami akar masalah sebelum bergerak.',
    tag: 'Riset & survei lapangan',
  },
  {
    no: '02',
    title: 'Learn',
    desc: 'Membekali pemuda dengan ilmu, keterampilan, dan teknologi.',
    detail: 'Membekali pemuda dengan ilmu, keterampilan, dan teknologi yang dibutuhkan untuk menjawab masalah itu.',
    tag: 'Kelas & mentoring',
  },
  {
    no: '03',
    title: 'Lead',
    desc: 'Memimpin aksi yang terukur dan berkelanjutan bagi masyarakat prasejahtera.',
    detail: 'Memimpin aksi nyata yang terukur dan berkelanjutan bersama masyarakat prasejahtera.',
    tag: 'Aksi & evaluasi dampak',
  },
];

export const missions = [
  'Membuka akses pendidikan yang berkualitas bagi siswa dari keluarga prasejahtera.',
  'Mengembangkan kepemimpinan dan keterampilan teknologi pemuda.',
  'Menjalankan aksi sosial, kesehatan, dan lingkungan yang terukur serta berkelanjutan.',
  'Membangun kolaborasi lintas sektor bersama korporasi, instansi, kampus, dan komunitas.',
];

export const coreValues = [
  { title: 'Stay Connected to God', desc: 'Setiap langkah berangkat dari iman dan integritas.' },
  { title: 'Solutioner', desc: 'Fokus pada jalan keluar, bukan sekadar menyoroti masalah.' },
  { title: 'Caring & Happiness', desc: 'Peduli pada sesama dan menjaga kebahagiaan dalam berkarya.' },
  { title: 'Committed', desc: 'Menepati janji kepada tim, mitra, dan penerima manfaat.' },
  { title: 'Collaborative', desc: 'Bekerja lintas latar belakang, kampus, dan keahlian.' },
  { title: 'Synergy', desc: 'Menyatukan kekuatan agar dampak yang dihasilkan berlipat.' },
];

export const cLevels = [
  { code: 'CMO', title: 'Chief Marketing Officer', initial: 'M', value: 'cmo', scope: 'Memimpin strategi komunikasi, branding, dan media ThreeL.' },
  { code: 'CHRO', title: 'Chief Human Resources Officer', initial: 'H', value: 'chro', scope: 'Memimpin rekrutmen, pengembangan anggota, dan budaya organisasi.' },
  { code: 'CFO', title: 'Chief Finance Officer', initial: 'F', value: 'cfo', scope: 'Memimpin penganggaran, pelaporan keuangan, dan keberlanjutan dana, termasuk kelas berbayar ThreeL Mengajar.' },
  { code: 'COO', title: 'Chief Operation Officer', initial: 'O', value: 'coo', scope: 'Memimpin eksekusi program dan operasional lapangan di tiga pilar.' },
  { code: 'CIDO', title: 'Chief Innovation and Development Officer', initial: 'I', value: 'cido', scope: 'Memimpin inovasi program dan pengembangan inisiatif baru.' },
  { code: 'CTO', title: 'Chief Technology Officer', initial: 'T', value: 'cto', scope: 'Memimpin pengembangan teknologi dan sistem digital organisasi.' },
];

export const divisions = [
  { value: 'ops', label: 'Operasional Program', skills: ['Manajemen acara', 'Logistik lapangan', 'Koordinasi relawan'], porto: 'Lampirkan laporan kegiatan atau rundown acara yang pernah kamu pegang.' },
  { value: 'edu', label: 'Pendidikan', skills: ['Pengajaran', 'Penyusunan materi', 'Kurikulum bimbel'], porto: 'Lampirkan contoh materi ajar atau rekaman sesi mengajar.' },
  { value: 'mkt', label: 'Marketing & Media', skills: ['Konten media sosial', 'Desain grafis', 'Copywriting'], porto: 'Behance atau folder Drive berisi desain dan konten terbaikmu.' },
  { value: 'hr', label: 'HR & Keanggotaan', skills: ['Rekrutmen', 'Pengembangan anggota', 'Budaya organisasi'], porto: 'Lampirkan program kaderisasi atau acara internal yang pernah kamu rancang.' },
  { value: 'fin', label: 'Finance & Bisnis Internal', skills: ['Penganggaran', 'Laporan keuangan', 'Unit usaha'], porto: 'Lampirkan contoh RAB atau laporan keuangan (data sensitif disamarkan).' },
  { value: 'tech', label: 'Teknologi', skills: ['Pengembangan web', 'Data', 'UI/UX'], porto: 'Tautan GitHub atau proyek yang bisa dicoba langsung.' },
];

export const workflow = [
  { no: '01', tag: 'LOOK', title: 'Asesmen kebutuhan', desc: 'Survei lapangan dan data sekunder untuk memetakan masalah.', gold: true },
  { no: '02', tag: 'LEARN', title: 'Perancangan & pelatihan', desc: 'Menyusun program, anggaran, dan membekali relawan.', gold: true },
  { no: '03', tag: 'LEAD', title: 'Eksekusi aksi', desc: 'Program berjalan di lapangan bersama mitra dan relawan.', gold: true },
  { no: '04', tag: 'UKUR', title: 'Evaluasi dampak', desc: 'Mengukur capaian terhadap target dan mendokumentasikan kegiatan.', gold: false },
  { no: '05', tag: 'LAPOR', title: 'Laporan terbuka', desc: 'Laporan dampak dan keuangan dibagikan ke mitra dan publik.', gold: false },
];

export const partnerTypes = [
  {
    id: 'csr',
    icon: 'building' as const,
    title: 'Korporasi (CSR)',
    desc: 'Salurkan program CSR ke inisiatif yang terukur di bidang pendidikan, kesehatan, dan lingkungan.',
    forms: ['Pendanaan program atau beasiswa bimbel', 'Employee volunteering', 'Sponsor kegiatan lapangan'],
  },
  {
    id: 'medis',
    icon: 'medical' as const,
    title: 'Instansi Medis (PMI / RS)',
    desc: 'Kolaborasi aksi donor darah dan edukasi kesehatan bersama jaringan relawan muda.',
    forms: ['Penyelenggaraan donor darah (ThreeL Blood)', 'Pemeriksaan kesehatan dan bakti sosial', 'Edukasi kesehatan remaja'],
  },
  {
    id: 'kampus',
    icon: 'users' as const,
    title: 'Kampus & Komunitas',
    desc: 'Tukar pengetahuan dan jalankan program bersama antarorganisasi pemuda.',
    forms: ['Studi banding organisasi', 'Kolaborasi program dan acara', 'Pengabdian masyarakat bersama'],
  },
];

export const partnerSteps = [
  { no: '01', title: 'Ajukan', desc: 'Isi formulir di halaman ini atau kirim email ke tim kemitraan.' },
  { no: '02', title: 'Diskusi kebutuhan', desc: 'Tim menghubungi dalam [x] hari kerja untuk menyelaraskan tujuan.' },
  { no: '03', title: 'Kesepakatan', desc: 'Penyusunan proposal dan penandatanganan MoU atau PKS.' },
  { no: '04', title: 'Pelaksanaan & laporan', desc: 'Program berjalan, mitra menerima laporan dampak dan keuangan.' },
];

export type NewsCategory = 'artikel' | 'rilis' | 'arsip';

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  title: string;
  program: string;
  date: string;
  excerpt: string;
  featured?: boolean;
};

export const newsCategories: Record<NewsCategory, { label: string; cta: string }> = {
  artikel: { label: 'Artikel', cta: 'Baca artikel' },
  rilis: { label: 'Rilis Pers', cta: 'Baca rilis' },
  arsip: { label: 'Arsip Publikasi', cta: 'Lihat dokumen' },
};

export const news: NewsItem[] = [
  {
    slug: 'threel-blood-pmi',
    category: 'rilis',
    featured: true,
    title: 'ThreeL Blood bersama PMI: [jumlah] kantong darah terkumpul di [lokasi]',
    program: 'ThreeL Blood',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan rilis: jumlah pendonor, mitra yang terlibat, dan tindak lanjut kegiatan.]',
  },
  {
    slug: 'subsidi-silang-threel-mengajar',
    category: 'artikel',
    title: 'Cara kerja subsidi silang ThreeL Mengajar, dari kelas TPB ITB ke bimbel gratis',
    program: 'ThreeL Mengajar',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan artikel tentang model subsidi silang.]',
  },
  {
    slug: 'threel-berakar-kebun-kota',
    category: 'rilis',
    title: 'ThreeL Berakar menanam [jumlah] bibit di kebun kota [lokasi]',
    program: 'ThreeL Berakar',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan kegiatan penanaman.]',
  },
  {
    slug: 'look-learn-lead-kerangka-relawan',
    category: 'artikel',
    title: 'Look, Learn, Lead: kerangka kerja relawan ThreeL di lapangan',
    program: 'Organisasi',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan artikel tentang kerangka kerja relawan.]',
  },
  {
    slug: 'laporan-dampak-semester',
    category: 'arsip',
    title: 'Laporan Dampak Semester [I/II] [tahun]',
    program: 'Laporan resmi',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan isi laporan dampak.]',
  },
  {
    slug: 'threel-berbagi-paket-bantuan',
    category: 'rilis',
    title: 'ThreeL Berbagi menyalurkan [jumlah] paket bantuan untuk keluarga prasejahtera',
    program: 'ThreeL Berbagi',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan kegiatan penyaluran.]',
  },
  {
    slug: 'kesehatan-mental-remaja-threel-hope',
    category: 'artikel',
    title: 'Kesehatan mental remaja: pelajaran dari ThreeL Hope',
    program: 'ThreeL Hope',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan artikel ThreeL Hope.]',
  },
  {
    slug: 'profil-organisasi',
    category: 'arsip',
    title: 'Profil Organisasi ThreeL Community [tahun]',
    program: 'Dokumen kemitraan',
    date: '[dd Bulan 2026]',
    excerpt: '[Ringkasan profil organisasi.]',
  },
];

export const contact = {
  email: 'community.threel@gmail.com',
  instagram: 'threel.comm',
  instagramUrl: 'https://www.instagram.com/threel.comm',
};
