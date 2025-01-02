"use client";

import Link from "next/link";
import { MoreHorizontal, Share, Trash2, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";

interface NavProjectsProps {
  projects?: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavProjects({ projects }: NavProjectsProps) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!projects?.length) {
    return null;
  }

  if (!mounted) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {projects.map((project, index) => (
            <SidebarMenuItem key={index}>
              <div className="relative flex w-full">
                <SidebarMenuButton>
                  <project.icon className="size-4" />
                  {project.name}
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((project, index) => {
          const Icon = project.icon;
          const isActive = pathname === project.url;

          return (
            <SidebarMenuItem key={index}>
              <div className="relative flex w-full">
                <Link href={project.url} passHref legacyBehavior>
                  <SidebarMenuButton isActive={isActive}>
                    <Icon className="size-4" />
                    {project.name}
                  </SidebarMenuButton>
                </Link>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="size-4 cursor-pointer rounded-sm opacity-60 hover:bg-sidebar-foreground/5 hover:opacity-100">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">More</span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side={isMobile ? "bottom" : "right"}
                      align="start"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="sr-only">
                        Actions available for {project.name} project
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Share className="mr-2 size-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
