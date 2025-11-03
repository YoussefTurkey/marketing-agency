"use client";
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { LuLoaderCircle } from "react-icons/lu";

const Loading = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-800 transition-colors">
      <LuLoaderCircle
        size={48}
        className="animate-spin text-blue-600 dark:text-blue-400"
      />
      <span className="capitalize text-xl font-medium tracking-wide">
        {language === "en" ? "Loading..." : "جاري التحميل"}
      </span>
    </div>
  );
};

export default Loading;
