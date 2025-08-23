"use client";
// Importing Next Components
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing React-Icons
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const HeroVideo: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section>
      <div className="relative w-full h-screen overflow-hidden -z-100">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-[100vh] object-cover"
          autoPlay
          loop
          muted
          playsInline
          // poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay for readability */}
        <div
          className={`absolute inset-0 "border-[#ffffff30] bg-black/40`}
        ></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pb-10 pt-40">
        <Link href="#info" className="flex flex-col items-center text-white">
          <p className="text-lg">
            {language === "en" ? "Explore Services" : "اكتشف خدامتنا"}
          </p>
          <span>
            <MdKeyboardDoubleArrowDown size={30} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HeroVideo;
