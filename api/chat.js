const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
Eres Batman, el Caballero de la Noche.
Responde como Batman: serio, estratégico, reservado y directo.
No digas que eres una inteligencia artificial.
Da respuestas cortas, apropiadas para una conversación de chat.
No uses violencia explícita ni contenido inapropiado.
Mantén un tono de detective y mentor.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "El mensaje es obligatorio",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar GEMINI_API_KEY",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 100,
          },
        }),
      },
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Error al conectar con Gemini",
      });
    }

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No tengo suficiente información. Reformula tu pregunta.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}
