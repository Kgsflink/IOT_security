"use client"

import { useState, useEffect } from "react"
import { ShieldAlert, Fingerprint, Target, Zap, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Metric {
  label: string
  value: string
  change: string
  icon: any
  color: string
  trend: "up" | "down" | "stable"
}

export function SecurityMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Total Incidents Prevented",
      value: "1,284",
      change: "+12%",
      icon: ShieldAlert,
      color: "text-primary",
      trend: "up",
    },
    {
      label: "Active Shadow Traps",
      value: "12",
      change: "Stable",
      icon: Target,
      color: "text-chart-3",
      trend: "stable",
    },
    {
      label: "Deception Efficiency",
      value: "94.2%",
      change: "+2.1%",
      icon: Fingerprint,
      color: "text-chart-4",
      trend: "up",
    },
    {
      label: "AI Response Time",
      value: "45ms",
      change: "-5ms",
      icon: Zap,
      color: "text-chart-5",
      trend: "down",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric, idx) => {
          if (idx === 0) {
            const current = Number.parseInt(metric.value.replace(/,/g, ""))
            const newValue = current + Math.floor(Math.random() * 5)
            return { ...metric, value: newValue.toLocaleString() }
          }
          if (idx === 3) {
            const current = Number.parseInt(metric.value.replace("ms", ""))
            const newValue = Math.max(40, Math.min(50, current + Math.floor(Math.random() * 3) - 1))
            return { ...metric, value: `${newValue}ms` }
          }
          return metric
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 duration-300"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-secondary/50 backdrop-blur-sm`}>
                <metric.icon className={`size-5 ${metric.color}`} />
              </div>
              <div className="flex items-center gap-1">
                {metric.trend === "up" && <TrendingUp className="size-3 text-chart-3" />}
                {metric.trend === "down" && <TrendingDown className="size-3 text-primary" />}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.change.startsWith("+")
                      ? "bg-chart-3/10 text-chart-3"
                      : metric.change.startsWith("-")
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight tabular-nums">{metric.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
