"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/DashComponents/Header";
import { useAuthStore } from "@/store/authStore";
import "@/styles/dashboard.css";
import FloatingChat from "@/components/DashComponents/chat/FloatingChat";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const fetchProfile = useAuthStore((s) => s.fetchProfile);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        await fetchProfile();
      } catch {
        if (mounted) router.push("/login");
      } finally {
        if (mounted) setIsChecking(false);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (isChecking) {
    return (
      <div className="fundo">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fundo">
      <Header />
      <main>{children}</main>
      <FloatingChat />
    </div>
  );
}