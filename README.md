<div align="center">

  <img src="assets/icon.png" alt="Edge Light Logo" width="100" height="100">

  # Edge Light Desktop Application

  **Studio Ring Illumination for Video Calls on Windows — Zero Extra Hardware**

  [![GitHub Stars](https://img.shields.io/github/stars/CHAUHANRUDRA24/edgelight-app?style=for-the-badge&logo=github)](https://github.com/CHAUHANRUDRA24/edgelight-app)
  [![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078D6?style=for-the-badge&logo=windows)](https://microsoft.com)
  [![Electron](https://img.shields.io/badge/Electron-33.2-47848F?style=for-the-badge&logo=electron)](https://electronjs.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  [![Maintainer](https://img.shields.io/badge/Maintainer-CHAUHANRUDRA24-orange?style=for-the-badge&logo=github)](https://github.com/CHAUHANRUDRA24)

  <br>

  [Download Portable (.exe)](https://github.com/CHAUHANRUDRA24/edgelight-landing) • [Report Issue](https://github.com/CHAUHANRUDRA24/edgelight-app/issues) • [Pricing](#-affordable-licensing-under-100)

</div>

---

## 📖 Overview

**Edge Light** turns the border of your Windows monitor into a calibrated studio-grade ring light. Designed for remote workers, content creators, and students, Edge Light illuminates your face evenly during video calls on **WhatsApp, Zoom, Google Meet, and Microsoft Teams** without blinding you or obscuring your work.

---

## 🌟 Key Highlights

### 🖥️ Automatic Display Calibration & Setup Wizard
- Automatically detects monitor resolution on launch (HD 768p, Full HD 1080p, QHD 1440p, 4K).
- Dynamically scales border thickness proportionally (e.g. 96px on 1080p, 68px on 768p) for perfect lighting balance.
- Interactive first-run **Setup Wizard** with a live glow test preview.

### 📷 Smart Camera Detection (MacBook Style)
- Continuously inspects Windows `CapabilityAccessManager` in real-time.
- Automatically blooms the illumination ring on the instant a call starts in WhatsApp, Zoom, or web browsers, and gracefully eases off when the camera closes.

### 🖱️ macOS-Style Fluid Mouse Avoidance
- Physics-based cursor avoidance with smooth spring damping.
- You can freely click, drag, and close tabs under the illumination ring with zero click interference.

### 🌡️ Studio Color Temperature Control
- Seamless sliding between **3000K warm candle glow** and **7000K crisp daylight cool**.
- Calibrated gamma-corrected color mixing for natural skin tones.

### 🛡️ Device-Bound Cryptographic Licensing
- Unique deterministic Hardware ID (`HWID`) generated from Windows Registry `MachineGuid`, Motherboard BIOS UUID, and CPU ID.
- Stored in a local AES-256-GCM encrypted vault with anti-clock tampering protection.
- Every installation receives an out-of-the-box **3-Day Unrestricted Free Trial**.

---

## 💳 Affordable Licensing (Under ₹100)

Edge Light features budget-friendly commercial tiers directly purchasable via **Razorpay** and **Scan-to-Pay UPI QR**:

| Plan | Price | Duration | Best For | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Monthly Pass** | **₹29** | 30 Days | Short-term projects & trials | Active |
| **3-Month Pass** | **₹49** | 90 Days (~₹16/mo) | Regular remote meetings | **Most Popular** |
| **Lifetime Pro** | **₹99** | One-time forever | Permanent commercial ownership | **Best Value** |

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | **Toggle Illumination** | Instantly turns the ring light on/off |
| <kbd>Hover Top Edge</kbd> | **Reveal Dock** | Shows floating glassmorphic control bar |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> | **Quit App** | Safely exits the background process |

---

## 🏗️ Architecture & Project Structure

```
application/
├── assets/                  # High-res application icons (.ico, .png, tray)
│   ├── icon.ico
│   ├── icon.png
│   └── tray-icon.png
├── scripts/                 # Build automation & verification test suites
│   ├── generate-icons.js
│   ├── test-setup-wizard-and-plans.js
│   └── test-firebase-integration.js
├── src/                     # Core application source code
│   ├── index.html           # Transparent window overlay & Setup Wizard
│   ├── main.js              # Electron Main process, Tray, & HWID monitors
│   ├── preload.js           # Secure ContextBridge API surface
│   ├── renderer.js          # Canvas 2D ring rendering & physics engine
│   ├── style.css            # Glassmorphic UI & Setup Wizard styling
│   └── license-manager.js   # Cryptographic vault & Firestore sync client
├── .env.example             # Configuration template
├── .gitignore
├── package.json             # Build scripts & Electron dependencies
└── README.md
```

---

## 🚀 Quick Start & Development

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer)
- Windows 10 / 11 (64-bit)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/CHAUHANRUDRA24/edgelight-app.git
cd edgelight-app

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
```

### Running Locally
```bash
npm start
```

### Automated Verification
```bash
# Run test suite
node scripts/test-setup-wizard-and-plans.js
```

---

## 📦 Building Distributables

Edge Light uses `electron-builder` to package zero-dependency production executables:

```bash
# Build Standalone Portable (.exe)
npm run dist:portable

# Build Full Windows Installer (.exe with NSIS)
npm run dist
```
Compiled output will be saved into the `dist/` directory:
- `dist/Edge Light 1.0.3.exe` (Standalone Portable)
- `dist/Edge Light Setup 1.0.3.exe` (Windows Installer)

---

## 👨‍💻 Maintainer & Author

- **Author**: **CHAUHANRUDRA24**
- **Email**: [rudrachauhan2475@gmail.com](mailto:rudrachauhan2475@gmail.com)
- **GitHub**: [@CHAUHANRUDRA24](https://github.com/CHAUHANRUDRA24)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
