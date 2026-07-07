import { axiosInstance2 } from "@/lib/axios";
import type { Blog } from "@/types/blog";
import type { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import GlobalPagination from "../GlobalPagination";
import { BlogCard } from "./BlogCard";

function Grid() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const { data } = await axiosInstance2.get<PageableResponse<Blog>>(
        "/blogs",
        { params: { page } },
      );
      return data;
    },
  });

  return (
    <section className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {isPending && (
        <div className="flex justify-center">
          <p className="py-12 flex items-center gap-2">
            <Loader className="animate-spin" />
            Loading...
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.data?.map((b) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>

      {blogs && (
        <div className="py-8">
          <GlobalPagination
            currentPage={blogs.meta.page}
            totalPage={Math.ceil(blogs.meta.total / blogs.meta.take)}
            onChangePage={(p) => {
              setPage(p);
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Grid;