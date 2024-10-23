import { useState } from 'react';
import { ethers } from 'ethers';
import ESCROW from "../../../artifacts/contracts/Escrow.sol/Escrow.json";
import { INFURA_URL } from '../config/constants';

function CreateEscrow() {
    const [alias, setAlias] = useState('');
    const [description, setDescription] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Initialize providers
            const provider = new ethers.JsonRpcProvider(INFURA_URL);
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const signer = await browserProvider.getSigner();

            // Create contract factory with the correct provider
            const EscrowFactory = new ethers.ContractFactory(
                ESCROW.abi,
                ESCROW.bytecode,
                signer
            );

            // Deploy contract
            const escrowContract = await EscrowFactory.deploy(
                receiverAddress,
                alias,
                description,
                { value: ethers.parseEther(amount) }
            );

            await escrowContract.waitForDeployment();
            const contractAddress = await escrowContract.getAddress();

            // Register with backend
            const response = await fetch('http://127.0.0.1:8787/register-contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contractAddress,
                    aliasName: alias,
                    description,
                    receiverAddress,
                    senderAddress: await signer.getAddress()
                })
            });

            const data = await response.json();
            setLink(data.link);

            // Reset form
            setAlias('');
            setDescription('');
            setReceiverAddress('');
            setAmount('');
        } catch (err) {
            setError(err.message);
            console.error('Error creating escrow:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Create Escrow</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Alias"
                        value={alias}
                        onChange={e => setAlias(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Receiver Address"
                        value={receiverAddress}
                        onChange={e => setReceiverAddress(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Amount (ETH)"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {loading ? 'Creating...' : 'Create Escrow'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {link && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800">
                        Contract Link: <a href={link} className="underline">{link}</a>
                    </p>
                </div>
            )}
        </div>
    );
}

export default CreateEscrow;