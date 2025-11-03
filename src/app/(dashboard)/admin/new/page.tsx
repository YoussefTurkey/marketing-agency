"use client";
import { useState } from "react";
import { uploadImage } from "@/app/firebase/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PortfolioItem, ProcessStep } from "@/types/globalTypes";
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import toast from "react-hot-toast";
import Buttons from "@/app/components/ui/Buttons";
import { IoArrowBack, IoAdd, IoClose, IoCloudUpload } from "react-icons/io5";

export default function AddProjectPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Omit<PortfolioItem, "id">>({
    titleEn: "",
    titleAr: "",
    categoryEn: "",
    categoryAr: "",
    articleEn: "",
    articleAr: "",
    info: {
      servicesEn: [""],
      servicesAr: [""],
      clientEn: "",
      clientAr: "",
      countryEn: "",
      countryAr: "",
      industryEn: "",
      industryAr: "",
    },
    link: '',
    processEn: [{ head: "", body: "" }],
    processAr: [{ head: "", body: "" }],
    image: "",
  });

  const isRTL = language === "ar";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success(
        language === "en"
          ? "Image uploaded successfully!"
          : "تم رفع الصورة بنجاح!"
      );
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      toast.error(
        language === "en" ? "Failed to upload image" : "فشل في رفع الصورة"
      );
    } finally {
      setUploading(false);
    }
  };

  // Handle Services Array
  const handleServiceChange = (
    index: number,
    value: string,
    lang: "En" | "Ar"
  ) => {
    const newServices = [...formData.info[`services${lang}`]];
    newServices[index] = value;
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, [`services${lang}`]: newServices },
    }));
  };

  const addService = (lang: "En" | "Ar") => {
    setFormData((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [`services${lang}`]: [...prev.info[`services${lang}`], ""],
      },
    }));
  };

  const removeService = (index: number, lang: "En" | "Ar") => {
    const newServices = formData.info[`services${lang}`].filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, [`services${lang}`]: newServices },
    }));
  };

  // Handle Process Steps
  const handleProcessChange = (
    index: number,
    field: keyof ProcessStep,
    value: string,
    lang: "En" | "Ar"
  ) => {
    const newProcess = [...formData[`process${lang}`]];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setFormData((prev) => ({ ...prev, [`process${lang}`]: newProcess }));
  };

  const addProcessStep = (lang: "En" | "Ar") => {
    setFormData((prev) => ({
      ...prev,
      [`process${lang}`]: [...prev[`process${lang}`], { head: "", body: "" }],
    }));
  };

  const removeProcessStep = (index: number, lang: "En" | "Ar") => {
    const newProcess = formData[`process${lang}`].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [`process${lang}`]: newProcess }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        info: {
          ...formData.info,
          servicesEn: formData.info.servicesEn.filter(
            (service) => service.trim() !== ""
          ),
          servicesAr: formData.info.servicesAr.filter(
            (service) => service.trim() !== ""
          ),
        },
        processEn: formData.processEn.filter(
          (step) => step.head.trim() !== "" || step.body.trim() !== ""
        ),
        processAr: formData.processAr.filter(
          (step) => step.head.trim() !== "" || step.body.trim() !== ""
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to save project");

      toast.success(
        language === "en"
          ? "Project added successfully!"
          : "تم إضافة المشروع بنجاح!"
      );
      router.push("/admin");
    } catch (err) {
      console.error("❌ Error saving project:", err);
      toast.error(
        language === "en" ? "Failed to save project" : "فشل في حفظ المشروع"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-4 lg:p-6 max-w-6xl mx-auto ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center mb-6`}>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))]">
            {language === "en" ? "Add New Project" : "إضافة مشروع جديد"}
          </h1>
          <p className="text-sm text-[hsl(var(--foreground)/70%)] mt-1">
            {language === "en"
              ? "Create a new portfolio project"
              : "إنشاء مشروع جديد للمعرض"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[hsl(var(--background))] border border-[hsl(var(--secondary)/30%)] p-4 lg:p-6 rounded-xl shadow-sm"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <label className="block mb-2 font-semibold text-[hsl(var(--foreground))]">
              {language === "en" ? "Title (English)" : "العنوان (الإنجليزية)"}
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              value={formData.titleEn}
              onChange={(e) =>
                setFormData({ ...formData, titleEn: e.target.value })
              }
              placeholder={
                language === "en"
                  ? "Enter project title in English"
                  : "أدخل عنوان المشروع بالإنجليزية"
              }
            />
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <label className="block mb-2 font-semibold text-[hsl(var(--foreground))]">
              {language === "en" ? "Title (Arabic)" : "العنوان (العربية)"}
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              value={formData.titleAr}
              onChange={(e) =>
                setFormData({ ...formData, titleAr: e.target.value })
              }
              placeholder={
                language === "en"
                  ? "Enter project title in Arabic"
                  : "أدخل عنوان المشروع بالعربية"
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <label className="block mb-2 font-semibold text-[hsl(var(--foreground))]">
              {language === "en" ? "Category (English)" : "الفئة (الإنجليزية)"}
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              value={formData.categoryEn}
              onChange={(e) =>
                setFormData({ ...formData, categoryEn: e.target.value })
              }
              placeholder={
                language === "en"
                  ? "e.g., Web Development"
                  : "مثال: تطوير الويب"
              }
            />
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <label className="block mb-2 font-semibold text-[hsl(var(--foreground))]">
              {language === "en" ? "Category (Arabic)" : "الفئة (العربية)"}
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
              value={formData.categoryAr}
              onChange={(e) =>
                setFormData({ ...formData, categoryAr: e.target.value })
              }
              placeholder={
                language === "en" ? "e.g., تطوير الويب" : "مثال: تطوير الويب"
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className={isRTL ? "text-right" : "text-left"}>
          <label className="block mb-3 font-semibold text-[hsl(var(--foreground))]">
            {language === "en" ? "Project Image" : "صورة المشروع"}
          </label>
          <div className="border-2 border-dashed border-[hsl(var(--secondary)/30%)] rounded-lg p-6 text-center hover:border-[hsl(var(--secondary))] transition-colors">
            <input
              type="file"
              onChange={handleUpload}
              className="hidden"
              id="image-upload"
              accept="image/*"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <IoCloudUpload className="w-12 h-12 mx-auto mb-3 text-[hsl(var(--secondary))]" />
              <p className="text-[hsl(var(--foreground))] mb-2">
                {language === "en"
                  ? "Click to upload project image"
                  : "انقر لرفع صورة المشروع"}
              </p>
              <p className="text-sm text-[hsl(var(--foreground)/50%)]">
                {language === "en"
                  ? "PNG, JPG, WEBP up to 10MB"
                  : "PNG, JPG, WEBP حتى 10 ميجابايت"}
              </p>
            </label>
          </div>
          {uploading && (
            <div className="text-[hsl(var(--primary))] mt-2 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
              {language === "en" ? "Uploading..." : "جاري الرفع..."}
            </div>
          )}
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm text-[hsl(var(--foreground))] mb-2">
                {language === "en" ? "Preview:" : "معاينة:"}
              </p>
              <Image
                src={formData.image}
                alt="preview"
                className="w-48 h-32 object-cover rounded-lg border border-[hsl(var(--secondary)/30%)]"
                width={192}
                height={128}
              />
            </div>
          )}
        </div>

        {/* Client Information */}
        <div className="border-t border-[hsl(var(--secondary)/30%)] pt-6">
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
            {language === "en" ? "Client Information" : "معلومات العميل"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: "clientEn",
                label:
                  language === "en"
                    ? "Client (English)"
                    : "العميل (الإنجليزية)",
                placeholder:
                  language === "en"
                    ? "Client name in English"
                    : "اسم العميل بالإنجليزية",
              },
              {
                key: "clientAr",
                label:
                  language === "en" ? "Client (Arabic)" : "العميل (العربية)",
                placeholder:
                  language === "en"
                    ? "Client name in Arabic"
                    : "اسم العميل بالعربية",
              },
              {
                key: "countryEn",
                label:
                  language === "en"
                    ? "Country (English)"
                    : "الدولة (الإنجليزية)",
                placeholder:
                  language === "en"
                    ? "Country name in English"
                    : "اسم الدولة بالإنجليزية",
              },
              {
                key: "countryAr",
                label:
                  language === "en" ? "Country (Arabic)" : "الدولة (العربية)",
                placeholder:
                  language === "en"
                    ? "Country name in Arabic"
                    : "اسم الدولة بالعربية",
              },
              {
                key: "industryEn",
                label:
                  language === "en"
                    ? "Industry (English)"
                    : "المجال (الإنجليزية)",
                placeholder:
                  language === "en"
                    ? "Industry type in English"
                    : "نوع المجال بالإنجليزية",
              },
              {
                key: "industryAr",
                label:
                  language === "en" ? "Industry (Arabic)" : "المجال (العربية)",
                placeholder:
                  language === "en"
                    ? "Industry type in Arabic"
                    : "نوع المجال بالعربية",
              },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className={isRTL ? "text-right" : "text-left"}>
                <label className="block mb-2 font-medium text-[hsl(var(--foreground))]">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
                  value={
                    formData.info[key as keyof typeof formData.info] as string
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      info: { ...prev.info, [key]: e.target.value },
                    }))
                  }
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="border-t border-[hsl(var(--secondary)/30%)] pt-6">
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
            {language === "en" ? "Services" : "الخدمات"}
          </h3>

          {/* English Services */}
          <div className="mb-8">
            <label className="block mb-3 font-medium text-[hsl(var(--foreground))]">
              {language === "en"
                ? "Services (English)"
                : "الخدمات (الإنجليزية)"}
            </label>
            {formData.info.servicesEn.map((service, index) => (
              <div
                key={index}
                className={`flex gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <input
                  type="text"
                  className="flex-1 p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
                  value={service}
                  onChange={(e) =>
                    handleServiceChange(index, e.target.value, "En")
                  }
                  placeholder={
                    language === "en"
                      ? `Service ${index + 1}`
                      : `خدمة ${index + 1}`
                  }
                />
                {formData.info.servicesEn.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index, "En")}
                    className="rounded-lg text-red-500 cursor-pointer transition-colors"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <Buttons
              type="button"
              onClick={() => addService("En")}
              style="w-full md:w-fit  justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/80%)] flex items-center justify-center gap-2"
            >
              <IoAdd className="w-5 h-5" />
              {language === "en" ? "Add Service" : "إضافة خدمة"}
            </Buttons>
          </div>

          {/* Arabic Services */}
          <div>
            <label className="block mb-3 font-medium text-[hsl(var(--foreground))]">
              {language === "en" ? "Services (Arabic)" : "الخدمات (العربية)"}
            </label>
            {formData.info.servicesAr.map((service, index) => (
              <div
                key={index}
                className={`flex gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <input
                  type="text"
                  className="flex-1 p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent"
                  value={service}
                  onChange={(e) =>
                    handleServiceChange(index, e.target.value, "Ar")
                  }
                  placeholder={
                    language === "en"
                      ? `Service ${index + 1}`
                      : `خدمة ${index + 1}`
                  }
                />
                {formData.info.servicesAr.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index, "Ar")}
                    className="rounded-lg text-red-500 cursor-pointer transition-colors"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <Buttons
              type="button"
              onClick={() => addService("Ar")}
              style="w-full md:w-fit  justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/80%)] flex items-center gap-2"
            >
              <IoAdd className="w-5 h-5" />
              {language === "en" ? "Add Service" : "إضافة خدمة"}
            </Buttons>
          </div>
        </div>

        {/* Articles */}
        <div className="border-t border-[hsl(var(--secondary)/30%)] pt-6">
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
            {language === "en" ? "Articles" : "المقالات"}
          </h3>
          <div className="space-y-4">
            <div className={isRTL ? "text-right" : "text-left"}>
              <label className="block mb-2 font-medium text-[hsl(var(--foreground))]">
                {language === "en"
                  ? "Article (English)"
                  : "المقال (الإنجليزية)"}
              </label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent resize-vertical"
                value={formData.articleEn}
                onChange={(e) =>
                  setFormData({ ...formData, articleEn: e.target.value })
                }
                placeholder={
                  language === "en"
                    ? "Write your article in English..."
                    : "اكتب مقالك بالإنجليزية..."
                }
              />
            </div>
            <div className={isRTL ? "text-right" : "text-left"}>
              <label className="block mb-2 font-medium text-[hsl(var(--foreground))]">
                {language === "en" ? "Article (Arabic)" : "المقال (العربية)"}
              </label>
              <textarea
                rows={4}
                className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent resize-vertical"
                value={formData.articleAr}
                onChange={(e) =>
                  setFormData({ ...formData, articleAr: e.target.value })
                }
                placeholder={
                  language === "en"
                    ? "Write your article in Arabic..."
                    : "اكتب مقالك بالعربية..."
                }
              />
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="border-t border-[hsl(var(--secondary)/30%)] pt-6">
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
            {language === "en" ? "Process Steps" : "خطوات العمل"}
          </h3>

          {/* English Process */}
          <div className="mb-8">
            <label className="block mb-3 font-medium text-[hsl(var(--foreground))]">
              {language === "en" ? "Process (English)" : "العملية (الإنجليزية)"}
            </label>
            {formData.processEn.map((step, index) => (
              <div
                key={index}
                className="border border-[hsl(var(--secondary)/30%)] p-4 rounded-lg mb-4 bg-[hsl(var(--secondary)/5%)]"
              >
                <div
                  className={`flex justify-between items-center mb-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <h4 className="font-semibold text-[hsl(var(--foreground))]">
                    {language === "en"
                      ? `Step ${index + 1}`
                      : `خطوة ${index + 1}`}
                  </h4>
                  {formData.processEn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProcessStep(index, "En")}
                      className="rounded-lg text-red-500 cursor-pointer transition-colors"
                      >
                      <IoClose className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={
                    language === "en" ? "Step Title" : "عنوان الخطوة"
                  }
                  className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent mb-2"
                  value={step.head}
                  onChange={(e) =>
                    handleProcessChange(index, "head", e.target.value, "En")
                  }
                />
                <textarea
                  placeholder={
                    language === "en" ? "Step Description" : "وصف الخطوة"
                  }
                  rows={3}
                  className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent resize-vertical"
                  value={step.body}
                  onChange={(e) =>
                    handleProcessChange(index, "body", e.target.value, "En")
                  }
                />
              </div>
            ))}
            <Buttons
              type="button"
              onClick={() => addProcessStep("En")}
              style="w-full md:w-fit  justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/80%)] flex items-center gap-2"
            >
              <IoAdd className="w-5 h-5" />
              {language === "en" ? "Add Process Step" : "إضافة خطوة عمل"}
            </Buttons>
          </div>

          {/* Arabic Process */}
          <div>
            <label className="block mb-3 font-medium text-[hsl(var(--foreground))]">
              {language === "en" ? "Process (Arabic)" : "العملية (العربية)"}
            </label>
            {formData.processAr.map((step, index) => (
              <div
                key={index}
                className="border border-[hsl(var(--secondary)/30%)] p-4 rounded-lg mb-4 bg-[hsl(var(--secondary)/5%)]"
              >
                <div
                  className={`flex justify-between items-center mb-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <h4 className="font-semibold text-[hsl(var(--foreground))]">
                    {language === "en"
                      ? `Step ${index + 1}`
                      : `خطوة ${index + 1}`}
                  </h4>
                  {formData.processAr.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProcessStep(index, "Ar")}
                      className="rounded-lg text-red-500 cursor-pointer transition-colors"
                      >
                      <IoClose className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={
                    language === "en" ? "Step Title" : "عنوان الخطوة"
                  }
                  className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent mb-2"
                  value={step.head}
                  onChange={(e) =>
                    handleProcessChange(index, "head", e.target.value, "Ar")
                  }
                />
                <textarea
                  placeholder={
                    language === "en" ? "Step Description" : "وصف الخطوة"
                  }
                  rows={3}
                  className="w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary))] focus:border-transparent resize-vertical"
                  value={step.body}
                  onChange={(e) =>
                    handleProcessChange(index, "body", e.target.value, "Ar")
                  }
                />
              </div>
            ))}
            <Buttons
              type="button"
              onClick={() => addProcessStep("Ar")}
              style="w-full md:w-fit  justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/80%)] flex items-center gap-2"
            >
              <IoAdd className="w-5 h-5" />
              {language === "en" ? "Add Process Step" : "إضافة خطوة عمل"}
            </Buttons>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-[hsl(var(--secondary)/30%)] pt-10 pb-5 w-full">
          <Buttons
            type="submit"
            disabled={loading}
            style={`w-full md:w-fit justify-center flex bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/80%)] disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {language === "en"
                  ? "Saving Project..."
                  : "جاري حفظ المشروع..."}
              </div>
            ) : language === "en" ? (
              "Save Project"
            ) : (
              "حفظ المشروع"
            )}
          </Buttons>
        </div>
      </form>
    </div>
  );
}
