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
// Importing data
import { teams } from "@/app/data/database";

const Teams = () => {
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
        <Titles>
          {language === "en" ? "Our Team" : "فريقنا"}
        </Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10"
      >
        {teams.map(person => (
            <div key={person.id} className="relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={person.image}
                width={1000}
                height={1000}
                alt={language === 'en' ? person.nameEn : person.nameAr}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
                <Link
                  href={`/teams/${person.slug}`}
                  role="button"
                  className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] px-4 py-2 rounded-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {language === "en" ? "See Profile" : "عرض ملفه"}
                </Link>

                <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
                  {language === 'en' ? person.nameEn : person.nameAr}
                </p>
              </div>
            </div>
        ))}
      </motion.div>
    </main>
  )
}

export default Teams