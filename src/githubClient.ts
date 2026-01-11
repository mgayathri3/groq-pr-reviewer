import * as core from "@actions/core";
import * as github from "@actions/github";

export class GithubClient {
  private octokit;
  private context;

  constructor(token: string) {
    this.octokit = github.getOctokit(token);
    this.context = github.context;
  }

  async getPullRequestDiff(): Promise<string | null> {
    const { owner, repo, number } = this.context.issue;
    
    if (!number) {
      core.warning("No pull request number found.");
      return null;
    }

    try {
      const response = await this.octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: number,
        mediaType: {
          format: "diff",
        },
      });

      // The response.data is the diff string when mediaType is set to diff
      return response.data as unknown as string;
    } catch (error) {
      core.error(`Failed to fetch PR diff: ${error}`);
      return null;
    }
  }

  async postComment(body: string): Promise<void> {
    const { owner, repo, number } = this.context.issue;
    
    if (!number) {
      return;
    }

    try {
      await this.octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body,
      });
      core.info("Comment posted successfully.");
    } catch (error) {
      core.error(`Failed to post comment: ${error}`);
    }
  }
}
