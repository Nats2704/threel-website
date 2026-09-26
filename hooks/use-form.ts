'use client';

import { useState, type FormEvent } from 'react';
import { validate, type Errors, type Schema } from '@/lib/validation';

/**
 * State formulir + validasi. Error baru ditampilkan setelah percobaan kirim
 * pertama, lalu diperbarui langsung saat pengguna memperbaiki isian.
 * `onValid` adalah titik sambung ke backend nanti (fetch / Server Action).
 */
export function useForm<T extends Record<string, unknown>>(
  initial: T,
  schemaFor: (values: T) => Schema<T>,
  onValid?: (values: T) => void | Promise<void>,
) {
  const [values, setValues] = useState<T>(initial);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const allErrors = validate(values, schemaFor(values));
  const errors: Errors<T> = tried ? allErrors : {};
  const errorCount = Object.keys(errors).length;

  function set<K extends keyof T>(key: K, value: T[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    setTried(true);
    const invalid = Object.keys(allErrors);
    if (invalid.length > 0) {
      document.getElementById(invalid[0])?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await onValid?.(values);
      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setValues(initial);
    setTried(false);
    setSent(false);
  }

  return { values, set, errors, allErrors, errorCount, submit, reset, sent, submitting };
}
