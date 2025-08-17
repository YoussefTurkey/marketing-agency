import type { Metadata, Viewport  } from "next";
import "./globals.scss";
// import Providers
import ClientThemeProvider from "@/app/lib/theme/ClientThemeProvider";
import ClientLanguageProvider from '@/app/lib/lang/ClientLanguageProvider'
// import Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LinkBtn from "./components/ui/LinkBtn";
import ScrollUp from "./components/ui/ScrollUp";

export const metadata: Metadata = {
  title: "Marketing Agency",
  description: "Abu Zahra Co.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const direction = params.lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={params.lang} dir={direction}>
      <body>
        <ClientThemeProvider>
           <ClientLanguageProvider defaultLanguage={params.lang as "en" | "ar"}>
            <Header />
            <LinkBtn />
            {children}
            <ScrollUp />
            <Footer />
            </ClientLanguageProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
