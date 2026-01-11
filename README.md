# FCITIndex 📚

**Build Your FCIT Schedule** — A modern, interactive web application for King Abdulaziz University Faculty of Computing and Information Technology (FCIT) students to plan and customize their semester course schedules.

![FCITIndex Screenshot](https://img.shields.io/badge/Status-Released-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

### 📅 Block Schedule Loading
- Select your **gender**, **academic year**, **term**, **major** (CS/IT/IS), and **block**
- Automatically loads your pre-assigned block courses from the KAU Index API
- Supports both male and female course schedules with separate course lists

### 🔍 Course Search & Addition
- **Suggested Courses**: Quick-add buttons for commonly taken electives for your term
- **Custom Search**: Search for any course by code (e.g., `FLAN-201`, `ARAB-101`)
- Real-time section availability with instructor names, times, and locations

### 📊 Interactive Timetable
- Visual weekly schedule grid (Sunday - Thursday)
- Color-coded course blocks with subject badges
- Click any course to view detailed information
- Dynamic time range adjustment based on your courses

### 🔧 Advanced Filtering
- Filter course sections by:
  - **Instructor name**
  - **Section number**
  - **CRN (Course Reference Number)**
  - **Start time**
  - **Days** (Sun, Mon, Tue, Wed, Thu)
- **Hide Conflicting Sections**: Automatically hide sections that conflict with your current schedule

### ⚡ Smart Features
- **Conflict Detection**: Warns you before adding overlapping courses
- **Undo Functionality**: Quickly restore removed courses with the undo button
- **Schedule Persistence**: Your schedule is saved to localStorage and restored on page reload
- **Form Persistence**: Your selections (gender, year, major, etc.) are remembered

### 🎨 UI/UX
- **Dark/Light Theme Toggle**: Switch between themes with one click
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Aesthetics**: Glassmorphism, smooth animations, and a sleek interface
- **Accessibility**: Proper label elements and keyboard navigation support

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|------------|
| **Structure** | HTML5 |
| **Styling** | CSS3 (Vanilla CSS, CSS Variables, Flexbox, Grid) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **API** | KAU Index API (`api.kauindex.com`) |
| **Storage** | Browser LocalStorage |
| **Icons** | Custom PNG icons |

---

## 📁 Project Structure

```
FcitIndex/
├── index.html      # Main HTML structure
├── style.css       # All styles (1400+ lines)
├── script.js       # Application logic (1200+ lines)
├── icons/          # UI icons (sun, moon, search, etc.)
└── README.md       # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server required — runs entirely in the browser!

### Usage
1. Open `index.html` in your browser
2. Select your **Gender**, **Year**, **Term**, **Major**, and **Block**
3. Click **"Load Block Schedule"** to view your assigned courses
4. Use **suggested course buttons** or **search** to add more courses
5. Click on courses in your schedule to view details or remove them

---

## 🎯 Supported Majors & Terms

| Major | Full Name | Years |
|-------|-----------|-------|
| **CS** | Computer Science | 2-5 |
| **IT** | Information Technology | 2-5 |
| **IS** | Information Systems | 2-5 |

---

## 📱 Responsive Design

FCITIndex is fully responsive and works on:
- 🖥️ **Desktop** (1200px+) — Full sidebar filters
- 💻 **Laptop** (768px - 1200px) — Adapted layout
- 📱 **Mobile** (< 768px) — Compact filters, stacked layout

---

## 🎨 Theme Support

Toggle between:
- 🌙 **Dark Mode** — Easy on the eyes for late-night planning
- ☀️ **Light Mode** — Clean and bright interface

Theme preference is saved and persisted across sessions.

---

## 🔗 API Integration

FCITIndex connects to the **KAU Index API** to fetch:
- Course sections and schedules
- Instructor information
- Classroom locations
- Real-time availability

---

## 📄 License

This project is created for educational purposes for FCIT students at King Abdulaziz University.

---

## 👤 Author

Developed with ❤️ for FCIT students.

---

## 🙏 Acknowledgments

- King Abdulaziz University — Faculty of Computing and Information Technology
- KAU Index API for providing course data