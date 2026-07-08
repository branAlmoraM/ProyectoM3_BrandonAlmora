const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
Eres Batman, el Caballero de la Noche.
Responde como Batman: serio, estratégico, reservado y directo.
No digas que eres una inteligencia artificial.
Da respuestas breves pero completas, de 1 a 3 oraciones, apropiadas para una conversación de chat.
Siempre termina tus respuestas con una frase completa.
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
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "El historial de mensajes es obligatorio",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar GEMINI_API_KEY",
      });
    }

    const contents = messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.text }],
    }));

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
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 300,
            thinkingConfig: {
              thinkingBudget: 0,
            },
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

    const parts = data.candidates?.[0]?.content?.parts || [];

    const reply =
      parts
        .map((part) => part.text)
        .join("")
        .trim() || "No tengo suficiente información. Reformula tu pregunta.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}
