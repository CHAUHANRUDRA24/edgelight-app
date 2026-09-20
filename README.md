# Edge Light — Desktop Application

[![Author](https://img.shields.io/badge/Author-CHAUHANRUDRA24-orange.svg)](https://github.com/CHAUHANRUDRA24)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%2B-blue.svg)](https://microsoft.com)
[![Electron](https://img.shields.io/badge/Electron-33.2-47848f.svg)](https://electronjs.org)

Professional screen-edge ring illumination overlay for video calls (WhatsApp, Zoom, Google Meet, Microsoft Teams) on Windows.

---

## 🌟 Key Features

- **Interactive Setup Wizard**: Dynamic screen detection, proportional border calibration (HD, 1080p, 2K, 4K), and test glow preview on first start.
- **Sub-₹100 Pricing & Direct Buying**:
  - Monthly Pass: ₹29 / mo
  - 3-Month Pass: ₹49 / 3mo (Most Popular)
  - Lifetime Pro: ₹99 one-time (Best Value)
  - Direct Razorpay checkout links & dynamic Scan-to-Pay UPI QR Code (GPay, PhonePe, Paytm, BHIM).
- **Device-Bound Cryptographic HWID**: Deep machine fingerprinting (Registry `MachineGuid`, BIOS UUID, CPU ID) bound to AES-256-GCM vault with anti-clock rollback detection.
- **Automatic Camera Sensing**: Real-time Windows CapabilityAccessManager detection that automatically activates the studio ring when WhatsApp, Zoom, or webcams start.
- **macOS-Style Fluid Mouse Physics**: Spring-damping cursor avoidance so you can easily click buttons under the illumination ring.
- **Real-Time Color Temperature Tuning**: 3000K (warm studio amber) to 7000K (crisp daylight cool).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Firebase and Razorpay parameters.

### 3. Run Development Mode
```bash
npm start
```

### 4. Build Distributables
- **Standalone Portable (.exe)**:
  ```bash
  npm run dist:portable
  ```
- **Windows Installer (.exe)**:
  ```bash
  npm run dist
  ```
Outputs will be located in the `dist/` directory.

---

## 👨‍💻 Maintainer & Author

- **GitHub ID**: [CHAUHANRUDRA24](https://github.com/CHAUHANRUDRA24)
- **Email**: [rudrachauhan2475@gmail.com](mailto:rudrachauhan2475@gmail.com)

---

## 📄 License
MIT License © 2026 Edge Light Team
