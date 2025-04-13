"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAlert } from "~/components/providers/alert-provider";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { showAlert } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the login form submission.
   * @param formData - The form data to be submitted.
   */
  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const emailValue = formData.get("email");
      const passwordValue = formData.get("password");

      const email = typeof emailValue === "string" ? emailValue : undefined;
      const password =
        typeof passwordValue === "string" ? passwordValue : undefined;

      if (!email || !password) {
        showAlert({
          title: "Missing credentials!",
          description: "Please provide both email and password.",
          type: "destructive",
        });
        setIsLoading(false);
        return;
      }

      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error === "CredentialsSignin") {
        showAlert({
          title: "Invalid credentials!",
          description: "Please check your username and password and try again.",
          type: "destructive",
        });
        setIsLoading(false);
      } else if (!result?.error) {
        // Use router.push for client-side navigation
        router.push(callbackUrl ?? "/");
        router.refresh();
      }
    } catch (error) {
      setIsLoading(false);
      if (!isRedirectError(error)) {
        showAlert({
          title: "Something went wrong!",
          description: "Please try again later.",
          type: "destructive",
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-md">
                <Image
                  src="/waypoints.svg"
                  alt="Offlog logo"
                  width={96}
                  height={96}
                />
              </div>
              <span className="sr-only">Offlog</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Offlog</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email or Username"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                "Access"
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
