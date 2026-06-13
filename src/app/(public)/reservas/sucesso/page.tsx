import { ConfirmacaoPreInscricao } from "@/components/reservas/ConfirmacaoPreInscricao";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    nome?: string;
    email?: string;
    curso?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <ConfirmacaoPreInscricao
      nome={params.nome}
      email={params.email}
      curso={params.curso}
    />
  );
}