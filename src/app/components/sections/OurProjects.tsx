"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import Titles from "../ui/Titles";
import Buttons from "../ui/Buttons";

type IImage = {
  id: number;
  src: string;
  alt: string;
  link: string;
};
const imgs: IImage[] = [
  {
    id: 1,
    src: "/images/project1.webp",
    alt: "project-01",
    link: "/",
  },
  {
    id: 2,
    src: "/images/project2.webp",
    alt: "project-02",
    link: "/",
  },
  {
    id: 3,
    src: "/images/project3.webp",
    alt: "project-03",
    link: "/",
  },
  {
    id: 4,
    src: "/images/project4.webp",
    alt: "project-04",
    link: "/",
  },
];

const OurProjects = () => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto my-10 md:my-30 px-5 xl:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Titles>{language === 'en' ? 'Our Projects' : 'أعمالنا'}</Titles>
        <Buttons style="hidden sm:flex" href="/">{language === 'en' ? 'See More' : 'شاهد المزيد'}</Buttons>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 xl:gap-10 justify-items-center">
        {imgs.map((img) => (
          <div
            key={img.id}
            className="relative w-70 sm:w-90 lg:w-60 h-80 xl:w-80 xl:h-100 2xl:w-90 2xl:h-120 rounded-2xl overflow-hidden shadow-lg group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <Link
              href={img.link}
              role="button"
              className={`absolute bottom-5 ${
                language === "en" ? "right-5" : "left-5"
              } bg-black/70 text-white hover:text-[hsl(var(--background))] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[hsl(var(--secondary))] transition`}
            >
              {language === "en" ? "See Project" : "شاهد المشروع"}
            </Link>
          </div>
        ))}
        <Buttons style="flex sm:hidden px-25" href="/">{language === 'en' ? 'See More' : 'شاهد المزيد'}</Buttons>
      </div>
    </section>
  );
};

export default OurProjects;
