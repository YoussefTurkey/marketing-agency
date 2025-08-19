"use client";
// Imporing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing React Components
import { useEffect, useState } from "react";
// Importing Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// Importing data
import { project } from "@/app/data/database";

export default function ProjectCarousel({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  const { language } = useLanguage();
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return (
    <div
      dir={dir}
      className="w-full container mx-auto py-10 relative cursor-grab"
    >
      <Swiper
        modules={[Autoplay]} // ✅ أضفنا Autoplay هنا
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 2000, // ⏱ كل 3 ثواني يغير سلايد
          disableOnInteraction: false, // المستخدم لو لعب بالكاروسيل بيرجع يكمل اوتوماتيك
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        dir={dir}
      >
        {project.map((proj) => (
          <SwiperSlide key={proj.id}>
            <div className="relative w-full sm:w-90 lg:w-60 h-80 xl:w-80 xl:h-100 2xl:w-90 2xl:h-120 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={proj.src}
                alt={proj.alt}
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <Link
                href={proj.link}
                role="button"
                className={`absolute bottom-5 ${
                  language === "en" ? "right-5" : "left-5"
                } bg-black/70 text-white hover:text-[hsl(var(--background))] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[hsl(var(--secondary))] transition`}
              >
                {language === "en" ? "See Project" : "شاهد المشروع"}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
