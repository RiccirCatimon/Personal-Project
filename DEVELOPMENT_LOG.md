# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** 🛠 Finalizing Domain Authorization

---

## 📅 Version History

### v1.1.6 - App ID Updated & Domain Auth Required
- **Date:** 2025-02-21
- **Status:** Resolving `auth/unauthorized-domain` error.
- **Fixed:**
  1. Updated `appId` to `213eaa6e5bfa33f0e76a1d` based on user console snippet.
  2. Verified `apiKey` matches `Plgq`.

---

## 🚀 CRITICAL NEXT STEP: Domain Whitelisting
The app is currently throwing `auth/unauthorized-domain`.
1. Go to [Firebase Console > Authentication > Settings > Authorized domains](https://console.firebase.google.com/).
2. Click **Add domain**.
3. Add your current deployment URL (e.g., `lib-flow-neu.vercel.app`).
4. Wait 1-2 minutes for the change to propagate.

---
*Last Updated: 2025-02-21*
