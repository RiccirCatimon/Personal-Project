
# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks & Date-fns

## 📂 Project Structure
- `src/app/`: Primary application routes and page layouts.
- `src/components/`: Reusable interface components and authentication logic.
- `src/ai/`: Artificial Intelligence logic and Genkit flow definitions.
- `src/lib/`: Core utilities, TypeScript types, and system data.
- `DEVELOPMENT_LOG.md`: Technical history, security policies, and critical info.
- `push.sh`: Specialized script for automated and secure repository synchronization.

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
