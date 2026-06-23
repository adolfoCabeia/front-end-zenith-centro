"use client";

import React, { useEffect } from "react";
import {
  ArrowRight,
  Code2,
  LayoutTemplate,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import img from "../../../public/img.jpeg";
import "@/styles/hero.css";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const router = useRouter()

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <section className="hero-container" role="banner">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
        title={isDarkMode ? "Modo claro" : "Modo escuro"}
      >
        {isDarkMode ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
      </button>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="badge-premium">
          <Sparkles size={14} strokeWidth={2.5} />
          <span>Plano de Férias • Vagas limitadas</span>
        </div>

        <h1 className="hero-title">
          Torne-se Desenvolvedor
          <span className="text-gradient">Front-End ou Back-End</span>
        </h1>

        <p className="hero-subtitle">
          Formação intensiva de 3 meses com projetos reais, mentoria direta e 
          suporte personalizado para acelerar sua carreira.
        </p>

        <div className="hero-courses" role="list">
          <article className="course-card" role="listitem" tabIndex={0}>
            <LayoutTemplate size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>Front-End</strong>
              <p>HTML, CSS, JS, REACT, FIGMA & UI Design System</p>
              <span className="price">30.000 Kz/mês</span>
            </div>
          </article>

          <article className="course-card" role="listitem" tabIndex={0}>
            <Code2 size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>Back-End</strong>
              <p>JavasScript, TypeScript, Node.js, PostgreSQL, Prisma & API Design</p>
              <span className="price">35.000 Kz/mês</span>
            </div>
          </article>
        </div>

        <div className="hero-actions">
          {/*<button 
            className="btn-premium"
            aria-label="Garantir minha vaga no curso"
            onClick={()=>router.push('/reservas')}
          >
            Quero Fazer Parte da Próxima Turma
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </button> */}
          <button 
            className="btn-premium"
            aria-label="Garantir minha vaga no curso"
            onClick={()=>router.push('/inscricao')}
          >
            Garantir minha vaga
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </button> 

          <button 
            className="btn-secondary"
            aria-label="Ver programa completo do curso"
            onClick={()=>router.push('/detalhes')} 
          >
            Obter mais informações
          </button>
        </div>

        <div className="hero-mentor">
          <Image
            width={56}
            height={56}
            src={img}
            alt="Adolfo Cabeia - Formador & Full-Stack Engineer"
            className="mentor-avatar"
            priority
          />
          <div>
            <strong>Adolfo Cabeia</strong>
            <p>Formador & Full-Stack Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
};