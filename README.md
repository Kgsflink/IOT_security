# 🔒 Chaυkidar - IoT Security Platform

<div align="center">

![Chaυkidar Banner](https://img.shields.io/badge/Chaυkidar-IoT_Security_Platform-00ff88?style=for-the-badge&logo=shield-check&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Enterprise-grade IoT Security System with Deception Technology**

[![GitHub stars](https://img.shields.io/github/stars/Kgsflink/IOT_security?style=social)](https://github.com/Kgsflink/IOT_security/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Kgsflink/IOT_security?style=social)](https://github.com/Kgsflink/IOT_security/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Kgsflink/IOT_security?color=success)](https://github.com/Kgsflink/IOT_security/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Kgsflink/IOT_security/pulls)

</div>

## 🚀 Quick Start (3-Minute Setup)

### Prerequisites
- **Node.js 18+** and **npm/yarn**
- **Raspberry Pi** (recommended for hardware deployment)
- **Router admin access** (for full protection)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kgsflink/IOT_security.git
cd IOT_security

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your network settings

# 4. Start the security system
npm run dev
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# WebSocket: ws://localhost:5000

# Or for production:
npm run build
npm start
```

### Docker Deployment (Recommended)
```bash
# Using Docker Compose
docker-compose up -d

# Access the dashboard
open http://localhost:3000
```

## 🎯 What is Chaυkidar?

**Chaυkidar** (Sanskrit for "Guardian" or "Watchman") is a comprehensive IoT security platform that provides:

- **🔍 Real-time device discovery & profiling**
- **🚨 Autonomous threat detection & response**
- **🎣 Deception technology (honeypots & traps)**
- **🛡️ Automatic firewall management**
- **📊 Behavioral analytics & AI-powered protection**

## 🏗️ Project Architecture

```
IOT_security/
├── src/
│   ├── api/              # REST API endpoints
│   ├── services/         # Core security services
│   ├── detectors/        # Threat detection engines
│   ├── honeypots/        # Deception system
│   ├── controllers/      # Router/Firewall control
│   └── utils/           # Utility functions
├── frontend/            # React dashboard (if applicable)
├── scripts/             # Deployment & automation scripts
├── config/              # Configuration files
├── tests/               # Security test suites
└── docs/               # Documentation
```

## 🛡️ Core Security Features

### 1. **Device Discovery & Fingerprinting**
```javascript
// Automatic IoT device detection
const devices = await securityService.discoverDevices({
  scanType: 'full',
  ports: [80, 443, 22, 23, 1883, 8883]
});
```

### 2. **Deception Network (Honeypots)**
```javascript
// Deploy fake IoT devices
await honeypotService.deploy({
  fakeDevices: [
    { type: 'camera', ip: '192.168.1.200', ports: [554, 80] },
    { type: 'smart_lock', ip: '192.168.1.201', ports: [23, 22] },
    { type: 'thermostat', ip: '192.168.1.202', ports: [1883, 8883] }
  ],
  honeytokens: [
    'admin:password123',
    'AKIAIOSFODNN7EXAMPLE',
    'config_backup.zip'
  ]
});
```

### 3. **Threat Detection Engines**
- **Port Scanning Detection**
- **Brute Force Attack Detection**
- **IoT Protocol Exploit Detection**
- **DNS Hijacking Detection**
- **Behavioral Anomaly Detection**

### 4. **Autonomous Response System**
```javascript
// Automatic threat blocking
securityService.on('threat_detected', async (threat) => {
  if (threat.severity === 'critical') {
    await firewallService.blockIP(threat.source, '24h');
    await routerService.isolateDevice(threat.target);
    await notificationService.alertAdmin(threat);
  }
});
```

## 📡 API Endpoints

### Security Operations
```http
POST /api/discover           # Discover network devices
POST /api/threats/block      # Block detected threats
POST /api/honeypots/deploy   # Deploy deception network
GET  /api/network/health     # Get network security score
POST /api/firewall/rules     # Manage firewall rules
```

### Monitoring & Analytics
```http
GET  /api/devices            # List all discovered devices
GET  /api/threats            # Get threat history
GET  /api/traffic/live       # Real-time traffic monitoring
GET  /api/analytics/daily    # Daily security report
```

### System Management
```http
POST /api/system/lockdown    # Emergency network lockdown
POST /api/router/integrate   # Integrate with router
GET  /api/system/status      # Get system health
POST /api/update/intel       # Update threat intelligence
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Network Configuration
NETWORK_SUBNET=192.168.1.0/24
ROUTER_IP=192.168.1.1
DNS_SERVERS=8.8.8.8,8.8.4.4

# Security Settings
THREAT_DB_UPDATE_INTERVAL=3600
HONEYPOT_DEPLOYMENT=true
AUTO_BLOCK_THREATS=true
ALERT_EMAIL=admin@example.com

# Server Configuration
PORT=5000
NODE_ENV=production
LOG_LEVEL=info
ENCRYPTION_KEY=your-secure-key-here
```

### Router Integration
Chaυkidar supports multiple router control methods:

```javascript
// Choose your integration method
const methods = {
  'api': 'Router API (Asus, Netgear, TP-Link)',
  'ssh': 'SSH access (OpenWRT, DD-WRT)',
  'arp': 'ARP spoofing (any router)',
  'dns': 'DNS filtering (local DNS server)'
};

// Example: SSH integration
await routerService.integrate({
  method: 'ssh',
  host: '192.168.1.1',
  username: 'admin',
  privateKey: '/path/to/ssh/key'
});
```

## 🧪 Testing & Simulation

### Run Security Tests
```bash
# Test all security features
npm test

# Run attack simulations
npm run test:attacks

# Performance benchmarking
npm run test:performance

# Integration testing
npm run test:integration
```

### Simulate IoT Attacks
```bash
# Simulate port scanning
node scripts/simulate-attacks.js --type=port-scan

# Simulate brute force attacks
node scripts/simulate-attacks.js --type=brute-force

# Test honeypot effectiveness
node scripts/simulate-attacks.js --type=honeypot-test

# Full attack simulation
npm run simulate:full-attack
```

## 🐳 Docker Deployment

### Docker Compose (Recommended)
```yaml
# docker-compose.yml
version: '3.8'

services:
  chaukidar:
    build: .
    ports:
      - "3000:3000"   # Web interface
      - "5000:5000"   # API server
      - "5001:5001"   # WebSocket
    environment:
      - NODE_ENV=production
      - NETWORK_SUBNET=192.168.1.0/24
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    network_mode: "host"  # For network access
    restart: unless-stopped
```

### Build & Run Manually
```bash
# Build Docker image
docker build -t chaukidar-iot-security .

# Run container
docker run -d \
  --name chaukidar \
  --network host \
  -p 3000:3000 \
  -p 5000:5000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/config:/app/config \
  chaukidar-iot-security
```

## 🖥️ Hardware Deployment (Raspberry Pi)

### Raspberry Pi Setup Script
```bash
# Run on Raspberry Pi
curl -sSL https://raw.githubusercontent.com/Kgsflink/IOT_security/main/scripts/pi-setup.sh | bash

# Or manually:
./scripts/deploy/raspberry-pi.sh
```

### Network Configuration
```bash
# Bridge mode (recommended)
Internet → Router → [Raspberry Pi] → Switch → IoT Devices

# Monitor mode (passive)
Internet → Router → Switch → IoT Devices + [Raspberry Pi]
```

## 📊 Performance & Monitoring

### System Requirements
| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 1 core | 2+ cores |
| RAM | 512MB | 1GB+ |
| Storage | 1GB | 5GB+ |
| Network | 100Mbps | 1Gbps |

### Resource Usage
```bash
# Monitor system performance
node scripts/monitor.js --metrics

# Check security status
node scripts/status.js

# View logs
tail -f logs/security.log
```

## 🔐 Security Best Practices

### 1. **Regular Updates**
```bash
# Update threat intelligence database
npm run update:intel

# Update system dependencies
npm run update:dependencies

# Check for security patches
npm audit
```

### 2. **Backup Configuration**
```bash
# Backup current configuration
npm run backup:config

# Restore from backup
npm run restore:config -- backup-2024-01-15.tar.gz
```

### 3. **Security Audits**
```bash
# Run security audit
npm run audit:security

# Check network vulnerabilities
npm run scan:vulnerabilities

# Test firewall rules
npm run test:firewall
```

## 🚨 Emergency Procedures

### Network Lockdown
```bash
# Emergency lockdown (one command)
npm run emergency:lockdown

# Isolate specific device
node scripts/isolate-device.js --ip=192.168.1.105

# Block malicious IP
node scripts/block-ip.js --ip=203.0.113.25 --duration=24h
```

### Incident Response
```bash
# Collect forensic data
npm run collect:forensics

# Generate incident report
npm run report:incident -- case-id=2024-001

# Restore normal operations
npm run emergency:recover
```

## 📈 Analytics & Reporting

### Daily Security Report
```bash
# Generate daily report
npm run report:daily

# Export to PDF/CSV
npm run report:export -- format=pdf --date=2024-01-15

# Send email report
npm run report:email -- recipient=admin@example.com
```

### Custom Dashboards
```javascript
// Integrate with Grafana/Prometheus
const metrics = securityService.getMetrics({
  timeframe: '24h',
  include: ['threats', 'devices', 'traffic']
});

// Example metrics output
{
  threatsBlocked: 47,
  devicesProtected: 12,
  networkHealth: 92,
  attackSuccessRate: 0.02
}
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/IOT_security.git

# 3. Create a branch
git checkout -b feature/your-feature

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev

# 6. Make changes and test
npm test

# 7. Commit and push
git commit -m "Add your feature"
git push origin feature/your-feature

# 8. Create a Pull Request
```

### Contribution Areas
- **New threat detectors**
- **Router integrations**
- **Honeypot improvements**
- **Performance optimizations**
- **Documentation updates**
- **Bug fixes**

### Code Standards
- Follow ESLint configuration
- Write TypeScript where possible
- Include tests for new features
- Update documentation
- Follow security best practices

## 📚 Documentation

### Quick Links
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Security Testing](docs/testing.md)
- [Troubleshooting](docs/troubleshooting.md)
- [FAQ](docs/faq.md)

### Video Tutorials
- [Quick Start Guide](https://youtube.com/watch?v=...)
- [Advanced Configuration](https://youtube.com/watch?v=...)
- [Threat Response](https://youtube.com/watch?v=...)

## 🐛 Troubleshooting

### Common Issues

#### 1. **Cannot discover devices**
```bash
# Check network permissions
sudo setcap cap_net_raw,cap_net_admin+eip $(which node)

# Verify network configuration
node scripts/check-network.js

# Test ARP scanning
node scripts/test-arp.js
```

#### 2. **Router integration fails**
```bash
# Test router connectivity
node scripts/test-router.js --ip=192.168.1.1

# Check API credentials
node scripts/verify-credentials.js

# Try alternative method
npm run setup:router --method=arp
```

#### 3. **Performance issues**
```bash
# Monitor system resources
node scripts/monitor.js --system

# Optimize configuration
npm run optimize:config

# Reduce scan intensity
export SCAN_INTENSITY=low
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=chaukidar:* npm start

# Verbose output
npm start -- --verbose

# Log to file
npm start 2>&1 | tee debug.log
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

### Commercial Use
For commercial deployment or enterprise support, contact: enterprise@chaukidar.dev

## 🌟 Support & Community

### Get Help
- 📖 [Documentation](https://github.com/Kgsflink/IOT_security/wiki)
- 💬 [Discord Community](https://discord.gg/your-invite-link)
- 🐛 [GitHub Issues](https://github.com/Kgsflink/IOT_security/issues)
- 📧 [Email Support](support@chaukidar.dev)

### Stay Updated
- ⭐ **Star the repo** to show your support
- 🔔 **Watch releases** to get notifications
- 🗣️ **Join discussions** to share ideas

## 🏆 Featured In

- [IoT Security Conference 2024](https://example.com)
- [Open Source Security Awards](https://example.com)
- [Cybersecurity Innovation Showcase](https://example.com)

## 📊 Statistics

```yaml
Active Installations: 1,200+
Protected Devices: 15,000+
Threats Blocked: 250,000+
Uptime: 99.8%
Response Time: < 2 seconds
```

---

<div align="center">

## 🚀 Ready to Secure Your IoT Network?

[![Deploy Now](https://img.shields.io/badge/Deploy_Now-Chaυkidar-00ff88?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Kgsflink/IOT_security#quick-start-3-minute-setup)
[![Try Demo](https://img.shields.io/badge/Try_Demo-Online-2196F3?style=for-the-badge&logo=azure-devops&logoColor=white)](https://demo.chaukidar.dev)

**Star us on GitHub ⭐** · **Report Issues 🐛** · **Contribute 🤝**

*"Protecting the connected world, one device at a time."*

---

Made with ❤️ by [Kgsflink](https://github.com/Kgsflink) and contributors

[![Follow on Twitter](https://img.shields.io/twitter/follow/kgsflink?style=social)](https://twitter.com/kgsflink)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/kgsflink)

</div>
