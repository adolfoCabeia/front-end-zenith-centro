import "@/styles/ChatMessage.css";
import { Message } from "@/store/chat.store";
import { User, Bot } from "lucide-react";
import { memo } from "react";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      {!isUser && (
        <div className="message-avatar bot-avatar">
          <Bot size={16} />
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">
          {message.content}
        </div>
        <span className="message-time">
          {new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="message-avatar user-avatar">
          <User size={16} />
        </div>
      )}
    </div>
  );
}

export default memo(ChatMessage);