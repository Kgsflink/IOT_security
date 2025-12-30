"use client"

import { Shield, Smartphone, Laptop, Tv, Cpu, Search, ShieldCheck, AlertCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { networkService, type IoTDevice } from "@/lib/network-service"

const deviceTypeIcons = {
  camera: Tv,
  "smart-plug": Cpu,
  thermostat: Cpu,
  hub: Shield,
  laptop: Laptop,
  phone: Smartphone,
  unknown: Search,
}

export function DeviceManagement() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [devices, setDevices] = useState<IoTDevice[]>([])

  useEffect(() => {
    networkService.scanNetwork().then(setDevices)
  }, [])

  const handleScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 95 ? 95 : prev + 5))
    }, 100)

    const updatedDevices = await networkService.scanNetwork()
    clearInterval(interval)
    setScanProgress(100)
    setTimeout(() => {
      setDevices(updatedDevices)
      setIsScanning(false)
    }, 500)
  }

  const handleBlockToggle = async (id: string, currentStatus: string) => {
    if (currentStatus === "blocked") {
      await networkService.unblockDevice(id)
    } else {
      await networkService.blockDevice(id)
    }
    const updated = await networkService.scanNetwork()
    setDevices(updated)
  }

  const handleDeceptionToggle = async (id: string) => {
    await networkService.toggleDeception(id)
    const updated = await networkService.scanNetwork()
    setDevices(updated)
  }

  return (
    <Card className="border-primary/5 bg-card/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-2xl">IoT Asset Inventory</CardTitle>
          <CardDescription>
            Real-time fingerprinting and vulnerability assessment of connected hardware.
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          {isScanning && (
            <div className="w-48 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span>Fingerprinting...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-1" />
            </div>
          )}
          <Button size="sm" onClick={handleScan} disabled={isScanning} className="gap-2 bg-primary hover:bg-primary/90">
            <Search className={`size-4 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Scanning..." : "Deep Scan Network"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead className="w-[300px]">Device & Fingerprint</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Protection Status</TableHead>
              <TableHead>Shadow Mode</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => {
              const Icon = deviceTypeIcons[device.type] || Search
              return (
                <TableRow key={device.id} className="border-primary/5 hover:bg-primary/5 transition-colors group">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary p-2.5 rounded-xl border border-primary/10 group-hover:border-primary/30 transition-colors">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold tracking-tight">{device.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                            {device.type}
                          </span>
                          <span className="text-[10px] text-primary font-mono">{device.mac}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{device.ip}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {device.riskLevel === "low" ? (
                        <ShieldCheck className="size-3.5 text-chart-3" />
                      ) : (
                        <AlertCircle
                          className={`size-3.5 ${device.riskLevel === "high" || device.riskLevel === "critical" ? "text-destructive" : "text-accent"}`}
                        />
                      )}
                      <span
                        className={`text-xs font-bold capitalize ${
                          device.riskLevel === "low"
                            ? "text-chart-3"
                            : device.riskLevel === "high" || device.riskLevel === "critical"
                              ? "text-destructive"
                              : "text-accent"
                        }`}
                      >
                        {device.riskLevel}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        device.status === "blocked"
                          ? "bg-destructive/10 text-destructive border-destructive/20 font-bold"
                          : "bg-chart-3/10 text-chart-3 border-chart-3/20 font-bold"
                      }
                    >
                      {device.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={device.deceptionActive}
                        onCheckedChange={() => handleDeceptionToggle(device.id)}
                      />
                      <span className="text-xs font-mono text-muted-foreground">
                        {device.deceptionActive ? "ON" : "OFF"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-[10px] font-bold uppercase ${device.status === "blocked" ? "text-chart-3" : "text-destructive"}`}
                      onClick={() => handleBlockToggle(device.id, device.status)}
                    >
                      {device.status === "blocked" ? "Unblock" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
