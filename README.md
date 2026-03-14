# LibFlow | NEU Library Visitor Management System

LibFlow is a specialized visitor management and analytics platform designed for the New Era University Library. It bridges the gap between manual logbooks and smart facility management using AI.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Engine:** Google Genkit + Gemini 2.5 Flash
- **Data Handling:** React Hooks (useMemo, useState) & Date-fns
- **Icons & Visuals:** Lucide React & Recharts

## 📖 How it Works (System Workflow)

### 1. Authentication & Security
- The system only accepts emails ending with `@neu.edu.ph`.
- It utilizes Role-Based Access Control (RBAC):
  - **Students:** Access to the Check-in page.
  - **Admins:** Access to the Full Dashboard and AI Insights.

### 2. Smart Check-in Process
- Automatically detects the student's name based on their email.
- Students select their **College** and **Reason for Visit**.
- Data is saved (simulated in prototype) for analytics.

### 3. Admin Dashboard & Analytics
- **Live Traffic:** Displays total visitors and distribution per college using Bar Charts.
- **Dynamic Peak Hours:** Uses an algorithm to calculate which hour has the highest library traffic.
- **User Management:** Allows admins to block users who violate rules.

### 4. AI Insights (Genkit)
- Uses **Gemini 2.5 Flash** to analyze visitor logs.
- The AI provides:
  - Peak usage trends.
  - Actionable recommendations (e.g., "Increase staff during 2 PM - 4 PM").
  - College-specific patterns.

## 🚀 Setup Guide

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root folder and add your Gemini API Key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

---
© 2024 New Era University Library | Developed by Riccir Catimon