# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** jcesperanza@neu.edu.ph
**Status:** ⚠️ Action Required - API Key Verification

---

## 📅 Version History

### v1.1.0 - Authentication Troubleshooting
- **Date:** 2025-02-21
- **Status:** Integrated Google Auth logic.
- **Action Required:** User must verify `apiKey` in Firebase Console.

---

## 🚀 Critical Setup Steps
1. **Enable Google Sign-in:** 
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Navigate to **Build > Authentication > Sign-in method**.
   - Enable **Google**.
2. **Update API Key:**
   - Go to **Project Settings > General**.
   - Copy the **Web API Key**.
   - Paste it into `src/firebase/config.ts`.
3. **Synchronize:**
   - Run `./push.sh` to update GitHub and trigger the Vercel build.

---
*Last Updated: 2025-02-21*
