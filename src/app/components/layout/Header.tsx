"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { useTheme } from "@/app/lib/theme/ThemeProvider";
// Importing React Components
import { useState } from "react";
// Importing Components
import LanguageToggle from "@/app/lib/lang/LanguageToggle";
import ThemeToggle from "@/app/lib/theme/ThemeToggle";
import Buttons from "../ui/Buttons";
// Importing React-Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const [menu, setMenu] = useState(false);

  return (
    <header>
      <section
        className={`container mx-auto flex items-center justify-between w-[95%] xl:w-full px-10 py-5 fixed top-5 left-2.5 md:left-5 lg:left-6.5 xl:left-20 2xl:left-45 backdrop-blur-sm rounded-lg border-[1px] z-1000 ${
          theme === "dark"
            ? "border-[#ffffff30] bg-white/10"
            : "border-[#00000030] bg-black/5"
        }`}
      >
        <div className="flex items-center gap-10">
          {/* logo */}
          <Link href={"/"}>
            {language === "en" ? (
              <Image
                src={
                  theme === "dark"
                    ? "/images/logo-dark.webp"
                    : "/images/logo.webp"
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
          </Link>

          {/* Links */}
          <ul className="hidden lg:flex items-center gap-10">
            <li className="group">
              <Link
                href={"#projects"}
                className="group-hover:text-[hsl(var(--secondary))]"
              >
                {language === "en" ? "Our Projects" : "أعمالنا"}
              </Link>
            </li>
            <li className="group">
              <Link
                href={"#teams"}
                className="group-hover:text-[hsl(var(--secondary))]"
              >
                {language === "en" ? "Our Team" : "الفريق"}
              </Link>
            </li>
            <li className="group">
              <Link
                href={"#testimonials"}
                className="group-hover:text-[hsl(var(--secondary))]"
              >
                {language === "en" ? "Testimionals" : "قصص النجاح"}
              </Link>
            </li>
            <li className="group">
              <Link
                href={"#faqs"}
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
          <Buttons style="hidden sm:flex" href="/">
            {language === "en" ? "get in touch" : "تواصل معنا"}
          </Buttons>
          <button className="flex lg:hidden" onClick={() => setMenu(!menu)}>
            <GiHamburgerMenu size={30} />
          </button>
        </div>
      </section>

      <section>
        {/* Backdrop overlay */}
        <div
          onClick={() => setMenu(false)}
          className={`fixed inset-0 ${
            theme === "dark"
              ? "border-[#ffffff30] bg-black/30"
              : "border-[#00000030] bg-white/30"
          } transition-opacity duration-500
            ${menu ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        />

        <ul
          className={`
              fixed top-0 h-[100vh] w-full md:w-100 z-2000
              flex flex-col px-10 py-30 gap-5 lg:hidden
              backdrop-blur-sm rounded-lg border-[1px]
              transition-transform duration-500 ease-in-out
              ${
                theme === "dark"
                  ? "border-[#ffffff30] bg-white/5"
                  : "border-[#00000030] bg-black/5"
              }
              ${
                language === "en"
                  ? menu
                    ? "translate-x-0 right-0"
                    : "translate-x-full right-0"
                  : menu
                  ? "translate-x-0 left-0"
                  : "-translate-x-full left-0"
              }
            `}
        >
          <button
            className={`absolute top-5 ${
              language === "en" ? "left-5" : "right-5"
            }`}
            onClick={() => setMenu(!menu)}
          >
            <IoClose size={40} />
          </button>

          <li className="group border-t-1 border-b-1 py-5">
            <Link
              href={"/"}
              onClick={() => setMenu(false)}
              className="group-hover:text-[hsl(var(--secondary))] text-3xl"
            >
              {language === "en" ? "Our Projects" : "أعمالنا"}
            </Link>
          </li>
          <li className="group border-b-1 pb-5">
            <Link
              href={"/"}
              onClick={() => setMenu(false)}
              className="group-hover:text-[hsl(var(--secondary))] text-3xl"
            >
              {language === "en" ? "Our Team" : "الفريق"}
            </Link>
          </li>
          <li className="group border-b-1 pb-5">
            <Link
              href={"/"}
              onClick={() => setMenu(false)}
              className="group-hover:text-[hsl(var(--secondary))] text-3xl"
            >
              {language === "en" ? "Testimionals" : "قصص النجاح"}
            </Link>
          </li>
          <li className="group border-b-1 pb-5">
            <Link
              href={"/"}
              onClick={() => setMenu(false)}
              className="group-hover:text-[hsl(var(--secondary))] text-3xl"
            >
              {language === "en" ? "FAQs" : "الأسئلة الشائعة"}
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
