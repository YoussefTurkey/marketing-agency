"use client";

import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Buttons from "@/app/components/ui/Buttons";
import type { PortfolioItem } from "@/types/globalTypes";
import Loading from "@/app/components/ui/Loading";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import { Language } from "firebase/ai";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

const db = getFirestore(app);

export default function AdminDashboardPage() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data: PortfolioItem[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PortfolioItem[];
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleteLoading(id);
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects Dashboard</h1>
        <Buttons
          style="md:flex hidden"
          onClick={() => router.push("/admin/new")}
        >
          New Project
        </Buttons>
        <Buttons
          style="flex md:hidden rounded-full! p-2.5"
          onClick={() => router.push("/admin/new")}
        >
          <IoAdd size={20} />
        </Buttons>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
          <p className="text-gray-600 text-lg">No projects found yet.</p>
          <Buttons onClick={() => router.push("/admin/new")}>
            Add your first project
          </Buttons>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[hsl(var(--background))] rounded-lg shadow-md overflow-hidden border border-[hsl(var(--secondary))] hover:shadow-lg transition"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gray-200">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.titleEn}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-[hsl(var(--foreground))]">
                    {project.titleEn}
                  </h3>
                  <span className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] text-xs px-2 py-1 rounded">
                    {project.categoryEn}
                  </span>
                </div>

                <p className="text-sm text-[hsl(var(--foreground))] mb-2">
                  <strong>Client:</strong> {project.info.clientEn}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.info.servicesEn.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className="bg-[hsl(var(--secondary))] text-[hsl(var(--background))] text-xs px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                  {project.info.servicesEn.length > 3 && (
                    <span className="text-xs text-[hsl(var(--foreground))]">
                      +{project.info.servicesEn.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-xs text-[hsl(var(--foreground))] space-y-1">
                  <p>
                    <strong>Industry:</strong> {project.info.industryEn}
                  </p>
                  <p>
                    <strong>Country:</strong> {project.info.countryEn}
                  </p>
                  {project.createdAt && (
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[hsl(var(--secondary))]">
                  <Link href={`/projects/${project.id}` || ''}>
                    {language === "en" ? "See Project" : "شاهد المشروع"}
                  </Link>

                  <div className="flex gap-5">
                    <button
                      onClick={() => handleEdit(project.id!)}
                      className="cursor-pointer text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground)/80%)] text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      disabled={deleteLoading === project.id}
                      className="cursor-pointer text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      {deleteLoading === project.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
