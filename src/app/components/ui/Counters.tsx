"use client";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import CounterBox from "./CounterBox";

const Counters = () => {
  const { language } = useLanguage();

  return (
    <section
      className="flex items-center justify-center my-20"
      id="services"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-30 items-center justify-items-center text-center">
        <CounterBox end={385} label={language === 'en' ? 'Success Partners' : 'شركاء النجاح'} />
        <CounterBox end={13000} label={language === 'en' ? 'Designs & Videos' : 'تصاميم وفيديوهات'} />
        <CounterBox end={370} label={language === 'en' ? 'Websites' : 'المواقع الإلكترونية'} />
        <CounterBox end={5000} label={language === 'en' ? 'Paid Campaigns' : 'الحملات المدفوعة'} />
      </div>
    </section>
  );
};

export default Counters;
