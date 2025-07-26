import sqlite from "node:sqlite";
import crypto from "crypto";
import { ChatDataModel, ChatThreadModel } from "./models.js";

export const TheDB = new sqlite.DatabaseSync("emg.db");

export class ChatDataService {

  static deleteChatThread(threadId) {
    try {
      const dataQuery = TheDB.prepare("DELETE FROM chat_data WHERE chat_thread_id = ?");
      const threadQuery = TheDB.prepare("DELETE FROM chat_threads WHERE id = ?");
      
      TheDB.exec("BEGIN");
      dataQuery.run(threadId);
      threadQuery.run(threadId);
      TheDB.exec("COMMIT;");

      return true;
    }
    catch (error) {
      TheDB.exec("ROLLBACK;");
      console.log(`ERROR: deleteChatThread: ${error.message}`);
      return false;
    }
  }

  static getAllChats() {
    try {
      const query = TheDB.prepare("SELECT * FROM chat_data");
      const dbResult = query.all();
      return dbResult;
    }
    catch (error) {
      console.log(`ERROR: getAllChats: ${error.message}`);
      return null;
    }
  }

  static getAllChatThreads() {
    try {
      const query = TheDB.prepare("SELECT * FROM chat_threads");
      const dbResult = query.all();
      return dbResult;
    }
    catch (error) {
      console.log(`ERROR: getAllChatThreads: ${error.message}`);
      return null;
    }
  }

  static getChatsForThreadById(threadID) {
    try{
      const threadQuery = TheDB.prepare(`SELECT * FROM chat_threads WHERE id = ?;`);
      const threadDbResult = threadQuery.all(threadID);

      const chatQuery = TheDB.prepare(`SELECT * FROM chat_data WHERE chat_thread_id = ?;`);
      const chatModelList = chatQuery.all(threadID);

      const threadModel = new ChatThreadModel();
      threadModel.id = threadDbResult[0].id;
      threadModel.title = threadDbResult[0].title;
      threadModel.created_date = threadDbResult[0].created_date;
      threadModel.updated_date = threadDbResult[0].updated_date;
      threadModel.chats = chatModelList;

      return threadModel;
    }
    catch (error) {
      console.log(`ERROR: getChatsForThreadById: ${error.message}`);
    }
  }

  static saveNewChatData({
    chat_thread_id,
    prompt,
    response,
    blob,
    prompt_tokens,
    response_tokens,
    thinking_tokens,
  }) {
    try {
      TheDB.exec("BEGIN");
      const insertChatData = TheDB.prepare(`
      INSERT INTO chat_data(id, chat_thread_id, prompt, response, blob, prompt_tokens,
        response_tokens, thinking_tokens, created_date)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`);

      const date = new Date();
      let newChatObj = new ChatDataModel();
      newChatObj = {
        id: crypto.randomUUID(),
        chat_thread_id: chat_thread_id,
        prompt: prompt,
        response: response,
        blob: blob,
        prompt_tokens: prompt_tokens,
        response_tokens: response_tokens,
        thinking_tokens: thinking_tokens,
        created_date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
      };

      insertChatData.run(
        newChatObj.id,
        newChatObj.chat_thread_id,
        newChatObj.prompt,
        newChatObj.response,
        newChatObj.blob,
        newChatObj.prompt_tokens,
        newChatObj.response_tokens,
        newChatObj.thinking_tokens,
        newChatObj.created_date,
      );

      TheDB.exec("COMMIT;");
      return newChatObj;
    }
    catch (error) {
      TheDB.exec("ROLLBACK;");
      console.log(`ERROR: saveChatData: ${error.message}`);
      return null;
    }
  }

  static saveNewChatThreadData({
    title,
  }) {
    try {
      TheDB.exec("BEGIN");
      const insertChatThread = TheDB.prepare(`
      INSERT INTO chat_threads(id, title, created_date)
      VALUES(?, ?, ?);`);

      const date = new Date();
      let newChatThread = new ChatThreadModel();
      newChatThread = {
        id: crypto.randomUUID(),
        title: title,
        created_date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
      };

      insertChatThread.run(
        newChatThread.id,
        newChatThread.title,
        newChatThread.created_date,
      );

      TheDB.exec("COMMIT;");
      return newChatThread;
    }
    catch (error) {
      TheDB.exec("ROLLBACK;");
      console.log(`ERROR: saveNewChatThreadData: ${error.message}`);
      return null;
    }
  }
}