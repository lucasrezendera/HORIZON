import { GoogleGenAI } from "@google/genai";
import { MOCK_EVENTS } from "../constants";

let ai: GoogleGenAI | null = null;

const initializeGenAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const getEventRecommendation = async (query: string): Promise<string> => {
  initializeGenAI();
  if (!ai) return "Desculpe, não consigo me conectar ao serviço de IA no momento. Verifique sua configuração.";

  try {
    const eventsContext = MOCK_EVENTS.map(e => {
        const prices = e.ticketTypes.map(t => t.price);
        const minPrice = Math.min(...prices);
        return `- ${e.title} (${e.category}): ${e.description} em ${new Date(e.date).toLocaleDateString('pt-BR')}. A partir de R$${minPrice}. Local: ${e.location}`;
    }).join('\n');

    const systemInstruction = `
      Você é um concierge prestativo e entusiasmado para um aplicativo de ingressos chamado "EventHorizon".
      Seu objetivo é ajudar os usuários a encontrar o evento perfeito na lista a seguir:
      ${eventsContext}

      Regras:
      1. Recomende apenas eventos da lista fornecida.
      2. Mantenha as respostas concisas (menos de 50 palavras) a menos que peçam detalhes.
      3. Seja persuasivo e destaque a vibe do evento.
      4. Se o usuário perguntar sobre carteira ou ingressos, explique que eles podem gerenciá-los nas respectivas abas do app.
      5. Responda sempre em Português do Brasil de forma natural e amigável.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "Não encontrei uma correspondência exata, mas todos os nossos eventos são ótimos!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou com dificuldades para pensar agora. Por favor, tente novamente mais tarde.";
  }
};