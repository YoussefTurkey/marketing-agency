"use client";
// Importing Next Components
import Image from "next/image";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing type of data
import type { ITeam } from "@/app/data/database";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
import Titles from "@/app/components/ui/Titles";

export default function TeamMemberClient({ member }: { member: ITeam }) {
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
    <section
      ref={ref}
      className="container mx-auto my-30 px-5 xl:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Titles>{language === "en" ? member.nameEn : member.nameAr}</Titles>
        <p className="text-lg text-[hsl(var(--secondary))] mb-5">
          {language === "en" ? member.roleEn : member.roleAr}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center sm:items-start"
      >
        <Image
          src={member.image}
          alt={language === "en" ? member.nameEn : member.nameAr}
          width={1000}
          height={1000}
          loading="lazy"
          className="w-64 h-64 object-cover rounded-full shadow-lg mb-5"
        />
        {language === "en"
          ? member.bioEn.map((line, idx) => (
              <p key={idx} className="leading-relaxed text-left w-75 sm:w-full">
                {line}
              </p>
            ))
          : member.bioAr.map((line, idx) => (
              <p key={idx} className="leading-relaxed text-right w-75 sm:w-full">
                {line}
              </p>
            ))}
      </motion.div>
    </section>
  );
}
