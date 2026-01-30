
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
    // 3. Request Parsing - Now accepting systemInstruction dynamically
    const { prompt, systemInstruction } = await req.json();

    if (!process.env.API_KEY) {
      console.error("API_KEY is not defined in the environment.");
      throw new Error("Server Configuration Error");
    }

    // 4. Gemini Client Initialization
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // 5. Generate Content with Dynamic System Instruction
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction, // Injected from frontend
        temperature: 0.6, 
      },
    });

    // 6. Success Response
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
