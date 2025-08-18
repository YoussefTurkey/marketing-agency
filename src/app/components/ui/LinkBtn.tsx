'use client'
// importing Next Components
import Link from "next/link";
// importing React-Icons
import { RiWhatsappFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

const LinkBtn = () => {
  const { language } = useLanguage();
  return (
    <div className={`flex flex-col items-center gap-5 fixed top-100 z-1000 ${language === 'en' ? 'right-5 sm:right-7' : 'left-7 sm:left-5'}`}>
      <Link href={"/"} target="_blank" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition-all">
        <RiWhatsappFill size={20} />
      </Link>
      <Link href={"/"} target="_blank" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition-all">
        <FaEnvelope size={20} />
      </Link>
    </div>
  );
};

export default LinkBtn;
