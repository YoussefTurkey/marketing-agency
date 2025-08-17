"use client";
// importing React-Icons
import { GrLanguage } from "react-icons/gr";
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-7 h-7 md:w-10 md:h-10 flex justify-center items-center cursor-pointer transition-all"
    >
      <GrLanguage />
    </button>
  );
}
