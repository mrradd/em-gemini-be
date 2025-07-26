import { Router } from "express";
import ChatBusinessLogic from "../business_logic/ChatBusinessLogic.js";

const chatRouter = Router();

/**
POST /api/chat/thread/edit
Gets all Chat Threads.
**/
chatRouter.get('/thread/edit', async (req, res) => {
  try {
    if(!req?.body?.chatThreadId) {
      throw new Error("No `chatThreadId` provided.");
    }
    if(!req?.body?.newName) {
      throw new Error("No `newName` provided.");
    }

    const response = await ChatBusinessLogic.editChatThread(req.body);

    res.status(200).json({
      threads: response,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat/thread/all: ${error.message}`);
    res.sendStatus(500);
  }
});

export default chatRouter;