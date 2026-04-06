"use client";

import "@/styles/ChatInput.css";
import { useState, useCallback } from "react";
import useChatStore from "@/store/chat.store";
import { Send } from "lucide-react";

export default function ChatInput() {
  const [text, setText] = useState("");
  const sendMessage = useChatStore((s) => s.sendMessage);
  const loading = useChatStore((s) => s.loading);

  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    await sendMessage(trimmed);
    setText("");
  }, [text, loading, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const isDisabled = !text.trim() || loading;

  return (
    <div className="chat-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        onKeyDown={handleKeyDown}
        disabled={loading}
        maxLength={1000}
        aria-label="Mensagem"
      />
      <button 
        onClick={handleSend} 
        disabled={isDisabled}
        aria-label="Enviar mensagem"
      >
        <Send size={18} />
      </button>
    </div>
  );
}