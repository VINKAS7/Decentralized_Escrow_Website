import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ESCROW from "../../../artifacts/contracts/Escrow.sol/Escrow.json"
import {INFURA_URL} from "../config/constants.js";

function ApproveEscrow() {
    const { contractAddress } = useParams();
    const [contractInfo, setContractInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contract, setContract] = useState(null);
    const [senderApproved, setSenderApproved] = useState(false);
    const [receiverApproved, setReceiverApproved] = useState(false);

    useEffect(() => {
        const fetchContractInfo = async () => {
            try {
                // Initialize providers
                const provider = new ethers.JsonRpcProvider(INFURA_URL);
                const browserProvider = new ethers.BrowserProvider(window.ethereum);
                const signer = await browserProvider.getSigner();

                const response = await fetch(`http://127.0.0.1:8787/contract/${contractAddress}`);
                const data = await response.json();
                setContractInfo(data);

                const escrowContract = new ethers.Contract(contractAddress, ESCROW.abi, signer);
                setContract(escrowContract);

                setSenderApproved(await escrowContract.senderApproved());
                setReceiverApproved(await escrowContract.receiverApproved());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContractInfo();
    }, [contractAddress]);

    const approveEscrow = async (type) => {
        try {
            setLoading(true);
            if (type === 'sender') {
                const tx = await contract.approveSender();
                await tx.wait();
                setSenderApproved(true);
            } else {
                const tx = await contract.approveReceiver();
                await tx.wait();
                setReceiverApproved(true);
            }

            // If both approved, delete from Redis
            if ((type === 'sender' && receiverApproved) || (type === 'receiver' && senderApproved)) {
                await fetch('http://127.0.0.1:8787/remove-contract', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contractAddress })
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-red-600 p-8">Error: {error}</div>;
    if (!contractInfo) return <div className="text-center p-8">Contract not found</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Escrow Contract Details</h1>

                <div className="space-y-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Sender Information</h2>
                        <p className="text-gray-700">Alias: {contractInfo.aliasName}</p>
                        <p className="text-gray-600 text-sm break-all">Address: {contractInfo.senderAddress}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Receiver Information</h2>
                        <p className="text-gray-700">Address: {contractInfo.receiverAddress}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Contract Details</h2>
                        <p className="text-gray-700">{contractInfo.description}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => approveEscrow('sender')}
                        disabled={senderApproved || loading}
                        className={`flex-1 py-3 px-4 rounded-lg ${
                            senderApproved
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        } disabled:opacity-50`}
                    >
                        {senderApproved ? 'Sender Approved' : 'Approve as Sender'}
                    </button>

                    <button
                        onClick={() => approveEscrow('receiver')}
                        disabled={receiverApproved || loading}
                        className={`flex-1 py-3 px-4 rounded-lg ${
                            receiverApproved
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        } disabled:opacity-50`}
                    >
                        {receiverApproved ? 'Receiver Approved' : 'Approve as Receiver'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApproveEscrow;