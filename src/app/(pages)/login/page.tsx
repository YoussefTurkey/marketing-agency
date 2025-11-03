"use client";
import { useState } from "react";
import { login } from "@/app/firebase/auth";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import toast, { Toaster } from "react-hot-toast";
import Buttons from "@/app/components/ui/Buttons";
import {
  IoMail,
  IoLockClosed,
  IoEye,
  IoEyeOff,
  IoLogIn,
} from "react-icons/io5";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();

  const isRTL = language === "ar";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        language === "en" ? "Please fill in all fields" : "يرجى ملء جميع الحقول"
      );
      return;
    }

    setLoading(true);
    try {
      await login(email, password);

      console.log("✅ Login successful, redirecting...");
      toast.success(
        language === "en" ? "Login successful!" : "تم تسجيل الدخول بنجاح!"
      );

      // المسار الصحيح بعد نقل الصفحة
      router.push("/admin");
    } catch (error) {
      let errorMessage =
        language === "en"
          ? "Wrong email or password"
          : "البريد الإلكتروني أو كلمة المرور غير صحيحة";

      // طريقة أفضل للتعامل مع الأخطاء
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/invalid-email") {
          errorMessage =
            language === "en"
              ? "Invalid email address"
              : "عنوان بريد إلكتروني غير صالح";
        } else if (firebaseError.code === "auth/user-not-found") {
          errorMessage =
            language === "en" ? "User not found" : "المستخدم غير موجود";
        } else if (firebaseError.code === "auth/wrong-password") {
          errorMessage =
            language === "en" ? "Wrong password" : "كلمة مرور خاطئة";
        } else if (firebaseError.code === "auth/too-many-requests") {
          errorMessage =
            language === "en"
              ? "Too many attempts. Try again later."
              : "محاولات كثيرة. حاول مرة أخرى لاحقًا.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className={`w-full max-w-md ${isRTL ? "text-right" : "text-left"}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-2xl flex items-center justify-center shadow-lg">
            <IoLogIn className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
            {language === "en" ? "Welcome Back" : "مرحبًا بعودتك"}
          </h1>
          <p className="text-[hsl(var(--foreground)/70%)]">
            {language === "en"
              ? "Sign in to your admin dashboard"
              : "سجل الدخول إلى لوحة التحكم"}
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-[hsl(var(--background))] border border-[hsl(var(--secondary)/30%)] rounded-2xl shadow-xl p-6 lg:p-8 space-y-6"
        >
          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {language === "en" ? "Email Address" : "البريد الإلكتروني"}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 ${
                  isRTL ? "right-0 pr-3" : "left-0 pl-3"
                } flex items-center pointer-events-none`}
              >
                <IoMail
                  className={`w-5 h-5 text-[hsl(var(--foreground)/50%)] ${
                    isRTL ? "ml-3" : "mr-3"
                  }`}
                />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent ${
                  isRTL ? "pr-10" : "pl-10"
                }`}
                placeholder={
                  language === "en"
                    ? "Enter your email"
                    : "أدخل بريدك الإلكتروني"
                }
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              {language === "en" ? "Password" : "كلمة المرور"}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 ${
                  isRTL ? "right-0 pr-3" : "left-0 pl-3"
                } flex items-center pointer-events-none`}
              >
                <IoLockClosed
                  className={`w-5 h-5 text-[hsl(var(--foreground)/50%)] ${
                    isRTL ? "ml-3" : "mr-3"
                  }`}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 rounded-lg border border-[hsl(var(--secondary)/30%)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--foreground)/50%)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent ${
                  isRTL ? "pr-10" : "pl-10"
                }`}
                placeholder={
                  language === "en" ? "Enter your password" : "أدخل كلمة المرور"
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${
                  isRTL ? "left-0 pl-3" : "right-0 pr-3"
                } flex items-center text-[hsl(var(--foreground)/50%)] hover:text-[hsl(var(--foreground))] transition-colors`}
              >
                {showPassword ? (
                  <IoEyeOff className="w-5 h-5" />
                ) : (
                  <IoEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Buttons
            type="submit"
            disabled={loading}
            style={`w-full flex justify-center bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/90%)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {language === "en" ? "Signing in..." : "جاري تسجيل الدخول..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <IoLogIn className="w-5 h-5" />
                {language === "en" ? "Sign In" : "تسجيل الدخول"}
              </div>
            )}
          </Buttons>
        </form>
      </div>
    </div>
  );
}
