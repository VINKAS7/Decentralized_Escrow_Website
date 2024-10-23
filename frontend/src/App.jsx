import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEscrow from './components/CreateEscrow';
import ContractList from './components/ContractList';
import ApproveEscrow from './components/ApproveEscrow';
import ConnectWallet from './components/ConnectWallet';

function App() {
    return (
        <div>
            <ConnectWallet />
            <Routes>
                <Route path="/" element={<CreateEscrow />} />
                <Route path="/contracts" element={<ContractList />} />
                <Route path="/contract/:contractAddress" element={<ApproveEscrow />} />
            </Routes>
        </div>
    );
}

export default App;
