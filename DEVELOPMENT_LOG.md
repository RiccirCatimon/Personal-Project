# ⚠️ READ ME: SYSTEM INFORMATION & DEVELOPMENT LOG
**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Access Policy:** Only institutional emails (@neu.edu.ph) are permitted.

---

## 📅 Version History

### v0.4.0 - Access Control & Admin Refinement (Current)
- **Role-Based Access Control (RBAC):** Restricted Admin Dashboard access exclusively to `riccir.catimon@neu.edu.ph`.
- **Student Access:** Enabled login for all students using valid `@neu.edu.ph` institutional emails for check-in purposes.
- **Daily Attendance:** Implemented a dedicated tab to monitor all student entries for the current day.
- **Documentation:** Fully translated all system logs and README files to English.

### v0.3.0 - AI & Security Update
- **Genkit Integration:** Added automated library insights using Gemini 2.5 Flash.
- **Security:** Implemented `.gitignore` to prevent sensitive `.env` files from being uploaded to GitHub.
- **Real-time Tracking:** Added attendance logging logic.

### v0.2.0 - Analytics Integration
- **Visuals:** Integrated `recharts` for visitor distribution by college.
- **Algorithm:** Added dynamic "Peak Hour" calculation to find the busiest time slots.

### v0.1.0 - Initial Prototype
- **UI:** Basic layout using ShadCN and Tailwind CSS.
- **Mock Auth:** Initial institutional email validation.

---

## 🐛 Bug Tracker & Resolutions

### 1. The "Hardcoded Stats" Bug
- **Issue:** Peak hours were static and didn't change with new data.
- **Resolution:** Implemented `useMemo` with a frequency mapping algorithm to calculate the mode of visitor timestamps.

### 2. The ".env Security Leak"
- **Issue:** Private API keys were visible on GitHub.
- **Resolution:** Added `.env` to `.gitignore` and performed a `git rm --cached` to purge the history.

### 3. AI Schema Mismatch
- **Issue:** AI output format was inconsistent.
- **Resolution:** Defined a strict **Zod Schema** in the Genkit flow to ensure the UI receives valid JSON.

### 4. Hydration Error
- **Issue:** Server and client time discrepancies caused React errors.
- **Resolution:** Used `useEffect` hooks to ensure time-sensitive components only render on the client side.

---
*Last Updated: 2024-10-26*
