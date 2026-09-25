import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'bmsce_resources.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to BMSCE SQLite database at:', dbPath);
  }
});

export const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Departments Table
      db.run(`
        CREATE TABLE IF NOT EXISTS departments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          is_cycle BOOLEAN DEFAULT 0
        )
      `);

      // Subjects Table
      db.run(`
        CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          department_code TEXT NOT NULL,
          semester INTEGER NOT NULL,
          scheme TEXT NOT NULL DEFAULT '2022',
          credits INTEGER DEFAULT 4
        )
      `);

      // Resources Table
      db.run(`
        CREATE TABLE IF NOT EXISTS resources (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          subject_code TEXT NOT NULL,
          department_code TEXT NOT NULL,
          semester INTEGER NOT NULL,
          scheme TEXT NOT NULL DEFAULT '2022',
          type TEXT NOT NULL, -- 'Notes', 'PYQ', 'Lab Manual', 'Formula Sheet', 'Syllabus'
          module INTEGER DEFAULT 0, -- 0 for full syllabus, 1-5 for specific modules
          author_name TEXT DEFAULT 'BMSCE Student',
          author_usn TEXT DEFAULT '1BM22CS000',
          file_url TEXT,
          drive_link TEXT,
          description TEXT,
          tags TEXT,
          upvotes INTEGER DEFAULT 0,
          downloads INTEGER DEFAULT 0,
          is_verified BOOLEAN DEFAULT 1,
          is_crash_pack BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Resource Requests Table
      db.run(`
        CREATE TABLE IF NOT EXISTS requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          subject_code TEXT NOT NULL,
          department_code TEXT NOT NULL,
          semester INTEGER NOT NULL,
          description TEXT,
          requested_by TEXT DEFAULT 'Anonymous Student',
          upvotes INTEGER DEFAULT 1,
          status TEXT DEFAULT 'Pending', -- 'Pending', 'Fulfilled'
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

export default db;
