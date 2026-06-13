"use client";

import {
  CheckCircle,
  Clock,
  Mail,
  Phone,
  ArrowLeft,
  BookmarkCheck,
} from "lucide-react";

import Link from "next/link";
import styles from "@/styles/confirmacao.module.css";
import { useEffect, useState } from "react";

interface ConfirmacaoPreInscricaoProps {
  nome?: string;
  email?: string;
  curso?: string;
}

export function ConfirmacaoPreInscricao({
  nome,
  email,
  curso,
}: ConfirmacaoPreInscricaoProps) {
  const [ref, setRef] = useState("");

  useEffect(() => {
    const value = `PRE-${Date.now()
      .toString(36)
      .toUpperCase()
      .slice(-6)}`;

    setRef(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.glow} />

        <div className={styles.content}>
          <div className={styles.badge}>
            <BookmarkCheck size={14} />
            Vaga Reservada
          </div>

          <div className={styles.iconWrapper}>
            <div className={styles.iconCircle}>
              <CheckCircle
                size={64}
                className={styles.iconSuccess}
              />
            </div>

            <div className={styles.iconPulse} />
          </div>

          <h1 className={styles.title}>
            Pré-inscrição realizada com sucesso!
          </h1>

          <p className={styles.message}>
            {nome ? `Olá ${nome}, ` : ""}
            a sua manifestação de interesse foi registada.
            Entraremos em contacto consigo assim que houver
            disponibilidade para novas turmas.
          </p>

          {curso && (
            <div className={styles.referenceBox}>
              <p>
                <span>Curso de Interesse:</span>
                <strong>{curso}</strong>
              </p>
            </div>
          )}

          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>
              <Clock size={24} />
            </div>

            <div className={styles.infoContent}>
              <h3>O que acontece agora?</h3>

              <p>
                O seu nome foi adicionado à lista prioritária de
                interessados. Quando uma nova turma estiver
                disponível, entraremos em contacto para que possa
                confirmar a sua inscrição.
              </p>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h4>Precisa de ajuda?</h4>

            <div className={styles.contactGrid}>
              <a
                href="mailto:zenithdigitalao@gmail.com"
                className={styles.contactItem}
              >
                <Mail size={18} />
                <span>zenithdigitalao@gmail.com</span>
              </a>

              <a
                href="tel:+244957236001"
                className={styles.contactItem}
              >
                <Phone size={18} />
                <span>+244 957 236 001</span>
              </a>
            </div>
          </div>

          <div className={styles.referenceBox}>
            <p>
              <span>Referência:</span>
              <code>{ref}</code>
            </p>

            {email && (
              <p className={styles.emailConfirm}>
                Guardámos o email{" "}
                <strong>{email}</strong> para futuros
                contactos.
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <Link
              href="/"
              className={styles.btnSecondary}
            >
              <ArrowLeft size={18} />
              Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}