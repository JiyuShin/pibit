import OpenAI from 'openai';
import { toneAndManner } from '../../components/conversation/constants.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log('[API /api/gpt] Request received', { method: req.method, body: req.body });

  if (req.method === 'POST') {
    const { message, userName, toneId } = req.body;
    console.log('[API /api/gpt] Processing POST request', { message, userName, toneId });

    if (!message) {
      console.error('[API /api/gpt] Error: Message is required');
      return res.status(400).json({ error: 'Message is required' });
    }

    let systemContent;
    const effectiveToneId = String(toneId || '').trim().toLowerCase();
    console.log('[API /api/gpt] effectiveToneId:', effectiveToneId);
    console.log('[API /api/gpt] toneAndManner:', toneAndManner.map(t => String(t.id).trim().toLowerCase()));
    const selectedToneConfig = toneAndManner.find(
      t => String(t.id).trim().toLowerCase() === effectiveToneId
    );
    console.log('[API /api/gpt] selectedToneConfig:', selectedToneConfig);

    if (selectedToneConfig && typeof selectedToneConfig.getSystemPrompt === 'function') {
      systemContent = selectedToneConfig.getSystemPrompt(userName);
    } else {
      console.warn(`[API /api/gpt] Could not find valid config for toneId '${effectiveToneId}'. Fallback to toneAndManner[0].`);
      const fallbackToneConfig = toneAndManner[0];
      if (fallbackToneConfig && typeof fallbackToneConfig.getSystemPrompt === 'function') {
        systemContent = fallbackToneConfig.getSystemPrompt(userName);
      } else {
        console.error('[API /api/gpt] CRITICAL: toneAndManner[0] is not configured correctly in constants.js. Using hardcoded default prompt.');
        systemContent = `You are PIBIT, a friendly and somewhat quirky teenage friend. The user's name is ${userName || 'User'}. Talk like a teenager. Keep your responses concise and engaging, like a real chat with a friend. 한국어로 대답해줘.`;
      }
    }

    console.log(`[API /api/gpt] Using system content for toneId '${effectiveToneId}':`, systemContent);

    try {
      console.log('[API /api/gpt] Calling OpenAI API...');
      const response = await openai.responses.create({
        model: 'gpt-4.1',
        input: [
          {
            role: 'developer',
            content: systemContent,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      });
      console.log('[API /api/gpt] OpenAI API response received:', response);

      const reply = response.output_text;
      console.log('[API /api/gpt] Extracted reply:', reply);
      res.status(200).json({ reply });
    } catch (error) {
      let errorMessage = 'Failed to get response from AI';
      if (error instanceof OpenAI.APIError) {
        console.error('[API /api/gpt] OpenAI API Error:', { status: error.status, message: error.message, code: error.code, type: error.type, rawError: error });
        errorMessage = `AI 에러 (${error.status}): ${error.message}`;
      } else {
        console.error('[API /api/gpt] Generic error calling OpenAI API:', error.message, error);
      }
      res.status(500).json({ error: errorMessage });
    }
  } else {
    console.log(`[API /api/gpt] Method ${req.method} Not Allowed`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 