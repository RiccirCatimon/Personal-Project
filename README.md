
# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks & Date-fns

## 📂 Project Structure

- `src/app/`: Core application routes, including the main dashboard and check-in pages.
- `src/components/`: Reusable UI components, layout elements, and authentication logic.
- `src/ai/`: Generative AI logic, including Genkit flows for library data analysis.
- `src/lib/`: Core utilities, mock data, and TypeScript type definitions.
- `src/hooks/`: Custom React hooks for managing state and UI interactions.
- `DEVELOPMENT_LOG.md`: Technical version history, security policies, and critical "PLEASE READ ME" info.
- `push.sh`: Specialized script for automated and secure synchronization with GitHub.

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
