// store/chat.store.ts
import { create } from "zustand";
import { chatService } from "@/services/chat.service";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatStore {
  messages: Message[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,

  sendMessage: async (text) => {
    const userMessage: Message = {
      role: "user",
      content: text,
    };
    set({
      messages: [...get().messages, userMessage],
      loading: true,
    });

    try {
      const response = await chatService.sendMessage(text);

      const botMessage: Message = {
        role: "assistant",
        content: response.data.message,
      };
      set({
        messages: [...get().messages, botMessage],
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export default useChatStore;