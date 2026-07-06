import { Search, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero-bg border-b border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          New stories every Tuesday
        </span>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
          Writing worth <span className="gradient-text">your attention.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Inkwell is a hand-edited publication for people who build software,
          design products, and care about getting the small things right.
        </p>

        <div className="mt-9 max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search stories, authors, topics…"
            className="w-full rounded-full border border-border bg-background/90 backdrop-blur pl-11 pr-4 py-3.5 text-sm shadow-card outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;