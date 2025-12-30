"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Activity, AlertTriangle, Lock, Unlock, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PortActivity {
  port: number
  protocol: "TCP" | "UDP"
  service: string
  status: "open" | "closed" | "filtered"
  connections: number
  bandwidth: string
  threat: "none" | "low" | "medium" | "high"
  blocked: boolean
}

const commonPorts: PortActivity[] = [
  {
    port: 22,
    protocol: "TCP",
    service: "SSH",
    status: "open",
    connections: 0,
    bandwidth: "0 KB/s",
    threat: "low",
    blocked: false,
  },
  {
    port: 80,
    protocol: "TCP",
    service: "HTTP",
    status: "open",
    connections: 45,
    bandwidth: "1.2 MB/s",
    threat: "none",
    blocked: false,
  },
  {
    port: 443,
    protocol: "TCP",
    service: "HTTPS",
    status: "open",
    connections: 123,
    bandwidth: "3.8 MB/s",
    threat: "none",
    blocked: false,
  },
  {
    port: 23,
    protocol: "TCP",
    service: "Telnet",
    status: "open",
    connections: 5,
    bandwidth: "128 KB/s",
    threat: "high",
    blocked: true,
  },
  {
    port: 3389,
    protocol: "TCP",
    service: "RDP",
    status: "filtered",
    connections: 2,
    bandwidth: "64 KB/s",
    threat: "medium",
    blocked: false,
  },
  {
    port: 445,
    protocol: "TCP",
    service: "SMB",
    status: "open",
    connections: 8,
    bandwidth: "512 KB/s",
    threat: "high",
    blocked: true,
  },
  {
    port: 8080,
    protocol: "TCP",
    service: "HTTP-Alt",
    status: "open",
    connections: 12,
    bandwidth: "256 KB/s",
    threat: "low",
    blocked: false,
  },
  {
    port: 53,
    protocol: "UDP",
    service: "DNS",
    status: "open",
    connections: 234,
    bandwidth: "892 KB/s",
    threat: "none",
    blocked: false,
  },
]

export function PortMonitorPro() {
  const [ports, setPorts] = useState<PortActivity[]>(commonPorts)
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPorts((prev) =>
        prev.map((port) => ({
          ...port,
          connections: Math.max(0, port.connections + Math.floor(Math.random() * 10 - 3)),
          bandwidth: `${(Math.random() * 5).toFixed(1)} ${Math.random() > 0.5 ? "MB/s" : "KB/s"}`,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleScan = async () => {
    setScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 95 ? 95 : prev + 5))
    }, 100)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearInterval(interval)
    setScanProgress(100)
    setTimeout(() => setScanning(false), 500)
  }

  const toggleBlock = (port: number) => {
    setPorts((prev) => prev.map((p) => (p.port === port ? { ...p, blocked: !p.blocked } : p)))
  }

  const openPorts = ports.filter((p) => p.status === "open" && !p.blocked).length
  const blockedPorts = ports.filter((p) => p.blocked).length
  const highThreatPorts = ports.filter((p) => (p.threat === "high" || p.threat === "medium") && !p.blocked).length

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Real-Time Port Activity Monitor
            </CardTitle>
            <CardDescription>Hardware-level port scanning and connection tracking</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Unlock className="size-3 text-chart-3" />
                <span className="text-xs font-mono">{openPorts} Open</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 border-destructive/30">
                <Lock className="size-3 text-destructive" />
                <span className="text-xs font-mono">{blockedPorts} Blocked</span>
              </Badge>
              {highThreatPorts > 0 && (
                <Badge variant="destructive" className="gap-1.5 animate-pulse">
                  <AlertTriangle className="size-3" />
                  <span className="text-xs font-mono">{highThreatPorts} Threats</span>
                </Badge>
              )}
            </div>
            {scanning && (
              <div className="w-40">
                <Progress value={scanProgress} className="h-2" />
              </div>
            )}
            <Button size="sm" onClick={handleScan} disabled={scanning} className="gap-2">
              <RefreshCw className={`size-4 ${scanning ? "animate-spin" : ""}`} />
              {scanning ? "Scanning..." : "Deep Scan"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead>Port</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Connections</TableHead>
              <TableHead>Bandwidth</TableHead>
              <TableHead>Threat Level</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ports.map((port) => (
              <TableRow
                key={`${port.port}-${port.protocol}`}
                className={`border-primary/5 hover:bg-primary/5 transition-colors ${port.threat === "high" && !port.blocked ? "bg-destructive/5" : ""}`}
              >
                <TableCell className="font-mono font-bold">{port.port}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-mono">
                    {port.protocol}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{port.service}</TableCell>
                <TableCell>
                  <Badge
                    variant={port.status === "open" ? "default" : port.status === "closed" ? "secondary" : "outline"}
                    className="text-xs font-bold"
                  >
                    {port.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm tabular-nums">
                  <div className="flex items-center gap-2">
                    {port.connections > 50 && <Activity className="size-3 text-amber-500 animate-pulse" />}
                    {port.connections}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">{port.bandwidth}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {port.threat === "high" && <AlertTriangle className="size-4 text-destructive" />}
                    {port.threat === "medium" && <AlertTriangle className="size-4 text-amber-500" />}
                    <span
                      className={`text-xs font-bold uppercase ${
                        port.threat === "high"
                          ? "text-destructive"
                          : port.threat === "medium"
                            ? "text-amber-500"
                            : port.threat === "low"
                              ? "text-chart-4"
                              : "text-chart-3"
                      }`}
                    >
                      {port.threat}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs font-bold ${port.blocked ? "text-chart-3" : "text-destructive"}`}
                    onClick={() => toggleBlock(port.port)}
                  >
                    {port.blocked ? (
                      <>
                        <Unlock className="size-3 mr-1" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <Lock className="size-3 mr-1" />
                        Block
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
