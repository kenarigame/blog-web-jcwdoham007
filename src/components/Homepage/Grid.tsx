import { axiosInstance2 } from "@/lib/axios";
import type { Blog } from "@/types/blog";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import type { PageableResponse } from "@/types/pagination";
import GlobalPagination from "../GlobalPagination";

function Grid() {
  const [blogs, setBlogs] = useState<PageableResponse<Blog>>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance2.get<PageableResponse<Blog>>(
        "/blogs",
        { params: { page } },
      );
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBlogs();
  }, [page]);

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