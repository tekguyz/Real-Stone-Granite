
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
    const body = await req.json();
    const { prompt, systemInstruction, audio, temperature } = body;

    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable is missing.");
      throw new Error("Configuration issue: Missing API Key");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [];
    
    // gemini-3-flash-preview is the recommended multimodal model for text/audio/image tasks via generateContent.
    // gemini-2.5-flash-native-audio is primarily for Live API (WebSockets).
    const modelName = 'gemini-3-flash-preview';

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

    if (parts.length === 0) {
      return new Response(JSON.stringify({ error: "No content provided" }), { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction || "You are a professional assistant.", 
        temperature: temperature || 0.4,
      },
    });

    const textOutput = response.text || "";

    return new Response(JSON.stringify({ 
      text: textOutput 
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    return new Response(JSON.stringify({ 
      error: "We're having trouble connecting to our design assistant. Please try again.",
      details: error.message || error.toString()
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
