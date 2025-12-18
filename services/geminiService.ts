
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askAiTutor = async (question: string, subject: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key missing. Please configure the environment variables in Vercel.";
  }

  try {
    // Fixed: Using gemini-3-flash-preview and accessing .text correctly
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
