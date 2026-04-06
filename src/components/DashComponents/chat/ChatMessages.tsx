"use client";

import "@/styles/ChatMessages.css";
import useChatStore from "@/store/chat.store";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";

export default function ChatMessages() {
  const messages = useChatStore((s) => s.messages);
  const loading = useChatStore((s) => s.loading);

  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messageList = useMemo(() => {
    return messages.map((msg, i) => (
      <ChatMessage key={`${msg.role}-${i}-${msg.content.slice(0, 20)}`} message={msg} />
    ));
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const hasMessages = messages.length > 0;

  return (
    <div className={`chat-messages ${!hasMessages ? "empty" : ""}`}>
      {!hasMessages && !loading && (
        <div className="empty-state">
          <span className="hint">Começa a conversar...</span>
        </div>
      )}
      
      {messageList}

      {loading && (
        <div className="typing">
          <Loader2 size={14} className="spinner" />
          <span>A processar...</span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}