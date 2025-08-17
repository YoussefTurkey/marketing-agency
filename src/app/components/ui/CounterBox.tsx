"use client";
// Importing React Components
import { useEffect, useRef, useState } from "react";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import useCountUp from "@/app/hooks/count-up";

const CounterBox = ({ end, label }: { end: number; label: string }) => {
  const { language } = useLanguage();

  const [startCount, setStartCount] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const count = useCountUp(end, 2000, startCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center gap-5 w-full relative after:absolute ${
        language === "en"
          ? "after:left-43 md:after:left-50 xl:after:left-60"
          : "after:right-43 md:after:right-50 xl:after:right-60"
      } after:w-px after:h-full after:bg-[hsl(var(--foreground))] last:after:hidden [&:nth-child(2)]:after:hidden lg:[&:nth-child(2)]:after:block`}
    >
      {language === "en" ? (
        <h3 className="font-bold text-[hsl(var(--secondary))] text-3xl md:text-5xl">
          +{startCount ? count.toLocaleString() : "0"}
        </h3>
      ) : (
        <h3 className="font-bold text-[hsl(var(--secondary))] text-3xl md:text-5xl">
          {startCount ? count.toLocaleString() : "0"}+
        </h3>
      )}
      <p className="text-xl">{label}</p>
    </div>
  );
};

export default CounterBox;
