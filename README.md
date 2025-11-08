# Code Comment Generator

Express.js service that sends code snippets to OpenAI and returns the same code with concise inline comments.

## Features
- `/comment` endpoint accepts `snippet`, `language`, and `tone` options.
- Responds with AI-generated comments that explain intent without altering logic.
- Small Node stack that runs anywhere a basic Express app does.

## Run Locally
```bash
npm install
export OPENAI_API_KEY=sk-your-key
npm start
```

## Example
Request:
```bash
curl -X POST http://127.0.0.1:4000/comment \
  -H "Content-Type: application/json" \
  -d '{
        "language": "python",
        "tone": "friendly",
        "snippet": "def add(a, b):\n    return a + b"
      }'
```
Response:
```json
{
  "commentedCode": "def add(a, b):\n    # combine the two inputs into one total\n    return a + b"
}
```

## Future Ideas
- Add GitHub webhook to auto-comment pull request diffs.
- Allow style presets (tutorial, production, onboarding).
- Provide diff output highlighting new comments vs. original code.
