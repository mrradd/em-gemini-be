//This is where database migrations will go.

import { TheDB } from "./db.js";
import { migration_1 } from "./migrations/migration_1.js";

//Key = migration file name (the migration id). Value = migration object to use.
const migrationDictionary = {
  "migration_1": migration_1,
}

const updateDb = async () => {
  console.log("updateDb | starting update.");

  const versionNumbers = getMigrationVersionNumbers();

  //Run any migrations that have not been applied to the db.
  await Object.keys(migrationDictionary).forEach(async (key) => {
    try {
      if (!versionNumbers.includes(migrationDictionary[key].version)) {
        console.log(`updateDb | running migration '${key}'...`);
        await migrationDictionary[key].migration_up();
        console.log(`updateDb | finished migration '${key}'.`);
      }
      else {
        console.log(`updateDb | skipping migration '${key}'...`);
      }
    }
    catch (error) {
      console.log(`updateDb | ERROR running migration '${key}': ${error.message}`);
      process.exit(1);
    }
  });

  console.log("YAY!");
  process.exit(0);
}

//Get all the Migration version numbers to determine what migrations need to be run.
const getMigrationVersionNumbers = () => {
  console.log("getMigrationNumbers | start");
  const versionNumberQuery = TheDB.prepare("SELECT version_number FROM migrations ORDER BY version_number ASC;");
  const versionNumberData = versionNumberQuery.all();
  const versionNumbers = [];

  Object.keys(versionNumberData).forEach(key => {
    versionNumbers.push(versionNumberData[key].version_number);
  });

  console.log(versionNumbers);
  console.log("getMigrationNumbers | end");
  return versionNumbers;
}

updateDb();