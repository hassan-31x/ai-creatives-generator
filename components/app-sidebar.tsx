"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Sparkles, 
  PlusCircle, 
  Settings, 
  ImageIcon, 
  TextIcon,
  BarChart3,
  Lightbulb,
  HelpCircle
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Submit Product",
      icon: PlusCircle,
      href: "/submit",
    },
    // {
    //   label: "My Creatives",
    //   icon: Sparkles,
    //   href: "/creatives",
    // },
    {
      label: "Image Gallery",
      icon: ImageIcon,
      href: "/submissions",
    },
    // {
    //   label: "Copy Library",
    //   icon: TextIcon,
    //   href: "/copy",
    // },
    // {
    //   label: "Analytics",
    //   icon: BarChart3,
    //   href: "/analytics",
    // },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">AI Creatives</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <Link href={route.href} passHref legacyBehavior>
                  <SidebarMenuButton 
                    isActive={pathname === route.href}
                    className={cn(
                      pathname === route.href ? "bg-muted" : "hover:bg-muted/50"
                    )}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    <span>{route.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Help & Support</span>
          </div>
          <div className="text-xs text-muted-foreground">v1.0.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}