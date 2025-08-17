'use client'
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "Language",
}: LanguageProviderProps) {
  // ابدأ بالقيمة الافتراضية فقط
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  
  // استخدم useEffect لتحميل القيمة المخزنة بعد التركيب في المتصفح
  useEffect(() => {
    const savedLanguage = localStorage.getItem(storageKey) as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [storageKey]);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", language);
    html.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  const value = {
    language,
    setLanguage: (language: Language) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, language);
      }
      setLanguage(language);
    },
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};