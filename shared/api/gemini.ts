export const generateText = async (prompt: string, systemInstruction: string) => {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction,
        temperature: 0.7 
      })
    });

    if (!response.ok) {
      return "I’m sorry, I’m having trouble reaching the team right now. Please try again in a few moments.";
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    return "I’m sorry, I’m having trouble reaching the team right now. Please try again in a few moments.";
  }
};

export interface TranscriptionResponse {
  brief: string;
  engagement: 'Decisive' | 'Visionary' | 'Inquisitive';
  disposition: 'Professional' | 'Casual';
  urgency: 'High' | 'Normal';
}

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<TranscriptionResponse> => {
  const prompt = `
    Summarize the client's stone project description into a clear technical brief.
    Also, analyze their tone, pace, and vocal nuances to assess the following fields.
    Respond ONLY with a JSON object in this exact format:
    {
      "brief": "bulleted technical summary",
      "engagement": "Decisive" | "Visionary" | "Inquisitive",
      "disposition": "Professional" | "Casual",
      "urgency": "High" | "Normal"
    }
  `;

  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction: "You are a master stone consultant. Detect nuance and summarize visions accurately.",
        audio: {
          data: base64Audio,
          mimeType: mimeType
        },
        temperature: 0.1 
      })
    });

    if (!response.ok) {
       throw new Error('Process issue');
    }

    const data = await response.json();
    // Attempt to parse JSON from the model's text response
    try {
      const parsed = JSON.parse(data.text.replace(/```json|```/g, '').trim());
      return parsed as TranscriptionResponse;
    } catch (e) {
      // Fallback if model doesn't return perfect JSON
      return {
        brief: data.text,
        engagement: 'Visionary',
        disposition: 'Casual',
        urgency: 'Normal'
      };
    }
  } catch (error) {
    throw error;
  }
};