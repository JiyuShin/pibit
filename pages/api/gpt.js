import OpenAI from 'openai';
import { toneAndManner } from '../../components/conversation/constants.js';

// 환경 변수 검증
if (!process.env.OPENAI_API_KEY) {
  console.error('[API /api/gpt] CRITICAL: OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 재시도 가능한 에러인지 확인하는 함수
const isRetryableError = (error) => {
  if (error instanceof OpenAI.APIError) {
    // 429 (rate limit), 500번대 서버 에러는 재시도 가능
    return error.status === 429 || (error.status >= 500 && error.status < 600);
  }
  // 네트워크 에러, 타임아웃 에러도 재시도 가능
  return error.code === 'ENOTFOUND' || 
         error.code === 'ECONNREFUSED' || 
         error.code === 'ETIMEDOUT' ||
         error.message.includes('타임아웃') ||
         error.message.includes('timeout');
};

// 지수 백오프로 재시도하는 함수
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[API /api/gpt] Attempt ${attempt + 1}/${maxRetries + 1}`);
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(`[API /api/gpt] Attempt ${attempt + 1} failed:`, error.message);
      
      // 마지막 시도이거나 재시도 불가능한 에러인 경우
      if (attempt === maxRetries || !isRetryableError(error)) {
        console.log(`[API /api/gpt] No more retries. Final error:`, error.message);
        throw error;
      }
      
      // 지수 백오프 지연
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(`[API /api/gpt] Waiting ${delay.toFixed(0)}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// OpenAI API 호출 함수
const callOpenAI = async (systemContent, message) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('OpenAI API 호출 타임아웃 (30초)')), 30000);
  });

  const apiPromise = openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return await Promise.race([apiPromise, timeoutPromise]);
};



export default async function handler(req, res) {
  console.log('[API /api/gpt] Request received', { method: req.method, body: req.body });

  // CORS 헤더 추가
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { message, userName, toneId, systemPrompt } = req.body;
    console.log('[API /api/gpt] Processing POST request', { message, userName, toneId, hasSystemPrompt: !!systemPrompt });

    // 환경 변수 재검증
    if (!process.env.OPENAI_API_KEY) {
      console.error('[API /api/gpt] Error: OPENAI_API_KEY is missing');
      return res.status(500).json({ error: 'API 키가 설정되지 않았습니다. 서버 관리자에게 문의하세요.' });
    }

    console.log('[API /api/gpt] ✅ OpenAI API 키 확인됨 - 실제 OpenAI API 사용');

    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error('[API /api/gpt] Error: Valid message is required');
      return res.status(400).json({ error: '메시지가 필요합니다.' });
    }

    let systemContent;
    
    // systemPrompt가 있으면 우선 사용
    if (systemPrompt) {
      systemContent = systemPrompt;
    } else {
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
    }

    console.log(`[API /api/gpt] Using system content:`, systemContent.substring(0, 200) + '...');

    try {
      console.log('[API /api/gpt] Starting OpenAI API call with retry logic...');
      
      // 재시도 로직으로 API 호출
      const response = await retryWithBackoff(
        () => callOpenAI(systemContent, message),
        3, // 최대 3회 재시도
        1000 // 1초 기본 지연
      );
      
      console.log('[API /api/gpt] OpenAI API response received successfully');

      if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
        throw new Error('OpenAI API에서 잘못된 응답을 받았습니다.');
      }

      const reply = response.choices[0].message.content;
      
      if (!reply || typeof reply !== 'string' || reply.trim() === '') {
        throw new Error('OpenAI API에서 빈 응답을 받았습니다.');
      }

      console.log('[API /api/gpt] Extracted reply:', reply);
      res.status(200).json({ reply });
      
    } catch (error) {
      console.error('[API /api/gpt] All retries failed. Final error:', error);
      
      let errorMessage = '죄송해요. 지금은 대답하기 어려워요. 잠시 후 다시 시도해주세요.';
      let statusCode = 500;
      
      if (error instanceof OpenAI.APIError) {
        console.error('[API /api/gpt] OpenAI API Error:', { 
          status: error.status, 
          message: error.message, 
          code: error.code, 
          type: error.type 
        });
        
        if (error.status === 401) {
          errorMessage = 'API 인증에 실패했습니다. 관리자에게 문의하세요.';
        } else if (error.status === 429 || error.code === 'insufficient_quota') {
          errorMessage = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
          statusCode = 429;
        } else if (error.status === 400) {
          errorMessage = '요청이 잘못되었습니다. 다시 시도해주세요.';
          statusCode = 400;
        } else if (error.status >= 500) {
          errorMessage = 'OpenAI 서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
          statusCode = 500;
        }
      } else if (error.message.includes('타임아웃')) {
        errorMessage = '응답 시간이 초과되었습니다. 다시 시도해주세요.';
        statusCode = 408;
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        errorMessage = '네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.';
        statusCode = 503;
      }
      
      res.status(statusCode).json({ error: errorMessage });
    }
  } else {
    console.log(`[API /api/gpt] Method ${req.method} Not Allowed`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 