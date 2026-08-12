"use client";

import { useCallback, useEffect, useState } from "react";

export type NexoraLanguage = "en" | "zh";

const STORAGE_KEY = "nexora-language";
const LANGUAGE_EVENT = "nexora:language-change";

function isLanguage(value: string | null): value is NexoraLanguage {
  return value === "en" || value === "zh";
}

export function useNexoraLanguage() {
  const [language, setLanguageState] = useState<NexoraLanguage>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const timer = isLanguage(stored) ? window.setTimeout(() => {
      setLanguageState(stored);
      document.documentElement.lang = stored === "zh" ? "zh-CN" : "en";
    }, 0) : undefined;

    const syncStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isLanguage(event.newValue)) setLanguageState(event.newValue);
    };
    const syncPage = (event: Event) => {
      const value = (event as CustomEvent<NexoraLanguage>).detail;
      if (isLanguage(value)) setLanguageState(value);
    };

    window.addEventListener("storage", syncStorage);
    window.addEventListener(LANGUAGE_EVENT, syncPage);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(LANGUAGE_EVENT, syncPage);
    };
  }, []);

  const setLanguage = useCallback((value: NexoraLanguage) => {
    setLanguageState(value);
    window.localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.lang = value === "zh" ? "zh-CN" : "en";
    window.dispatchEvent(new CustomEvent<NexoraLanguage>(LANGUAGE_EVENT, { detail: value }));
  }, []);

  return [language, setLanguage] as const;
}
