import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db, { initDb } from './db.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Setup Uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Initialize and Seed Database on boot if empty
await initDb();

// Endpoint: Departments
app.get('/api/departments', (req, res) => {
  db.all('SELECT * FROM departments ORDER BY is_cycle DESC, name ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Subjects
app.get('/api/subjects', (req, res) => {
  const { dept, sem } = req.query;
  let query = 'SELECT * FROM subjects WHERE 1=1';
  const params = [];

  if (dept) {
    query += ' AND department_code = ?';
    params.push(dept);
  }
  if (sem) {
    query += ' AND semester = ?';
    params.push(sem);
  }

  query += ' ORDER BY semester ASC, code ASC';

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Resources (with multi-faceted search & filters)
app.get('/api/resources', (req, res) => {
  const { search, dept, sem, scheme, type, module, crashPack, subject } = req.query;

  let query = 'SELECT * FROM resources WHERE 1=1';
  const params = [];

  if (dept && dept !== 'ALL') {
    query += ' AND department_code = ?';
    params.push(dept);
  }
  if (sem && sem !== 'ALL') {
    query += ' AND semester = ?';
    params.push(sem);
  }
  if (scheme && scheme !== 'ALL') {
    query += ' AND scheme = ?';
    params.push(scheme);
  }
  if (type && type !== 'ALL') {
    query += ' AND type = ?';
    params.push(type);
  }
  if (module && module !== 'ALL' && module !== '0') {
    query += ' AND module = ?';
    params.push(module);
  }
  if (crashPack === 'true') {
    query += ' AND is_crash_pack = 1';
  }
  if (subject) {
    query += ' AND subject_code = ?';
    params.push(subject);
  }
  if (search) {
    query += ' AND (title LIKE ? OR subject_code LIKE ? OR tags LIKE ? OR description LIKE ? OR author_name LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY upvotes DESC, created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Upload / Post Resource
app.post('/api/resources', upload.single('file'), (req, res) => {
  const {
    title,
    subject_code,
    department_code,
    semester,
    scheme,
    type,
    module,
    author_name,
    author_usn,
    drive_link,
    description,
    tags,
    is_crash_pack
  } = req.body;

  if (!title || !subject_code || !department_code || !type) {
    return res.status(400).json({ error: 'Missing required resource fields (title, subject_code, department_code, type).' });
  }

  let file_url = null;
  if (req.file) {
    file_url = `/uploads/${req.file.filename}`;
  }

  const query = `
    INSERT INTO resources (
      title, subject_code, department_code, semester, scheme, type, module,
      author_name, author_usn, file_url, drive_link, description, tags, is_crash_pack
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      title,
      subject_code,
      department_code,
      parseInt(semester) || 1,
      scheme || '2022',
      type,
      parseInt(module) || 0,
      author_name || 'BMSCE Student',
      author_usn || '1BM22CS000',
      file_url,
      drive_link || null,
      description || '',
      tags || '',
      is_crash_pack === 'true' || is_crash_pack === true ? 1 : 0
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get('SELECT * FROM resources WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

// Endpoint: Upvote Resource
app.post('/api/resources/:id/upvote', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE resources SET upvotes = upvotes + 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT id, upvotes FROM resources WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });
});

// Endpoint: Track Downloads
app.post('/api/resources/:id/download', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE resources SET downloads = downloads + 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Endpoint: Get Requests
app.get('/api/requests', (req, res) => {
  db.all('SELECT * FROM requests ORDER BY upvotes DESC, created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: Post Request
app.post('/api/requests', (req, res) => {
  const { title, subject_code, department_code, semester, description, requested_by } = req.body;
  if (!title || !subject_code) {
    return res.status(400).json({ error: 'Title and Subject Code are required.' });
  }

  const query = `
    INSERT INTO requests (title, subject_code, department_code, semester, description, requested_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [title, subject_code, department_code || 'CSE', parseInt(semester) || 1, description || '', requested_by || 'BMSCE Student'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM requests WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

// Endpoint: Upvote Request
app.post('/api/requests/:id/upvote', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE requests SET upvotes = upvotes + 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT id, upvotes FROM requests WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });
});

// Endpoint: Leaderboard (Top contributors)
app.get('/api/leaderboard', (req, res) => {
  const query = `
    SELECT 
      author_name, 
      author_usn, 
      COUNT(id) as uploads_count, 
      SUM(upvotes) as total_upvotes,
      SUM(downloads) as total_downloads
    FROM resources 
    GROUP BY author_usn, author_name 
    ORDER BY total_upvotes DESC, uploads_count DESC 
    LIMIT 10
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Serve static client build (Merged Frontend + Backend)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 BMSCE Resource Hub (Merged Full-Stack) running on http://localhost:${PORT}`);
  // Check if resources count is 0, then auto-seed
  db.get('SELECT COUNT(*) as count FROM resources', [], async (err, row) => {
    if (!err && row && row.count === 0) {
      console.log('No resources found. Seeding initial BMSCE dataset...');
      await seedDatabase();
    }
  });
});

