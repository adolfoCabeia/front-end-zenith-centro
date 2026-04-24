"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./details.css";

import {
  Rocket,
  Code2,
  Server,
  Calendar,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowLeft,
  Download,
  FileText,
  Upload,
  CreditCard,
  MessageCircle,
  Clock,
  Send,
  ClipboardCheck,
  Banknote,
  Copy,
  Check,
} from "lucide-react";

import img from "../../../public/img.jpeg";

export default function CursoPage() {
  const router = useRouter();

  const enrollmentSteps = [
    {
      step: 1,
      icon: <CreditCard size={24} />,
      title: "Pagamento",
      description: "Efetue o pagamento de 100% do valor mensal do curso.",
    },
    {
      step: 2,
      icon: <ClipboardCheck size={24} />,
      title: "Documentos",
      description: "Prepare o seu BI scaneado e o comprovativo de pagamento.",
    },
    {
      step: 3,
      icon: <Send size={24} />,
      title: "Preencha o Formulário",
      description:
        'Clique em "Garantir minha vaga" e preencha o formulário com os seus dados.',
    },
    {
      step: 4,
      icon: <Upload size={24} />,
      title: "Envio",
      description:
        "Anexe o BI scaneado e o comprovativo de pagamento no formulário.",
    },
    {
      step: 5,
      icon: <Clock size={24} />,
      title: "Aguarde",
      description: "Aguarde no máximo 24h para avaliarmos o comprovativo.",
    },
    {
      step: 6,
      icon: <MessageCircle size={24} />,
      title: "Confirmação",
      description:
        "Entraremos em contacto via WhatsApp para confirmar a sua inscrição.",
    },
  ];

  const requiredDocs = [
    { name: "BI Scaneado", icon: <FileText size={18} /> },
    { name: "Comprovativo de Pagamento", icon: <CreditCard size={18} /> },
  ];

  const bankAccounts = [
    {
      bank: "Banco Angolano Investimento (BAI)",
      type: "IBAN BAI",
      value: "0040 0000 7682 1391 1019 1",
      icon: <Banknote size={20} />,
    },
    {
      bank: "Banco Fomento Angola (BFA)",
      type: "IBAN (BFA)",
      value: "0006 0000 5426 8125 3017 7",
      icon: <Banknote size={20} />,
    },
    {
      bank: "Express",
      type: "Número da Conta",
      value: "923 456 789",
      icon: <CreditCard size={20} />,
    },
  ];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="details-page">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow"></div>
        <div className="grid-overlay"></div>
      </div>

      <nav className="details-nav">
        <button
          className="btn-secondary details-back-btn"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </nav>

      <main className="details-main">
        <section className="details-hero">
          <div className="details-badge">
            <Rocket size={16} />
            Curso Profissional
          </div>

          <h1 className="details-title">
            Transforme seu futuro com a programação
          </h1>

          <p className="details-subtitle">
            Aprenda do zero ao avançado e desenvolva habilidades reais para o
            mercado.
          </p>
        </section>

        <section className="details-info">
          <article className="details-card">
            <h3>
              <Code2 size={18} /> Tecnologias
            </h3>
            <ul className="details-list">
              <li>
                <CheckCircle size={14} /> HTML, CSS, JavaScript
              </li>
              <li>
                <CheckCircle size={14} /> React, TypeScript
              </li>
              <li>
                <CheckCircle size={14} /> Node.js, Prisma, PostgreSQL
              </li>
              <li>
                <CheckCircle size={14} /> Git & GitHub + Deploy
              </li>
            </ul>
          </article>

          <article className="details-card details-plan">
            <h3>
              <Code2 size={18} /> Front-End
            </h3>
            <p className="details-price">30.000 Kz/mês</p>
            <ul className="details-schedule">
              <li>Seg - Qua - Sex: 8h - 10h</li>
              <li>10h30 - 12h30</li>
              <li>Sábado - Domingo: 8h - 12h</li>
              <li>Turmas Online - personalizado</li>
            </ul>
          </article>

          <article className="details-card details-plan">
            <h3>
              <Server size={18} /> Back-End
            </h3>
            <p className="details-price">35.000 Kz/mês</p>
            <ul className="details-schedule">
              <li>Seg - Qua - Sex: 14h - 16h</li>
              <li>Sabado e domingo: 13h - 17h</li>
              <li>Turmas Online - personalizado</li>
            </ul>
          </article>

          <article className="details-card details-program">
            <h3>
              <FileText size={18} /> Programa do Curso
            </h3>

            <div className="details-download-grid">
              <a
                href="/public/materiais/Programa_Front_Zenith.pdf"
                download
                className="details-download-card"
              >
                <FileText size={20} />
                <div>
                  <strong>Programa Front-End</strong>
                  <p>Conteúdos completos do curso</p>
                </div>
                <Download size={18} />
              </a>

              <a
                href="/public/materiais/Programa_Back_Zenith.pdf"
                download
                className="details-download-card"
              >
                <FileText size={20} />
                <div>
                  <strong>Programa Back-End</strong>
                  <p>Conteúdos completos do curso</p>
                </div>
                <Download size={18} />
              </a>
            </div>
          </article>
          <article className="details-card details-downloads">
            <h3>
              <Download size={18} /> Programas necessários
            </h3>
            <div className="details-download-grid">
              <a href="#" className="details-download-card">
                <Code2 size={20} />
                <div>
                  <strong>Front-End Pack</strong>
                  <p>VS Code + Extensões + Node</p>
                </div>
              </a>
              <a href="#" className="details-download-card">
                <Server size={20} />
                <div>
                  <strong>Back-End Pack</strong>
                  <p>Node.js + Postman + DB Tools</p>
                </div>
              </a>
            </div>
          </article>
          <article className="details-card">
            <h3>
              <Award size={18} /> Benefícios
            </h3>
            <ul className="details-list">
              <li>
                <CheckCircle size={14} /> Professores experientes
              </li>
              <li>
                <CheckCircle size={14} /> Projetos práticos
              </li>
              <li>
                <CheckCircle size={14} /> Acompanhamento 24/7
              </li>
              <li>
                <CheckCircle size={14} /> Certificado
              </li>
            </ul>
          </article>
          <article className="details-card">
            <h3>
              <Calendar size={18} /> Duração
            </h3>
            <ul className="details-list">
              <li>3 Meses</li>
              <li>Início: 4 de Maio</li>
            </ul>
          </article>
        </section>
        <section className="details-enrollment">
          <div className="enrollment-header">
            <h2 className="details-section-title">Como Inscrever-se</h2>
            <p className="enrollment-subtitle">
              Siga os passos abaixo para garantir a sua vaga no curso
            </p>
          </div>
          <div className="enrollment-docs">
            <h3>
              <FileText size={20} />
              Documentos Necessários
            </h3>
            <div className="docs-grid">
              {requiredDocs.map((doc) => (
                <div key={doc.name} className="doc-item">
                  {doc.icon}
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="enrollment-banking">
            <h3>
              <Banknote size={20} />
              Coordenadas Bancárias
            </h3>
            <p className="banking-hint">
              Efetue o pagamento através de uma das seguintes contas
            </p>
            <div className="banking-grid">
              {bankAccounts.map((account) => (
                <div key={account.type} className="bank-card">
                  <div className="bank-card-header">
                    {account.icon}
                    <span className="bank-name">{account.bank}</span>
                  </div>
                  <div className="bank-card-body">
                    <span className="bank-type">{account.type}</span>
                    <div className="bank-value-wrapper">
                      <code className="bank-value">{account.value}</code>
                      <button
                        className="btn-copy"
                        onClick={() => handleCopy(account.value)}
                        title="Copiar"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="enrollment-steps">
            {enrollmentSteps.map((item, index) => (
              <div key={item.step} className="step-card">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <div className="step-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                {index < enrollmentSteps.length - 1 && (
                  <div className="step-connector" aria-hidden="true"></div>
                )}
              </div>
            ))}
          </div>
          <div className="enrollment-payment">
            <div className="payment-badge">
              <CreditCard size={18} />
              <span>Pagamento: 100% do valor mensal</span>
            </div>
            <p className="payment-note">
              Após o envio, aguarde no máximo <strong>24 horas</strong> para
              avaliarmos o comprovativo. Entraremos em contacto via{" "}
              <strong>WhatsApp</strong>.
            </p>
          </div>
        </section>
        <section className="details-cta">
          <button
            className="btn-primary btn-large btn-glow"
            onClick={() => router.push("/inscricao")}
          >
            Garantir minha vaga
          </button>
          <p className="cta-hint">
            Clique acima para preencher o formulário de inscrição
          </p>
        </section>
        <section className="details-instructor">
          <h2 className="details-section-title">Formador</h2>
          <div className="instructor-profile">
            <Image
              width={56}
              height={56}
              src={img}
              alt="Adolfo Cabeia"
              className="details-avatar"
            />
            <div className="instructor-info">
              <h4>Adolfo Cabeia</h4>
              <p>Engenheiro de Software</p>
              <div className="details-links">
                <a
                  href="https://www.linkedin.com/in/adolfo-cabeia-b989b6305/"
                  target="_blank"
                >
                  <Globe size={14} /> LinkedIn
                </a>
                <a
                  href="https://portfolio-adolfo-cabeia-junior.vercel.app/"
                  target="_blank"
                >
                  <Globe size={14} /> Portfólio
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer-premium">
        <div className="footer-left">
          <h2 className="footer-brand">
            ZENITH <span>DIGITAL</span>
          </h2>
          <p className="footer-tagline">
            Construindo o futuro através da tecnologia
          </p>
        </div>

        <div className="footer-right">
          <h3>Contacto</h3>
          <address className="footer-contact">
            <p>
              <Phone size={16} /> 957 236 001
            </p>
            <p>
              <Mail size={16} /> zenithdigitalao@gmail.com
            </p>
            <p>
              <MapPin size={16} /> Rangel, Luanda
            </p>
          </address>
        </div>
      </footer>
    </div>
  );
}
