# 🧠 BMSBrainBank — BMSCE Academic Intelligence Vault

[![BMSCE](https://img.shields.io/badge/College-B.M.S._College_of_Engineering-0B4398?style=for-the-badge)](https://bmsce.ac.in)
[![License](https://img.shields.io/badge/License-MIT-00D2FE?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)](#)

BMSBrainBank is an open-access, full-stack academic resource hub designed specifically for **B.M.S. College of Engineering (BMSCE)** students. It centralizes handwritten lecture notes, CIE midterm question keys, SEE final paper solutions, and lab manuals into an intuitive, searchable platform.

---

## 📸 Overview & Branding

- **Website Name**: **BMSBrainBank**
- **Tagline**: *The Intelligent Academic Vault of B.M.S. College of Engineering*
- **Official Branding**: Features the official **B.M.S. College of Engineering Seal (Estd. 1946)** alongside a custom metallic vault shield with a glowing cyan electric brain emblem.

---

## 🌟 Key Features

1. 🔍 **Vault Intelligence Explorer**:
   - Real-time search by BMSCE Subject Codes (e.g. `22CS3DCDSA`, `22MA1BSMTH`, `21AI5DCMLA`), Subject Title, or Topic.
   - Filter by Department (`CSE`, `ISE`, `AIML`, `ECE`, `EEE`, `ME`, `CV`, `BT`, 1st Year P/C-Cycles), Semester (1-8), Scheme (2022 NEP, 2021, 2025), and Module (1-5).
   - View mode switcher: Toggle between **Vibrant Grid View** and **Compact Table List View**.

2. ⚡ **Pre-Exam Crash Pack (CIE / SEE Emergency Mode)**:
   - A 1-click emergency mode isolating formula cheat sheets, 24-hour revision notes, CIE 1-3 midterm keys, and past SEE paper solutions.

3. 🏆 **Contributor Hall of Fame**:
   - Gamified peer-upvoting leaderboard ranking top BMSCE student contributors with Gold 🥇, Silver 🥈, and Bronze 🥉 badges.

4. 🙋 **Student Request Desk**:
   - Interactive community request portal where students submit and upvote missing unit notes and answer keys.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS v3, Lucide Icons, Plus Jakarta Sans & Outfit Fonts |
| **Backend** | Node.js v24 (ES Modules), Express.js REST API |
| **Database** | SQLite3 (`server/bmsce_resources.db`) pre-seeded with 250+ resources |
| **Deployment** | Single-Port Express Integration (`http://localhost:5001`) / Netlify Drag & Drop |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1-Step Full-Stack Launch
From the project root:
```bash
# 1. Install dependencies & launch unified full-stack app
npm start
```
Open **[http://localhost:5001](http://localhost:5001)** in your browser!

### Re-Sync NoteGo Dataset
To re-ingest 250+ course resources from the NoteGo cloud API:
```bash
node server/import_notego_dataset.js
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
