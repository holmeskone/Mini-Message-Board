#! /usr/bin/env node
 
const { Client } = require("pg");
require('dotenv').config()
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  text TEXT,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username, added) 
VALUES 
  ('Hi there!', 'John', NOW()),
  ('Hello World!', 'Carlos', NOW())
  ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASENAME}`,
    // ssl: { rejectUnauthorized: false } 
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();