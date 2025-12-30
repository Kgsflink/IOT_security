"use client"

import { ShieldAlert, Wifi, Terminal, Ghost, Plus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { toast } from "sonner"

interface Honeypot {
  name: string
  type: string
  status: "Broadcasting" | "Lurking" | "Interacting"
  threats: number
  interaction: string
  uptime: string
  load: number
}

const INITIAL_HONEYPOTS: Honeypot[] = [
  {
    name: "Virtual Smart Cam",
    type: "Media",
    status: "Broadcasting",
    threats: 24,
    interaction: "High",
    uptime: "14d 2h",
    load: 12,
  },
  {
    name: "Shadow Thermostat",
    type: "Appliance",
    status: "Lurking",
    threats: 8,
    interaction: "Low",
    uptime: "5d 12h",
    load: 5,
  },
  {
    name: "Fake SQL Gateway",
    type: "Infrastructure",
    status: "Interacting",
    threats: 142,
    interaction: "Critical",
    uptime: "22d 4h",
    load: 85,
  },
]

export function HoneypotManagement() {
  const [pots, setPots] = useState<Honeypot[]>(INITIAL_HONEYPOTS)

  const handleDeploy = () => {
    const newPot: Honeypot = {
      name: `Trap-${Math.floor(Math.random() * 1000)}`,
      type: "Virtual Asset",
      status: "Lurking",
      threats: 0,
      interaction: "Low",
      uptime: "0s",
      load: 0,
    }
    setPots([newPot, ...pots])
    toast.success("New shadow trap deployed successfully")
  }

  const handleAdjust = (name: string) => {
    setPots((prev) =>
      prev.map((p) => (p.name === name ? { ...p, status: "Interacting", load: Math.min(100, p.load + 15) } : p)),
    )
    toast.info(`Adjusting parameters for ${name}`)
  }

  return (
    <Card className="border-primary/5 bg-card/30">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Ghost className="size-5 text-primary" />
            <CardTitle>Deception Layer Control</CardTitle>
          </div>
          <CardDescription>Deploy and monitor virtual IoT honeypots to mislead attackers.</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/20 hover:bg-primary/10 bg-transparent"
          onClick={handleDeploy}
        >
          <Plus className="size-4" /> Deploy Shadow Trap
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {pots.map((hp) => (
          <div
            key={hp.name}
            className="group relative p-4 rounded-xl border border-primary/5 bg-secondary/20 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Wifi className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{hp.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{hp.type}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  hp.status === "Interacting"
                    ? "bg-accent/10 text-accent border-accent/20 animate-pulse"
                    : "bg-chart-3/10 text-chart-3 border-chart-3/20"
                }
              >
                {hp.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Probes</p>
                <p className="text-sm font-mono font-bold">{hp.threats}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Intel Gain</p>
                <p className="text-sm font-mono font-bold text-chart-3">{hp.interaction}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Uptime</p>
                <p className="text-sm font-mono font-bold">{hp.uptime}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>Engagement Load</span>
                <span>{hp.load}%</span>
              </div>
              <Progress value={hp.load} className="h-1.5" />
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="w-full text-[10px] font-bold uppercase h-8"
                onClick={() => toast.info(`Accessing encrypted intel from ${hp.name}`)}
              >
                <Terminal className="size-3 mr-2" /> View Intel
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-full text-[10px] font-bold uppercase h-8"
                onClick={() => handleAdjust(hp.name)}
              >
                <ShieldAlert className="size-3 mr-2" /> Adjust Trap
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
