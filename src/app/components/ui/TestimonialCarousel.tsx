"use client";
// Imporing Next Components
import Image from "next/image";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing React Components
import { useEffect, useState } from "react";
// Importing Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type ITesti = {
  id: number;
  src: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
};

export default function TestimonialCarousel({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  const { language } = useLanguage();
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  const testi: ITesti[] = [
    {
      id: 1,
      src: "/images/ceo.webp",
      nameAr: "إيميلي ستونس",
      nameEn: "Emily Stones",
      titleAr: "المدير التنفيذي لشركة جورو التسويقية",
      titleEn: "CEO, Marketing Guru",
      messageAr:
        "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
      messageEn:
        "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
    },
    {
      id: 2,
      src: "/images/ceo.webp",
      nameAr: "إيميلي ستونس",
      nameEn: "Emily Stones",
      titleAr: "المدير التنفيذي لشركة جورو التسويقية",
      titleEn: "CEO, Marketing Guru",
      messageAr:
        "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
      messageEn:
        "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
    },
    {
      id: 3,
      src: "/images/ceo.webp",
      nameAr: "إيميلي ستونس",
      nameEn: "Emily Stones",
      titleAr: "المدير التنفيذي لشركة جورو التسويقية",
      titleEn: "CEO, Marketing Guru",
      messageAr:
        "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
      messageEn:
        "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
    },
    {
      id: 4,
      src: "/images/ceo.webp",
      nameAr: "إيميلي ستونس",
      nameEn: "Emily Stones",
      titleAr: "المدير التنفيذي لشركة جورو التسويقية",
      titleEn: "CEO, Marketing Guru",
      messageAr:
        "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
      messageEn:
        "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
    },
    {
      id: 5,
      src: "/images/ceo.webp",
      nameAr: "إيميلي ستونس",
      nameEn: "Emily Stones",
      titleAr: "المدير التنفيذي لشركة جورو التسويقية",
      titleEn: "CEO, Marketing Guru",
      messageAr:
        "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
      messageEn:
        "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
    },
  ];

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
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        dir={dir}
      >
        {testi.map((card) => (
          <SwiperSlide key={card.id}>
            <div
              className={`border border-[hsl(var(--foreground))] rounded-2xl shadow-lg p-10 flex flex-col gap-5 ${
                language === "en" ? "items-start" : "items-end"
              }`}
            >
              <p className="text-xl">
                {language === "en" ? card.messageEn : card.messageAr}
              </p>
              <div
                className={`flex ${
                  language === "en" ? "flex-row" : "flex-row-reverse"
                } items-center gap-2`}
              >
                <Image
                  src={card.src}
                  width={500}
                  height={500}
                  alt={language === "en" ? card.nameEn : card.nameAr}
                  loading="lazy"
                  className="rounded-full w-10 h-10 object-cover"
                />

                <div>
                  <h4 className="font-bold text-lg">
                    {language === "en" ? card.nameEn : card.nameAr}
                  </h4>
                  <p className="text-md">
                    {language === "en" ? card.titleEn : card.titleAr}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
