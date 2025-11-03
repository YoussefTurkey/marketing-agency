"use client";
// Importing Next Components
import Image from "next/image";
import Link from "next/link";
// Framer Motion
import { motion } from "framer-motion";
// React hooks
import { useEffect, useState } from "react";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";
// Importing Components
import Titles from "@/app/components/ui/Titles";
// Importing React-Icons
import { LuDownload } from "react-icons/lu";
// Firebase
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/app/firebase/firebase";
import Loading from "@/app/components/ui/Loading";
import { PortfolioItem } from "@/types/globalTypes";

const db = getFirestore(app);

const Projects = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData: PortfolioItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PortfolioItem[];
        
        // تصفية المشاريع اللي فيها صورة فقط
        const validProjects = projectsData.filter(project => 
          project.image && project.image.trim() !== ""
        );
        
        setProjects(validProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  console.log(projects)

  if (loading) return <Loading />;

  return (
    <main className="container mx-auto my-30 px-5 xl:px-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <Titles style="!w-fit">
          {language === "en" ? "Our Projects" : "مشاريعنا"}
        </Titles>
        <Link
          href="/pdfs/This-Is-Marketing.pdf"
          target="_blank"
          role="button"
          className={`flex ${
            language === "en" ? "flex-row" : "flex-row-reverse"
          } items-center justify-center md:text-md p-3 sm:px-[25px] sn:py-[10px] rounded-full sm:rounded-md bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] dark:text-[hsl(var(--background))] dark:hover:text-[hsl(var(--foreground))] transition-all capitalize font-bold`}
        >
          <span className="sm:pr-2 text-lg">
            <LuDownload />
          </span>
          <span className="hidden sm:flex">
            {language === 'en' ? 'Download as PDF' : 'إحفظه كـ PDF'}
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: index * 0.1
            }}
            className="relative w-full sm:w-90 lg:w-60 h-80 xl:w-80 xl:h-100 2xl:w-90 2xl:h-120 rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* استخدام صورة افتراضية إذا كانت الصورة فارغة */}
            {project.image && project.image.trim() !== "" ? (
              <Image
                src={project.image}
                alt={language === 'en' ? project.titleEn : project.titleAr}
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  {language === "en" ? "No Image" : "لا توجد صورة"}
                </span>
              </div>
            )}

            <div className={`absolute inset-0 flex items-end ${
              language === 'en' ? 'justify-start' : 'justify-end'
            } p-4 bg-gradient-to-t from-black/50 to-transparent`}>
              <Link
                href={`/projects/${project.id}`} 
                role="button"
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] px-4 py-2 rounded-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              >
                {language === "en" ? "See Project" : "شاهد المشروع"}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {projects.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center py-10"
        >
          <p className="text-lg text-gray-600">
            {language === "en" ? "No projects found" : "لا توجد مشاريع"}
          </p>
        </motion.div>
      )}
    </main>
  );
};

export default Projects;