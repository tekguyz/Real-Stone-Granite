import { GoogleGenAI } from "@google/genai";

/**
 * Gemini Intelligence Service
 * Handles direct communication with Google's Generative AI models.
 * Strictly follows the required @google/genai coding guidelines.
 */

export const generateText = async (prompt: string, systemInstruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });
  return response.text;
};

export const transcribeAudio = async (base64Audio: string, mimeType: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Audio,
            mimeType: mimeType,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      systemInstruction: "You are a specialized transcription tool for an architectural stone company. Focus on clarity and professional formatting.",
      temperature: 0.2,
    },
  });
  return response.text;
};