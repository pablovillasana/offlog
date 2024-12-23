import { signIn } from "~/auth";
import { db } from "~/server/db";
import { AuthError } from "next-auth";
import type { User, Vehicle } from "~/server/db/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const users: User[] = await db.query.users.findMany();
  const vehicles: Vehicle[] = await db.query.vehicles.findMany({
    where: (vehicles, { eq }) => eq(vehicles.user_id, 1),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Offlog
        </h1>
        <div>
          {users.map((user: User) => (
            <div key={user.id}>
              {user.username} {user.email}
              {vehicles.map((vehicle) => (
                <div key={vehicle.id}>
                  {vehicle.name} {vehicle.brand} {vehicle.model}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
