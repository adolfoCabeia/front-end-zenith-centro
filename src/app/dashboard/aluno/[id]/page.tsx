"use client";

import AlunoDetails from "@/components/aluno/AlunoDetails";
import { useParams } from "next/navigation";

export default function AlunoPage() {
  const params = useParams();
  const id = params?.id as string;

  return <AlunoDetails alunoId={id} />;
}