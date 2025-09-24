import { TheDB } from "../db.js";
import { Utils } from "../../utils/utils.js";

//20250923-1047
export const migration_1 = {
  version: "1",
  migration_up: () => { migration_1_up(); },
  migration_down: () => { migration_1_down(); }
};

const migration_1_up = () => {
  try {
    console.log("migration_1_up | Updating the database...");
    TheDB.exec("BEGIN;");

    TheDB.exec(`CREATE TABLE IF NOT EXISTS assistants(
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      system_instructions TEXT NOT NULL,
      created_date TEXT NOT NULL,
      updated_date TEXT NOT NULL
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS map_chat_threads__assistants(
      chat_thread_id TEXT NOT NULL,
      assistant_id TEXT NOT NULL,
      FOREIGN KEY(chat_thread_id) REFERENCES chat_threads(id),
      FOREIGN KEY(assistant_id) REFERENCES assistants(id)
    );`);

    const insertMigrationData = TheDB.prepare(`
      INSERT INTO migrations(id, date, version_number)
      VALUES(?, ?, ?);`);

    insertMigrationData.run(
      crypto.randomUUID(),
      Utils.generateNowDateString(),
      migration_1.version,
    );

    TheDB.exec("COMMIT;");
    console.log("migration_1_up | finished updating the database.");
  }
  catch (error) {
    TheDB.exec("ROLLBACK;");
    console.log(`migration_1_up | ERROR: ${error.message}`);
    throw error;
  }
  finally {
    console.log("migration_1_up | finished.");
  }
}

const migration_1_down = () => {
  try {
    console.log("migration_1_down | undoing migration...");
    TheDB.exec("BEGIN;");

    TheDB.exec(`DROP TABLE IF EXISTS map_chat_threads__assistants;`);
    TheDB.exec(`DROP TABLE IF EXISTS assistants;`);

    const deleteMigrationData = TheDB.prepare(`DELETE FROM migrations WHERE version = ?;`);
    deleteMigrationData.run(
      migration_1.version,
    );

    TheDB.exec("COMMIT;");
    console.log("migration_1_down | finished undoing migration.");
  }
  catch (error) {
    TheDB.exec("ROLLBACK;");
    console.log(`migration_1_down | ERROR: ${error.message}`);
    throw error;
  }
  finally {
    console.log("migration_1_down | finished.");
  }
};