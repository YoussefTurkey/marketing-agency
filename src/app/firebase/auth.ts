"use client";
import { auth } from "@/app/firebase/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

// 🔑 تسجيل دخول الأدمن
export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// 🚪 تسجيل خروج
export async function logout() {
  return await signOut(auth);
}

// 👤 Hook يتابع حالة المستخدم
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
