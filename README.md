# Automated Storage System

An automated storage and retrieval system for electronic components.

The system allows components to be assigned to drawers and storage racks via a web interface.  
When components are requested, a robot automatically fetches the corresponding drawers and delivers them to the user.

The project focuses on a clean separation between web control, system logic, and hardware execution.

---

## Overview

- Web-based management of electronic components
- Local server running on a Raspberry Pi
- Robot-assisted drawer handling
- Distributed ESP32 network using ESP-NOW
- Simple and transparent JSON-based data storage

---

## System Architecture

```
Web Browser
     ↓
Raspberry Pi (Node.js Web Server & System Controller)
     ↓ USB (Serial, JSON)
Central ESP32 (ESP-NOW Gateway)
     ↓ ESP-NOW
Robot ESP32 & Drawer ESP32s
```

---

## Key Concepts

### Raspberry Pi
Acts as the central brain of the system.  
Handles all logic, planning, data storage and coordination.

### Central ESP32
Connected via USB to the Raspberry Pi.  
Works purely as a communication gateway between the Pi and other ESP32 devices.

### Robot & Drawer ESP32s
Execute commands and report status.  
No business logic is implemented on these devices.

---

## Data Storage

No external database is used.

All data is stored locally on the Raspberry Pi as JSON files:
- Components
- Drawers
- Racks
- Orders
- System state

This keeps the system easy to understand, debug and extend.

---

## Project Status

This project is under active development.

Current focus:
- Web server and UI
- System controller logic
- Communication between Raspberry Pi and ESP32 devices

Hardware control and automation will be added step by step.

---

## Notes

- The system is event-driven (no infinite loops)
- Logic is centralized, hardware remains simple
- Designed for local network operation
- All the STL Files will be on Thingiverse or Printables after the project is finished
- [Thingiverse](https://www.thingiverse.com/feligrei/designs) / [Printables](https://www.printables.com/@FelixGreimel_1735711/models)

---

## License

This project is currently intended for personal and educational use.
