import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance, axiosInstance2 } from "@/lib/axios";
import { useAuth } from "@/stores/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.instanceof(File, { message: "Thumbnail must be a file" }),
});

interface ResponseFileService {
  filePath: string;
  fileURL: string;
}

function CreateBlog() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);

  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
      thumbnail: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      // step 1: upload thumbnail ke file service
      const formData = new FormData();
      formData.append("file", data.thumbnail);
      const folderName = "images";
      // eslint-disable-next-line react-hooks/purity
      const fileName = Date.now() + Math.floor(Math.random() * 1000);
      const response = await axiosInstance.post<ResponseFileService>(
        `/files/${folderName}/${fileName}`,
        formData,
      );

      // step 2: submit data(yang berupa tulisan) ke backendless
      await axiosInstance2.post(
        "/blogs",
        {
          title: data.title,
          description: data.description,
          category: data.category,
          content: data.content,
          thumbnail: response.data.fileURL,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      toast.success("Create blog success!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Create blog failed!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                Write a story
              </h1>
              <p className="text-muted-foreground mt-2">
                Draft it. Preview it. Ship it when it's ready.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
            <form
              className="mt-7 space-y-4"
              id="form-create"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="form-create-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your blog title"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-description">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-create-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Write a brief description of your blog"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-category">
                      Category
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-create-category"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your blog category"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-content">
                      Content
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-create-content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your blog content"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="thumbnail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-thumbnail">
                      Thumbnail
                    </FieldLabel>
                    <Input
                      id="form-create-thumbnail"
                      aria-invalid={fieldState.invalid}
                      placeholder="Choose your blog thumbnail"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                form="form-create"
                type="submit"
                className="w-full gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-11"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Publish"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CreateBlog;