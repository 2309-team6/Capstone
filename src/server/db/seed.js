const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
    role: "ADMIN",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
    role: "ENGINEER",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
    role: "USER",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
    role: "USER",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    role: "USER",
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS userComments;`);
    await db.query(`DROP TABLE IF EXISTS userFavorites;`);
    await db.query(`DROP TABLE IF EXISTS albumReviews;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
    await db.query(`DROP TABLE IF EXISTS albums;`);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255)
        )`);
    await db.query(`
        CREATE TABLE albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            genre VARCHAR(50),
            releaseDate DATE,
            imgURL VARCHAR(255)
        )`);
    await db.query(`
        CREATE TABLE albumReviews(
            id SERIAL PRIMARY KEY,
            userID INTEGER REFERENCES users(id),
            albumID INTEGER REFERENCES albums(id),
            rating INTEGER,
            comment TEXT,
            reviewDate DATE
        )`);
    await db.query(`
        CREATE TABLE userComments(
            id INTEGER PRIMARY KEY,
            content TEXT,
            reviewID INTEGER REFERENCES albumReviews(id),
            userID INTEGER REFERENCES users(id)
        )`);
    await db.query(`
        CREATE TABLE userFavorites(
            reviews TEXT,
            userID INTEGER REFERENCES users(id),
            albumID INTEGER REFERENCES albums(id)
        )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
