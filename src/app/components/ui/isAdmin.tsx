"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import Link from "next/link";

const IsAdmin = () => {
  return (
    <Link href="/admin" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-7 h-7 md:w-10 md:h-10 flex justify-center items-center cursor-pointer transition-all">
      <AiOutlineDashboard size={20} />
    </Link>
  );
};

export default IsAdmin;
