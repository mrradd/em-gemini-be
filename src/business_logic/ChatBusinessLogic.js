import { GoogleGenAI } from "@google/genai";
import DotenvFlow from "dotenv-flow";

DotenvFlow.config();
const ai = new GoogleGenAI({});

export default class ChatBusinessLogic {

  /**
   * Performs a Gemini one off chat with the passed in prompt.
   * @param promptText - string - The prompt to send to Gemini.
   * @returns 
   */
  static async doChatRequest(promptText){
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    if(response.text?.length > 0) {
      console.log(`${JSON.stringify(response)}`);
      return {
        role: response.candidates[0].role,
        text: response.text,
      };
    }
    else {
      throw new Error("No response text received.");
    }
  }
}