import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Réponses locales pour le mode dégradé
const LOCAL_AI_RESPONSES = {
  "bonjour": "Bonjour ! Je suis Pegasio Assistant. En mode limité actuellement. Comment puis-je vous aider ?",
  "aide": "Je peux vous aider avec :\n- Gestion de projets\n- CRM\n- Facturation\n\n[Mode limité - Fonctionnalités réduites]",
  "default": "Notre service AI rencontre des limitations temporaires. Contactez-nous à support@pegasio.com pour une assistance directe."
};

export const getAIResponse = async (userMessage) => {
  try {
    // 1. D'abord essayer l'API OpenAI
    if (process.env.USE_OPENAI === 'true') {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es Pegasio Assistant, un expert en gestion d'entreprise. Réponds de manière concise."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });
      return completion.choices[0]?.message?.content || LOCAL_AI_RESPONSES.default;
    }
    
    // 2. Fallback local si OpenAI désactivé ou erreur
    const lowerMsg = userMessage.toLowerCase();
    return LOCAL_AI_RESPONSES[lowerMsg] || LOCAL_AI_RESPONSES.default;

  } catch (error) {
    console.error('Erreur AI - Mode dégradé activé:', error.message);
    
    // 3. Logique de fallback intelligente
    if (error.status === 429 || error.code === 'insufficient_quota') {
      return "Nos services AI sont temporairement limités. Veuillez réessayer plus tard ou contacter notre support.";
    }
    
    return LOCAL_AI_RESPONSES.default;
  }
};