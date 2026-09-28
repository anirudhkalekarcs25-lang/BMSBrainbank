import db, { initDb } from './db.js';

const departmentsData = [
  { code: 'P-CYCLE', name: '1st Year - Physics Cycle', is_cycle: 1 },
  { code: 'C-CYCLE', name: '1st Year - Chemistry Cycle', is_cycle: 1 },
  { code: 'CSE', name: 'Computer Science & Engineering', is_cycle: 0 },
  { code: 'ISE', name: 'Information Science & Engineering', is_cycle: 0 },
  { code: 'AIML', name: 'AI & Machine Learning', is_cycle: 0 },
  { code: 'ECE', name: 'Electronics & Communication', is_cycle: 0 },
  { code: 'EEE', name: 'Electrical & Electronics', is_cycle: 0 },
  { code: 'ME', name: 'Mechanical Engineering', is_cycle: 0 },
  { code: 'CV', name: 'Civil Engineering', is_cycle: 0 },
  { code: 'BT', name: 'Biotechnology', is_cycle: 0 },
];

const subjectsData = [
  // 1st Year P-Cycle
  { code: '22MA1BSMTH', name: 'Applied Mathematics - I (Calculus & Linear Algebra)', department_code: 'P-CYCLE', semester: 1, scheme: '2022', credits: 4 },
  { code: '22PH1BSPHY', name: 'Engineering Physics', department_code: 'P-CYCLE', semester: 1, scheme: '2022', credits: 4 },
  { code: '22EE1ESCBE', name: 'Basic Electrical Engineering', department_code: 'P-CYCLE', semester: 1, scheme: '2022', credits: 3 },
  { code: '22ME1ESEME', name: 'Elements of Mechanical Engineering', department_code: 'P-CYCLE', semester: 1, scheme: '2022', credits: 3 },
  { code: '22CS1ESCPG', name: 'Programming in C & Problem Solving', department_code: 'P-CYCLE', semester: 1, scheme: '2022', credits: 4 },

  // 1st Year C-Cycle
  { code: '22MA2BSMTH', name: 'Applied Mathematics - II (Differential Equations & Vector Calculus)', department_code: 'C-CYCLE', semester: 2, scheme: '2022', credits: 4 },
  { code: '22CH2BSCHE', name: 'Engineering Chemistry', department_code: 'C-CYCLE', semester: 2, scheme: '2022', credits: 4 },
  { code: '22EC2ESECN', name: 'Basic Electronics & Communication', department_code: 'C-CYCLE', semester: 2, scheme: '2022', credits: 3 },
  { code: '22CV2ESCEM', name: 'Engineering Mechanics & Statics', department_code: 'C-CYCLE', semester: 2, scheme: '2022', credits: 3 },

  // CSE / ISE 3rd Sem
  { code: '22CS3DCDSA', name: 'Data Structures and Algorithms', department_code: 'CSE', semester: 3, scheme: '2022', credits: 4 },
  { code: '22CS3DCDLD', name: 'Digital Electronics & Logic Design', department_code: 'CSE', semester: 3, scheme: '2022', credits: 3 },
  { code: '22CS3DCDMS', name: 'Discrete Mathematical Structures', department_code: 'CSE', semester: 3, scheme: '2022', credits: 3 },
  { code: '22CS3DCCOA', name: 'Computer Organization & Architecture', department_code: 'CSE', semester: 3, scheme: '2022', credits: 4 },

  // CSE / ISE 4th Sem
  { code: '22CS4DCDAA', name: 'Design and Analysis of Algorithms', department_code: 'CSE', semester: 4, scheme: '2022', credits: 4 },
  { code: '22CS4DCOPS', name: 'Operating Systems', department_code: 'CSE', semester: 4, scheme: '2022', credits: 4 },
  { code: '22CS4DCDBS', name: 'Database Management Systems', department_code: 'CSE', semester: 4, scheme: '2022', credits: 4 },
  { code: '22CS4DCCNA', name: 'Computer Networks', department_code: 'CSE', semester: 4, scheme: '2022', credits: 4 },

  // AIML 5th Sem
  { code: '21AI5DCMLA', name: 'Machine Learning Fundamentals & Scikit-Learn', department_code: 'AIML', semester: 5, scheme: '2021', credits: 4 },
  { code: '21AI5DCDIP', name: 'Digital Image Processing', department_code: 'AIML', semester: 5, scheme: '2021', credits: 3 },

  // ECE 5th Sem
  { code: '21EC5DCDSP', name: 'Digital Signal Processing', department_code: 'ECE', semester: 5, scheme: '2021', credits: 4 },
  { code: '21EC5DCVLSI', name: 'VLSI Design & Cadence Tools', department_code: 'ECE', semester: 5, scheme: '2021', credits: 4 },
];

