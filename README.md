# Ethereum Escrow DApp

A decentralized escrow application built on the Ethereum network (Sepolia testnet) that allows users to create and manage escrow contracts with a user-friendly interface.

## Features

- Create escrow contracts with custom terms
- Connect with MetaMask wallet
- Approve transactions as sender or receiver
- View all your contracts
- Automatic contract cleanup after completion
- Real-time contract status updates
- Sepolia testnet support

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Hono.js with Cloudflare Workers
- Blockchain: Ethereum (Sepolia testnet)
- Storage: Upstash Redis
- Smart Contracts: Solidity
- Development: Hardhat

## Prerequisites

- Node.js v16 or later
- npm or yarn
- MetaMask browser extension
- Sepolia testnet ETH (can be obtained from a faucet)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ethereum-escrow-dapp.git
cd ethereum-escrow-dapp
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create environment files:

Create a `.env` file in the root directory:
```env
INFURA_PROJECT_ID=your_infura_project_id
PRIVATE_KEY=your_private_key_for_deployment
```

Create a `.env` file in the backend directory:
```env
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
```

4. Compile smart contracts:
```bash
npx hardhat compile
```

## Development

1. Start the frontend development server:
```bash
cd frontend
npm start
```

2. Start the backend development server:
```bash
cd backend
npm run dev
```

3. Deploy smart contracts to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Testing

Run smart contract tests:
```bash
npx hardhat test
```

## Deployment

1. Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

2. Deploy frontend (example using Vercel):
```bash
cd frontend
vercel deploy
```

3. Deploy backend (example using Cloudflare Workers):
```bash
cd backend
wrangler deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

---

# Frontend - Ethereum Escrow DApp

The frontend application for the Ethereum Escrow DApp built with React and Tailwind CSS.

## Structure

```
frontend/
├── src/
│   ├── components/
│   ├── config/
│   ├── pages/
│   └── App.js
├── public/
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   Create a `.env` file:
```env
REACT_APP_BACKEND_URL=your_backend_url
REACT_APP_INFURA_URL=your_infura_url
```

3. Start development server:
```bash
npm start
```

## Components

- `ConnectWallet`: Handles MetaMask wallet connection
- `CreateEscrow`: Form for creating new escrow contracts
- `ContractList`: Displays user's active contracts
- `ApproveContract`: Interface for approving contracts

## Building for Production

```bash
npm run build
```

---

# Backend - Ethereum Escrow DApp

The backend service for the Ethereum Escrow DApp built with Hono.js and Cloudflare Workers.

## Structure

```
backend/
├── src/
│   ├── index.ts
│   └── types.ts
├── wrangler.toml
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   Create a `.env` file:
```env
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

- POST `/register-contract`: Register new escrow contract
- GET `/contracts/:userAddress`: Get user's contracts
- GET `/contract/:contractAddress`: Get contract details
- POST `/remove-contract`: Remove contract from storage

## Deployment

```bash
wrangler deploy
```

---

# Smart Contracts - Ethereum Escrow DApp

Solidity smart contracts for the Ethereum Escrow DApp.

## Structure

```
contracts/
├── Escrow.sol
└── test/
    └── Escrow.test.js
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Compile contracts:
```bash
npx hardhat compile
```

3. Run tests:
```bash
npx hardhat test
```

## Contract Details

### Escrow.sol
- Creates escrow agreements between sender and receiver
- Handles fund locking and release
- Requires approval from both parties
- Includes refund functionality

## Deployment

Deploy to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

# Scripts - Ethereum Escrow DApp

Deployment and utility scripts for the Ethereum Escrow DApp.

## Structure

```
scripts/
├── deploy.js
```

## Usage

### Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
