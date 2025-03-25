#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR(255),
   text TEXT,
   added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username, added) 
VALUES 
  ('Hi there!', 'John', NOW()),
  ('Hello World!', 'Charles', NOW()),
  ON CONFLICT (messages) DO NOTHING;
`;

async function main() {
    console.log("Seeding database...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
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
