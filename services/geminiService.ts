import { GoogleGenAI } from "@google/genai";
import { ACHIEVEMENTS } from "../constants";

// Initialize Gemini
// Ensure API_KEY is present in your environment variables. 
// In a real build, we'd check for process.env.API_KEY.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please set REACT_APP_GEMINI_API_KEY or allow the demo to access the key.";
  }

  try {
    const context = `
      You are an expert on GitHub Achievements and Badges.
      You are helping a user with their GitHub profile.
      Here is the database of known achievements you can reference:
      ${JSON.stringify(ACHIEVEMENTS.map(a => ({ name: a.name, description: a.description, howToEarn: a.howToEarn, guide: a.guideSteps })))}
      
      If the user asks about a specific badge, explain it clearly using the guide steps provided in the context.
      If they ask how to get a badge, give a friendly, tactical explanation.
      Keep answers concise and helpful. Format with Markdown.
    `;

    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: context + "\n\nUser Question: " + userPrompt }] }
      ]
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while contacting the AI knowledge base.";
  }
};