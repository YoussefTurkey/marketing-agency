// Importing Next Components
import { notFound } from "next/navigation";
// Importing Components
import TeamMemberClient from "./TeamMemberClient";
// Importing data
import { teams } from "@/app/data/database";

interface TeamPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const member = teams.find((person) => person.slug === slug);

  if (!member) {
    return notFound;
  }

  return <TeamMemberClient member={member} />;
}
