import { Navbar } from "@/components/Navbar";
import { TerminalDemo } from "@/components/TerminalDemo";
import { FeatureCard } from "@/components/FeatureCard";
import { Bot, ShieldCheck, Zap, GitCommit, FileCode, ArrowRight, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Now powered by LLaMA3 on Groq
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Code Reviews on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Autopilot</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Save hours of manual review. Our AI agent analyzes your Pull Requests for bugs, 
                security vulnerabilities, and performance improvements instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/docs">
                  <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300">
                    View Dashboard
                  </button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center text-xs font-bold text-white">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by 100+ developers</p>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need for perfect code</h2>
            <p className="text-muted-foreground">
              We don't just lint your code. We understand it. Using advanced LLMs, we provide context-aware feedback that actually helps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Bot}
              title="AI-Powered Analysis"
              description="Uses LLaMA3 via Groq to understand code context, logic flows, and edge cases that static analysis misses."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Security First"
              description="Automatically detects potential security vulnerabilities like SQL injection, XSS, and hardcoded secrets before merge."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Powered by Groq's LPU inference engine. Get comprehensive reviews in seconds, not minutes."
            />
            <FeatureCard
              icon={GitCommit}
              title="Summarization"
              description="Generates concise, human-readable summaries of changes for changelogs and release notes."
            />
            <FeatureCard
              icon={FileCode}
              title="Bug Detection"
              description="Spots potential runtime errors, logic bugs, and race conditions with high accuracy."
            />
            <FeatureCard
              icon={Terminal}
              title="GitHub Actions"
              description="Runs directly in your CI/CD pipeline. No external dashboard required for the core workflow."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-bold text-white">AI Reviewer</span>
            </div>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Open Source Project. Built with Groq & LLaMA3.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
