"use client";

import { useState } from "react";
import ChatContainer from "./ChatContainer";
import "@/styles/FloatingChat.css";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatContainer onClose={() => setOpen(false)} />}
      <button
        className={`chat-toggle-button ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar chat" : "Abrir chat"}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}