
# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks & Date-fns

## 📂 Project Structure
- `src/app/`: Contains the main page routes and application views.
- `src/components/`: Reusable UI elements, navigation, and authentication views.
- `src/ai/`: Genkit AI flow definitions for intelligent library insights.
- `src/lib/`: Shared utility functions, types, and system mock data.
- `DEVELOPMENT_LOG.md`: A detailed record of all updates, security policies, and bug fixes.
- `push.sh`: A specialized automation script for secure GitHub synchronization.

## 📖 How it Works

### 1. Authentication & Security
- The system only accepts emails ending with `@neu.edu.ph`.
- **Admins:** Access restricted to `riccir.catimon@neu.edu.ph`.

### 2. Smart Check-in Process
- Automatically detects student names from their institutional email.
- Records visit reasons and college affiliations for real-time tracking.

### 3. AI Insights (Genkit)
- Uses **Gemini 2.5 Flash** to analyze logs and provide peak usage recommendations.

---
© 2024 New Era University Library | Developed by Riccir Catimon
