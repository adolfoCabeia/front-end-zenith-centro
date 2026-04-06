"use client";

import { X } from "lucide-react";
import AlunoForm from "./AlunoForm";
import "@/styles/AlunoForm.css";

interface EditAlunoModalProps {
  alunoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditAlunoModal({
  alunoId,
  isOpen,
  onClose,
}: EditAlunoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>
          <X />
        </button>

        <AlunoForm
          alunoId={alunoId}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}