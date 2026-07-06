import { PenLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <PenLine className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-xl font-semibold">
                Inkwell
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A quiet place on the internet for considered writing about
              software, design, and the people who make both.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Latest
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Topics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Authors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4">
              Get the weekly
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              One email. Five stories. No noise.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            © 2026 Inkwell Media. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <PenLine className="h-4 w-4" />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground">
              <PenLine className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
              <PenLine className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}