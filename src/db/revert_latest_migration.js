//This is where database migrations will go.

import { TheDB } from "./db.js";

/**
 * Updates the database with the defined migrations if they have not been run yet.
 */
const revertLatestMigration = async () => {
  console.log("revertLatestMigration | starting reversion.");

  const versionNumbers = getMigrationVersionNumbers().reverse();

  //todo ch. search for the latest migration, append the version number to 'migration_',
  // search the dictionary for that migration name, run the down script of the migration.

  console.log("Finished reverting the database!");
  process.exit(0);
}

/**
 * Get all the Migration version numbers to determine what migrations need to be run.
 */
const getMigrationVersionNumbers = () => {
  console.log("getMigrationVersionNumbers | start");
  const versionNumberQuery = TheDB.prepare("SELECT version_number FROM migrations ORDER BY version_number ASC;");
  const versionNumberData = versionNumberQuery.all();
  const versionNumbers = [];

  Object.keys(versionNumberData).forEach(key => {
    versionNumbers.push(versionNumberData[key].version_number);
  });

  console.log(versionNumbers);
  console.log("getMigrationVersionNumbers | end");
  return versionNumbers;
}

revertLatestMigration();