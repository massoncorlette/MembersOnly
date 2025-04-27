const { Client } = require("pg");

require("dotenv").config();

const { argv } = require("node:process");

// script here to insert dummy data upon deployment

const DefaultSQL = `

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first VARCHAR ( 20 ),
  last VARCHAR ( 20 ),
  email VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS membermessages (
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR ( 2000 ),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(DefaultSQL);
  await client.end();
  console.log("done");
};

main();