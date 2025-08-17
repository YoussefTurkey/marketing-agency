"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { useTheme } from "@/app/lib/theme/ThemeProvider";
// Importing Components
import LanguageToggle from "@/app/lib/lang/LanguageToggle";
import ThemeToggle from "@/app/lib/theme/ThemeToggle";
import Buttons from "../ui/Buttons";
// Importing React-Icons
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  return (
    <header className={`container mx-auto flex items-center justify-between w-[95%] xl:w-full px-10 py-5 fixed top-5 left-2.5 md:left-5 lg:left-6.5 xl:left-20 2xl:left-45 backdrop-blur-sm rounded-lg border-[1px] ${theme === 'dark' ? 'border-[#ffffff30] bg-white/10' : 'border-[#00000030] bg-black/5'}`}>
      <div className="flex items-center gap-10">
        {/* logo */}
        {language === "en" ? (
          <Image
            src={
              theme === "dark" ? "/images/logo-dark.webp" : "/images/logo.webp"
            }
            width={150}
            height={150}
            alt="logo"
            loading="lazy"
          />
        ) : (
          <Image
            src={
              theme === "dark"
                ? "/images/logoAr-dark.webp"
                : "/images/logoAr.webp"
            }
            width={150}
            height={150}
            alt="logo"
            loading="lazy"
          />
        )}

        {/* Links */}
        <ul className="hidden lg:flex items-center gap-10">
          <li className="group">
            <Link
              href={"/"}
              className="group-hover:text-[hsl(var(--secondary))]"
            >
              {language === "en" ? "Our Projects" : "أعمالنا"}
            </Link>
          </li>
          <li className="group">
            <Link
              href={"/"}
              className="group-hover:text-[hsl(var(--secondary))]"
            >
              {language === "en" ? "Our Team" : "الفريق"}
            </Link>
          </li>
          <li className="group">
            <Link
              href={"/"}
              className="group-hover:text-[hsl(var(--secondary))]"
            >
              {language === "en" ? "Testimionals" : "قصص النجاح"}
            </Link>
          </li>
          <li className="group">
            <Link
              href={"/"}
              className="group-hover:text-[hsl(var(--secondary))]"
            >
              {language === "en" ? "FAQs" : "الأسئلة الشائعة"}
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <LanguageToggle />
        <ThemeToggle />
        <Buttons href="/">
          {language === "en" ? "get in touch" : "تواصل معنا"}
        </Buttons>
        <button className="flex lg:hidden"><GiHamburgerMenu size={30} /></button>
      </div>


    </header>
  );
};

export default Header;
