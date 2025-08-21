"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing Components
import AuroraView from "../ui/AuroraText";
// Importing React-Icons
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Info = () => {
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
    <section ref={ref} className="container mx-auto my-0 lg:my-30 px-5 xl:px-0">
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
          {language === "en" ? (
            <Link href={"/"} className="flex items-end gap-x-2 underline decoration-[hsl(var(--secondary))] underline-offset-8">
              <span>Explore more</span>
              <span>
                <MdKeyboardDoubleArrowRight />
              </span>
            </Link>
          ) : (
            <Link href={"/"} className="flex items-end gap-x-2 underline decoration-[hsl(var(--secondary))] underline-offset-8">
              <span>اكتشف المزيد</span>
              <span>
                <MdKeyboardDoubleArrowLeft />
              </span>
            </Link>
          )}
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
    </section>
  );
};

export default Info;
