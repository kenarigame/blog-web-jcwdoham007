import { Navbar } from "@/components/Navbar";
import { axiosInstance2 } from "@/lib/axios";
import type { Blog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const { data: blog, isPending } = useQuery({
    queryKey: ["blog", params.slug],
    queryFn: async () => {
      const { data } = await axiosInstance2.get<Blog>(`/blogs/${params.slug}`);
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Blog Not Found */}
      {!blog && !isPending && (
        <div className="flex justify-center items-center h-40">
          <p>Blog Not Found</p>
        </div>
      )}

      {/* Loading */}
      {isPending ? (
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading...</p>
        </div>
      ) : (
        // Blog Detail
        <article>
          {/* Breadcrumb */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Stories
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{blog?.category}</span>
            </nav>
          </div>

          {/* Header */}
          <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8">
            <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-medium">
              {blog?.category}
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {blog?.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {blog?.description}
            </p>

            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold">{blog?.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {blog?.createdAt}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Cover */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={blog?.thumbnail}
                alt={blog?.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <p>{blog?.content}</p>
          </div>
        </article>
      )}
    </div>
  );
}

export default BlogDetail;