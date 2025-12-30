"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { time: "08:00", threats: 45, deception: 32 },
  { time: "10:00", threats: 52, deception: 48 },
  { time: "12:00", threats: 38, deception: 35 },
  { time: "14:00", threats: 65, deception: 58 },
  { time: "16:00", threats: 48, deception: 44 },
  { time: "18:00", threats: 72, deception: 68 },
  { time: "20:00", threats: 55, deception: 52 },
]

const chartConfig = {
  threats: {
    label: "Threats Blocked",
    color: "var(--chart-1)",
  },
  deception: {
    label: "Deception Triggers",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ThreatCharts() {
  return (
    <Card className="border-primary/5 bg-card/30 lg:col-span-2">
      <CardHeader>
        <CardTitle>Threat Activity</CardTitle>
        <CardDescription>Frequency of blocked threats vs honeypot interactions (Last 12h).</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="threats" fill="var(--color-threats)" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="deception" fill="var(--color-deception)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
