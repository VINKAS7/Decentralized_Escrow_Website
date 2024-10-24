import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEscrow from './components/CreateEscrow';
import ContractList from './components/ContractList';
import ApproveEscrow from './components/ApproveEscrow';
import ConnectWallet from './components/ConnectWallet';
import DocumentationPage from "./components/DocumentationPage.jsx";

function App() {
    return (
        <div>
            <ConnectWallet />
            <Routes>
                <Route path="/" element={<CreateEscrow />} />
                <Route path="/docs" element={<DocumentationPage />} />
                <Route path="/contracts" element={<ContractList />} />
                <Route path="/contract/:contractAddress" element={<ApproveEscrow />} />
            </Routes>
        </div>
    );
}

export default App;
