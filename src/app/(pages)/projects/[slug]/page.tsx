// Importing Next Components
import { notFound } from "next/navigation";
// Importing Components
import SingleProjectClient from "./SingleProjectClient";
// Firebase
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/app/firebase/firebase";
// Types
import type { PortfolioItem } from "@/types/globalTypes";

interface SingleProjectProps {
  params: Promise<{ slug: string }>;
}

const db = getFirestore(app);

export default async function SingleProjectPage({ params }: SingleProjectProps) {
  const { slug } = await params;

  try {
    const docRef = doc(db, "projects", slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      notFound();
    }

    const data = docSnap.data();
    
    const singleProj: PortfolioItem = {
      id: docSnap.id,
      titleEn: data.titleEn || "Untitled Project",
      titleAr: data.titleAr || "مشروع بدون عنوان",
      categoryEn: data.categoryEn || "Uncategorized",
      categoryAr: data.categoryAr || "غير مصنف",
      info: {
        servicesEn: data.info?.servicesEn || [],
        servicesAr: data.info?.servicesAr || [],
        clientEn: data.info?.clientEn || "Not specified",
        clientAr: data.info?.clientAr || "غير محدد",
        countryEn: data.info?.countryEn || "Not specified",
        countryAr: data.info?.countryAr || "غير محدد",
        industryEn: data.info?.industryEn || "Not specified",
        industryAr: data.info?.industryAr || "غير محدد",
      },
      link: data.link || "",
      image: data.image || "",
      articleEn: data.articleEn || "",
      articleAr: data.articleAr || "",
      processEn: data.processEn || [],
      processAr: data.processAr || [],
      createdAt: "",
      updatedAt: "",
    };

    return <SingleProjectClient singleProj={singleProj} />;
  } catch (error) {
    console.error("Error fetching project:", error);
    notFound();
  }
}