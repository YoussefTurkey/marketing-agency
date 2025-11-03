"use client";
// Importing Next Components
import Image from "next/image";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing Components
import Titles from "@/app/components/ui/Titles";
import ProjectCarousel from "@/app/components/ui/ProjectCarousel";
// Types
import type { PortfolioItem } from "@/types/globalTypes";

interface SingleProjectClientProps {
  singleProj: PortfolioItem;
}

export default function SingleProjectClient({ singleProj }: SingleProjectClientProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // التحقق من وجود الصورة
  const hasImage = singleProj.image && singleProj.image.trim() !== "";
  // التحقق من وجود المقال
  const hasArticle = (language === "en" ? singleProj.articleEn : singleProj.articleAr)?.trim() !== "";
  // التحقق من وجود الخدمات
  const hasServices = (language === "en" ? singleProj.info.servicesEn : singleProj.info.servicesAr)?.length > 0;

  return (
    <section
      ref={ref}
      className="container mx-auto my-30 px-5 xl:px-0"
    >
      {/* العنوان الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <Titles>{language === "en" ? singleProj.titleEn : singleProj.titleAr}</Titles>
      </motion.div>

      {/* معلومات المشروع */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8"
      >
        {/* الصورة الرئيسية */}
        <div className="lg:col-span-2">
          {hasImage ? (
            <Image
              src={singleProj.image}
              alt={language === "en" ? singleProj.titleEn : singleProj.titleAr}
              width={1000}
              height={600}
              loading="lazy"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500 text-lg">
                {language === "en" ? "No Image Available" : "لا توجد صورة متاحة"}
              </span>
            </div>
          )}
        </div>

        {/* المعلومات الجانبية */}
        <div className="bg-[hsl(var(--secondary)/0.1)] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">
            {language === "en" ? "Project Details" : "تفاصيل المشروع"}
          </h3>
          
          <div className="space-y-3">
            <div>
              <strong>{language === "en" ? "Client:" : "العميل:"}</strong>
              <p>{language === "en" ? singleProj.info.clientEn : singleProj.info.clientAr}</p>
            </div>
            
            <div>
              <strong>{language === "en" ? "Category:" : "الفئة:"}</strong>
              <p>{language === "en" ? singleProj.categoryEn : singleProj.categoryAr}</p>
            </div>
            
            <div>
              <strong>{language === "en" ? "Industry:" : "المجال:"}</strong>
              <p>{language === "en" ? singleProj.info.industryEn : singleProj.info.industryAr}</p>
            </div>
            
            <div>
              <strong>{language === "en" ? "Country:" : "البلد:"}</strong>
              <p>{language === "en" ? singleProj.info.countryEn : singleProj.info.countryAr}</p>
            </div>
          </div>

          {/* الخدمات */}
          {hasServices && (
            <div className="mt-6">
              <strong>{language === "en" ? "Services:" : "الخدمات:"}</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(language === "en" ? singleProj.info.servicesEn : singleProj.info.servicesAr).map((service, index) => (
                  <span 
                    key={index}
                    className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* الوصف - يظهر فقط إذا كان هناك محتوى */}
      {hasArticle && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            {language === "en" ? "About the Project" : "حول المشروع"}
          </h3>
          <p className="text-lg leading-relaxed">
            {language === "en" ? singleProj.articleEn : singleProj.articleAr}
          </p>
        </motion.div>
      )}

      {/* المشاريع المشابهة */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="flex items-center justify-between mt-20 border-t pt-8"
      >
        <Titles>{language === "en" ? 'Related Projects' : 'مشاريع مشابهة'}</Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <ProjectCarousel />
      </motion.div>
    </section>
  );
}