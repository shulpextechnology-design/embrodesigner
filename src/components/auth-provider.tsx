"use client";

import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  role: "BUYER" | "DESIGNER" | "ADMIN" | null;
  loading: boolean;
  setUser: (user: User | null, role: "BUYER" | "DESIGNER" | "ADMIN" | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user, role) => set({ user, role }),
  setLoading: (loading) => set({ loading }),
}));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.data();
          setUser(firebaseUser, userData?.role || "BUYER");
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(firebaseUser, "BUYER"); // default fallback
        }
      } else {
        setUser(null, null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
