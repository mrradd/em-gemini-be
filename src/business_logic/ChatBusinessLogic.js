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
   * Performs a Gemini one off chat with the passed in prompt.
   * @param promptText - string - The prompt to send to Gemini.
   * @returns A response with the response text and role of the chat.
   */
  static async doChatRequest(promptText){
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: promptText,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking which is expensive.
        },
      },
    });

    if(response.text?.length > 0) {
      console.log(`${JSON.stringify(response)}`);

      ChatDataService.saveChatData({
        prompt: promptText,
        response: response.text,
        response_tokens: response.usageMetadata?.candidatesTokenCount,
        prompt_tokens: response.usageMetadata?.promptTokenCount,
        thinking_tokens: response.usageMetadata?.thoughtsTokenCount
      });

      return {
        role: response.candidates[0].role,
        text: response.text,
      };
    }
    else {
      throw new Error("No response text received.");
    }
  }

  static async getAllChats() {
    
    return {};
  }
}