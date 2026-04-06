"use client";

import { X } from "lucide-react";
import CursoForm from "./CursoForm";
import "@/styles/CursoForm.css";

interface Props {
  cursoId: string;
  onClose: () => void;
}

export default function EditCursoModal({ cursoId, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>
          <X />
        </button>

        <CursoForm cursoId={cursoId} onSuccess={onClose} />
      </div>
    </div>
  );
}