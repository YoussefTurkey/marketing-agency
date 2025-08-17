'use client'
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

type TTitle = {
  children: string;
};

const Titles = ({ children }: TTitle) => {
  const { language } = useLanguage();

  return (
    <h2 className={`text-6xl font-bold uppercase relative after:absolute after:-bottom-2 ${language === 'en' ? 'after:left-0' : 'after:right-0'} after:w-[80px] after:h-1 after:bg-[hsl(var(--secondary))] rounded-3xl my-10`}>
      {children}
    </h2>
  );
};

export default Titles;
