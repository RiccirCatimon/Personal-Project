# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks & Date-fns

## 📂 Project Structure

- `src/app/`: Contains the main application routes, pages, and global styling.
- `src/components/`: Reusable UI components, authentication views, and layout elements.
- `src/ai/`: Generative AI logic, prompt definitions, and Genkit flows for data analysis.
- `src/lib/`: Shared utility functions, mock data, and TypeScript type definitions.
- `src/hooks/`: Custom React hooks for managing state and UI-specific interactions.
- `DEVELOPMENT_LOG.md`: Central record of version history, bug fixes, and critical "PLEASE READ ME" notices.
- `push.sh`: Automated bash script for synchronized and professional GitHub updates.

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
© 2025 New Era University Library | Developed by Riccir Catimon
