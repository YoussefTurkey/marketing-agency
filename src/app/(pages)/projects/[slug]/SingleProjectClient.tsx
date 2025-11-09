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

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface SingleProjectClientProps {
  singleProj: PortfolioItem;
}

export default function SingleProjectClient({
  singleProj,
}: SingleProjectClientProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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

  // التحقق من وجود الصورة الرئيسية
  const hasImage = singleProj.image && singleProj.image.trim() !== "";
  
  // التحقق من وجود الصور الإضافية - مع التعامل مع الحالات غير الموجودة
  const hasAdditionalImages = singleProj.images && 
                             Array.isArray(singleProj.images) && 
                             singleProj.images.length > 0 && 
                             singleProj.images.some(img => img && img.trim() !== "");
  
  // إنشاء مصفوفة تحتوي على جميع الصور (الرئيسية + الإضافية)
  const allImages = [
    singleProj.image,
    ...(singleProj.images || [])
  ].filter(img => img && img.trim() !== "");

  // التحقق من وجود المقال
  const hasArticle =
    (language === "en"
      ? singleProj.articleEn
      : singleProj.articleAr
    )?.trim() !== "";
  
  // التحقق من وجود الخدمات
  const hasServices =
    (language === "en"
      ? singleProj.info.servicesEn
      : singleProj.info.servicesAr
    )?.length > 0;

  return (
    <section ref={ref} className="container mx-auto my-30 px-5 xl:px-0">
      {/* العنوان الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <Titles>
          {language === "en" ? singleProj.titleEn : singleProj.titleAr}
        </Titles>
      </motion.div>

      {/* معلومات المشروع */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8"
      >
        <div className="lg:col-span-2">
          {/* Swiper للصور الرئيسية */}
          <div className="flex flex-col gap-5">
            {allImages.length > 0 ? (
              <div className="project-swiper-container">
                {/* Swiper الرئيسي */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, Thumbs]}
                  navigation
                  pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="main-swiper rounded-xl shadow-lg"
                >
                  {allImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-96 md:h-[500px]">
                        <Image
                          src={img}
                          alt={`${language === "en" ? singleProj.titleEn : singleProj.titleAr} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                          className="rounded-xl"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Swiper المصغرات (Thumbnails) - يظهر فقط إذا كان هناك أكثر من صورة */}
                {allImages.length > 1 && (
                  <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    watchSlidesProgress
                    slidesPerView={4}
                    spaceBetween={10}
                    className="thumb-swiper mt-4"
                  >
                    {allImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-20 cursor-pointer opacity-50 transition-opacity hover:opacity-100 rounded-lg overflow-hidden">
                          <Image
                            src={img}
                            alt={`${language === "en" ? singleProj.titleEn : singleProj.titleAr} - Thumbnail ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 25vw, 10vw"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 text-lg">
                  {language === "en"
                    ? "No Image Available"
                    : "لا توجد صورة متاحة"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* تفاصيل المشروع */}
        <div className="bg-[hsl(var(--secondary)/0.1)] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">
            {language === "en" ? "Project Details" : "تفاصيل المشروع"}
          </h3>

          <div className="space-y-3">
            <div>
              <strong>{language === "en" ? "Client:" : "العميل:"}</strong>
              <p>
                {language === "en"
                  ? singleProj.info.clientEn || "N/A"
                  : singleProj.info.clientAr || "غير متوفر"}
              </p>
            </div>

            <div>
              <strong>{language === "en" ? "Category:" : "الفئة:"}</strong>
              <p>
                {language === "en"
                  ? singleProj.categoryEn
                  : singleProj.categoryAr}
              </p>
            </div>

            <div>
              <strong>{language === "en" ? "Industry:" : "المجال:"}</strong>
              <p>
                {language === "en"
                  ? singleProj.info.industryEn || "N/A"
                  : singleProj.info.industryAr || "غير متوفر"}
              </p>
            </div>

            <div>
              <strong>{language === "en" ? "Country:" : "البلد:"}</strong>
              <p>
                {language === "en"
                  ? singleProj.info.countryEn || "N/A"
                  : singleProj.info.countryAr || "غير متوفر"}
              </p>
            </div>
          </div>

          {/* الخدمات */}
          {hasServices && (
            <div className="mt-6">
              <strong>{language === "en" ? "Services:" : "الخدمات:"}</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(language === "en"
                  ? singleProj.info.servicesEn
                  : singleProj.info.servicesAr
                )
                .filter(service => service && service.trim() !== "")
                .map((service, index) => (
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

      {/* المقال */}
      {hasArticle && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-4">
            {language === "en" ? "About the Project" : "حول المشروع"}
          </h3>
          <p className="text-lg leading-relaxed whitespace-pre-line">
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
        <Titles>
          {language === "en" ? "Related Projects" : "مشاريع مشابهة"}
        </Titles>
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