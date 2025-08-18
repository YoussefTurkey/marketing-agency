"use client";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
import Buttons from "../ui/Buttons";
import TeamCarousel from "../ui/TeamCarousel";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";

const OurTeam = () => {
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
      className="container mx-auto my-10 md:my-30 px-5 xl:px-0"
      id="teams"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Titles>{language === "en" ? "Our Team" : "فريقنا"}</Titles>
        <Buttons style="hidden sm:flex" href="/">
          {language === "en" ? "See More" : "شاهد المزيد"}
        </Buttons>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      >
        <TeamCarousel />
      </motion.div>
    </section>
  );
};

export default OurTeam;
