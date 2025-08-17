"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { useTheme } from "@/app/lib/theme/ThemeProvider";

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  return (
    <footer className={`container mx-auto flex items-center justify-between w-[95%] xl:w-full px-10 py-5 backdrop-blur-sm rounded-lg border-[1px] ${theme === 'dark' ? 'border-[#ffffff30] bg-white/10' : 'border-[#00000030] bg-black/5'}`}>
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between text-center md:text-left w-full">
        <div>{language === 'en' ? 'Copyright © 2025 MAZNEXA. All rights reserved.' : 'حقوق النشر © 2025 MAZNEXA. كل الحقوق محفوظة.'}</div>

        <div className="flex items-center gap-10">
          <Link href={'/'} className="hover:text-[hsl(var(--secondary))]">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
          <Link href={'/'} className="hover:text-[hsl(var(--secondary))]">{language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}</Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer