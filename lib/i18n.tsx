'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Dua bahasa situs. Karena situs diekspor statis, pilihan bahasa disimpan di peramban
 * (localStorage) dan teks ditukar di sisi klien. Halaman selalu dirender awal dalam
 * bahasa Indonesia, lalu berganti ke bahasa Inggris begitu pilihan tersimpan terbaca.
 */
export type Lang = 'id' | 'en';

/** Teks dwibahasa. */
export type Bi = { id: string; en: string };

const STORAGE_KEY = 'threel-lang';

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: 'id', setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') setLangState(saved);
    } catch {
      // Penyimpanan diblokir: tetap pakai bahasa Indonesia.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Abaikan; pilihan tetap berlaku sampai halaman ditutup.
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/**
 * Mengunci bahasa untuk satu bagian halaman, apa pun pilihan pengunjung.
 * Dipakai untuk kartu pendaftaran dan formulir yang selalu berbahasa Inggris.
 */
export function LangLock({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const { setLang } = useContext(LangContext);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  /** `t('Beranda', 'Home')` atau `t({ id, en })`. */
  const t = useCallback(
    (text: Bi | string, en?: string) => (typeof text === 'string' ? (lang === 'en' && en !== undefined ? en : text) : text[lang]),
    [lang],
  );
  return { lang, setLang, t };
}

/** Teks dwibahasa untuk komponen server: `<T id="Beranda" en="Home" />` atau `<T v={bi} />`. */
export function T(props: { id: string; en: string } | { v: Bi }) {
  const { lang } = useContext(LangContext);
  const text = 'v' in props ? props.v : props;
  return <>{text[lang]}</>;
}
