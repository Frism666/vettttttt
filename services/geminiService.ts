
import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult } from "../types";

export const searchVeterans = async (query: string, retryCount = 0): Promise<SearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `
        Tugas: Lakukan verifikasi militer AS yang sangat akurat berdasarkan kueri: "${query}".
        
        PROTOKOL VALIDASI WAJIB:
        1. Identifikasi apakah veteran masih HIDUP (Living) dengan memeriksa record terbaru (2024-2025).
        2. Tentukan SUMBER UTAMA (Primary Source) dari record ini (Contoh: Congressional Medal of Honor Society, Hall of Valor Project, National Personnel Records Center).
        3. Jika record berasal dari database penghargaan resmi, sebutkan institusinya di field 'sourceOrigin'.

        FIELD 'sourceOrigin' HARUS BERISI NAMA INSTITUSI/DATABASE VALID (misal: 'DoD Hall of Valor', 'CMOH Society', 'VA National Cemetery Administration').

        HASIL HARUS DALAM FORMAT JSON ARRAY.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              rankBranch: { type: Type.STRING },
              dob: { type: Type.STRING },
              dod: { type: Type.STRING },
              cemetery: { type: Type.STRING },
              cemeteryAddress: { type: Type.STRING },
              telephone: { type: Type.STRING },
              biography: { type: Type.STRING },
              sourceOrigin: { type: Type.STRING, description: "Sumber validitas data primer." },
              serviceHighlights: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["name", "rankBranch", "dob", "dod", "cemetery", "cemeteryAddress", "telephone", "biography", "sourceOrigin"]
          }
        }
      },
    });

    const veterans = JSON.parse(response.text || "[]");
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      veterans,
      sources
    };
  } catch (error: any) {
    const msg = error?.message || "";
    if ((msg.includes('500') || msg.includes('Rpc failed')) && retryCount < 2) {
      await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 2000));
      return searchVeterans(query, retryCount + 1);
    }
    throw new Error(msg.includes('500') ? "Gangguan koneksi server. Silakan coba lagi." : error.message);
  }
};
