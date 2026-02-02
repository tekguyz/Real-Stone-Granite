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
      throw new Error(`Connection issue`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Connection problem:", error);
    return "I’m sorry, I’m having trouble reaching the team right now. Please try again in a few moments.";
  }
};

export const transcribeAudio = async (base64Audio: string, mimeType: string, prompt: string) => {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemInstruction: "You are helping a customer describe their stone project. Take their spoken words and write them down clearly.",
        audio: {
          data: base64Audio,
          mimeType: mimeType
        },
        temperature: 0.2 
      })
    });

    if (!response.ok) {
       throw new Error(`Could not process note`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Audio problem:", error);
    throw error;
  }
};