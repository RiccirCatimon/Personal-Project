# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** 🛠 Resolving Domain Authorization

---

## 📅 Version History

### v1.1.8 - Domain Authorization Fix
- **Date:** 2025-02-21
- **Status:** Fixing `auth/unauthorized-domain` error.
- **Critical Correction:**
  1. The Vercel *Project* URL (dashboard) is NOT the authorized domain.
  2. You must use the **Public Deployment URL** (e.g., `lib-flow-neu.vercel.app`).
  3. Verified `apiKey` and `appId` are now exactly matching the Firebase Console.

---

## 🚀 CRITICAL NEXT STEP: Domain Whitelisting
To fix the login error:
1. Go to your **Vercel Project Dashboard**.
2. Look for the **"Domain"** or **"Deployment URL"** (e.g., `personal-roject.vercel.app`).
3. Go to [Firebase Console > Authentication > Settings > Authorized domains](https://console.firebase.google.com/project/studio-2392449049-de650/authentication/settings).
4. Click **Add domain**.
5. Paste your URL (without `https://`, just the text like `personal-roject.vercel.app`).
6. Click **Add**.

---
*Last Updated: 2025-02-21*
