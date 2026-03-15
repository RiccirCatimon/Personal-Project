
# 🛑 IMPORTANT: READ ME - SYSTEM ACCESS & INFO 🛑

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Access Policy:** Only institutional emails (@neu.edu.ph) are permitted.
**Security:** Admin features are strictly locked to the Primary Admin email.

---

## 📅 Version History

### v0.4.2 - Deployment & Documentation Finalization
- **Date:** 2025-02-18
- **Fix:** Verified global AuthProvider placement for stable Vercel deployments.
- **UI:** Confirmed original card-based login design is active.
- **Header:** Added prominent "READ ME" for immediate system clarity on GitHub.

### v0.4.1 - Build & Deployment Fix
- **Fix:** Resolved Vercel prerender error by moving `AuthProvider` to the root layout.
- **UI:** Restored original card-based login design.

### v0.4.0 - Access Control & Admin Refinement
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

### 1. Prerender Error (Build Failed)
- **Issue:** Next.js build failed because `/check-in` was accessed outside of its context provider.
- **Resolution:** Moved `AuthProvider` to `layout.tsx` to wrap all application routes.

### 2. The "Hardcoded Stats" Bug
- **Issue:** Peak hours were static and didn't change with new data.
- **Resolution:** Implemented `useMemo` with a frequency mapping algorithm to calculate the mode of visitor timestamps.

---
*Last Updated: 2025-02-18*
