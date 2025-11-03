"use client";
// Importing Next Components
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { useTheme } from "@/app/lib/theme/ThemeProvider";
// Importing React-Icons
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <>
      {!pathname.startsWith('/admin') && (
        <footer
          className={`container mx-auto flex flex-col items-center w-[95%] xl:w-full px-10 py-5 backdrop-blur-sm rounded-lg border-[1px] ${
            theme === "dark"
              ? "border-[#ffffff30] bg-white/10"
              : "border-[#00000030] bg-black/5"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between text-center md:text-left w-full">
            <div>
              {language === "en"
                ? "Copyright © 2025 MAZNEXA. All rights reserved."
                : "حقوق النشر © 2025 MAZNEXA. كل الحقوق محفوظة."}
            </div>

            <div className="flex flex-col gap-5 items-center">
              <div className="flex items-center gap-10">
                <Link href={"/"} className="hover:text-[hsl(var(--secondary))]">
                  {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                </Link>
                <Link href={"/"} className="hover:text-[hsl(var(--secondary))]">
                  {language === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <Link href={"/"} target="_blank">
                  <FaFacebookSquare size={22.5} />
                </Link>
                <Link href={"/"} target="_blank">
                  <BsTwitterX size={20} />
                </Link>
                <Link href={"/"} target="_blank">
                  <FaInstagramSquare size={22.5} />
                </Link>
                <Link href={"/"} target="_blank">
                  <ImLinkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
