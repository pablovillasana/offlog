"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";

interface NavMainProps {
  items?: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!items?.length) {
    return null;
  }

  if (!mounted) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <item.icon className="size-4" />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;
          const hasSubItems = item.items && item.items.length > 0;

          return (
            <SidebarMenuItem key={index}>
              {hasSubItems ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <div className="relative flex w-full">
                      <SidebarMenuButton isActive={isActive}>
                        <Icon className="size-4" />
                        {item.title}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <ChevronRight className="size-4" />
                        </div>
                      </SidebarMenuButton>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    <SidebarMenuSub>
                      <div className="sr-only">
                        Submenu items for {item.title}
                      </div>
                      {item.items?.map((subItem, subIndex) => {
                        const isSubActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subIndex}>
                            <Link href={subItem.url} passHref legacyBehavior>
                              <SidebarMenuSubButton isActive={isSubActive}>
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link href={item.url} passHref legacyBehavior>
                  <SidebarMenuButton isActive={isActive}>
                    <Icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
