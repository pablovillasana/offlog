import { AuthError } from "next-auth";
import { signIn } from "~/auth";

export default function LoginPage() {
  return (
    <div>
        <form
          action={async (formData) => {
            "use server";
            try { 
              await signIn("credentials", formData, {
                redirectTo: "/",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                // Handle auth errors
                //throw error; // Rethrow all other errors
              }
            }
          }}
        >
          <label>
            Email
            <input className="text-black" name="email" type="email" />
          </label>
          <label>
            Password
            <input className="text-black" name="password" type="password" />
          </label>
          <button>Sign In</button>
        </form>
    </div>
  );
}
