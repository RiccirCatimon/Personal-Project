
# 🚨🚨🚨 IMPORTANT: READ ME - SYSTEM ACCESS & INFO 🚨🚨🚨

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Access Policy:** Only institutional emails (@neu.edu.ph) are permitted.
**Security:** Admin features are strictly locked to the Primary Admin email.

---

## 📅 Version History

### v0.5.0 - Documentation Standardization
- **Date:** 2025-02-20
- **Update:** Standardized all project labels and documentation for a uniform look.
- **Fix:** Added clear file descriptions to the main README.
- **Status:** Stable.

### v0.4.6 - Push Logic & Document Refinement
- **Date:** 2025-02-20
- **Update:** Refined the "Big READ ME" header for maximum visibility.
- **Fix:** Updated the manual push script to handle branch tracking issues.

### v0.4.5 - Manual Sync & Header Refinement
- **Date:** 2025-02-20
- **Update:** Refined the "Big READ ME" header for maximum visibility and updated last modified date.
- **Fix:** Ensured all deployment-critical fixes (AuthProvider placement) are included in the manual sync.

---

## 🐛 Bug Tracker & Resolutions

### 1. Prerender Error (Build Failed)
- **Issue:** Next.js build failed because `/check-in` was accessed outside of its context provider.
- **Resolution:** Moved `AuthProvider` to `layout.tsx` to wrap all application routes.

### 2. The "Hardcoded Stats" Bug
- **Issue:** Peak hours were static and didn't change with new data.
- **Resolution:** Implemented `useMemo` with a frequency mapping algorithm.

---
*Last Updated: 2025-02-20*
