import { GoogleGenAI } from "@google/genai";

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Not allowed", { status: 405 });
  }

  try {
    const { prompt, systemInstruction, audio, temperature } = await req.json();

    if (!process.env.API_KEY) {
      throw new Error("Configuration issue");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts = [];
    
    if (audio && audio.data && audio.mimeType) {
      parts.push({
        inlineData: {
          mimeType: audio.mimeType,
          data: audio.data
        }
      });
    }

    if (prompt) {
      parts.push({ text: prompt });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: systemInstruction, 
        temperature: temperature || 0.4,
      },
    });

    return new Response(JSON.stringify({ 
      text: response.text 
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: "We're having trouble connecting to our design assistant. Please try again.",
      details: error.message 
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};