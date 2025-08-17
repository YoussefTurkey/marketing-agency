"use client";
// Importing Next Components
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// importing Components
import Titles from "../ui/Titles";
// Importing React-Icons
import { RiWhatsappFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const Contacts = () => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto my-10 md:my-30 px-5 xl:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Titles>{language === "en" ? "Contact Us" : "تواصل معنا"}</Titles>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-10">
        <form method="POST" className="my-5 w-full">
          <div className="flex flex-col w-full my-3">
            <label htmlFor="phone" className="text-xl cursor-pointer">
              {language === "en" ? "Phone Number" : "رقم الهاتف"}
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+99 999 999 9999"
              className={`p-3 my-2 border rounded-md
             border-[hsl(var(--foreground))]
             focus:border-[hsl(var(--secondary))]
             focus:ring-2 focus:ring-[hsl(var(--secondary))]
             focus:outline-none transition-colors ${
               language === "en" ? "text-left" : "text-right"
             }`}
              required
            />
          </div>
          <div className="flex flex-col w-full my-3">
            <label htmlFor="email" className="text-xl cursor-pointer">
              {language === "en" ? "Email" : "البريد الإلكتروني"}
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="p-3 my-2 border rounded-md
             border-[hsl(var(--foreground))]
             focus:border-[hsl(var(--secondary))]
             focus:ring-2 focus:ring-[hsl(var(--secondary))]
             focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="flex flex-col w-full my-3">
            <label htmlFor="msg" className="text-xl cursor-pointer">
              {language === "en" ? "Message" : "الرسالة"}
            </label>
            <textarea
              id="msg"
              cols={30}
              rows={10}
              className="p-3 my-2 border rounded-md
             border-[hsl(var(--foreground))]
             focus:border-[hsl(var(--secondary))]
             focus:ring-2 focus:ring-[hsl(var(--secondary))]
             focus:outline-none transition-colors"
              placeholder={language === 'en' ? 'Your message' : 'رسالتك'}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="cursor-pointer md:text-md w-full md:w-fit  md:px-[100px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold"
          >
            {language === "en" ? "Send" : "إرسال"}
          </button>
        </form>

        <div className="flex flex-col gap-10 my-15 w-fit">
            <Link href={'/'} className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all">
                <span><RiWhatsappFill size={30}/></span>
                <span>{language === 'en' ? 'Keep in touch on Whatsapp' : 'تواصل معنا عبر الواتساب'}</span>
            </Link>

            <Link href={'/'} className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all">
                <span><FaEnvelope size={30}/></span>
                <span>{language === 'en' ? 'Keep in touch on Mail' : 'تواصل معنا عبر البريد الإلكتروني'}</span>
            </Link>

            <div className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all">
                <span><IoCall size={30}/></span>
                <span>{language === 'en' ? 'Contact directly on (+99 999 999 9999)' : 'تواصل معنا مباشرةً عبر (+99 999 999 9999)'}</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
