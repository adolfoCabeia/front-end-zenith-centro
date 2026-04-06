"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "@/styles/ChatContainer.css";
import { X, Bot } from "lucide-react";

interface ChatContainerProps {
  onClose: () => void;
}

export default function ChatContainer({ onClose }: ChatContainerProps) {
  return (
    <div className="chat-container-floating">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            <Bot size={20} />
          </div>
          <div className="chat-header-text">
            <h3>Assistente Virtual</h3>
            <span className="status">Online</span>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
      </div>

      <div className="chat-welcome">
        <div className="welcome-icon">
          <Bot size={32} />
        </div>
        <div className="text">
          <h4>Olá! Sou seu agente virtual</h4>
          <p>
            O que quiseres é só pedir. Tenho informações relacionadas à gestão
            da sua base de dados e estou aqui para ajudar no que precisares.
          </p>
        </div>
      </div>

      <ChatMessages />
      <ChatInput />
    </div>
  );
}
