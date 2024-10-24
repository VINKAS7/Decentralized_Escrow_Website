import React, { useEffect } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid configuration
mermaid.initialize({
    startOnLoad: true,
    theme: 'neutral',
    securityLevel: 'loose',
    flowchart: {
        curve: 'basis',
        padding: 20
    },
    sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35
    }
});

// Reusable section component
const DocSection = ({ title, children }) => (
    <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{title}</h2>
        <div className="text-gray-600">{children}</div>
    </div>
);

// Mermaid diagram component with custom content
const MermaidDiagram = ({ content }) => {
    useEffect(() => {
        mermaid.contentLoaded();
    }, []);

    return (
        <div className="mermaid">
            {content}
        </div>
    );
};

// Diagram contents
const systemArchitectureContent = `
flowchart TD
  Frontend["Frontend (React + Ethers.js)"]
  Blockchain["Smart Contract (Solidity)"]
  Backend["Backend (Hono)"]
  Database["Database (Redis)"]

  Frontend -->|Deploy & Interact| Blockchain
  Frontend -->|Store Metadata| Backend
  Backend -->|Save Data| Database
  Blockchain -->|Events & Updates| Frontend
`;

const systemDesignContent = `
flowchart TD
    subgraph Client["Client Layer"]
        UI["Web UI\n(React)"]
        Wallet["Web3 Wallet\n(MetaMask)"]
        Cache["Local Cache\n(Redux)"]
    end

    subgraph Blockchain["Blockchain Layer"]
        SC["Smart Contracts"]
        subgraph Contracts["Contract Components"]
            EC["Escrow Contract"]
            FC["Factory Contract"]
        end
    end

    subgraph Server["Server Layer"]
        API["API Server\n(Hono)"]
        Queue["Job Queue\n(Bull)"]
        DB["Redis DB"]
        Index["Search Index"]
    end

    UI --> Wallet
    Wallet --> SC
    UI --> Cache
    UI --> API
    API --> DB
    API --> Queue
    Queue --> Index
    SC --> API
    EC --> FC
`;

const contractFlowContent = `
sequenceDiagram
    participant Sender
    participant Contract
    participant Recipient
    participant Backend

    Sender->>Contract: Deploy Escrow Contract
    Contract->>Backend: Contract Created Event
    Backend->>Backend: Store Contract Metadata
    Sender->>Contract: Deposit Funds
    Contract->>Backend: Funds Deposited Event
    Recipient->>Contract: Review & Approve
    Contract->>Recipient: Transfer Funds
    Contract->>Backend: Contract Completed Event
`;

const dataFlowContent = `
flowchart TD
    subgraph User["User Actions"]
        Create["Create Contract"]
        Deposit["Deposit Funds"]
        Approve["Approve Transfer"]
    end

    subgraph Contract["Smart Contract"]
        Deploy["Deploy"]
        Hold["Hold Funds"]
        Release["Release Funds"]
    end

    subgraph Events["Event System"]
        Created["Contract Created"]
        Funded["Contract Funded"]
        Completed["Transfer Completed"]
    end

    Create --> Deploy
    Deploy --> Created
    Deposit --> Hold
    Hold --> Funded
    Approve --> Release
    Release --> Completed
`;

const DocumentationPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">DeEscrow Docs</h1>
                        <a
                            href="/"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-8">
                    {/* Introduction */}
                    <DocSection title="Introduction">
                        <p className="mb-4">
                            DeEscrow is a decentralized escrow system built on the Ethereum blockchain.
                            It provides a secure way to conduct transactions between two parties using
                            smart contracts and a user-friendly interface.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                            <h4 className="font-semibold text-yellow-800">Key Features</h4>
                            <ul className="mt-2 space-y-1 text-yellow-700">
                                <li>• Decentralized escrow service</li>
                                <li>• Smart contract-based security</li>
                                <li>• MetaMask integration</li>
                                <li>• Real-time transaction tracking</li>
                            </ul>
                        </div>
                    </DocSection>

                    {/* System Overview */}
                    <DocSection title="System Overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-800">Smart Contract</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Secure fund holding</li>
                                    <li>Two-party approval system</li>
                                    <li>Automatic fund release</li>
                                    <li>Built-in refund mechanism</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-800">Frontend</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>MetaMask integration</li>
                                    <li>Contract creation interface</li>
                                    <li>Contract management</li>
                                    <li>Real-time status updates</li>
                                </ul>
                            </div>
                        </div>
                    </DocSection>

                    {/* System Design */}
                    <DocSection title="System Design">
                        <div className="space-y-8">
                            {/* High-Level Architecture */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">High-Level Architecture</h3>
                                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                                    <MermaidDiagram content={systemArchitectureContent} />
                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    High-level overview of main system components and their interactions.
                                </p>
                            </div>

                            {/* Detailed System Design */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Detailed System Design</h3>
                                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                                    <MermaidDiagram content={systemDesignContent} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">Client Layer</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• React-based web interface</li>
                                            <li>• MetaMask integration</li>
                                            <li>• Local state management</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">Blockchain Layer</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Escrow smart contracts</li>
                                            <li>• Factory pattern deployment</li>
                                            <li>• Event emission system</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">Server Layer</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Hono API server</li>
                                            <li>• Redis data storage</li>
                                            <li>• Background job processing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Data Flow */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Data Flow</h3>
                                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                                    <MermaidDiagram content={dataFlowContent} />
                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    Detailed flow of data through the system during key operations.
                                </p>
                            </div>

                            {/* Contract Flow */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Contract Interaction Flow</h3>
                                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                                    <MermaidDiagram content={contractFlowContent} />
                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    Sequence diagram showing the interaction flow between sender, recipient, smart contract, and backend.
                                </p>
                            </div>
                        </div>
                    </DocSection>

                    {/* How It Works */}
                    <DocSection title="How It Works">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-gray-800">For Senders:</h3>
                            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                                <p className="flex items-center">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                                    Connect your MetaMask wallet
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                                    Create a new escrow contract with recipient's address
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                                    Deposit ETH into the contract
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                                    Share contract link with recipient
                                </p>
                            </div>

                            <h3 className="font-semibold text-lg text-gray-800 mt-6">For Recipients:</h3>
                            <div className="bg-green-50 p-4 rounded-lg space-y-2">
                                <p className="flex items-center">
                                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                                    Access the shared contract link
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                                    Connect your MetaMask wallet
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                                    Review contract details
                                </p>
                                <p className="flex items-center">
                                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
                                    Approve to receive funds
                                </p>
                            </div>
                        </div>
                    </DocSection>

                    {/* Technical Requirements */}
                    <DocSection title="Technical Requirements">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                    MetaMask wallet installed
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                    Web3 compatible browser
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                    ETH for gas fees (Sepolia testnet)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                    Internet connection
                                </li>
                            </ul>
                        </div>
                    </DocSection>

                    {/* Security Considerations */}
                    <DocSection title="Security Considerations">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Smart Contract Security</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>• Automated testing suite</li>
                                    <li>• External audit completed</li>
                                    <li>• Timelock mechanisms</li>
                                    <li>• Emergency pause functionality</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">User Security</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>• Secure wallet connections</li>
                                    <li>• Transaction signing</li>
                                    <li>• Rate limiting</li>
                                    <li>• Data encryption</li>
                                </ul>
                            </div>
                        </div>
                    </DocSection>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;