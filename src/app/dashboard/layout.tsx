"use client";

import { useEffect, useCallback } from "react";
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
  const { fetchProfile, isAuthenticated, isLoading, hasChecked } = useAuthStore();

  const checkAuth = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (hasChecked && !isAuthenticated && !isLoading) {
      router.replace("/login"); 
    }
  }, [hasChecked, isAuthenticated, isLoading, router]);

  if (!hasChecked || isLoading) {
    return <DashboardSkeleton />;
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

function DashboardSkeleton() {
  return (
    <div className="fundo skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-main">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    </div>
  );
}