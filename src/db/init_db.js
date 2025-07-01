import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    TheDB.exec("BEGIN");

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_threads(
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      created_date TEXT NOT NULL,
      updated_date TEXT,
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_data(
      id TEXT PRIMARY KEY,
      chat_thread_id TEXT,
      prompt TEXT NOT NULL,
      response TEXT NOT NULL,
      blob BLOB,
      prompt_tokens INTEGER NOT NULL,
      response_tokens INTEGER NOT NULL,
      thinking_tokens INTEGER,
      created_date TEXT NOT NULL,
      FOREIGN KEY(chat_thread_id) REFERENCES chat_threads(id)
    );`);
    TheDB.exec("COMMIT");
    console.log("Finished initializing the DB.");
  }
  catch (error) {
    TheDB.exec("ROLLBACK");
    console.log(`ERROR initDb: ${error.message}`);
  }
  finally {
    console.log("Exiting.");
    process.exit(0);
  }
}

initDb();