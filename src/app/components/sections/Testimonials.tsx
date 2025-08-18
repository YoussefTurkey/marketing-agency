"use client";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
import TestimonialCarousel from "../ui/TestimonialCarousel";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
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
      id="testimonials"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Titles>
          {language === "en"
            ? "Client Success, Our Priority"
            : "نجاح عميلنا هو أولويــــــــــــــــــتنا"}
        </Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <TestimonialCarousel/>
      </motion.div>
    </section>
  );
};

export default Testimonials;
