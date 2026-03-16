# PLEASE READ ME

**Project:** LibFlow | NEU Library Visitor Management
**Primary Admin:** riccir.catimon@neu.edu.ph
**Status:** ✅ Deployment Sync (v1.2.6)

---

## 📅 Version History

### v1.2.6 - Institutional Access Restriction
- **Date:** 2025-02-21
- **Status:** Restricted login to @neu.edu.ph domains only.
- **Completed:** 
  1. Updated `AuthContext` to validate email domains.
  2. Implemented automatic sign-out for unauthorized accounts.
  3. Added UI warnings on the login page about the domain restriction.

### v1.2.5 - New Domain Migration & Admin Expansion
- **Date:** 2025-02-21
- **Status:** Migrated to new Vercel domain and added secondary admin.
- **Completed:** 
  1. Updated all system links to `library-proj-ten.vercel.app`.
  2. Hardcoded `jcesperanza@neu.edu.ph` as a Primary Administrator.
  3. Final sync of project documentation.

### v1.2.4 - Final Domain Verification
- **Date:** 2025-02-21
- **Status:** Resolving auth/unauthorized-domain.
- **Completed:** 
  1. Confirmed domain settings for Firebase.
  2. Final sync of verified Firebase credentials.

---

## 🚀 POST-DEPLOYMENT NOTES:
- The system is now fully synchronized with Firebase.
- Only users with verified **@neu.edu.ph** email addresses can access the system.
- Primary admins (`jcesperanza@neu.edu.ph` and `riccir.catimon@neu.edu.ph`) have full access to the Admin Dashboard.
- Users can check-in at https://library-proj-ten.vercel.app.

---
*Last Updated: 2025-02-21*
