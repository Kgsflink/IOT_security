"use client"

import { Bot, ShieldCheck, AlertCircle, Radio, Network } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

const logs = [
  {
    id: 1,
    timestamp: "2025-12-30 14:45:10",
    agent: "Sentry-Guard-01",
    action: "VLAN Isolation",
    description: "Detected unauthorized brute force on 'Smart-Lock'. Isolated Segment-B to prevent lateral spread.",
    type: "mitigation",
    status: "active",
  },
  {
    id: 2,
    timestamp: "2025-12-30 14:42:15",
    agent: "Trap-Deployer",
    action: "Shadow Deployment",
    description: "Successfully instantiated 'Fake-NAS-Storage' honeypot following suspicious broadcast traffic.",
    type: "deception",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2025-12-30 14:38:02",
    agent: "Net-Watcher",
    action: "Port Scan Detected",
    description: "External IP 104.22.5.18 identified performing SYN stealth scan across port 80/443.",
    type: "detection",
    status: "warning",
  },
  {
    id: 4,
    timestamp: "2025-12-30 14:30:05",
    agent: "Sentry-Guard-02",
    action: "DNS Sinkhole",
    description: "Redirected 4 malicious domain requests from 'Smart-TV' to internal Chaukidar sinkhole.",
    type: "mitigation",
    status: "success",
  },
  {
    id: 5,
    timestamp: "2025-12-30 14:15:44",
    agent: "Patch-Bot",
    action: "Firmware Check",
    description: "Completed audit for 5 kitchen appliances. Patch-level compliance at 100%.",
    type: "maintenance",
    status: "success",
  },
]

export function AgenticLogs() {
  const [activeLogs, setActiveLogs] = useState(logs)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLog = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          agent: "Sentry-AI",
          action: "Autonomous Scan",
          description: "Periodic scan completed. No new vulnerabilities found in encrypted segments.",
          type: "maintenance" as const,
          status: "success" as const,
        }
        setActiveLogs((prev) => [newLog, ...prev.slice(0, 9)])
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-primary/5 bg-card/30 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="size-5 text-primary animate-pulse" />
            <div>
              <CardTitle>Sentry Intelligence Feed</CardTitle>
              <CardDescription>Autonomous AI response and mitigation history.</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] px-2 border-primary/20 text-primary">
            REALTIME_INTEL
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-[500px]">
          <div className="px-6 py-4 space-y-6">
            {activeLogs.map((log, index) => (
              <div key={log.id} className="relative pl-6 space-y-2">
                {index !== activeLogs.length - 1 && (
                  <div className="absolute left-[3px] top-6 bottom-[-24px] w-[1px] bg-border/40" />
                )}
                <div
                  className={`absolute left-0 top-1.5 size-2 rounded-full ring-4 ring-background ${
                    log.status === "success"
                      ? "bg-chart-3"
                      : log.status === "warning"
                        ? "bg-accent"
                        : log.status === "active"
                          ? "bg-destructive animate-pulse"
                          : "bg-muted"
                  }`}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{log.timestamp}</span>
                    <Separator orientation="vertical" className="h-3" />
                    <span className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
                      <Bot className="size-3" /> {log.agent}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[9px] uppercase border-primary/10 bg-primary/5 text-primary tracking-tighter"
                  >
                    {log.type}
                  </Badge>
                </div>

                <div className="bg-secondary/40 border border-primary/5 rounded-lg p-3 space-y-1.5 group hover:border-primary/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold flex items-center gap-2">
                      {log.type === "mitigation" ? (
                        <Network className="size-3.5 text-destructive" />
                      ) : log.status === "warning" ? (
                        <AlertCircle className="size-3.5 text-accent" />
                      ) : (
                        <ShieldCheck className="size-3.5 text-chart-3" />
                      )}
                      {log.action}
                    </p>
                    {log.status === "active" && (
                      <span className="text-[10px] text-destructive font-bold animate-pulse">ACTION_REQUIRED</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
