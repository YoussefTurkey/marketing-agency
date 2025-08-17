"use client";
// importing React-Icons
import { AiOutlineSun } from "react-icons/ai";
import { FiMoon } from "react-icons/fi";
import { useTheme } from "@/app/lib/theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--background))] hover:text-[hsl(var(--foreground))] rounded-full w-7 h-7 md:w-10 md:h-10 flex justify-center items-center cursor-pointer transition-all"
    >
      {theme === "light" ? <AiOutlineSun /> : <FiMoon />}
    </button>
  );
}
