"use client";

import Image from "next/image";

import { cn } from "~/lib/utils";
import { userLogin } from "~/server/api/auth";
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

  /**
   * Handles the login form submission.
   * @param formData - The form data to be submitted.
   */
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await userLogin(formData);
      if (result.error === "CredentialsSignin") {
        showAlert({
          title: "Invalid credentials!",
          description: "Please check your username and password and try again.",
          type: "destructive",
        });
      } else {
        router.push("/");
      }
    } catch (error) {
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
            <Button type="submit" className="w-full">
              Access
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
