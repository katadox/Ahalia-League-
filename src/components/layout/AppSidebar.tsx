
import { Trophy, Calendar, Users, ClipboardList, Home, ShieldCheck, BarChart } from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Tournaments",
    path: "/tournaments",
    icon: Trophy,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: Users,
  },
  {
    title: "Matches",
    path: "/matches",
    icon: Calendar,
  },
  {
    title: "Results",
    path: "/results",
    icon: ClipboardList,
  },
  {
    title: "Leaderboards",
    path: "/leaderboards",
    icon: BarChart,
  },
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="text-center py-4">
        <div className="flex items-center justify-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div className="font-bold text-xl">Ahalia Leagues</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive && "bg-sidebar-accent text-primary"
                      )}
                    >
                      <a href={item.path}>
                        <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-4">
        <div className="text-xs text-muted-foreground text-center">
          Ahalia Tournament Manager v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
