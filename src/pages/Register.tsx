import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance2 } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Eye, EyeOff, PenLine } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(50, "Password must be at most 50 characters."),
});

function Register() {
  const [show, setShow] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      await axiosInstance2.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("register success");

      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong!");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen flex hero-bg">
      <div className="flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary shadow-glow">
              <PenLine className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Inkwell
            </span>
          </Link>

          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur p-8 shadow-card">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Sign up to keep reading where you left off.
            </p>

            <form
              className="mt-7 space-y-4"
              id="form-register"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-register-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your name"
                      autoComplete="on"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-register-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@domain.com"
                      autoComplete="on"
                      className="py-5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-password">
                      Password
                    </FieldLabel>

                    <div className="relative mt-1.5">
                      <Input
                        {...field}
                        id="form-register-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••••"
                        className="py-5"
                        type={show ? "text" : "password"}
                      />

                      <button
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground"
                      >
                        {show ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                form="form-register"
                type="submit"
                className="w-full gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-11"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Sign In"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              ← Back to stories
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
