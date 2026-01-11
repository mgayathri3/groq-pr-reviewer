import { Link, useLocation } from "wouter";
import { Terminal, Github, GitPullRequest } from "lucide-react";
import { clsx } from "clsx";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Documentation" },
    { href: "/dashboard", label: "Live Dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
            AI<span className="text-primary">Reviewer</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer",
                  location === item.href
                    ? "text-primary bg-primary/5 shadow-[0_0_20px_-5px_rgba(74,222,128,0.2)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 hover:shadow-[0_0_20px_-5px_rgba(74,222,128,0.5)] transition-all duration-300 flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" />
            <span>Install App</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
