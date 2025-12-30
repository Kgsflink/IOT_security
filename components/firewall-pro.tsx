"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Shield, X, Plus, AlertTriangle, CheckCircle2, Lock, Unlock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FirewallRule {
  id: string
  name: string
  protocol: "TCP" | "UDP" | "ICMP" | "ALL"
  port: string
  sourceIp: string
  action: "ALLOW" | "BLOCK" | "LOG"
  enabled: boolean
  priority: number
}

const defaultRules: FirewallRule[] = [
  {
    id: "1",
    name: "Block Telnet (Port 23)",
    protocol: "TCP",
    port: "23",
    sourceIp: "0.0.0.0/0",
    action: "BLOCK",
    enabled: true,
    priority: 1,
  },
  {
    id: "2",
    name: "Allow HTTPS Traffic",
    protocol: "TCP",
    port: "443",
    sourceIp: "0.0.0.0/0",
    action: "ALLOW",
    enabled: true,
    priority: 2,
  },
  {
    id: "3",
    name: "Block SMB (Port 445)",
    protocol: "TCP",
    port: "445",
    sourceIp: "0.0.0.0/0",
    action: "BLOCK",
    enabled: true,
    priority: 3,
  },
  {
    id: "4",
    name: "Log DNS Queries",
    protocol: "UDP",
    port: "53",
    sourceIp: "0.0.0.0/0",
    action: "LOG",
    enabled: true,
    priority: 4,
  },
]

export function FirewallPro() {
  const [rules, setRules] = useState<FirewallRule[]>(defaultRules)
  const [showAddRule, setShowAddRule] = useState(false)
  const [newRule, setNewRule] = useState<Partial<FirewallRule>>({
    name: "",
    protocol: "TCP",
    port: "",
    sourceIp: "0.0.0.0/0",
    action: "BLOCK",
    enabled: true,
    priority: rules.length + 1,
  })

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id))
  }

  const addRule = () => {
    if (newRule.name && newRule.port) {
      const rule: FirewallRule = {
        id: Date.now().toString(),
        name: newRule.name!,
        protocol: newRule.protocol as "TCP" | "UDP" | "ICMP" | "ALL",
        port: newRule.port!,
        sourceIp: newRule.sourceIp!,
        action: newRule.action as "ALLOW" | "BLOCK" | "LOG",
        enabled: true,
        priority: rules.length + 1,
      }
      setRules((prev) => [...prev, rule])
      setNewRule({
        name: "",
        protocol: "TCP",
        port: "",
        sourceIp: "0.0.0.0/0",
        action: "BLOCK",
        enabled: true,
        priority: rules.length + 2,
      })
      setShowAddRule(false)
    }
  }

  const activeRulesCount = rules.filter((r) => r.enabled).length
  const blockedCount = rules.filter((r) => r.action === "BLOCK" && r.enabled).length

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              Advanced Firewall Rules Engine
            </CardTitle>
            <CardDescription>Deep packet inspection and granular network access control</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5">
                <CheckCircle2 className="size-3 text-chart-3" />
                <span className="text-xs font-mono">{activeRulesCount} Active</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 border-destructive/30">
                <Lock className="size-3 text-destructive" />
                <span className="text-xs font-mono">{blockedCount} Blocking</span>
              </Badge>
            </div>
            <Button size="sm" onClick={() => setShowAddRule(!showAddRule)} className="gap-2">
              <Plus className="size-4" />
              Add Rule
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddRule && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ruleName">Rule Name</Label>
                  <Input
                    id="ruleName"
                    placeholder="e.g., Block SSH from external"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Select
                    value={newRule.protocol}
                    onValueChange={(value) => setNewRule({ ...newRule, protocol: value as any })}
                  >
                    <SelectTrigger id="protocol">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TCP">TCP</SelectItem>
                      <SelectItem value="UDP">UDP</SelectItem>
                      <SelectItem value="ICMP">ICMP</SelectItem>
                      <SelectItem value="ALL">ALL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port/Range</Label>
                  <Input
                    id="port"
                    placeholder="e.g., 22, 8000-9000"
                    value={newRule.port}
                    onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sourceIp">Source IP/CIDR</Label>
                  <Input
                    id="sourceIp"
                    placeholder="e.g., 192.168.1.0/24"
                    value={newRule.sourceIp}
                    onChange={(e) => setNewRule({ ...newRule, sourceIp: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <Select
                    value={newRule.action}
                    onValueChange={(value) => setNewRule({ ...newRule, action: value as any })}
                  >
                    <SelectTrigger id="action" className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALLOW">ALLOW</SelectItem>
                      <SelectItem value="BLOCK">BLOCK</SelectItem>
                      <SelectItem value="LOG">LOG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowAddRule(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={addRule}>
                    Create Rule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead className="w-[50px]">Priority</TableHead>
              <TableHead>Rule Name</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Port</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                <TableCell className="font-mono text-xs text-muted-foreground">{rule.priority}</TableCell>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {rule.protocol}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{rule.port}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{rule.sourceIp}</TableCell>
                <TableCell>
                  <Badge
                    variant={rule.action === "ALLOW" ? "default" : rule.action === "BLOCK" ? "destructive" : "outline"}
                    className="font-bold text-xs"
                  >
                    {rule.action === "ALLOW" && <Unlock className="size-3 mr-1" />}
                    {rule.action === "BLOCK" && <Lock className="size-3 mr-1" />}
                    {rule.action === "LOG" && <AlertTriangle className="size-3 mr-1" />}
                    {rule.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                    <span className="text-xs text-muted-foreground">{rule.enabled ? "Active" : "Disabled"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <X className="size-4" />
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
