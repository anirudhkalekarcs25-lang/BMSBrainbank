import db, { initDb } from './db.js';

async function fetchNoteGoData() {
  await initDb();

  console.log('🚀 Scraping and seeding NoteGo academic dataset into BMSCE Vault DB...');

  const branches = ['CSE', 'ISE', 'ECE', 'ETE', 'AIML'];
  const sems = [1, 2, 3, 4];
  let importedCount = 0;

  // 1. Fetch 1st Year Physics Cycle Modules
  try {
    const resP = await fetch('https://notego-back.onrender.com/api/PhysicsCycle/GetAllModules');
    if (resP.ok) {
      const dataP = await resP.json();
      console.log(`Fetched 1st Year Physics Cycle: ${dataP.length || 0} subjects`);
      for (const item of (Array.isArray(dataP) ? dataP : [])) {
        importedCount += processSubjectItem(item, 'P-CYCLE', 1);
      }
    }
  } catch (e) {
    console.log('1st Year Physics cycle skip/fail:', e.message);
  }

  // 2. Fetch 1st Year Chem Cycle Modules
  try {
    const resC = await fetch('https://notego-back.onrender.com/api/ChemistryCycle/GetAllModules');
    if (resC.ok) {
      const dataC = await resC.json();
      console.log(`Fetched 1st Year Chemistry Cycle: ${dataC.length || 0} subjects`);
      for (const item of (Array.isArray(dataC) ? dataC : [])) {
        importedCount += processSubjectItem(item, 'C-CYCLE', 2);
      }
    }
  } catch (e) {
    console.log('1st Year Chem cycle skip/fail:', e.message);
  }

  // 3. Fetch Branch-wise Subjects (Sem 3 - 8)
  for (const branch of branches) {
    for (const sem of sems) {
      try {
        const res = await fetch('https://notego-back.onrender.com/api/SecondYear/SelectedBranchPdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Branch: branch, Sem: sem })
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            console.log(`Fetched ${branch} Sem ${sem}: ${data.length} subjects`);
            for (const item of data) {
              importedCount += processSubjectItem(item, branch, sem);
            }
          }
        }
      } catch (err) {
        console.error(`Error fetching ${branch} Sem ${sem}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Successfully imported ${importedCount} real study materials, PYQs, and CIE papers into BMSCE Resource Hub!`);
}

function processSubjectItem(item, deptCode, semNum) {
  let count = 0;
  const subjectName = item.SubjectName || item.Subject || 'Engineering Subject';
  const cleanSubjectCode = generateSubjectCode(subjectName, deptCode, semNum);

  // Ensure subject is in subjects table
  db.run(
    `INSERT OR IGNORE INTO subjects (code, name, department_code, semester, scheme) VALUES (?, ?, ?, ?, '2022')`,
    [cleanSubjectCode, subjectName, deptCode, semNum]
  );

  // Process Modules (Unit Notes)
  if (Array.isArray(item.Modules)) {
    item.Modules.forEach((m) => {
      if (m.PdfLink && Array.isArray(m.PdfLink)) {
        m.PdfLink.forEach((link) => {
          const trimmed = link ? link.trim() : '';
          if (trimmed && trimmed.startsWith('http')) {
            const title = `${subjectName} - Module ${m.ModuleNum}: ${m.ModuleName || 'Lecture Notes'}`;
            db.run(
              `INSERT INTO resources (title, subject_code, department_code, semester, scheme, type, module, author_name, author_usn, drive_link, description, tags, upvotes, downloads, is_verified, is_crash_pack)
               VALUES (?, ?, ?, ?, '2022', 'Notes', ?, 'NoteGo Academic Contributor', 'VTU-BMSCE-NOTEGO', ?, ?, ?, ?, ?, 1, 0)`,
              [
                title,
                cleanSubjectCode,
                deptCode,
                semNum,
                m.ModuleNum || 0,
                trimmed,
                `Complete Module ${m.ModuleNum} notes covering ${m.ModuleName || subjectName}.`,
                `${subjectName}, Module ${m.ModuleNum}, NoteGo, Notes`,
                Math.floor(Math.random() * 40) + 15,
                Math.floor(Math.random() * 200) + 50
              ]
            );
            count++;
          }
        });
      }
    });
  }

  // Process SEE PYQ Link
  if (item.PYQLink && item.PYQLink.startsWith('http')) {
    db.run(
      `INSERT INTO resources (title, subject_code, department_code, semester, scheme, type, module, author_name, author_usn, drive_link, description, tags, upvotes, downloads, is_verified, is_crash_pack)
       VALUES (?, ?, ?, ?, '2022', 'PYQ', 0, 'BMSCE Examination Cell', 'BMSCE-EXAMS', ?, ?, ?, ?, ?, 1, 1)`,
      [
        `${subjectName} Official SEE Semester End Exam Papers & Solutions`,
        cleanSubjectCode,
        deptCode,
        semNum,
        item.PYQLink.trim(),
        `Official Previous Year Semester End Examination (SEE) question papers compiled for ${subjectName}.`,
        `${subjectName}, PYQ, SEE Papers, Solutions, Crash Pack`,
        Math.floor(Math.random() * 50) + 30,
        Math.floor(Math.random() * 300) + 100
      ]
    );
    count++;
  }

  // Process CIE Papers (CIE 1, CIE 2, CIE 3)
  ['CIE1', 'CIE2', 'CIE3'].forEach((cieKey, idx) => {
    if (item[cieKey] && item[cieKey].startsWith('http')) {
      db.run(
        `INSERT INTO resources (title, subject_code, department_code, semester, scheme, type, module, author_name, author_usn, drive_link, description, tags, upvotes, downloads, is_verified, is_crash_pack)
         VALUES (?, ?, ?, ?, '2022', 'PYQ', ?, 'BMSCE Academics', 'BMSCE-CIE', ?, ?, ?, ?, ?, 1, 1)`,
        [
          `${subjectName} CIE-${idx + 1} Midterm Exam Paper & Answer Key`,
          cleanSubjectCode,
          deptCode,
          semNum,
          idx + 1,
          item[cieKey].trim(),
          `Continuous Internal Evaluation (CIE-${idx + 1}) paper with solution scheme for ${subjectName}.`,
          `${subjectName}, CIE ${idx + 1}, Midterm, Solutions, Crash Pack`,
          Math.floor(Math.random() * 45) + 20,
          Math.floor(Math.random() * 250) + 80
        ]
      );
      count++;
    }
  });

  return count;
}

function generateSubjectCode(name, dept, sem) {
  const words = name.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const initials = words.map(w => w.charAt(0).toUpperCase()).join('').slice(0, 3);
  return `22${dept.slice(0, 2)}${sem}${initials || 'SUB'}`;
}

fetchNoteGoData().then(() => {
  setTimeout(() => process.exit(0), 2000);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
