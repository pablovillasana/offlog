import { db } from "~/server/db";

export default async function HomePage() {
  const users = await db.query.users.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Offlog
        </h1>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              {user.username} {user.email}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
