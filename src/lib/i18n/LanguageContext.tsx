"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

export type Locale = "en" | "vi";
export type Translations = typeof vi;

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const translations: Record<Locale, Translations> = { en, vi };

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("vi");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("invamax_fa_lang") as Locale | null;
    if (saved && (saved === "en" || saved === "vi")) {
      setLocaleState(saved);
    } else {
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("vi")) {
        setLocaleState("vi");
      } else {
        setLocaleState("en");
      }
    }
    setIsLoaded(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("invamax_fa_lang", newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      <div style={{ visibility: isLoaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
