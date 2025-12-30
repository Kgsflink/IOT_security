"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Shield, Zap, Target, Globe } from "lucide-react"
import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const generateThreatData = () => {
  const now = Date.now()
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now - (19 - i) * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    threats: Math.floor(Math.random() * 50) + 20,
    blocked: Math.floor(Math.random() * 45) + 15,
    honeypot: Math.floor(Math.random() * 30) + 10,
  }))
}

const chartConfig = {
  threats: {
    label: "Threats Detected",
    color: "hsl(var(--chart-1))",
  },
  blocked: {
    label: "Auto-Blocked",
    color: "hsl(var(--chart-3))",
  },
  honeypot: {
    label: "Honeypot Engagements",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ThreatAnalyticsPro() {
  const [chartData, setChartData] = useState(generateThreatData())
  const [liveStats, setLiveStats] = useState({
    activeThreats: 12,
    blockedIps: 284,
    avgResponseTime: 42,
    detectionRate: 98.6,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          threats: Math.floor(Math.random() * 50) + 20,
          blocked: Math.floor(Math.random() * 45) + 15,
          honeypot: Math.floor(Math.random() * 30) + 10,
        })
        return newData
      })

      setLiveStats({
        activeThreats: Math.floor(Math.random() * 20) + 5,
        blockedIps: Math.floor(Math.random() * 50) + 270,
        avgResponseTime: Math.floor(Math.random() * 20) + 35,
        detectionRate: 97 + Math.random() * 2,
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="size-5 text-destructive" />
              <Badge variant="destructive" className="text-xs font-mono">
                LIVE
              </Badge>
            </div>
            <p className="text-2xl font-bold tabular-nums">{liveStats.activeThreats}</p>
            <p className="text-xs text-muted-foreground font-medium">Active Threats</p>
          </CardContent>
        </Card>

        <Card className="border-chart-3/20 bg-chart-3/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="size-5 text-chart-3" />
              <TrendingUp className="size-4 text-chart-3" />
            </div>
            <p className="text-2xl font-bold tabular-nums">{liveStats.blockedIps}</p>
            <p className="text-xs text-muted-foreground font-medium">IPs Blocked (24h)</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="size-5 text-primary" />
              <Badge variant="outline" className="text-xs font-mono border-primary/30">
                {liveStats.avgResponseTime}ms
              </Badge>
            </div>
            <p className="text-2xl font-bold tabular-nums">AI Agent</p>
            <p className="text-xs text-muted-foreground font-medium">Response Time</p>
          </CardContent>
        </Card>

        <Card className="border-chart-4/20 bg-chart-4/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="size-5 text-chart-4" />
              <Globe className="size-4 text-chart-4" />
            </div>
            <p className="text-2xl font-bold tabular-nums">{liveStats.detectionRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground font-medium">Detection Accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Threat Intelligence Timeline</CardTitle>
              <CardDescription>Real-time monitoring of detection, blocking, and deception metrics</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <div className="size-2 rounded-full bg-chart-3 animate-pulse" />
              <span className="text-xs font-mono">LIVE DATA</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHoneypot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="time"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorThreats)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="hsl(var(--chart-3))"
                fillOpacity={1}
                fill="url(#colorBlocked)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="honeypot"
                stroke="hsl(var(--chart-4))"
                fillOpacity={1}
                fill="url(#colorHoneypot)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
