import { Router } from "express";
import DotenvFlow from "dotenv-flow";
import { GoogleGenAI } from "@google/genai";

DotenvFlow.config();

const ai = new GoogleGenAI({});
const geminiRouter = Router();

/**
//POST /api/gemini/chat
Requests a one-off chat.

req:
{
  prompt: string //User's prompt for the AI request.
}
**/

geminiRouter.post('/chat', async (req, res) => {
  try {

    if(!req?.body?.prompt) {
      throw new Error("No `prompt` provided.")
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });
    console.log(response.text);

    res.status(201).json({
      text: response.text,
      usageMetadata: response.usageMetadata,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat: ${error.message}`);
    res.sendStatus(500);
  }
});

export default geminiRouter;