#!/usr/bin/env node
 
const { Client } = require("pg");
require('dotenv').config()

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  text TEXT,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const SQL_CHECK_TABLE_EXISTS = `
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'messages'
);
`;

const SQL_SEED_DATA = `
INSERT INTO messages (text, username, added) 
VALUES 
  ('Hi there!', 'John', NOW()),
  ('Hello World!', 'Carlos', NOW())
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Checking database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
  });

  try {
    await client.connect();

    // First, ensure the table exists
    await client.query(SQL_CREATE_TABLE);

    // Check if the table is empty
    const { rows } = await client.query(SQL_CHECK_TABLE_EXISTS);
    const tableExists = rows[0].exists;

    if (tableExists) {
      // Check if table is empty
      const countResult = await client.query('SELECT COUNT(*) FROM messages');
      const rowCount = parseInt(countResult.rows[0].count);

      if (rowCount === 0) {
        // Table exists but is empty, so seed data
        await client.query(SQL_SEED_DATA);
        console.log("Database seeded successfully");
      } else {
        console.log("Database already seeded. Skipping.");
      }
    }
  } catch (error) {
    console.error("Error checking/seeding database:", error);
  } finally {
    await client.end();
  }
}

main();