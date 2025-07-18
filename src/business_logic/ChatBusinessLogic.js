import { GoogleGenAI } from "@google/genai";
import DotenvFlow from "dotenv-flow";
import { ChatDataService } from "../db/db.js";

DotenvFlow.config();
const ai = new GoogleGenAI({});

export default class ChatBusinessLogic {

  /**
   * Creates a new Chat Thread in the database with a defaulted title.
   * @returns ChatThreadModel.
   */
  static createNewChatThread() {
    const result = ChatDataService.saveNewChatThreadData({
      title: "New Chat Thread",
    });

    return result;
  }

  /**
   * Deletes a single chat thread with the passed in ID.
   * @param chatThreadId - string - UUID of the chat thread to delete.
   * @returns Result of the deletion from the database.
   */
  static deleteChatThread(chatThreadId) {
    const result = ChatDataService.deleteChatThread(chatThreadId);
    return result;
  }

  /**
   * Performs a Gemini one off chat with the passed in prompt.
   * @param promptText - string - The prompt to send to Gemini.
   * @param chatThreadId - string - UUID of the associated chat thread.
   * @returns A response with the response text and role of the chat.
   */
  static async doChatRequest(promptText, chatThreadId){

    let chatThread = ChatDataService.getChatsForThreadById(chatThreadId);
    let chatStr = `"""`;

    chatThread.chats.forEach((chat) => {
      chatStr += `\nuser: ${chat.prompt}\nresponse: ${chat.response}`;
    });

    chatStr += `"""`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: promptText,
      config: {
        systemInstruction: `Consider the following in the response: ${chatStr}`,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking which is expensive.
        },
      },
    });

    if(response.text?.length > 0) {
      const newChat = ChatDataService.saveNewChatData({
        chat_thread_id: chatThreadId,
        prompt: promptText,
        response: response.text,
        blob: "",
        response_tokens: response.usageMetadata?.candidatesTokenCount ?? 0,
        prompt_tokens: response.usageMetadata?.promptTokenCount ?? 0,
        thinking_tokens: response.usageMetadata?.thoughtsTokenCount ?? 0,
      });

      return {
        id: newChat.id,
        chatThreadId: newChat.chat_thread_id,
        prompt: promptText,
        response: response.text,
      };
    }
    else {
      throw new Error("No response text received.");
    }
  }

  /**
   * Returns all chat threads in the database.
   * @returns 
   */
  static getAllChatThreads() {
    return ChatDataService.getAllChatThreads();
  }

  /**
   * Returns a chat thread from the database by ID.
   * @param chatThreadId - string - ID of the chat thread to find in the db.
   * @returns 
   */
  static getChatThreadById(chatThreadId) {
    return ChatDataService.getChatsForThreadById(chatThreadId);
  }
}