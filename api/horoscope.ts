// Vercel Serverless Function (Edge Runtime)
// Endpoint: /api/horoscope

import { GoogleGenAI } from "@google/genai";
import { ZodiacSign } from "../types";

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set on server.");
    // No expongas el error exacto al cliente por seguridad
    return new Response(JSON.stringify({ error: "Error de configuración en el servidor." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { sign } = (await request.json()) as { sign: ZodiacSign };

    if (!sign || !Object.values(ZodiacSign).includes(sign)) {
         return new Response(JSON.stringify({ error: "Se requiere un signo zodiacal válido." }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Eres una pitonisa excéntrica y muy divertida llamada Madame Zazá. Tienes una bola de cristal mágica que te muestra el futuro. Basándote en el signo zodiacal de ${sign}, dame un horóscopo para hoy. El horóscopo debe ser breve (2-3 frases), ingenioso, y con un toque de humor cósmico y positivo. ¡Sorpréndeme con tu visión estelar! No incluyas saludos como '¡Hola!' ni te presentes. Ve directo al horóscopo.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.9,
            topP: 1,
            topK: 1,
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    const text = response.text;
    if (!text) {
        throw new Error("La bola de cristal está un poco nublada. No se recibió respuesta.");
    }

    return new Response(JSON.stringify({ horoscope: text.trim() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in horoscope serverless function:", error);
    // Devuelve un error genérico y amigable al usuario
    return new Response(JSON.stringify({ error: "¡Oh no! Hubo una interferencia cósmica. Inténtalo de nuevo más tarde." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
