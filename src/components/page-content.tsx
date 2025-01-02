"use client";

import { usePathname } from "next/navigation";

function MaintenanceContent() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Maintenance</h1>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="col-span-full rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h2 className="mb-4 text-lg font-semibold">Vehicle Maintenance</h2>
          <p className="text-muted-foreground">
            Track and manage maintenance tasks for your vehicles. Keep up with
            regular service intervals and parts replacement.
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

function VehiclesContent() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicles</h1>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="col-span-full rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h2 className="mb-4 text-lg font-semibold">Your Vehicles</h2>
          <p className="text-muted-foreground">
            Manage and track all your vehicles in one place. Add new vehicles,
            view details, and monitor their status.
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Genesis</h3>
          <p className="text-muted-foreground text-sm">
            View vehicle details and history
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Explorer</h3>
          <p className="text-muted-foreground text-sm">
            View vehicle details and history
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Quantum</h3>
          <p className="text-muted-foreground text-sm">
            View vehicle details and history
          </p>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Quick Stats</h3>
          <p className="text-muted-foreground text-sm">
            Overview of your vehicles and maintenance
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="text-muted-foreground text-sm">
            Latest updates and changes
          </p>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
          <h3 className="font-semibold">Upcoming</h3>
          <p className="text-muted-foreground text-sm">
            Scheduled maintenance and events
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50">
        <h2 className="mb-4 text-lg font-semibold">Activity Feed</h2>
        <p className="text-muted-foreground">
          Your recent activity will appear here.
        </p>
      </div>
    </div>
  );
}

export function PageContent() {
  const pathname = usePathname();

  // Return different content based on the current route
  switch (pathname) {
    case "/maintenance":
      return <MaintenanceContent />;
    case "/vehicles":
      return <VehiclesContent />;
    default:
      return <HomeContent />;
  }
}
