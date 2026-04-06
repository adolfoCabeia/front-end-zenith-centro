"use client";

import { useEffect } from "react";
import "@/styles/AlunoDetails.css";
import useAlunoStore from "@/store/alunoStore";

interface Props {
  alunoId: string;
}

export default function AlunoDetails({ alunoId }: Props) {
  const aluno = useAlunoStore((s) => s.aluno);
  const fetchAlunoById = useAlunoStore((s) => s.fetchAlunoById);
  const loading = useAlunoStore((s) => s.loading);

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.click();
  };

  useEffect(() => {
    const loadAluno = async () => {
      try {
        fetchAlunoById(alunoId);
      } catch (error) {
        console.error(error);
      }
    };

    loadAluno();
  }, [alunoId]);

  useEffect(() => {
    console.log(aluno);
  });

  if (loading)
    return (
      <div className="loading-container">Carregando dashboard alunos...</div>
    );
  if (!aluno) return <p>Aluno não encontrado</p>;

  return (
    <div className="aluno-details">
      <h2>Detalhes do Aluno</h2>
      <div className="card-items">
        <div className="card">
          <h3>Informações Pessoais</h3>
          <p>
            <strong>Nome:</strong> {aluno.nome}
          </p>
          <p>
            <strong>Email:</strong> {aluno.email}
          </p>
          <p>
            <strong>Telefone:</strong> {aluno.telefone}
          </p>
          <p>
            <strong>Status:</strong>
            <span className={`status ${aluno.status.toLowerCase()}`}>
              {aluno.status}
            </span>
          </p>
        </div>
        <div className="card">
          <h3>Turma</h3>
          <p>
            <strong>Curso:</strong> {(aluno.turma as any)?.curso?.nome}
          </p>
          <p>
            <strong>Horário:</strong> {(aluno.turma as any)?.horario}
          </p>
          <p>
            <strong>Dias:</strong>{" "}
            {(aluno.turma as any)?.diaSemana?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Período:</strong>{" "}
            {(aluno.turma as any)?.dataInicio
              ? new Date((aluno.turma as any).dataInicio).toLocaleDateString(
                  "pt-BR",
                )
              : "N/A"}{" "}
            -{" "}
            {(aluno.turma as any)?.dataFim
              ? new Date((aluno.turma as any).dataFim).toLocaleDateString(
                  "pt-BR",
                )
              : "N/A"}
          </p>
        </div>

        <div className="card">
          <h3>Documentos</h3>

          <div className="docs">
            <div className="doc-item">
              <p>
                BI:{" "}
                <button onClick={() => handleDownload(aluno.biUrl, "bi.png")}>
                  Baixar BI
                </button>
              </p>
            </div>

            <div className="doc-item">
              <p>
                Comprovativo:{" "}
                <button
                  onClick={() =>
                    handleDownload(aluno.comprovativoUrl, "comprovativo.png")
                  }
                >
                  Baixar Comprovativo
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Registo</h3>
          <p>
            <strong>Criado em:</strong>{" "}
            {new Date(aluno.createdAt).toLocaleString("pt-AO")}
          </p>

          <p>
            <strong>Atualizado em:</strong>{" "}
            {new Date(aluno.updatedAt).toLocaleString("pt-AO")}
          </p>
        </div>

        <div className="card">
          <h3>Pagamentos</h3>
          {aluno.pagamentos.length === 0 ? (
            <p className="no-data">Nenhum pagamento registado</p>
          ) : (
            <div className="pagamentos-list">
              {aluno.pagamentos.map((p: any, i: number) => (
                <div key={i} className="pagamento-item">
                  <div className="pagamento-info">
                    <span className="pagamento-valor">
                      {new Intl.NumberFormat("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      }).format(p.valor)}
                    </span>
                    <span
                      className={`pagamento-status ${p.status.toLowerCase()}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <span className="pagamento-data">
                    {new Date(p.data).toLocaleDateString("pt-AO")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
