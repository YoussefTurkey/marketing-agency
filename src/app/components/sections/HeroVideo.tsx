"use client";
// Importing Next Components
import Link from "next/link";
// Importing Language Provider
import { useTheme } from "@/app/lib/theme/ThemeProvider";
// Importing React-Icons
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const HeroVideo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section>
      <div className="relative w-full h-screen overflow-hidden -z-100">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover"
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
          className={`absolute inset-0 ${
            theme === "dark"
              ? "border-[#ffffff30] bg-black/40"
              : "border-[#00000030] bg-white/5"
          }`}
        ></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pb-10 pt-40 bg-gradient-to-t from-[hsl(var(--background))] to-transparent">
        <Link
          href="#services"
          className="flex flex-col items-center"
        >
          <p className="text-lg">Explore Services</p>
          <span>
            <MdKeyboardDoubleArrowDown size={30} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HeroVideo;