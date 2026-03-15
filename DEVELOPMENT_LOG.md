# LibFlow Development Log

This document tracks the versions, bugs, and resolutions throughout the development of the LibFlow system.

## 📅 Version History

### v0.1.0 - Initial Prototype
- Basic UI using ShadCN and Tailwind.
- Mock authentication for NEU emails.
- Static Check-in and Admin pages.

### v0.2.0 - Analytics & Charts Integration
- Integrated `recharts` for visitor distribution visualization.
- Added dynamic "Peak Hour" calculation logic.
- Implemented user blocking/unblocking functionality.

### v0.3.0 - AI & Security Update
- Integrated **Genkit** for automated library insights.
- Added `.gitignore` to secure sensitive files.
- Added **Daily Attendance** tracking for real-time monitoring.

## 🐛 Bug Tracker & Resolutions

### 1. The "Hardcoded Stats" Bug
- **Issue:** The peak hour on the dashboard was permanently stuck at "10 AM - 11 AM" regardless of data changes.
- **Resolution:** Implemented a `useMemo` hook to analyze `MOCK_LOGS` dynamically. It uses a frequency map to find the hour with the highest number of entries.

### 2. The ".env Security Leak"
- **Issue:** The `.env` file containing private API keys was accidentally pushed to GitHub.
- **Resolution:** 
  1. Added `.env` to `.gitignore`.
  2. Executed `git rm --cached .env` to remove the file from GitHub history without deleting the local copy.

### 3. AI Schema Mismatch
- **Issue:** The AI occasionally returned incorrectly formatted data for dashboard cards.
- **Resolution:** Defined a strict **Zod Schema** in `admin-library-insights.ts` to ensure the AI always adheres to the correct JSON structure.

### 4. Hydration Error on Dates
- **Issue:** Discrepancies between server and client time caused React hydration errors.
- **Resolution:** Utilized `useEffect` to set time-sensitive data only after the component has mounted on the client side.

---
*Last Updated: 2024-10-26*