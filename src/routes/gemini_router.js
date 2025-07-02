import { Router } from "express";
import ChatBusinessLogic from "../business_logic/ChatBusinessLogic.js";

const geminiRouter = Router();

/**
POST /api/gemini/chat
Requests a one-off chat.
---
req.body:
{
  prompt: string //User's prompt for the AI request.
}
**/
geminiRouter.post('/chat', async (req, res) => {
  try {
    if(!req?.body?.prompt) {
      throw new Error("No `prompt` provided.")
    }

    const response = await ChatBusinessLogic.doChatRequest(req?.body?.prompt);

    res.status(201).json({
      text: response.text,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat: ${error.message}`);
    res.sendStatus(500);
  }
});

export default geminiRouter;