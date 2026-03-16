# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** ⚠️ Troubleshooting API Key Errors

---

## 📅 Version History

### v1.1.4 - Manual Config Verification
- **Date:** 2025-02-21
- **Status:** Resolving persistent "invalid-api-key" error.
- **Current State:**
  1. Google Auth is ENABLED in the Firebase Console.
  2. `src/firebase/config.ts` has been cleaned of duplicates.
  3. The project ID is confirmed as `studio-2392449049-de650`.

---

## 🚀 Troubleshooting Steps
1. **Double-Check API Key:** Go to Firebase Console -> Project Settings -> Web API Key.
2. **Sync:** Run `./push.sh` after updating the key in the code.
3. **Hard Refresh:** Clear your browser cache or try an Incognito window to ensure old keys aren't being used.

---
*Last Updated: 2025-02-21*
