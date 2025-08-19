"use client";
// Importing Next Compoentns
import Image from "next/image";
import Link from "next/link";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "@/app/components/ui/Titles";
// Importing React-Icons
import { LuDownload } from "react-icons/lu";
// Importing data
import { project } from "@/app/data/database";

const Projects = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // once animated, stop observing
          }
        });
      },
      { threshold: 0.2 } // 20% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <main ref={ref} className="container mx-auto my-30 px-5 xl:px-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <Titles style="!w-fit">
          {language === "en" ? "Our Projects" : "مشاريعنا"}
        </Titles>
        <Link
          href="/pdfs/This-Is-Marketing.pdf"
          target="_blank"
          role="button"
          className={`flex ${
            language === "en" ? "flex-row" : "flex-row-reverse"
          } items-center justify-center md:text-md p-3 sm:px-[25px] sn:py-[10px] rounded-full sm:rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold`}
        >
          <span className="sm:pr-2 text-lg">
            <LuDownload />
          </span>
          <span className="hidden sm:flex">{language === 'en' ? 'Download as PDF' : 'إحفظه كـ PDF'}</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10"
      >
        {project.map((proj) => (
          <div
            key={proj.id}
            className="relative w-full sm:w-90 lg:w-60 h-80 xl:w-80 xl:h-100 2xl:w-90 2xl:h-120 rounded-2xl overflow-hidden shadow-lg group"
          >
            <Image
              src={proj.src}
              alt={proj.alt}
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </motion.div>
    </main>
  );
};

export default Projects;