const resourcesData = [
  // DSA Resources
  {
    title: 'Data Structures Complete Handwritten Notes (Module 1 to 5)',
    subject_code: '22CS3DCDSA',
    department_code: 'CSE',
    semester: 3,
    scheme: '2022',
    type: 'Notes',
    module: 0,
    author_name: 'Ananya Sharma',
    author_usn: '1BM22CS024',
    drive_link: 'https://drive.google.com/file/d/sample-dsa-notes/view',
    description: 'Clean, handwritten notes covering Arrays, Linked Lists, Trees, Graphs, Hashing, and Dynamic Allocation. Includes solved VTU/BMSCE SEE questions.',
    tags: 'DSA, Trees, Graphs, Handwritten, BMSCE',
    upvotes: 42,
    downloads: 189,
    is_verified: 1,
    is_crash_pack: 1
  },
  {
    title: 'BMSCE SEE 2024 Question Paper + Detailed Answer Key',
    subject_code: '22CS3DCDSA',
    department_code: 'CSE',
    semester: 3,
    scheme: '2022',
    type: 'PYQ',
    module: 0,
    author_name: 'BMSCE Academics Cell',
    author_usn: 'FACULTY-CS',
    drive_link: 'https://drive.google.com/file/d/sample-dsa-pyq-2024/view',
    description: 'Official Semester End Examination paper with step-by-step code solutions in C/C++.',
    tags: 'PYQ, SEE 2024, Solutions',
    upvotes: 38,
    downloads: 245,
    is_verified: 1,
    is_crash_pack: 1
  },
  {
    title: 'DSA Lab Manual with Executable C Programs',
    subject_code: '22CS3DCDSA',
    department_code: 'CSE',
    semester: 3,
    scheme: '2022',
    type: 'Lab Manual',
    module: 0,
    author_name: 'Rohan K',
    author_usn: '1BM22CS110',
    drive_link: 'https://drive.google.com/file/d/sample-dsa-lab/view',
    description: 'All 12 prescribed lab programs fully commented with sample input/output for CIE lab exams.',
    tags: 'Lab Manual, C Programs, CIE Prep',
    upvotes: 29,
    downloads: 132,
    is_verified: 1,
    is_crash_pack: 0
  },

  // DAA Resources
  {
    title: 'DAA Module 3 & 4 Dynamic Programming & Greedy Quick Revision Sheet',
    subject_code: '22CS4DCDAA',
    department_code: 'CSE',
    semester: 4,
    scheme: '2022',
    type: 'Formula Sheet',
    module: 3,
    author_name: 'Karthik V',
    author_usn: '1BM22CS088',
    drive_link: 'https://drive.google.com/file/d/sample-daa-formula/view',
    description: '2-page summary of Knapsack, Prim-Kruskal, Dijkstra, Bellman-Ford, and Floy-Warshall time complexity derivations.',
    tags: 'Formula Sheet, Crash Pack, Greedy, DP',
    upvotes: 56,
    downloads: 310,
    is_verified: 1,
    is_crash_pack: 1
  },
  {
    title: 'Design & Analysis of Algorithms Previous 3 Years CIE Papers (2022-2024)',
    subject_code: '22CS4DCDAA',
    department_code: 'CSE',
    semester: 4,
    scheme: '2022',
    type: 'PYQ',
    module: 0,
    author_name: 'Siddharth M',
    author_usn: '1BM22CS145',
    drive_link: 'https://drive.google.com/file/d/sample-daa-pyq/view',
    description: 'Compiled CIE-1, CIE-2, and CIE-3 question sets with answer keys.',
    tags: 'CIE Papers, Answer Key, DAA',
    upvotes: 31,
    downloads: 167,
    is_verified: 1,
    is_crash_pack: 1
  },

  // Math 1 & Physics 1st Year
  {
    title: 'Calculus & Linear Algebra - Formula Cheat Sheet for CIE-1',
    subject_code: '22MA1BSMTH',
    department_code: 'P-CYCLE',
    semester: 1,
    scheme: '2022',
    type: 'Formula Sheet',
    module: 1,
    author_name: 'Priya Rao',
    author_usn: '1BM23EC072',
    drive_link: 'https://drive.google.com/file/d/sample-math1-cheat/view',
    description: 'All differentiation, matrix reduction to Echelon form, and Eigenvalue/Eigenvector formulas.',
    tags: '1st Year, Math, Formula Sheet',
    upvotes: 64,
    downloads: 412,
    is_verified: 1,
    is_crash_pack: 1
  },
  {
    title: 'Engineering Physics Quantum Mechanics & Semiconductor Notes',
    subject_code: '22PH1BSPHY',
    department_code: 'P-CYCLE',
    semester: 1,
    scheme: '2022',
    type: 'Notes',
    module: 2,
    author_name: 'Vikram B',
    author_usn: '1BM23EE019',
    drive_link: 'https://drive.google.com/file/d/sample-physics-notes/view',
    description: 'Schrodinger equation derivations, Lasers, Optical fibers, and Fermi energy diagrams.',
    tags: 'Physics, Quantum, Derivations',
    upvotes: 23,
    downloads: 154,
    is_verified: 1,
    is_crash_pack: 0
  },

  // DBMS Resources
  {
    title: 'DBMS ER-Diagrams, SQL Queries & Normalization Complete Guide',
    subject_code: '22CS4DCDBS',
    department_code: 'CSE',
    semester: 4,
    scheme: '2022',
    type: 'Notes',
    module: 0,
    author_name: 'Deepak Kumar',
    author_usn: '1BM22IS034',
    drive_link: 'https://drive.google.com/file/d/sample-dbms-guide/view',
    description: 'Comprehensive guide covering 1NF to BCNF, Relational Algebra, SQL joins, and ACID properties with examples.',
    tags: 'DBMS, SQL, Normalization, ER Diagram',
    upvotes: 45,
    downloads: 278,
    is_verified: 1,
    is_crash_pack: 1
  },

  // Machine Learning Resources
  {
    title: 'Machine Learning Math Foundations & Model Algorithms Note',
    subject_code: '21AI5DCMLA',
    department_code: 'AIML',
    semester: 5,
    scheme: '2021',
    type: 'Notes',
    module: 0,
    author_name: 'Aishwarya N',
    author_usn: '1BM21AI008',
    drive_link: 'https://drive.google.com/file/d/sample-ml-notes/view',
    description: 'Linear Regression, SVM derivation, Decision Trees, Random Forests, and Gradient Descent explained simply.',
    tags: 'Machine Learning, SVM, Regression, AIML',
    upvotes: 51,
    downloads: 198,
    is_verified: 1,
    is_crash_pack: 0
  }
];

