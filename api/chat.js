export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      error: "El mensaje es obligatorio",
    });
  }

  return res.status(200).json({
    reply:
      "He recibido tu mensaje. Estoy analizando la situación desde la Baticueva.",
  });
}
