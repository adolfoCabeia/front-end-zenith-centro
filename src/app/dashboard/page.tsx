"use client";

import DashboardGrid from "@/components/DashComponents/DashboardGrid";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <>
      <DashboardGrid />
    </>
  );
}