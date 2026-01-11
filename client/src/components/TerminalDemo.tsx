import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

const steps = [
  { cmd: "git push origin feature/new-api", output: "Enumerating objects: 15, done.\nTo github.com:user/repo.git\n * [new branch]      feature/new-api -> feature/new-api" },
  { cmd: "gh pr create --title 'Add new API endpoints' --body 'Adds endpoints for user management'", output: "Creating pull request for feature/new-api into main\nhttps://github.com/user/repo/pull/42" },
  { cmd: "ai-reviewer check pr-42", output: "Analyze PR #42...\n> Checking for bugs...\n> Checking for security vulnerabilities...\n> Generating summary...\n\n[SUCCESS] Review posted to GitHub PR #42" },
];

export function TerminalDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % (steps.length + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl terminal-window font-mono text-sm sm:text-base">
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500/50" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500/50" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500/50" />
        </div>
        <div className="ml-4 text-xs text-muted-foreground/60 flex-1 text-center font-sans">bash — 80x24</div>
      </div>
      
      <div className="p-6 min-h-[300px] flex flex-col justify-end">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: index < currentStep ? 0.5 : index === currentStep ? 1 : 0,
              y: 0,
              display: index > currentStep ? "none" : "block"
            }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="flex gap-2 items-center text-primary mb-1">
              <span className="text-blue-400">user@dev</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-purple-400">~/project</span>
              <span className="text-muted-foreground">$</span>
              <span className="text-white ml-1">{step.cmd}</span>
            </div>
            {index < currentStep && (
              <div className="text-muted-foreground pl-4 whitespace-pre-line leading-relaxed border-l-2 border-white/5 ml-1">
                {step.output}
              </div>
            )}
            {index === currentStep && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2.5 h-4 bg-primary align-middle ml-1"
              />
            )}
          </motion.div>
        ))}
        
        {currentStep === steps.length && (
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center text-primary"
          >
            <span className="text-blue-400">user@dev</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-purple-400">~/project</span>
            <span className="text-muted-foreground">$</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-4 bg-primary align-middle ml-1"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
