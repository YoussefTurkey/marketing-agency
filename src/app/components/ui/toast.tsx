"use client";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";
export type NotificationPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  showIcon?: boolean;
  duration?: number;
  onClose: () => void;
}

const typeStyles: Record<NotificationType, string> = {
  success: "bg-[hsl(var(--background))] border border-[hsl(var(--secondary))] rounded-xl",
  error: "bg-[hsl(var(--background))] border border-red-500 rounded-xl",
  info: "bg-[hsl(var(--background))] border border-blue-500 rounded-xl",
  warning: "bg-[hsl(var(--background))] border border-orange-500 rounded-xl",
};

export default function Notification({
  type,
  title,
  message,
  showIcon = true,
  duration = 4000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 p-4 rounded-lg shadow-md ${typeStyles[type]} relative`}
    >
      {showIcon && (
        <div className="mt-1">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
          {type === "warning" && "⚠️"}
        </div>
      )}

      <div className="flex-1">
        <p className="font-bold">{title}</p>
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 hover:opacity-70"
      >
        <IoClose size={18} />
      </button>
    </motion.div>
  );
}
