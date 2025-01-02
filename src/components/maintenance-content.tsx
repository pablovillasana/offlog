"use client";

import { usePathname } from "next/navigation";

export function MaintenanceContent() {
  const pathname = usePathname();
  const isEnduro = pathname === "/maintenance/enduro";
  const isMotocross = pathname === "/maintenance/motocross";

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEnduro
            ? "Enduro Maintenance"
            : isMotocross
              ? "Motocross Maintenance"
              : "Maintenance"}
        </h1>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="col-span-full rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h2 className="mb-4 text-lg font-semibold">
            {isEnduro
              ? "Enduro Bike Maintenance"
              : isMotocross
                ? "Motocross Bike Maintenance"
                : "Vehicle Maintenance"}
          </h2>
          <p className="text-muted-foreground">
            {isEnduro
              ? "Track and manage maintenance tasks for your enduro bike. Keep up with regular service intervals and parts replacement."
              : isMotocross
                ? "Monitor and maintain your motocross bike's performance. Schedule services and track wear on critical components."
                : "Select a vehicle type to view and manage its maintenance schedule."}
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Next Service</h3>
          <p className="text-muted-foreground text-sm">
            Track upcoming maintenance tasks
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Parts History</h3>
          <p className="text-muted-foreground text-sm">
            View replaced parts and service history
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Service Intervals</h3>
          <p className="text-muted-foreground text-sm">
            Manage maintenance schedules
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
        <h2 className="mb-4 text-lg font-semibold">Maintenance Records</h2>
        <p className="text-muted-foreground">
          Your maintenance history will appear here.
        </p>
      </div>
    </div>
  );
}
