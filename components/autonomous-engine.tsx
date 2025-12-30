"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Zap, AlertTriangle, CheckCircle2, Activity } from "lucide-react"
import { networkService, type ThreatPattern } from "@/lib/network-service"

export function AutonomousEngine() {
  const [threats, setThreats] = useState<ThreatPattern[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [autoMitigationEnabled, setAutoMitigationEnabled] = useState(true)

  useEffect(() => {
    // Initial threat detection
    networkService.detectThreats().then(setThreats)

    // Periodic threat scanning
    const interval = setInterval(async () => {
      const detected = await networkService.detectThreats()
      setThreats(detected)

      // Auto-mitigate if enabled
      if (autoMitigationEnabled) {
        const unmitigated = detected.filter((t) => !t.blocked)
        for (const threat of unmitigated) {
          await networkService.autoMitigate(threat.id)
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [autoMitigationEnabled])

  const handleManualScan = async () => {
    setIsScanning(true)
    const detected = await networkService.detectThreats()
    setThreats(detected)
    setIsScanning(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
    }
  }

  const getThreatLabel = (type: string) => {
    switch (type) {
      case "port-scan":
        return "Port Scanning"
      case "brute-force":
        return "Brute Force Attack"
      case "data-exfil":
        return "Data Exfiltration"
      case "lateral-movement":
        return "Lateral Movement"
      case "anomalous-traffic":
        return "Anomalous Traffic"
      default:
        return type
    }
  }

  return (
    <Card className="border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            Autonomous Mitigation Engine
          </CardTitle>
          <CardDescription>Real-time threat detection and automated response system</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={autoMitigationEnabled ? "default" : "outline"}
            onClick={() => setAutoMitigationEnabled(!autoMitigationEnabled)}
            className="gap-2"
          >
            <Shield className="size-4" />
            {autoMitigationEnabled ? "Auto ON" : "Auto OFF"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleManualScan}
            disabled={isScanning}
            className="gap-2 bg-transparent"
          >
            <Activity className={`size-4 ${isScanning ? "animate-spin" : ""}`} />
            Scan Now
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {threats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <CheckCircle2 className="size-12 text-chart-3 mb-4" />
                <p className="text-sm font-medium text-muted-foreground">No active threats detected</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Network is secure</p>
              </div>
            ) : (
              threats.map((threat) => (
                <div
                  key={threat.id}
                  className="p-4 rounded-lg border border-primary/10 bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <AlertTriangle className="size-4 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{getThreatLabel(threat.type)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(threat.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${getSeverityColor(threat.severity)} font-bold uppercase`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Mitigation:</span>
                      <span className="font-medium text-primary">{threat.mitigationAction}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className={
                          threat.blocked
                            ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }
                      >
                        {threat.blocked ? "Mitigated" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
