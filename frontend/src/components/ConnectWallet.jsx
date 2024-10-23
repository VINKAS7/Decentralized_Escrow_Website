import { useState } from 'react';

function ConnectWallet() {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            setLoading(true);
            setError(null);
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (err) {
                setError('Failed to connect wallet. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('MetaMask is required to use this application.');
        }
    };

    return (
        <div className="flex justify-between p-5 pl-10 pr-10 bg-">
            <div className={"font-bold text-2xl"}>DeEscrow</div>
            <div className={""}>
                <div></div>
                <div>
                    {!account && (
                        <button
                            onClick={connectWallet}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {loading ? 'Connecting...' : 'Connect MetaMask'}
                        </button>
                    )}
                    {account && (
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-green-800">
                                Connected: <span className="font-mono">{account}</span>
                            </p>
                        </div>
                    )}
                    {error && (
                        <p className="text-red-600 mt-2">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;