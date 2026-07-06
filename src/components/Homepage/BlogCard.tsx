import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/types/blog";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card`}
    >
      <div className={`relative overflow-hidden bg-muted aspect-16/10`}>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          {blog.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6`}>
        <h3
          className={`font-display font-semibold text-foreground leading-tight group-hover:text-primary transition-colors text-xl`}
        >
          {blog.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {blog.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
              {blog.user.name
                .split(" ")
                .map((s: string) => s[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {blog.user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {String(new Date(blog.createdAt))}
              </p>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            Read <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}