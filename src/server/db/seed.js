const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  



const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255)
        )`)
        await db.query(`
        CREATE TABLE albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            genre VARCHAR(50),
            releaseDate DATE,
            imgURL VARCHAR(255)
        )`)
        await db.query(`
        CREATE TABLE albumReviews(
          id SERIAL PRIMARY KEY,
          userID INTEGER REFERENCES users(id),
          albumID INTEGER REFERENCES albums(id),
          rating INTEGER,
          comment TEXT,
          reviewDate DATE
        )`)
        await db.query(`
        CREATE TABLE userComments(
            id INTEGER PRIMARY KEY,
            content TEXT,
            reviewID INTEGER,
            userID INTEGER,
            reviewID INTEGER REFERENCES albumReviews(id),
            userID REFERENCES users(id)
        )`)
        await db.query(`
        CREATE TABLE userFavorites(
            reviews TEXT,
            // PRIMARY KEY (UserID, AlbumID),
            userID REFERENCES users(id),
            albumID REFERENCES albums(id)
        )`)
    }
    catch(err) {
        throw err;
    }
}



const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
