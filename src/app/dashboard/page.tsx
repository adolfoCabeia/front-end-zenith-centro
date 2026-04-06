"use client";

import DashboardGrid from "@/components/DashComponents/DashboardGrid";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const {token, logout} = useAuthStore()
    const router = useRouter()

    const handleLogout = ()=>{
        logout()
        router.push('/login')
    }

  return (
    <>
      <DashboardGrid/>
    </>
  );
}
