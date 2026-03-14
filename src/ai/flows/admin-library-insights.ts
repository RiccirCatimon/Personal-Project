'use server';
/**
 * @fileOverview This file implements a Genkit flow that analyzes historical library visitor data
 * and provides insights such as peak usage times, popular visit reasons, and college-specific patterns.
 *
 * - adminLibraryInsights - A function to get AI-powered insights from library visitor data.
 * - AdminLibraryInsightsInput - The input type for the adminLibraryInsights function.
 * - AdminLibraryInsightsOutput - The return type for the adminLibraryInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a single visitor record
const VisitorRecordSchema = z.object({
  timestamp: z.string().describe('ISO 8601 timestamp of the visitor entry, e.g., "2023-10-26T10:30:00Z".'),
  reason: z.string().describe('The reason for the library visit (e.g., "Study", "Research", "Group work", "Borrow book").'),
  college: z.string().describe('The college the visitor belongs to (e.g., "Engineering", "Arts and Sciences", "Business").'),
});

// Define the input schema for the flow
const AdminLibraryInsightsInputSchema = z.object({
  visitorData: z.array(VisitorRecordSchema).describe('An array of historical library visitor records.'),
});
export type AdminLibraryInsightsInput = z.infer<typeof AdminLibraryInsightsInputSchema>;

// Define the output schema for the flow
const AdminLibraryInsightsOutputSchema = z.object({
  overallSummary: z.string().describe('A comprehensive summary of the library usage trends and insights across all data.'),
  peakUsageTimes: z.array(z.string()).describe('A list of identified peak usage periods (e.g., "Weekdays 10 AM - 2 PM", "Evenings on Thursdays").'),
  popularVisitReasons: z.array(z.string()).describe('A list of the most common reasons visitors come to the library, ordered by frequency.'),
  collegeSpecificPatterns: z.array(z.object({
    college: z.string().describe('The name of the college.'),
    pattern: z.string().describe('Identified usage patterns or insights specific to this college (e.g., "Engineering students frequently visit for group study sessions in the afternoons").'),
  })).describe('Insights and patterns specific to different colleges, including their common reasons for visiting and peak times.'),
  actionableRecommendations: z.array(z.string()).describe('Actionable recommendations based on the analyzed data to optimize library resources and services.'),
});
export type AdminLibraryInsightsOutput = z.infer<typeof AdminLibraryInsightsOutputSchema>;

// Define the prompt for the AI model
const adminLibraryInsightsPrompt = ai.definePrompt({
  name: 'adminLibraryInsightsPrompt',
  input: { schema: AdminLibraryInsightsInputSchema },
  output: { schema: AdminLibraryInsightsOutputSchema },
  prompt: `You are an expert library data analyst. Your goal is to provide comprehensive insights into library usage based on historical visitor data.\n\nAnalyze the following JSON array of visitor records. Each record includes a timestamp, reason for visit, and the college of the visitor.\n\n--- Visitor Data ---\n{{{JSON.stringify visitorData}}}\n--- End Visitor Data ---\n\nBased on this data, perform the following:\n1.  **Overall Summary**: Provide a comprehensive summary of the key findings and general trends in library usage.\n2.  **Peak Usage Times**: Identify specific periods (e.g., hours of the day, days of the week, or broader timeframes) when the library experiences the highest visitor traffic.\n3.  **Popular Visit Reasons**: List the most frequent reasons visitors use the library, ordered from most to least popular.\n4.  **College-Specific Patterns**: For each distinct college present in the data, identify any unique usage patterns, common visit reasons, or specific peak times.\n5.  **Actionable Recommendations**: Based on all insights, provide concrete, actionable recommendations for library administration to optimize resources, staffing, and services.\n\nEnsure your output is a JSON object strictly adhering to the provided output schema, with no additional text or formatting outside the JSON.`,
});

// Define the Genkit flow
const adminLibraryInsightsFlow = ai.defineFlow(
  {
    name: 'adminLibraryInsightsFlow',
    inputSchema: AdminLibraryInsightsInputSchema,
    outputSchema: AdminLibraryInsightsOutputSchema,
  },
  async (input) => {
    // Call the AI prompt with the provided input data
    const {output} = await adminLibraryInsightsPrompt(input);

    // Genkit 1.x returns `output` directly, not a function.
    if (!output) {
        throw new Error('AI prompt did not return any output.');
    }
    return output;
  }
);

// Export a wrapper function for the flow
export async function adminLibraryInsights(input: AdminLibraryInsightsInput): Promise<AdminLibraryInsightsOutput> {
  return adminLibraryInsightsFlow(input);
}
