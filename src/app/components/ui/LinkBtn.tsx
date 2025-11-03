"use client";
// importing Next Components
import Link from "next/link";
// importing React-Icons
import { RiWhatsappFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Framer-Motion
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LinkBtn = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  return (
    <>
      {!pathname.startsWith('/admin') && (
        <div
          className={`flex flex-col items-center gap-5 fixed top-70 md:top-100 z-1000 ${
            language === "en" ? "right-5 sm:right-7" : "left-7 sm:left-5"
          }`}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link
              href={"https://wa.me/+966543348930"}
              target="_blank"
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer transition-all"
            >
              <RiWhatsappFill size={25} />
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link
              href={"mailto:siteservicerequest@al-marketer.com"}
              target="_blank"
              className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer transition-all"
            >
              <FaEnvelope size={25} />
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LinkBtn;
