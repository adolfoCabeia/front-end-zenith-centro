import { api } from "./api";

export const chatService = {
  sendMessage: async (message: string) => {
    return api.post("/api/chat", { message });
  },
};