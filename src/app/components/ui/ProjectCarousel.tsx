"use client";
// Importing Next Components
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
// Importing Firebase
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import type { PortfolioItem } from "@/types/globalTypes";

export default function ProjectCarousel({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  const { language } = useLanguage();
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDir(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const projectsData: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({
            id: doc.id,
            ...doc.data(),
          } as PortfolioItem);
        });

        setProjects(projectsData);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full container mx-auto py-10 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">
          {language === "en" ? "Loading projects..." : "جاري تحميل المشاريع..."}
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full container mx-auto py-10 text-center">
        <span className="text-gray-500">
          {language === "en" ? "No projects found" : "لا توجد مشاريع"}
        </span>
      </div>
    );
  }

  return (
    <div
      dir={dir}
      className="w-full container mx-auto py-10 relative cursor-grab"
    >
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        dir={dir}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <div className="relative w-full sm:w-90 lg:w-60 h-80 xl:w-80 xl:h-100 2xl:w-90 2xl:h-120 rounded-2xl overflow-hidden shadow-lg group">
                {project.image && project.image.trim() !== "" ? (
                  <Image
                    src={project.image}
                    alt={language === "en" ? project.titleEn : project.titleAr}
                    width={1000}
                    height={1000}
                    loading="lazy"
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      {language === "en" ? "No Image" : "لا توجد صورة"}
                    </span>
                  </div>
                )}

                {/* Overlay with project info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">
                      {language === "en" ? project.titleEn : project.titleAr}
                    </h3>
                    <p className="text-sm">
                      {language === "en"
                        ? project.categoryEn
                        : project.categoryAr}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
