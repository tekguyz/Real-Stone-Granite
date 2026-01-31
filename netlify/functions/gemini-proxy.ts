
import { GoogleGenAI } from "@google/genai";

export default async (req: Request) => {
  // 1. CORS Preflight Handling
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. Method Validation
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // 3. Request Parsing - Accepts prompt, systemInstruction, and optional audio data
    const { prompt, systemInstruction, audio } = await req.json();

    if (!process.env.API_KEY) {
      console.error("API_KEY is not defined in the environment.");
      throw new Error("Server Configuration Error");
    }

    // 4. Gemini Client Initialization
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // 5. Construct Multimodal Content
    const parts = [];
    
    // Add audio part if present
    if (audio && audio.data && audio.mimeType) {
      parts.push({
        inlineData: {
          mimeType: audio.mimeType,
          data: audio.data
        }
      });
    }

    // Add text prompt if present
    if (prompt) {
      parts.push({ text: prompt });
    }

    // 6. Generate Content
    // Using 'gemini-3-flash-preview' for efficient multimodal processing
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: systemInstruction, 
        temperature: 0.4, // Lower temperature for accurate transcription
      },
    });

    // 7. Success Response
    return new Response(JSON.stringify({ 
      text: response.text 
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    
    return new Response(JSON.stringify({ 
      error: "Architectural Intelligence System Offline.",
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