"use client";

import { X } from "lucide-react";
import PagamentoForm from "./PagamentoForm";
import "@/styles/PagamentoForm.css";

interface Props {
  pagamentoId: string;
  onClose: () => void;
}

export default function EditPagamentoModal({ pagamentoId, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>
          <X/>
        </button>

        <PagamentoForm pagamentoId={pagamentoId} onSuccess={onClose} />
      </div>
    </div>
  );
}