'use client'
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

type TTitle = {
  children: string;
};

const Titles = ({ children }: TTitle) => {
  const { language } = useLanguage();

  return (
    <h2 className={`text-5xl lg:text-6xl font-bold uppercase relative md:after:absolute md:after:-bottom-2 ${language === 'en' ? 'md:after:left-0 md:text-left' : 'md:after:right-0 md:text-right'} text-center md:after:w-[80px] md:after:h-1 md:after:bg-[hsl(var(--secondary))] rounded-3xl my-10`}>
      {children}
    </h2>
  );
};

export default Titles;
