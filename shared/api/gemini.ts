
/**
 * Gemini Intelligence Service (Client Proxy)
 * 
 * ARCHITECTURE NOTE:
 * This module routes all AI requests through our secure Netlify Function (gemini-proxy).
 * This prevents exposure of the API_KEY in the browser client.
 */

export const generateText = async (prompt: string, systemInstruction: string) => {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction,
        temperature: 0.7 // Higher creativity for conversation
      })
    });

    if (!response.ok) {
      throw new Error(`Proxy Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("AI Service Unavailable:", error);
    return "Our consultants are currently assisting other clients. Please try again in a moment.";
  }
};

export const transcribeAudio = async (base64Audio: string, mimeType: string, prompt: string) => {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction: "You are a specialized transcription tool for an architectural stone company. Focus on clarity and professional formatting.",
        audio: {
          data: base64Audio,
          mimeType: mimeType
        },
        temperature: 0.2 // Lower temperature for accurate transcription
      })
    });

    if (!response.ok) {
       throw new Error(`Proxy Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Audio Processing Error:", error);
    throw error;
  }
};
