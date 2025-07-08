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

    const response = await ChatBusinessLogic.doChatRequest(req.body.prompt);

    res.status(201).json({
      text: response.text,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat: ${error.message}`);
    res.sendStatus(500);
  }
});

/**
GET /api/gemini/all
Requests all chats from the database.
**/
geminiRouter.get('/chat/all', async (req, res) => {
  try {
    const response = await ChatBusinessLogic.getAllChats();

    res.status(200).json({
      chats: response
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat: ${error.message}`);
    res.sendStatus(500);
  }
});

/**
POST /api/gemini/chat/thread/new
Creates a new Chat Thread.
---
req.body: none
**/
geminiRouter.post('/chat/thread/new', async (req, res) => {
  try {

    const response = await ChatBusinessLogic.createNewChatThread();

    res.status(201).json({
      chatThread: response,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat/thread/new: ${error.message}`);
    res.sendStatus(500);
  }
});

//TODO CH  GET ALL THREADS
/**
GET /api/gemini/chat/thread/all
Gets all Chat Threads.
**/
geminiRouter.get('/chat/thread/all', async (req, res) => {
  try {
    const response = await ChatBusinessLogic.getAllChatThreads();

    res.status(200).json({
      threads: response,
    });
  }
  catch (error){
    console.log(`ERROR: POST /api/gemini/chat/thread/new: ${error.message}`);
    res.sendStatus(500);
  }
});


//TODO CH  GET ALL CHATS FOR A THREAD
//TODO CH  DELETE A THREAD
//TODO CH  EDIT A THREAD'S NAME

export default geminiRouter;