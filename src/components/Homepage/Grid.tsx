import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import type { Blog } from "../types/blog";

function Grid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  const getBlogs = async () => {
    try {
      const response = await axiosInstance.get<Blog[]>("/data/Blogs");
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBlogs();
  }, []);

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
        {blogs?.map((b) => (
          <BlogCard key={b.objectId} blog={b} />
        ))}
      </div>
    </section>
  );
}

export default Grid;
