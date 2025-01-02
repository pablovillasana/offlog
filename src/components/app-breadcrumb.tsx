"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

// Map of paths to their display names
const pathMap: Record<string, string> = {
  "": "Dashboard",
  maintenance: "Maintenance",
  vehicles: "Vehicles",
  enduro: "Enduro",
  motocross: "Motocross",
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              {pathMap[""] ?? "Dashboard"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      {pathMap[path] ??
                        path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {pathMap[path] ??
                        path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
