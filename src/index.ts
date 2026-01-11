import * as core from "@actions/core";
import { GithubClient } from "./githubClient";
import { GroqClient } from "./groqClient";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  try {
    const githubToken = core.getInput("GITHUB_TOKEN") || process.env.GITHUB_TOKEN;
    const groqApiKey = core.getInput("GROQ_API_KEY") || process.env.GROQ_API_KEY;
    const model = core.getInput("MODEL") || "llama3-70b-8192";

    if (!githubToken) {
      throw new Error("GITHUB_TOKEN is required");
    }

    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY is required");
    }

    const githubClient = new GithubClient(githubToken);
    const groqClient = new GroqClient(groqApiKey, model);

    core.info("Fetching PR diff...");
    const diff = await githubClient.getPullRequestDiff();

    if (!diff) {
      core.info("No diff found or error fetching diff.");
      return;
    }

    core.info("Analyzing code with Groq LLaMA3...");
    const review = await groqClient.analyzeDiff(diff);

    core.info("Posting review comment...");
    await githubClient.postComment(review);

    core.info("Review completed successfully!");
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
