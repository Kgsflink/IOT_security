"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Router, Lock, Shield, Zap, Globe, Network, AlertTriangle, Settings2 } from "lucide-react"

interface RouterConfig {
  firewallEnabled: boolean
  upnpEnabled: boolean
  macFilteringEnabled: boolean
  dhcpEnabled: boolean
  wanAccessEnabled: boolean
}

export function RouterControl() {
  const [routerConfig, setRouterConfig] = useState<RouterConfig>({
    firewallEnabled: true,
    upnpEnabled: false,
    macFilteringEnabled: true,
    dhcpEnabled: true,
    wanAccessEnabled: false,
  })

  const [blockedPorts, setBlockedPorts] = useState<number[]>([23, 445, 3389])
  const [newPort, setNewPort] = useState("")
  const [isApplying, setIsApplying] = useState(false)

  const handleToggle = (key: keyof RouterConfig) => {
    setRouterConfig((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddPort = () => {
    const port = Number.parseInt(newPort)
    if (port > 0 && port < 65536 && !blockedPorts.includes(port)) {
      setBlockedPorts((prev) => [...prev, port].sort((a, b) => a - b))
      setNewPort("")
    }
  }

  const handleRemovePort = (port: number) => {
    setBlockedPorts((prev) => prev.filter((p) => p !== port))
  }

  const handleApplyConfig = async () => {
    setIsApplying(true)
    console.log("[v0] Applying router configuration:", routerConfig, "Blocked ports:", blockedPorts)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsApplying(false)
  }

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Router className="size-5 text-primary" />
          Hardware-Level Router Control
        </CardTitle>
        <CardDescription>Direct management of network gateway security policies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Status */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-chart-3/5 border border-chart-3/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-3/20">
              <Shield className="size-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm font-bold">Router Security Status</p>
              <p className="text-xs text-muted-foreground">All critical protections active</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20 font-bold">
            SECURE
          </Badge>
        </div>

        <Separator />

        {/* Firewall Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Settings2 className="size-4 text-primary" />
            Security Policies
          </h3>

          <div className="space-y-3">
            {/* Firewall Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="size-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Hardware Firewall</p>
                  <p className="text-xs text-muted-foreground">Block unauthorized incoming connections</p>
                </div>
              </div>
              <Switch checked={routerConfig.firewallEnabled} onCheckedChange={() => handleToggle("firewallEnabled")} />
            </div>

            {/* UPnP Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">UPnP Protocol</p>
                  <p className="text-xs text-muted-foreground">Allow automatic port forwarding (risk: high)</p>
                </div>
              </div>
              <Switch checked={routerConfig.upnpEnabled} onCheckedChange={() => handleToggle("upnpEnabled")} />
            </div>

            {/* MAC Filtering Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="size-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">MAC Address Filtering</p>
                  <p className="text-xs text-muted-foreground">Only allow whitelisted devices</p>
                </div>
              </div>
              <Switch
                checked={routerConfig.macFilteringEnabled}
                onCheckedChange={() => handleToggle("macFilteringEnabled")}
              />
            </div>

            {/* DHCP Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-3">
                <Network className="size-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">DHCP Server</p>
                  <p className="text-xs text-muted-foreground">Automatically assign IP addresses</p>
                </div>
              </div>
              <Switch checked={routerConfig.dhcpEnabled} onCheckedChange={() => handleToggle("dhcpEnabled")} />
            </div>

            {/* WAN Access Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 hover:bg-destructive/5 transition-colors">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-4 text-destructive" />
                <div>
                  <p className="text-sm font-medium">Remote WAN Access</p>
                  <p className="text-xs text-muted-foreground">Allow router management from internet</p>
                </div>
              </div>
              <Switch
                checked={routerConfig.wanAccessEnabled}
                onCheckedChange={() => handleToggle("wanAccessEnabled")}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Port Blocking */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Lock className="size-4 text-primary" />
            Port-Level Blocking
          </h3>

          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="port" className="text-xs">
                Block Port Number
              </Label>
              <Input
                id="port"
                type="number"
                placeholder="e.g., 22, 80, 443"
                value={newPort}
                onChange={(e) => setNewPort(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="flex items-end">
              <Button size="sm" onClick={handleAddPort} disabled={!newPort} className="h-9">
                Block
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {blockedPorts.map((port) => (
              <Badge
                key={port}
                variant="outline"
                className="bg-destructive/10 text-destructive border-destructive/20 px-3 py-1 gap-2 cursor-pointer hover:bg-destructive/20"
                onClick={() => handleRemovePort(port)}
              >
                <Lock className="size-3" />
                Port {port}
                <span className="ml-1 text-xs opacity-60">×</span>
              </Badge>
            ))}
          </div>

          {blockedPorts.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No ports blocked at router level</p>
          )}
        </div>

        <Separator />

        {/* Apply Button */}
        <Button onClick={handleApplyConfig} disabled={isApplying} className="w-full h-11 gap-2">
          {isApplying ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              <span>Applying Configuration...</span>
            </>
          ) : (
            <>
              <Zap className="size-4" />
              <span>Apply Router Configuration</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
