
# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI and cloud synchronization.

## 🚀 Live Application
**Deployment Link:** [https://lib-flow-neu.vercel.app](https://lib-flow-neu.vercel.app)

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Backend:** Firebase (Firestore & Authentication)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks & Date-fns

## 📂 Project Structure

- `src/app/`: Core application routing and page logic.
- `src/components/`: Modular UI components, layout elements, and authentication providers.
- `src/firebase/`: Configuration and utility hooks for Firestore and Auth integration.
- `src/ai/`: Generative AI flows for automated library usage reporting.
- `src/lib/`: Shared TypeScript definitions and institutional data constants.
- `DEVELOPMENT_LOG.md`: Central record of project evolution and "PLEASE READ ME" notices.
- `push.sh`: Automated script for professional GitHub synchronization.

## 📖 Key Features

### 1. Secure Google Authentication
- Login restricted to institutional or validated Google accounts.
- Automatic profile synchronization for student names.

### 2. Role-Based Access Control
- **Users:** Interactive check-in form with College and Employee status validation.
- **Admins:** High-level dashboard with real-time statistics and advanced filtering.
- **Secure Switching:** Primary admins (`jcesperanza@neu.edu.ph`) can switch between views on the fly.

### 3. Smart Analytics
- Filter logs by reason, college, or visitor type (Student/Staff).
- AI-generated usage reports using Gemini 2.5 Flash.

---
© 2025 New Era University Library | Developed for NEU
