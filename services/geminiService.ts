import { ZodiacSign } from "../types";

export const getHoroscope = async (sign: ZodiacSign): Promise<string> => {
  try {
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sign }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Usar el mensaje de error del servidor si está disponible
      throw new Error(data.error || "¡Oh no! Hubo una interferencia cósmica.");
    }

    if (!data.horoscope) {
      throw new Error("La bola de cristal está un poco nublada. No se recibió respuesta.");
    }

    return data.horoscope;

  } catch (error) {
    console.error("Error fetching horoscope from backend:", error);
    // Volver a lanzar el error para que el componente de la UI pueda capturarlo.
    if (error instanceof Error) {
      // Para errores de red o errores lanzados desde el bloque 'try', usar su mensaje.
      return Promise.reject(error.message);
    }
    // Fallback para tipos de error desconocidos
    return Promise.reject("Ocurrió un error de red. Inténtalo de nuevo.");
  }
};
