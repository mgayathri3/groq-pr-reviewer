import { Navbar } from "@/components/Navbar";
import { Copy, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, lang = "yaml" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#0F0F0F] my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{lang}</span>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function Documentation() {
  const workflowCode = `name: AI Code Reviewer

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: AI Reviewer
        uses: my-org/ai-pr-reviewer@v1
        with:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GROQ_API_KEY: \${{ secrets.GROQ_API_KEY }}
          MODEL: "llama3-70b-8192" # Optional, defaults to 70b
          exclude_files: "package-lock.json,yarn.lock"`;

  const secretCode = `GROQ_API_KEY=gsk_...
GITHUB_TOKEN=... (Automatically provided by GitHub Actions)`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Getting Started</h5>
            <ul className="space-y-1">
              {["Introduction", "Installation", "Configuration", "Troubleshooting"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="block px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">Documentation</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn how to integrate the AI Reviewer into your GitHub workflow in less than 5 minutes.
            </p>
          </div>

          <section id="introduction" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="text-primary w-6 h-6" />
              Introduction
            </h2>
            <p className="text-muted-foreground mb-4">
              This tool uses the Groq API (powered by LLaMA3) to analyze pull request diffs. 
              It automatically posts comments on lines with detected bugs, security issues, or improvement suggestions.
            </p>
          </section>

          <section id="installation" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="text-primary w-6 h-6" />
              Installation
            </h2>
            <p className="text-muted-foreground mb-4">
              Create a new file in your repository at <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">.github/workflows/reviewer.yml</code> and paste the following configuration:
            </p>
            <CodeBlock code={workflowCode} />
          </section>

          <section id="configuration" className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ChevronRight className="text-primary w-6 h-6" />
              Configuration
            </h2>
            <p className="text-muted-foreground mb-4">
              You need to set up the following secrets in your GitHub repository settings:
            </p>
            <CodeBlock code={secretCode} lang="env" />
            
            <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Note on Models</h4>
              <p className="text-sm text-blue-200/80">
                We recommend using <code className="text-white">llama3-70b-8192</code> for the best balance of speed and reasoning capability. 
                The 8b model is faster but may miss subtle bugs.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
