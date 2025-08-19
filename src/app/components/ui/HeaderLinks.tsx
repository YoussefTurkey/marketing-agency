"use client";
// Importing Next Components
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ language }: { language: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ul className="hidden lg:flex items-center gap-10">
      <li className="group">
        <Link
          href={isHome ? "#projects" : "/#projects"}
          className="group-hover:text-[hsl(var(--secondary))]"
        >
          {language === "en" ? "Our Projects" : "أعمالنا"}
        </Link>
      </li>
      <li className="group">
        <Link
          href={isHome ? "#teams" : "/#teams"}
          className="group-hover:text-[hsl(var(--secondary))]"
        >
          {language === "en" ? "Our Team" : "الفريق"}
        </Link>
      </li>
      <li className="group">
        <Link
          href={isHome ? "#testimonials" : "/#testimonials"}
          className="group-hover:text-[hsl(var(--secondary))]"
        >
          {language === "en" ? "Testimonials" : "قصص النجاح"}
        </Link>
      </li>
      <li className="group">
        <Link
          href={isHome ? "#faqs" : "/#faqs"}
          className="group-hover:text-[hsl(var(--secondary))]"
        >
          {language === "en" ? "FAQs" : "الأسئلة الشائعة"}
        </Link>
      </li>
    </ul>
  );
}
