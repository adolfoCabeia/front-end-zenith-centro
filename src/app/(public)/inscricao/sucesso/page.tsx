import { ConfirmacaoInscricao } from "@/components/inscrincao/ConfirmacaoInscricao";

interface PageProps {
  searchParams: {
    nome?: string;
    email?: string;
  };
}

export default function InscricaoSucessoPage({ searchParams }: PageProps) {
  return (
    <ConfirmacaoInscricao 
      nome={searchParams.nome} 
      email={searchParams.email} 
    />
  );
}