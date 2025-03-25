#! /usr/bin/env node
const { Client } = require("pg");

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } 
    });
    try {
      await client.connect();
      
      // First, create the table if it doesn't exist
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          username VARCHAR(255),
          text TEXT,
          added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await client.query(createTableSQL);
      console.log("Table created (if it did not exist)");
  
      // Then, insert the records
      const insertSQL = `
        INSERT INTO messages (text, username, added) 
        VALUES 
          ('Hi there!', 'John', NOW()),
          ('Hello World!', 'Carlos', NOW())
        ON CONFLICT DO NOTHING;
      `;
      await client.query(insertSQL);
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      await client.end();
    }
  }
  
  main();
  