
# 🚨 PLEASE READ ME 🚨

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Access Policy:** Only institutional emails (@neu.edu.ph) are permitted.
**Security:** Admin features are strictly locked to the Primary Admin email.

---

## 📅 Version History

### v0.5.1 - Documentation Refinement
- **Date:** 2025-02-20
- **Update:** Simplified headers and standardized project labeling.
- **Fix:** Refined the "PLEASE READ ME" visibility for easier access.
- **Status:** Stable.

### v0.5.0 - Documentation Standardization
- **Date:** 2025-02-20
- **Update:** Standardized all project labels and documentation for a uniform look.
- **Fix:** Added clear file descriptions to the main README.

### v0.4.5 - Auth & Deployment Fix
- **Date:** 2025-02-19
- **Update:** Moved AuthProvider to root layout to resolve Vercel prerender errors.
- **Fix:** Ensured context is available across all routes during build.

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
