// Importing Next Components
import { notFound } from "next/navigation";
// Importing Components
import SingleProjectClient from "./SingleProjectClient";
// Importing data
import { project } from "@/app/data/database";

interface SingleProjectProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleProjectPage({ params }: SingleProjectProps) {
  const { slug } = await params;
  const singleProj = project.find((proj) => proj.slug === slug);

  if (!singleProj) {
    return notFound;
  }

  return <SingleProjectClient singleProj={singleProj} />;
}
