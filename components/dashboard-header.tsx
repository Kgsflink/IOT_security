"use client"

import { Eye, Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onLogout?: () => Promise<void>
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Eye className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Chaukidar</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">The Digital Sentry</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-background" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
          <div className="h-8 w-px bg-border mx-2" />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-secondary hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={onLogout}
            title="Sign Out"
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
