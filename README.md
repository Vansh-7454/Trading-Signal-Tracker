# Trading Signal Tracker

A full-stack trading signal tracking application built using React, Node.js, Express, MySQL, and Binance API.

## Features

- Create BUY and SELL signals
- Live Binance price integration
- Automatic status updates
- ROI calculation
- Delete signals
- Auto-refresh dashboard every 15 seconds

---

## Tech Stack

- React + Vite
- Node.js + Express
- MySQL
- Binance API

---

## Project Structure

```
Trading-Signal-Tracker
│
├── client
├── server
└── README.md
```

---

## Installation

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Database

Create a MySQL database named:

```sql
trading_signals
```

Then import the provided SQL table.

---

## Architecture

- Frontend: React
- Backend: Express.js
- Database: MySQL
- Live Price: Binance API

The frontend communicates with the backend using REST APIs, while the backend stores trading signals in MySQL and fetches live prices from Binance.

---

## Author

**Vansh Goel**
