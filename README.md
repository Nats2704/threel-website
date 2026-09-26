# ThreeL Community — Website

Situs resmi ThreeL Community, diterjemahkan dari desain kanvas ke kode.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ikon Lucide.

Tahap ini **frontend saja**: semua menu, tombol, filter, dan formulir bisa ditekan dan divalidasi,
tetapi belum mengirim data ke server.

## Menjalankan di localhost

```bash
npm install
npm run dev
```

Buka http://localhost:3000 (jika port 3000 dipakai, Next.js menampilkan port lain di terminal).

## Peta halaman

| Rute                 | Isi                                                               |
| -------------------- | ----------------------------------------------------------------- |
| `/`                  | Beranda: hero, konteks masalah, 3 pilar, ThreeL Mengajar, dampak  |
| `/tentang`           | Visi, misi, 6 core values, struktur organisasi                    |
| `/program`           | Detail 3 pilar & 9 program, alur kerja (`#pendidikan`, `#sosial`, `#lingkungan`, `#alur`) |
| `/bermitra`          | Jenis mitra, alur kemitraan, formulir pengajuan (`#form`)         |
| `/kabar`             | Filter kategori + daftar publikasi                                |
| `/kabar/[slug]`      | Halaman detail artikel/rilis                                      |
| `/daftar`            | Gateway 3 peran + tabel perbandingan                              |
| `/daftar/bod`        | Formulir Board of Director (formal)                               |
| `/daftar/associate`  | Formulir Associate (progres & profil keahlian dinamis)            |
| `/daftar/member`     | Formulir relawan ThreeLearnian (ringkas)                          |

## Mengubah konten & status rekrutmen

- **Teks, program, angka, berita:** `lib/content.ts`. Teks dalam `[kurung siku]` adalah placeholder.
- **Open Batch / Daftar Tunggu:** `lib/recruitment.ts` (`bod`, `associate`: `'open'` atau `'waitlist'`).
- **Aturan validasi:** `lib/validation.ts`.
- **Warna brand:** blok `@theme` di `app/globals.css`.

## Menyambungkan backend nanti

Setiap formulir memakai hook `useForm` (`hooks/use-form.ts`) dengan parameter ketiga `onValid`.
Isi fungsi itu dengan pemanggilan API / Server Action, misalnya:

```ts
const form = useForm(initial, schema, async (values) => {
  await fetch('/api/pendaftaran/bod', { method: 'POST', body: toFormData(values) });
});
```

Validasi di klien hanya untuk kenyamanan pengguna; jalankan ulang aturan yang sama di server.
