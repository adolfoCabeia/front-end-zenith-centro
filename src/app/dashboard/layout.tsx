"use client";

import { useEffect } from "react";
import Header from "@/components/DashComponents/Header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import "@/styles/dashboard.css";
import FloatingChat from "@/components/DashComponents/chat/FloatingChat";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/login");
    }
  }, []);

  return (
      <div className="fundo">
        <Header />
        <main>{children}</main>
        <FloatingChat />
      </div>
  );
}
