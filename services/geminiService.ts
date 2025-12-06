import { GoogleGenAI } from "@google/genai";

// Safely access process.env.API_KEY without crashing if process is undefined
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const askAiTutor = async (question: string, subject: string): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Please configure the environment variables in Vercel.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful and encouraging school tutor for Indonesian students. 
      The student is asking about the subject: ${subject}.
      Question: ${question}
      
      Keep the answer concise, easy to understand, and encouraging. Use Bahasa Indonesia mixed with English terms where appropriate for education.`,
    });
    return response.text || "Sorry, I couldn't generate an answer right now.";
  } catch (error) {
    console.error("AI Error:", error);
    return "I am having trouble connecting to the knowledge base right now.";
  }
};