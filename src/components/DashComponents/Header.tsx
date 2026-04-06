// components/Header.tsx
"use client";

import {
  Tally3,
  LogOut,
  User,
  Settings,
  Users,
  BookOpen,
  GraduationCap,
  CreditCard,
  LayoutDashboard,
  X,
  Search,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "@/styles/header.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const router = useRouter();
  const { user, logout } = useAuthStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpenUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gera avatar a partir do nome do usuário logado
  const getAvatar = () => {
    if (!user?.nome) return "??";
    const nomes = user.nome.split(" ");
    const primeiro = nomes[0][0] || "";
    const ultimo = nomes[nomes.length - 1][0] || "";
    return `${primeiro}${ultimo}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="menu-wrapper" ref={menuRef}>
        <button
          className="menu-btn"
          onClick={() => {
            setOpenMenu(!openMenu);
            setOpenUser(false);
          }}
          aria-label="Menu"
        >
          {openMenu ? <X size={24} /> : <Tally3 size={24} />}
        </button>

        {openMenu && (
          <div className="dropdown menu-dropdown">
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard")}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard/usuarios")}
            >
              <Users size={16} /> Usuários
            </button>
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard/aluno")}
            >
              <GraduationCap size={16} /> Alunos
            </button>
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard/curso")}
            >
              <BookOpen size={16} /> Cursos
            </button>
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard/pagamento")}
            >
              <CreditCard size={16} /> Pagamentos
            </button>
          </div>
        )}
      </div>

      <div className="search">
        <input type="search" placeholder="Pesquisar..." />
        <button>
          <Search size={18} />
        </button>
      </div>

      <div className="user-wrapper" ref={userRef}>
        <button
          className="user-btn"
          onClick={() => {
            setOpenUser(!openUser);
            setOpenMenu(false);
          }}
        >
          <div className="avatar">{getAvatar()}</div>
          <div className="user-text">
            <p>{user?.nome || "Carregando..."}</p>
            <span>{user?.email || ""}</span>
          </div>
        </button>

        {openUser && (
          <div className="dropdown user-dropdown">
            <div className="dropdown-header">
              <p className="dropdown-user-name">{user?.nome}</p>
              <p className="dropdown-user-email">{user?.email}</p>
            </div>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              onClick={() => router.push("/dashboard/perfil")}
            >
              <User size={16} /> Perfil
            </button>
            <button className="dropdown-item">
              <Settings size={16} /> Configurações
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
