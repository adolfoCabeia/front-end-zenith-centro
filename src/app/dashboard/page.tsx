"use client";

import DashboardGrid from "@/components/DashComponents/DashboardGrid";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = async () => {
    await logout(); 
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <>
      <DashboardGrid />
    </>
  );
}