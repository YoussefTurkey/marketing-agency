"use client";
// Importing Next Compoentns
import Image from "next/image";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "@/app/components/ui/Titles";
import AuroraView from "@/app/components/ui/AuroraText";

const About = () => {
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
          {language === "en" ? "About Us" : "من نحن"}
        </Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between gap-y-5 sm:gap-y-0 sm:mx-30"
      >
        <div className="flex flex-col gap-y-5">
          <AuroraView />
          <p className="text-lg xl:text-2xl lg:leading-8 xl:leading-10 w-full xl:w-200">
            {language === "en"
              ? "Where the world beats! Take your digital presence to the top with Adsilla  the leading digital marketing company in Saudi Arabia that goes beyond being just an advertising agency, becoming a true driver of growth and innovation across all digital fields."
              : "حيث ينبض العالم!، اتجه بنشاطك الرقمي نحو القمة مع أفضل شركة تسويق الكتروني في السعودية، “أدسيلا” الشركة الرائدة التي تجاوزت التوقعات ككونها مجرد وكالة دعاية تقليدية إلى مصدرًا للتقدم والتطور  في كافة المجالات الرقمية."}
          </p>
        </div>
        <div>
          <Image
            src={"/images/info.webp"}
            alt="info"
            loading="lazy"
            width={1000}
            height={1000}
          />
        </div>
      </motion.div>
    </main>
  )
}

export default About