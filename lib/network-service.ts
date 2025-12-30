// This service simulates the backend logic for network scanning and router control
// In a real local deployment, this would use Node.js libraries like 'node-nmap' or interact with router APIs (UPnP, SNMP)

export interface IoTDevice {
  id: string
  ip: string
  mac: string
  name: string
  type: "camera" | "smart-plug" | "thermostat" | "hub" | "laptop" | "phone" | "unknown"
  status: "online" | "offline" | "blocked"
  riskLevel: "low" | "medium" | "high" | "critical"
  lastSeen: string
  ports: number[]
  deceptionActive: boolean
}

export interface ThreatPattern {
  id: string
  deviceId: string
  type: "port-scan" | "brute-force" | "data-exfil" | "lateral-movement" | "anomalous-traffic"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  blocked: boolean
  mitigationAction: string
}

// Simulated network state
let connectedDevices: IoTDevice[] = [
  {
    id: "1",
    ip: "192.168.1.10",
    mac: "00:1A:2B:3C:4D:5E",
    name: "Main Router",
    type: "hub",
    status: "online",
    riskLevel: "low",
    lastSeen: new Date().toISOString(),
    ports: [80, 443],
    deceptionActive: false,
  },
  {
    id: "2",
    ip: "192.168.1.15",
    mac: "AA:BB:CC:DD:EE:FF",
    name: "Smart Camera (Garage)",
    type: "camera",
    status: "online",
    riskLevel: "medium",
    lastSeen: new Date().toISOString(),
    ports: [554, 8080],
    deceptionActive: true,
  },
  {
    id: "3",
    ip: "192.168.1.102",
    mac: "11:22:33:44:55:66",
    name: "Suspicious Device",
    type: "unknown",
    status: "online",
    riskLevel: "high",
    lastSeen: new Date().toISOString(),
    ports: [22, 23, 445],
    deceptionActive: false,
  },
]

let detectedThreats: ThreatPattern[] = []

export const networkService = {
  // Simulates scanning the local network for connected IPs
  scanNetwork: async (): Promise<IoTDevice[]> => {
    console.log("[v0] Initiating deep network scan...")
    return new Promise((resolve) => {
      setTimeout(() => {
        // Occasionally "discover" a new device during scan
        if (Math.random() > 0.7 && connectedDevices.length < 10) {
          const newId = (connectedDevices.length + 1).toString()
          connectedDevices.push({
            id: newId,
            ip: `192.168.1.${100 + connectedDevices.length}`,
            mac: `${Math.floor(Math.random() * 255).toString(16)}:55:66:77:88:99`.toUpperCase(),
            name: `New Device ${newId}`,
            type: "unknown",
            status: "online",
            riskLevel: "medium",
            lastSeen: new Date().toISOString(),
            ports: [80],
            deceptionActive: false,
          })
        }
        resolve([...connectedDevices])
      }, 2000)
    })
  },

  // Simulates blocking a device via router port/IP control
  blockDevice: async (id: string): Promise<boolean> => {
    console.log(`[v0] Sending block command to router for device: ${id}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        connectedDevices = connectedDevices.map((d) => (d.id === id ? { ...d, status: "blocked" as const } : d))
        resolve(true)
      }, 1000)
    })
  },

  // Simulates unblocking a device
  unblockDevice: async (id: string): Promise<boolean> => {
    console.log(`[v0] Sending unblock command to router for device: ${id}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        connectedDevices = connectedDevices.map((d) => (d.id === id ? { ...d, status: "online" as const } : d))
        resolve(true)
      }, 1000)
    })
  },

  // Simulates toggling deception (honeypot) for a device
  toggleDeception: async (id: string): Promise<boolean> => {
    console.log(`[v0] Toggling deception layer for device: ${id}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        connectedDevices = connectedDevices.map((d) =>
          d.id === id ? { ...d, deceptionActive: !d.deceptionActive } : d,
        )
        resolve(true)
      }, 500)
    })
  },

  detectThreats: async (): Promise<ThreatPattern[]> => {
    console.log("[v0] Running autonomous threat detection...")
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate threat detection based on device risk levels
        const highRiskDevices = connectedDevices.filter((d) => d.riskLevel === "high" || d.riskLevel === "critical")

        if (highRiskDevices.length > 0 && Math.random() > 0.6) {
          const targetDevice = highRiskDevices[Math.floor(Math.random() * highRiskDevices.length)]
          const threatTypes: ThreatPattern["type"][] = [
            "port-scan",
            "brute-force",
            "data-exfil",
            "lateral-movement",
            "anomalous-traffic",
          ]
          const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)]

          const newThreat: ThreatPattern = {
            id: `threat-${Date.now()}`,
            deviceId: targetDevice.id,
            type: randomThreat,
            severity: targetDevice.riskLevel,
            timestamp: new Date().toISOString(),
            blocked: true,
            mitigationAction: `Isolated ${targetDevice.name} to VLAN-quarantine`,
          }

          detectedThreats.unshift(newThreat)
          if (detectedThreats.length > 10) detectedThreats = detectedThreats.slice(0, 10)
        }

        resolve([...detectedThreats])
      }, 1500)
    })
  },

  autoMitigate: async (threatId: string): Promise<boolean> => {
    console.log(`[v0] Executing autonomous mitigation for threat: ${threatId}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        const threat = detectedThreats.find((t) => t.id === threatId)
        if (threat) {
          // Automatically block the device associated with the threat
          const device = connectedDevices.find((d) => d.id === threat.deviceId)
          if (device) {
            connectedDevices = connectedDevices.map((d) =>
              d.id === threat.deviceId ? { ...d, status: "blocked" as const, riskLevel: "low" as const } : d,
            )
          }
          detectedThreats = detectedThreats.map((t) => (t.id === threatId ? { ...t, blocked: true } : t))
        }
        resolve(true)
      }, 1000)
    })
  },

  scanPorts: async (deviceId: string): Promise<number[]> => {
    console.log(`[v0] Deep port scan initiated for device: ${deviceId}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        const device = connectedDevices.find((d) => d.id === deviceId)
        if (device) {
          // Simulate discovering more ports on suspicious devices
          const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3389, 8080, 8443]
          const discoveredPorts = commonPorts.filter(() => Math.random() > 0.7)
          connectedDevices = connectedDevices.map((d) =>
            d.id === deviceId ? { ...d, ports: [...new Set([...d.ports, ...discoveredPorts])] } : d,
          )
          resolve(device.ports)
        }
        resolve([])
      }, 2000)
    })
  },

  getThreats: (): ThreatPattern[] => {
    return [...detectedThreats]
  },
}
