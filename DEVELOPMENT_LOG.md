# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** 🛠 Resolving Domain Authorization

---

## 📅 Version History

### v1.1.7 - Credentials Verified & Domain Whitelisting Needed
- **Date:** 2025-02-21
- **Status:** Resolving `auth/unauthorized-domain` error.
- **Fixed:**
  1. Updated `apiKey` and `appId` to match the official Firebase Console snippet precisely.
  2. Verified `projectId` and `authDomain`.

---

## 🚀 CRITICAL NEXT STEP: Domain Whitelisting
To fix the `auth/unauthorized-domain` error:
1. Copy your deployment URL (e.g., `https://lib-flow-neu.vercel.app`).
2. Go to [Firebase Console > Authentication > Settings > Authorized domains](https://console.firebase.google.com/project/studio-2392449049-de650/authentication/settings).
3. Click **Add domain**.
4. Paste your URL (without the `https://` part, just the domain).
5. Wait 1-2 minutes for the change to propagate.

---
*Last Updated: 2025-02-21*
