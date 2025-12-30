"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SecurityMetrics } from "@/components/security-metrics"
import { DeviceManagement } from "@/components/device-management"
import { AgenticLogs } from "@/components/agentic-logs"
import { HoneypotManagement } from "@/components/honeypot-management"
import { NetworkTopology } from "@/components/network-topology"
import { AutonomousEngine } from "@/components/autonomous-engine"
import { RouterControl } from "@/components/router-control"
import { ThreatAnalyticsPro } from "@/components/threat-analytics-pro"
import { FirewallPro } from "@/components/firewall-pro"
import { MultiAgentResponse } from "@/components/multi-agent-response"
import { PortMonitorPro } from "@/components/port-monitor-pro"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle } from "lucide-react"
import { ProtectedRoute } from "@/lib/protected-route"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { signOut } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader onLogout={signOut} />
        <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 animate-pulse">
            <AlertTriangle className="size-4" />
            <AlertTitle>Intrusion Countermeasures Active</AlertTitle>
            <AlertDescription>
              Anomalous lateral movement detected in 'Media-Subnet'. Chaukidar AI has deployed shadow honeypots.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Chaukidar Pro Security Console</h2>
              <p className="text-muted-foreground">Enterprise IoT defense with multi-agent autonomous response</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20 px-3 py-1 gap-1.5">
                <span className="size-2 rounded-full bg-chart-3 animate-pulse" />
                All Systems Online
              </Badge>
              <Badge className="px-3 py-1 bg-primary">PRO v2.5.0</Badge>
            </div>
          </div>

          <SecurityMetrics />

          <ThreatAnalyticsPro />

          <Tabs defaultValue="devices" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
              <TabsTrigger value="firewall">Firewall</TabsTrigger>
              <TabsTrigger value="ports">Port Monitor</TabsTrigger>
              <TabsTrigger value="deception">Deception</TabsTrigger>
            </TabsList>

            <TabsContent value="devices" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NetworkTopology />
                <AutonomousEngine />
              </div>
              <DeviceManagement />
            </TabsContent>

            <TabsContent value="agents" className="space-y-6 mt-6">
              <MultiAgentResponse />
              <AgenticLogs />
            </TabsContent>

            <TabsContent value="firewall" className="space-y-6 mt-6">
              <FirewallPro />
              <RouterControl />
            </TabsContent>

            <TabsContent value="ports" className="space-y-6 mt-6">
              <PortMonitorPro />
            </TabsContent>

            <TabsContent value="deception" className="space-y-6 mt-6">
              <HoneypotManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
