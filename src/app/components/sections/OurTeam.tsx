"use client";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
import Buttons from "../ui/Buttons";
import TeamCarousel from "../ui/TeamCarousel";

const OurTeam = () => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto my-10 md:my-30 px-5 xl:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Titles>{language === "en" ? "Our Team" : "فريقنا"}</Titles>
        <Buttons style="hidden sm:flex" href="/">
          {language === "en" ? "See More" : "شاهد المزيد"}
        </Buttons>
      </div>

      <div>
        <TeamCarousel />
      </div>
    </section>
  );
};

export default OurTeam;
