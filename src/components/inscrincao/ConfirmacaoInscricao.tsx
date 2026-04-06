"use client";

import { CheckCircle, Clock, Mail, Phone, ArrowLeft, Home, FileText } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/confirmacao.module.css";
import { useEffect, useState } from "react";

interface ConfirmacaoInscricaoProps {
    nome?: string;
    email?: string;
}

export function ConfirmacaoInscricao({ nome, email }: ConfirmacaoInscricaoProps) {
    const [ref, setRef] = useState("");

    useEffect(() => {
        const value = `INS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
        setRef(value);
    }, []);

return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.glow} />

            <div className={styles.content}>
                <div className={styles.badge}>
                    <FileText size={14} />
                    Inscrição Recebida
                </div>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconCircle}>
                        <CheckCircle size={64} className={styles.iconSuccess} />
                    </div>
                    <div className={styles.iconPulse} />
                </div>

                <h1 className={styles.title}>
                    Obrigado pela sua inscrição!
                </h1>

                <p className={styles.message}>
                    {nome ? `Olá ${nome}, ` : ""}
                    recebemos a sua inscrição com sucesso. A nossa equipa está a
                    avaliar todos os documentos enviados.
                </p>

                <div className={styles.infoBox}>
                    <div className={styles.infoIcon}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.infoContent}>
                        <h3>Próximos passos</h3>
                        <p>
                            Entraremos em contacto consigo em breve para confirmar a
                            sua matrícula. O prazo médio de resposta é de
                            <strong> 24 a 48 horas úteis</strong>.
                        </p>
                    </div>
                </div>

                <div className={styles.contactSection}>
                    <h4>Em caso de dúvidas, contacte-nos:</h4>

                    <div className={styles.contactGrid}>
                        <a href="mailto:info@softcentro.ao" className={styles.contactItem}>
                            <Mail size={18} />
                            <span>zenithdigitalao@gmail.com</span>
                        </a>

                        <a href="tel:+244957236001" className={styles.contactItem}>
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
                            Um email de confirmação foi enviado para <strong>{email}</strong>
                        </p>
                    )}
                </div>
                <div className={styles.actions}>
                    <Link href="/" className={styles.btnSecondary}>
                        <ArrowLeft size={18} />
                        Voltar ao site
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
}