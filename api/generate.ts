type ApiRequest = AsyncIterable<Uint8Array> & {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

const sendJson = (response: ApiResponse, status: number, payload: object) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
};

const readRequestBody = async (request: ApiRequest) => {
  if (request.body !== undefined) {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

export const handleGenerate = async (request: ApiRequest, response: ApiResponse) => {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Use POST to generate a website.' });
    return;
  }

  let prompt: unknown;
  let currentHtml = '';
  try {
    const body = await readRequestBody(request) as { prompt?: unknown; currentHtml?: unknown };
    prompt = body?.prompt;
    if (body?.currentHtml !== undefined && (typeof body.currentHtml !== 'string' || body.currentHtml.length > 50000)) {
      sendJson(response, 400, { error: 'The current website is too large to refine.' });
      return;
    }

    currentHtml = typeof body?.currentHtml === 'string' ? body.currentHtml : '';
  } catch {
    sendJson(response, 400, { error: 'Send a valid JSON prompt.' });
    return;
  }

  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 8000) {
    sendJson(response, 400, { error: 'Enter a prompt between 1 and 8,000 characters.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    sendJson(response, 503, { error: 'Add GEMINI_API_KEY to the local environment or Vercel project settings.' });
    return;
  }

  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: currentHtml
                ? `Update this existing website to satisfy the new request. Preserve its working features and return the complete updated HTML document.\n\nExisting website:\n${currentHtml}\n\nNew request:\n${prompt}\n\nKeep it polished and responsive, include all CSS and JavaScript inline, and return only HTML without markdown fences.`
                : `Create a polished, responsive website from this request: ${prompt}\n\nReturn only a complete standalone HTML document. Include all CSS and JavaScript inline. Do not use markdown fences.`
            }]
          }]
        })
      }
    );
    const data = await result.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    if (!result.ok) {
      sendJson(response, 502, { error: data.error?.message || 'The AI service could not generate the website.' });
      return;
    }

    const html = data.candidates?.[0]?.content?.parts
      ?.map(part => part.text || '')
      .join('')
      .trim();
    if (!html) {
      sendJson(response, 502, { error: 'The AI service returned an empty website.' });
      return;
    }

    sendJson(response, 200, { html });
  } catch (error) {
    console.error('Website generation failed:', error);
    sendJson(response, 502, { error: 'Website generation failed. Please try again.' });
  }
};

export default handleGenerate;