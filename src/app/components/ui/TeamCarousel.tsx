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
import { Autoplay } from "swiper/modules"; // ✅ أضفنا Autoplay
import "swiper/css";

type Card = {
  id: number;
  name: string;
  image: string;
  link: string;
};

const cards: Card[] = [
  { id: 1, name: "Person 1", image: "/images/person.webp", link: "/" },
  { id: 2, name: "Person 2", image: "/images/person2.webp", link: "/" },
  { id: 3, name: "Person 3", image: "/images/person.webp", link: "/" },
  { id: 4, name: "Person 4", image: "/images/person2.webp", link: "/" },
  { id: 5, name: "Person 5", image: "/images/person.webp", link: "/" },
  { id: 6, name: "Person 6", image: "/images/person2.webp", link: "/" },
];

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
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={card.image}
                width={1000}
                height={1000}
                alt={card.name}
                loading="lazy"
                className="w-full h-170 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
                <Link
                  href={card.link}
                  role="button"
                  className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] px-4 py-2 rounded-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  {language === "en" ? "See Profile" : "عرض ملفه"}
                </Link>

                <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-white">
                  {card.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
