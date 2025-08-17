"use client";
import { LanguageProvider } from "./LanguageProvider";

export default function ClientLanguageProvider({
  children,
  defaultLanguage,
}: {
  children: React.ReactNode;
  defaultLanguage?: "en" | "ar";
}) {
  return (
    <LanguageProvider defaultLanguage={defaultLanguage}>
      {children}
    </LanguageProvider>
  );
}