const requestsData = [
  {
    title: 'Need 22CS4DCCNA (Computer Networks) Module 4 Socket Programming Notes',
    subject_code: '22CS4DCCNA',
    department_code: 'CSE',
    semester: 4,
    description: 'Looking for simplified notes on TCP/UDP Sockets and Network Layer IP Subnetting problems.',
    requested_by: 'Rahul S (1BM22CS102)',
    upvotes: 14,
    status: 'Pending'
  },
  {
    title: 'Requesting SEE 2024 Digital Signal Processing (21EC5DCDSP) Solution Paper',
    subject_code: '21EC5DCDSP',
    department_code: 'ECE',
    semester: 5,
    description: 'Can someone upload the solution key for the 2024 SEE DSP paper, specifically FFT butterfly diagrams?',
    requested_by: 'Megha P (1BM21EC055)',
    upvotes: 21,
    status: 'Pending'
  }
];

export const seedDatabase = async () => {
  await initDb();

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing records
      db.run('DELETE FROM departments');
      db.run('DELETE FROM subjects');
      db.run('DELETE FROM resources');
      db.run('DELETE FROM requests');

      // Insert Departments
      const deptStmt = db.prepare('INSERT INTO departments (code, name, is_cycle) VALUES (?, ?, ?)');
      departmentsData.forEach((d) => deptStmt.run(d.code, d.name, d.is_cycle));
      deptStmt.finalize();

      // Insert Subjects
      const subjStmt = db.prepare('INSERT INTO subjects (code, name, department_code, semester, scheme, credits) VALUES (?, ?, ?, ?, ?, ?)');
      subjectsData.forEach((s) => subjStmt.run(s.code, s.name, s.department_code, s.semester, s.scheme, s.credits));
      subjStmt.finalize();

      // Insert Resources
      const resStmt = db.prepare(`
        INSERT INTO resources (title, subject_code, department_code, semester, scheme, type, module, author_name, author_usn, drive_link, description, tags, upvotes, downloads, is_verified, is_crash_pack)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      resourcesData.forEach((r) => {
        resStmt.run(
          r.title, r.subject_code, r.department_code, r.semester, r.scheme,
          r.type, r.module, r.author_name, r.author_usn, r.drive_link,
          r.description, r.tags, r.upvotes, r.downloads, r.is_verified, r.is_crash_pack
        );
      });
      resStmt.finalize();

      // Insert Requests
      const reqStmt = db.prepare('INSERT INTO requests (title, subject_code, department_code, semester, description, requested_by, upvotes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
      requestsData.forEach((rq) => reqStmt.run(rq.title, rq.subject_code, rq.department_code, rq.semester, rq.description, rq.requested_by, rq.upvotes, rq.status));
      reqStmt.finalize((err) => {
        if (err) {
          console.error('Error seeding database:', err);
          reject(err);
        } else {
          console.log('Successfully seeded BMSCE Database with Departments, Subjects, Resources, and Requests!');
          resolve();
        }
      });
    });
  });
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
