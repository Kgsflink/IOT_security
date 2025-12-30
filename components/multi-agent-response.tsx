"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Brain, Zap, Eye, Shield, Network, Target, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AgentStatus {
  id: string
  name: string
  type: "detection" | "analysis" | "response" | "deception" | "forensics"
  status: "active" | "idle" | "processing"
  icon: any
  color: string
  tasksCompleted: number
  accuracy: number
  enabled: boolean
  description: string
}

const initialAgents: AgentStatus[] = [
  {
    id: "1",
    name: "Sentinel Agent",
    type: "detection",
    status: "active",
    icon: Eye,
    color: "text-chart-1",
    tasksCompleted: 1284,
    accuracy: 98.2,
    enabled: true,
    description: "Real-time network traffic anomaly detection",
  },
  {
    id: "2",
    name: "Analyst Agent",
    type: "analysis",
    status: "processing",
    icon: Brain,
    color: "text-chart-3",
    tasksCompleted: 856,
    accuracy: 96.8,
    enabled: true,
    description: "Deep packet inspection and behavioral analysis",
  },
  {
    id: "3",
    name: "Guardian Agent",
    type: "response",
    status: "idle",
    icon: Shield,
    color: "text-primary",
    tasksCompleted: 542,
    accuracy: 99.1,
    enabled: true,
    description: "Autonomous threat mitigation and isolation",
  },
  {
    id: "4",
    name: "Phantom Agent",
    type: "deception",
    status: "active",
    icon: Target,
    color: "text-chart-4",
    tasksCompleted: 328,
    accuracy: 94.5,
    enabled: true,
    description: "Honeypot deployment and attacker misdirection",
  },
  {
    id: "5",
    name: "Forensic Agent",
    type: "forensics",
    status: "idle",
    icon: Network,
    color: "text-chart-5",
    tasksCompleted: 167,
    accuracy: 97.3,
    enabled: true,
    description: "Post-incident analysis and evidence collection",
  },
]

export function MultiAgentResponse() {
  const [agents, setAgents] = useState<AgentStatus[]>(initialAgents)
  const [systemLoad, setSystemLoad] = useState(42)
  const [autoMode, setAutoMode] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          if (!agent.enabled) return agent

          const statuses: AgentStatus["status"][] = ["active", "idle", "processing"]
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
          const taskIncrement = agent.status === "active" ? Math.floor(Math.random() * 3) : 0

          return {
            ...agent,
            status: randomStatus,
            tasksCompleted: agent.tasksCompleted + taskIncrement,
            accuracy: Math.min(99.9, agent.accuracy + (Math.random() - 0.5) * 0.2),
          }
        }),
      )
      setSystemLoad(Math.max(20, Math.min(85, systemLoad + (Math.random() - 0.5) * 10)))
    }, 5000)

    return () => clearInterval(interval)
  }, [systemLoad])

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === id ? { ...agent, enabled: !agent.enabled, status: "idle" } : agent)),
    )
  }

  const activeAgents = agents.filter((a) => a.enabled).length
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0)

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Brain className="size-5 text-primary" />
                Multi-Agent Coordination System
              </h3>
              <p className="text-sm text-muted-foreground">5 AI agents working in parallel for defense-in-depth</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">System Load</p>
                <p className="text-2xl font-bold tabular-nums">{systemLoad.toFixed(0)}%</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Auto Response</span>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </div>
          </div>
          <Progress value={systemLoad} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={`border-${agent.enabled ? "primary/20" : "muted"} transition-all ${agent.enabled && agent.status === "active" ? "ring-1 ring-primary/20" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`p-3 rounded-xl ${agent.enabled ? "bg-primary/10" : "bg-muted"} border ${agent.enabled ? "border-primary/20" : "border-muted"} relative`}
                  >
                    <agent.icon className={`size-6 ${agent.enabled ? agent.color : "text-muted-foreground"}`} />
                    {agent.enabled && agent.status === "active" && (
                      <div className="absolute -top-1 -right-1">
                        <div className="size-3 rounded-full bg-chart-3 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{agent.name}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          agent.status === "active"
                            ? "border-chart-3/30 text-chart-3"
                            : agent.status === "processing"
                              ? "border-amber-500/30 text-amber-500"
                              : "border-muted"
                        }`}
                      >
                        {agent.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Tasks Completed</p>
                    <p className="text-xl font-bold tabular-nums">{agent.tasksCompleted.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-xl font-bold tabular-nums text-chart-3">{agent.accuracy.toFixed(1)}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={agent.enabled} onCheckedChange={() => toggleAgent(agent.id)} />
                    <span className="text-xs text-muted-foreground w-16">{agent.enabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-chart-3/20 bg-chart-3/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="size-6 text-chart-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Multi-Agent Performance</p>
                <p className="text-2xl font-bold">
                  {activeAgents} / {agents.length} Active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">Total Tasks Completed</p>
                <p className="text-3xl font-bold tabular-nums text-chart-3">{totalTasks.toLocaleString()}</p>
              </div>
              <Button variant="default" size="lg" className="gap-2">
                <Zap className="size-4" />
                Deploy All Agents
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
