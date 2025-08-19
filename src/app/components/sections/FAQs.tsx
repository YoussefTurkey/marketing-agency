"use client";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing React-Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

type IFAQ = {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};

const FAQs = () => {
  const { language } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  const faq: IFAQ[] = [
    {
      id: 1,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 2,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 3,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 4,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
  ];

  return (
    <section
      ref={ref}
      className="container mx-auto my-10 md:my-30 px-5 xl:px-0"
      id="faqs"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Titles>{language === "en" ? "FAQ's" : "الأسئلة الشائعة"}</Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-200"
      >
        {faq.map((quest) => (
          <div
            key={quest.id}
            onClick={
              () => setOpenFAQ(openFAQ === quest.id ? null : quest.id) // toggle بالـ id
            }
            className="cursor-pointer border border-[hsl(var(--foreground))] rounded-2xl shadow-lg p-10 my-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg w-50 sm:w-full text-[hsl(var(--secondary))]">
                {language === "en" ? quest.titleEn : quest.titleAr}
              </p>
              <span className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer transition-all">
                {openFAQ === quest.id ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </span>
            </div>

            {openFAQ === quest.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pt-5"
              >
                <p>{language === "en" ? quest.descEn : quest.descAr}</p>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQs;
