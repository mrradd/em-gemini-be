import { Router } from "express";
import ChatBusinessLogic from "../business_logic/ChatBusinessLogic.js";

const chatRouter = Router();

/**
POST /api/gemini/chat
Requests a one-off chat.
---
req.body:
{
  prompt: string //User's prompt for the AI request.
  chatThreadId: string //UUID of the chat thread.
}
**/
chatRouter.post('/chat', async (req, res) => {
  try {
    if(!req?.body?.prompt) {
      throw new Error("No `prompt` provided.");
    }
    if(!req?.body?.chatThreadId) {
      throw new Error("No `chatThreadId` provided.");
    }

    const response = await ChatBusinessLogic.doChatRequest(req.body);

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
chatRouter.get('/chat/all', async (req, res) => {
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
chatRouter.post('/chat/thread/new', async (req, res) => {
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
chatRouter.get('/chat/thread/all', async (req, res) => {
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
chatRouter.get('/chat/thread/:id', async (req, res) => {
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
chatRouter.delete('/chat/thread/:id', async (req, res) => {
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

/**
PATCH /api/gemini/chat/thread/edit
Updates a Chat Thread's meta data.
---
req.body:
{
  newTitle: string //New title for the chat thread.
  chatThreadId: string //UUID of the chat thread to change.
}
**/
chatRouter.patch('/chat/thread/edit', async (req, res) => {
  try {
    if(req.body == null) {
      throw new Error("No body given.")
    }
    
    const response = await ChatBusinessLogic.updateChatThread(req.body);

    res.status(200).json(response);
  }
  catch (error){
    console.log(`ERROR: PATCH api/gemini/chat/thread/edit: ${error.message}`);
    res.sendStatus(500);
  }
});

export default chatRouter;