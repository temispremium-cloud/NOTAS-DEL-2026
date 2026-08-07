import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for AI writing assistant
  app.post("/api/assist-letter", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "Clave de API de Gemini no configurada.",
          fallback: true
        });
      }

      const { year, topic, currentText, tone } = req.body;

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Eres un asistente de redacción empático, maduro, sincero y respetuoso.
El usuario quiere escribir una nota o carta de explicación para su ex-pareja referente al año ${year || "2020-2026"}.

Tema o idea principal del usuario:
"${topic || "Explicación sincera, pedir disculpas por errores del pasado y agradecer los buenos momentos"}"

Texto borrador actual (si existe):
"${currentText || ""}"

Instrucciones de tono (${tone || "respetuoso, reflexivo y maduro"}):
1. Redacta una carta/nota en español clara, muy respetuosa, humana, emotiva pero madura.
2. Evita sonar manipulador, victimista o reprochador. La intención es dar una explicación clara de lo vivido, asumir responsabilidad por los errores y mostrar crecimiento personal.
3. El formato debe ser bonito, en párrafos limpios, listo para guardar en el blog de notas.
4. Incluye un título sugerido y el cuerpo de la nota.

Devuelve una respuesta en formato JSON válido con la siguiente estructura:
{
  "title": "Título sugerido para la nota",
  "content": "Cuerpo completo de la carta o nota...",
  "mood": "Sentimiento (ej: Nostalgia, Disculpa sincera, Gratitud, Madurez, Reflexión)",
  "quote": "Una frase corta o reflexión destacada de 1 línea"
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const jsonText = response.text;
      if (!jsonText) {
        throw new Error("No se obtuvo respuesta de Gemini");
      }

      const parsed = JSON.parse(jsonText);
      res.json(parsed);
    } catch (err: any) {
      console.error("Error en assist-letter:", err);
      res.status(500).json({
        error: "No se pudo generar la nota automáticamente. Intenta redactarla manualmente.",
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

startServer();
