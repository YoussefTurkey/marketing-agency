"use client";
// Importing Next Components
import Link from "next/link";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "../ui/Titles";
// Importing React-Icons
import { RiWhatsappFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { registerSchema, TRegist } from "@/app/lib/validations/validContact";
import { zodResolver } from "@hookform/resolvers/zod";
// Importing EmailJS
import emailjs from "@emailjs/browser";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useRef, useState } from "react";
// Importing React-International-Phone
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
// Importing Toast
import { useToast } from "@/app/lib/contexts/toastContext";

const Contacts = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // once animated, stop observing
          }
        });
      },
      { threshold: 0.2 } // 20% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<TRegist>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const { addNotification } = useToast();

  const onSubmit: SubmitHandler<TRegist> = async ({ phone, email, msg }) => {
    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { phone, email, message: msg },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      addNotification(
        "success",
        language === "en"
          ? "Message sent successfully 🎉"
          : "تم إرسال الرسالة بنجاح 🎉"
      );
      reset();
    } catch (error) {
      console.error(error);
      addNotification(
        "error",
        language === "en" ? "❌ Failed to send message" : "❌ فشل إرسال الرسالة"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="container mx-auto my-10 md:my-30 px-5 xl:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Titles>{language === "en" ? "Contact Us" : "تواصل معنا"}</Titles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row gap-0 md:gap-10"
      >
        <form
          className="my-5 w-full"
          onSubmit={handleSubmit(onSubmit, (formErrors) => {
            // هنا لو الفورم فيه أخطاء
            if (Object.keys(formErrors).length > 0) {
              addNotification(
                "error",
                language === "en"
                  ? "❌ Please fill all required fields"
                  : "❌ من فضلك املأ جميع الحقول المطلوبة"
              );
            }
          })}
        >
          <div className="flex flex-col w-full my-3">
            <label htmlFor="phone" className="text-xl cursor-pointer">
              {language === "en" ? "Phone Number" : "رقم الهاتف"}
            </label>
            <div className="my-2" dir={language === "ar" ? "ltr" : "ltr"}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="eg"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="+20 11 111 1111"
                    inputStyle={{
                      width: "100%",
                      padding: "25px",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderWidth: "1px",
                      borderColor: "hsl(var(--foreground))",
                      color: "hsl(var(--foreground))",
                      fontSize: "16px",
                      backgroundColor: "hsl(var(--background))",
                      transition: "all 0.2s ease",
                      textAlign: language === "ar" ? "left" : "left",
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col w-full my-3">
            <label htmlFor="email" className="text-xl cursor-pointer">
              {language === "en" ? "Email" : "البريد الإلكتروني"}
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="p-3 my-2 border rounded-md
             border-[hsl(var(--foreground))]
             focus:border-[hsl(var(--secondary))]
             focus:ring-2 focus:ring-[hsl(var(--secondary))]
             focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col w-full my-3">
            <label htmlFor="msg" className="text-xl cursor-pointer">
              {language === "en" ? "Message" : "الرسالة"}
            </label>
            <textarea
              {...register("msg")}
              id="msg"
              cols={30}
              rows={10}
              className="p-3 my-2 border rounded-md
             border-[hsl(var(--foreground))]
             focus:border-[hsl(var(--secondary))]
             focus:ring-2 focus:ring-[hsl(var(--secondary))]
             focus:outline-none transition-colors"
              placeholder={language === "en" ? "Your message" : "رسالتك"}
            ></textarea>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer md:text-md w-full md:w-fit md:px-[100px] py-[10px] rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold"
          >
            {loading
              ? language === "en"
                ? "⏳ Sending..."
                : "⏳ جاري الإرسال..."
              : language === "en"
              ? "Send"
              : "إرسال"}
          </button>
        </form>

        {/* روابط التواصل */}
        <div className="flex flex-col gap-10 my-15 w-fit">
          <Link
            href={"https://wa.me/+966543348930"}
            target="_blank"
            className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all"
          >
            <span>
              <RiWhatsappFill size={30} />
            </span>
            <span>
              {language === "en"
                ? "Keep in touch on Whatsapp"
                : "تواصل معنا عبر الواتساب"}
            </span>
          </Link>

          <Link
            href={"mailto:siteservicerequest@al-marketer.com"}
            target="_blank"
            className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all"
          >
            <span>
              <FaEnvelope size={30} />
            </span>
            <span>
              {language === "en"
                ? "Keep in touch on Mail"
                : "تواصل معنا عبر البريد الإلكتروني"}
            </span>
          </Link>

          <div
            onClick={() => {
              navigator.clipboard.writeText("+966543348930");
              addNotification(
                "success",
                language === "en" ? "📋 Number copied!" : "📋 تم نسخ الرقم!"
              );
            }}
            className="flex gap-5 items-center p-10 rounded-xl border border-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))] transition-all cursor-pointer"
          >
            <span>
              <IoCall size={30} />
            </span>
            <span>
              {language === "en"
                ? "Contact directly on (+966543348930)"
                : "تواصل معنا مباشرةً عبر (966543348930+)"}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;
