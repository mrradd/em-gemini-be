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
      throw new Error("No `prompt` provided.");
    }
    if(!req?.body?.chatThreadId) {
      throw new Error("No `chatThreadId` provided.");
    }

    const response = await ChatBusinessLogic.doChatRequest(req.body.prompt, req.body.chatThreadId);

    res.status(201).json({
      chat: response,
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
    console.log(`ERROR: POST /api/gemini/chat/all: ${error.message}`);
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
    console.log(`ERROR: POST /api/gemini/chat/thread/all: ${error.message}`);
    res.sendStatus(500);
  }
});

/**
GET /api/gemini/chat/thread/:id
Gets all chats in a thread.
**/
geminiRouter.get('/chat/thread/:id', async (req, res) => {
  try {
    const response = await ChatBusinessLogic.getChatThreadById(req.params.id);

    res.status(200).json({
      thread: response,
    });
  }
  catch (error){
    console.log(`ERROR: GET /api/gemini/chat/thread/:id: ${error.message}`);
    res.sendStatus(500);
  }
});

/**
DELETE /api/gemini/chat/thread/:id
Deletes a single Chat Thread by ID.
**/
geminiRouter.delete('/chat/thread/:id', async (req, res) => {
  try {
    const response = await ChatBusinessLogic.deleteChatThread(req.params.id);

    res.status(200).json({
      result: response,
    });
  }
  catch (error){
    console.log(`ERROR: DELETE /api/gemini/chat/thread/:id: ${error.message}`);
    res.sendStatus(500);
  }
});

//TODO CH  EDIT A THREAD'S NAME

export default geminiRouter;