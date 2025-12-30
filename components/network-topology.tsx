"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Smartphone, Tv, Camera, Shield } from "lucide-react"

interface TopologyNode {
  id: string
  name: string
  type: "router" | "device" | "honeypot"
  icon: any
  status: "secure" | "warning" | "critical"
  connections: string[]
}

export function NetworkTopology() {
  const [nodes, setNodes] = useState<TopologyNode[]>([
    {
      id: "router",
      name: "Main Router",
      type: "router",
      icon: Server,
      status: "secure",
      connections: ["device-1", "device-2", "device-3", "honeypot-1"],
    },
    {
      id: "device-1",
      name: "Smart TV",
      type: "device",
      icon: Tv,
      status: "secure",
      connections: [],
    },
    {
      id: "device-2",
      name: "Security Camera",
      type: "device",
      icon: Camera,
      status: "warning",
      connections: [],
    },
    {
      id: "device-3",
      name: "Mobile Phone",
      type: "device",
      icon: Smartphone,
      status: "secure",
      connections: [],
    },
    {
      id: "honeypot-1",
      name: "Shadow Trap (Fake Webcam)",
      type: "honeypot",
      icon: Shield,
      status: "critical",
      connections: [],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle>Network Topology</CardTitle>
        <CardDescription>Real-time visualization of connected devices and deception layers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-8">
          {/* Router (Central Node) */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className={`p-4 rounded-xl border-2 ${getStatusColor(nodes[0].status)} backdrop-blur-sm shadow-lg`}>
                <Server className="size-8" />
              </div>
              <div className="absolute -top-1 -right-1 size-3 rounded-full bg-chart-3 animate-pulse" />
            </div>
            <span className="text-sm font-medium">{nodes[0].name}</span>
          </div>

          {/* Connection Lines */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {nodes.slice(1).map((node, idx) => (
              <div key={node.id} className="flex flex-col items-center gap-3">
                <div className="h-12 w-px bg-gradient-to-b from-primary/30 to-transparent" />
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`p-3 rounded-lg border ${getStatusColor(node.status)} backdrop-blur-sm ${
                      node.type === "honeypot" ? "animate-pulse" : ""
                    }`}
                  >
                    <node.icon className="size-6" />
                  </div>
                  <span className="text-xs text-center font-medium">{node.name}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(node.status)}`}>
                    {node.status === "secure" && "Secure"}
                    {node.status === "warning" && "Monitoring"}
                    {node.status === "critical" && "Engaged"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
