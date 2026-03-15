
# 🚨 PLEASE READ ME 🚨

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Access Policy:** Only institutional emails (@neu.edu.ph) are permitted.
**Security:** Admin features are strictly locked to the Primary Admin email.

---

## 📅 Version History

### v0.5.2 - Deployment & Documentation Standardization
- **Date:** 2025-02-20
- **Update:** Fixed Vercel prerender error "useAuth must be used within an AuthProvider".
- **Update:** Standardized project documentation with uniform file descriptions.
- **Fix:** Simplified header to "PLEASE READ ME" as requested.
- **Status:** Stable.

### v0.5.1 - Documentation Refinement
- **Date:** 2025-02-20
- **Update:** Simplified headers and standardized project labeling.
- **Fix:** Refined the "PLEASE READ ME" visibility for easier access.

---

## 🐛 Bug Tracker & Resolutions

### 1. Prerender Error (Build Failed)
- **Issue:** Next.js build failed because `/check-in` was accessed outside of its context provider during static generation.
- **Resolution:** Ensured the root layout correctly wraps all children and added safety checks to the `useAuth` hook.

### 2. The "Hardcoded Stats" Bug
- **Issue:** Peak hours were static and didn't change with new data.
- **Resolution:** Implemented `useMemo` with a frequency mapping algorithm.

---
*Last Updated: 2025-02-20*
