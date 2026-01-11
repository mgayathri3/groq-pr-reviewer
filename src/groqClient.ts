import Groq from "groq-sdk";
import * as core from "@actions/core";

export class GroqClient {
  private client: Groq;
  private model: string;

  constructor(apiKey: string, model: string = "llama-3.1-70b-versatile") {
    this.client = new Groq({ apiKey });
    this.model = model;
  }

  async analyzeDiff(diff: string): Promise<string> {
    const prompt = `
You are an expert code reviewer. Analyze the following GitHub Pull Request diff and provide a structured review.
Focus on:
1. Critical bugs
2. Security vulnerabilities
3. Code quality improvements
4. Summary of changes

Output Format (Markdown):
## 🔍 Code Review Summary
[Brief summary]

## 🐛 Critical Issues
- [Issue 1]
- [Issue 2]

## 🛡️ Security Concerns
- [Concern 1]

## 💡 Suggestions
- [Suggestion 1]

---
**Diff to analyze:**
\`\`\`diff
${diff.slice(0, 100000)}
\`\`\`
(Diff truncated if too long)
`;

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: this.model,
        temperature: 0.5,
      });

      return completion.choices[0]?.message?.content || "No review generated.";
    } catch (error) {
      core.error(`Groq API Error: ${error}`);
      throw error;
    }
  }
}
