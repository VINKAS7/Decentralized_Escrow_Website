import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ContractList() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContracts = async () => {
        try {
            const account = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
            const response = await fetch(`http://127.0.0.1:8787/contracts/${account}`);
            const data = await response.json();
            setContracts(data.contracts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeContract = async (contractAddress) => {
        try {
            await fetch('http://127.0.0.1:8787/remove-contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contractAddress })
            });
            fetchContracts();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-red-600 p-8">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Contracts</h1>

            {contracts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No contracts found.</p>
            ) : (
                <div className="space-y-4">
                    {contracts.map(contract => (
                        <div
                            key={contract.contractAddress}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {contract.aliasName}
                                    </h2>
                                    <p className="text-gray-600 mt-1">{contract.description}</p>
                                </div>
                                <button
                                    onClick={() => removeContract(contract.contractAddress)}
                                    className="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Contract Address: </span>
                                    <span className="font-mono">{contract.contractAddress}</span>
                                </p>
                                <p>
                                    <span className="font-medium">Sender: </span>
                                    <span className="font-mono">{contract.senderAddress}</span>
                                </p>
                                <p>
                                    <span className="font-medium">Receiver: </span>
                                    <span className="font-mono">{contract.receiverAddress}</span>
                                </p>
                            </div>

                            <Link
                                to={`/contract/${contract.contractAddress}`}
                                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContractList;