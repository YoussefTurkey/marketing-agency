// toastContext.tsx
"use client";
import React, { createContext, useContext, useState, useRef } from "react";
import Notification, { NotificationType, NotificationPosition } from "@/app/components/ui/toast";
import { AnimatePresence } from "framer-motion";
// Importing Language Provider
import { useLanguage } from "@/app/lib/lang/LanguageProvider";

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message?: string;
  showIcon?: boolean;
  duration?: number;
}

interface ToastContextType {
  addNotification: (
    type: NotificationType,
    title: string,
    message?: string,
    showIcon?: boolean,
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const nextIdRef = useRef(1);

  const addNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    showIcon = true,
    duration = 4000
  ) => {
    const newNotification: NotificationItem = {
      id: nextIdRef.current++,
      type,
      title,
      message,
      showIcon,
      duration,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addNotification }}>
      {children}
      <div className={`fixed bottom-4 ${language === 'en' ? 'left-5' : 'right-5'} z-50 w-full max-w-sm space-y-2`}>
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification
              key={n.id}
              type={n.type}
              title={n.title}
              message={n.message}
              showIcon={n.showIcon}
              duration={n.duration}
              onClose={() => handleClose(n.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
};
