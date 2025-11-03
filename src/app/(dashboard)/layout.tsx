"use client";
import { logout, useAuth } from "@/app/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import Link from "next/link";
import Buttons from "../components/ui/Buttons";
import { usePathname } from "next/navigation";
import LanguageToggle from "../lib/lang/LanguageToggle";
import ThemeToggle from "../lib/theme/ThemeToggle";
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
import { FaFolderTree } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="flex h-screen">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 ${language === "en" ? "left-0" : "right-0"}
          w-80 lg:w-64 xl:w-80
          bg-[hsl(var(--background))] shadow-xl 
          ${
            language === "en" ? "border-r" : "border-l"
          } border-[hsl(var(--secondary)/50%)] 
          flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : language === "en"
              ? "-translate-x-full"
              : "translate-x-full"
          }
          lg:translate-x-0
        `}
        >
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-[hsl(var(--secondary)/50%)] flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-bold text-[hsl(var(--foreground))]">
                {language === "en" ? "Dashboard" : "لوحة التحكم"}
              </h1>
              <p className="text-xs lg:text-sm text-[hsl(var(--foreground)/70%)] mt-1">
                {language === "en" ? "Portfolio Management" : "إدارة المشاريع"}
              </p>
            </div>
            <div className="hidden gap-2 mb-3 lg:flex">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[hsl(var(--secondary)/20%)]"
            >
              <HiX className="w-5 h-5 text-[hsl(var(--foreground))]" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === "/admin"
                      ? "bg-[hsl(var(--secondary))] text-[hsl(var(--background))]"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))]"
                  }`}
                >
                  <FaFolderTree className="w-5 h-5" />
                  <span className="text-sm lg:text-base">
                    {language === "en" ? "All Projects" : "جميع المشاريع"}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/new"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === "/admin/new"
                      ? "bg-[hsl(var(--secondary))] text-[hsl(var(--background))]"
                      : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--background))]"
                  }`}
                >
                  <IoMdAdd className="w-5 h-5" />
                  <span className="text-sm lg:text-base">
                    {language === "en" ? "New Project" : "إضافة مشروع"}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-[hsl(var(--secondary)/50%)]">
            <div className="flex items-center gap-3 mb-4 p-3 bg-[hsl(var(--secondary)/10%)] rounded-lg">
              <div className="w-8 h-8 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
                <span className="text-[hsl(var(--background))] text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-[hsl(var(--foreground)/50%)]">
                  Admin
                </p>
              </div>
            </div>
            <div className="flex gap-2 mb-3 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <Buttons
              onClick={() => logout()}
              style="w-full justify-center bg-[hsl(var(--secondary)/90%)] text-[hsl(var(--background))] hover:bg-[hsl(var(--primary))] text-sm lg:text-base"
            >
              {language === "en" ? "Logout" : "تسجيل الخروج"}
            </Buttons>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 border-b border-[hsl(var(--secondary)/50%)] bg-[hsl(var(--background))]">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[hsl(var(--secondary)/20%)]"
            >
              <HiMenu className="w-6 h-6 text-[hsl(var(--foreground))]" />
            </button>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
                <span className="text-[hsl(var(--background))] text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
