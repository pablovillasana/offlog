"use client";

import * as React from "react";
import {
  Bike,
  CalendarClock,
  Frame,
  Map,
  PieChart,
  Waypoints,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Maintenance",
      url: "/maintenance",
      icon: CalendarClock,
      isActive: true,
    },
    {
      title: "Vehicles",
      url: "/vehicles",
      icon: Bike,
      items: [
        {
          title: "Genesis",
          url: "/vehicles/genesis",
        },
        {
          title: "Explorer",
          url: "/vehicles/explorer",
        },
        {
          title: "Quantum",
          url: "/vehicles/quantum",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/projects/design",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/projects/sales",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/projects/travel",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const userData =
    status === "authenticated" && user
      ? {
          name: user.name ?? "User",
          email: user.email ?? "",
          avatar: "/avatars/shadcn.jpg",
        }
      : null;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Waypoints className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Offlog</span>
                  <span className="truncate text-xs">Offroad Logbook</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{userData && <NavUser user={userData} />}</SidebarFooter>
    </Sidebar>
  );
}
