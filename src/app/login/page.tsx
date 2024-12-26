import { LoginForm } from "~/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offlog Login",
  description: "Offlog Login page",
};

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
