"use client";

import ProfileForm from "@/components/profile/ProfileForm";
import PasswordForm from "@/components/profile/PasswordForm";
import "@/styles/ProfileForm.css";

export default function PerfilPage() {
  return (
    <div className="profile-page">
      <h1>Meu Perfil</h1>
      
      <div className="profile-grid">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}