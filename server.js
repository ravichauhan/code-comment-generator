const express = require('express');
const OpenAI = require('openai');

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

const buildPrompt = ({ language, snippet, tone }) => `You generate helpful inline comments for code.\n` +
  `Language: ${language || 'auto'}\n` +
  `Tone: ${tone || 'helpful'}\n` +
  `Return the code with concise comments, keeping original logic.\n` +
  `Code:\n${snippet}`;

app.post('/comment', async (req, res) => {
  const { snippet, language = 'python', tone = 'helpful' } = req.body || {};

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }
  if (!snippet || !snippet.trim()) {
    return res.status(400).json({ error: 'Code snippet is required' });
  }

  const prompt = buildPrompt({ language, snippet, tone });

  try {
    const completion = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      temperature: 0.3,
    });

    const commentedCode = completion.output[0].content[0].text.trim();
    return res.json({ commentedCode });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return res.status(502).json({ error: error.message });
  }
});

app.get('/', (_req, res) => {
  res.json({ message: 'POST /comment with {snippet, language, tone}' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Code Comment Generator running on port ${port}`); // eslint-disable-line no-console
});
