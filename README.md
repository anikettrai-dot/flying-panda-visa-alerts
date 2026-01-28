# 🐼 Flying Panda Visa Alerts

A production-ready, highly polished internal tool to track visa slot alerts. Built with a focus on professional UX, accessibility, and performance for The Flying Panda's Full-Stack Developer Intern assessment.

---

## ✨ Features (Production-Ready Polish)

- 🌗 **Dark & Light Mode** - Full theme support with persistent state.
- 📋 **Robust Form Validation** - Real-time error messages and data integrity checks.
- 🛡️ **Custom Modals** - Professional, theme-consistent confirmation dialogs for destructive actions.
- ⏳ **Loading & Feedback States** - Spinners and visual indicators for all async operations.
- ⌨️ **Keyboard Shortcuts** - Power-user features (`Ctrl+K` for search, `Ctrl+N` for new alert).
- 🐼 **Beautiful Empty States** - Helpful guidance when no data is found.
- ♿ **Accessibility (A11y)** - ARIA labels, focus management, and WCAG standards compliance.
- 🔄 **Status Management** - Seamless transitions between `Active`, `Booked`, and `Expired`.
- 📊 **Stats Dashboard** - Real-time overview of all visa alert statuses.
- ▦ **Dual View Modes** - Switch between List (Table) and Grid view layouts.
- 📥 **Export Data** - Export your alerts to CSV or JSON formats.

---

## 🚀 Setup & Run

### Prerequisites
- Node.js (v16+) installed

### 1. Backend (Server)
The backend runs on Node.js + Express.

```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 2. Frontend (Client)
The frontend is a React app built with Vite.

```bash
cd client
npm install
npm run dev
# Client will start on http://localhost:5173
```

---

## 🛠 Tech Stack & Architecture

### Backend
- **Node.js & Express**: High-performance backend runtime.
- **In-Memory Store**: Lightweight data persistence (scalable to DB).
- **RESTful API**: Clean endpoint structure for Alerts and Stats.
- **Middleware**: Error handling and request parsing.

### Frontend
- **React + Vite**: Modern reactive UI with fast HMR.
- **Vanilla CSS (Variables)**: Centralized theme engine for global Dark/Light mode support.
- **Glassmorphism Design**: High-end aesthetic with background blurs and mesh gradients.
- **Custom Hooks & Utils**: Clean logic separation for validation, keyboard shortcuts, and theme management.

---

## 🔮 Future Improvements (Production)
1.  **Database**: Integrate PostgreSQL or MongoDB for persistent storage.
2.  **Authentication**: Secure JWT-based member login system.
3.  **Real-time Alerts**: Deploy WebSocket or Push Notifications for instant slot updates.
4.  **Unit/e2e Testing**: Implement Vitest and Playwright.

---

## 🤖 AI Usage vs. Human Development

- **AI Collaboration**: Used for boiling down initial templates and generating design palette variations.
- **Human Architecture**: 
  - **Component Composition**: Designed the `forwardRef` pattern for the custom SearchBar and keyboard focus.
  - **UX Design**: Orchestrated the "Pillow" button styles, modal logic, and status lifecycle transitions.
  - **Theme Engine**: Developed the `data-theme` variable system in CSS.
  - **Logic**: Custom validation and debouncing implementation.

---
**Dream. Soar. Explore.** 🐼
