import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center h-16 px-4 border-b bg-white/50 backdrop-blur-sm">
            <SidebarTrigger />
            <div className="ml-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">AI Creatives</span> / Dashboard
            </div>
            <div className="ml-auto flex items-center space-x-2">
              {/* Add user profile or other header elements here */}
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

export default MainLayout