# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** 🚀 Finalizing Authentication Setup

---

## 📅 Version History

### v1.1.2 - Google Auth Finalization
- **Date:** 2025-02-21
- **Status:** Google Provider enabled in Console.
- **Action Required:** 
  1. Click **Save** in the Authentication > Sign-in method > Google settings.
  2. Verify the `apiKey` in `src/firebase/config.ts` matches the one in **Project Settings > General**.

---

## 🚀 Critical Setup Steps
1. **Save Provider:** Ensure you clicked "Save" on the Google Sign-in configuration page.
2. **Authorized Domains:** Ensure `lib-flow-neu.vercel.app` and `localhost` are in the **Authorized domains** list in the Authentication settings.
3. **Push Changes:** Run `./push.sh` to deploy the latest logic.

---
*Last Updated: 2025-02-21*
