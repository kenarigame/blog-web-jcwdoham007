import { Link } from "react-router";
import { PenLine, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/stores/useAuth";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow transition-transform group-hover:scale-105">
            <PenLine className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Inkwell
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Stories
          </Link>
          <a href="#" className="hover:text-foreground transition-colors">
            Topics
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Authors
          </a>

          {!!user && (
            <Link
              to="/create"
              className="hover:text-foreground transition-colors"
            >
              Write
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/create">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
                  Start writing
                </Button>
              </Link>

              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium"
            >
              Stories
            </Link>
            <a href="#" className="block py-2 text-sm font-medium">
              Topics
            </a>
            <a href="#" className="block py-2 text-sm font-medium">
              Authors
            </a>
            <Link
              to="/create"
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium"
            >
              Write
            </Link>
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link
                to="/create"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                <Button className="w-full gradient-primary text-primary-foreground">
                  Write
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}