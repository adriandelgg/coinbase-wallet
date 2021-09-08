import connectors from './connectors';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
// prettier-ignore
const abi = [ { "inputs": [ { "internalType": "string", "name": "_greeting", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "greet", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_greeting", "type": "string" } ], "name": "setGreeting", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

const Wallets = () => {
	const [contract, setContract] = useState(null);
	// These are the context values the useWeb3React hook has
	const {
		account,
		activate,
		active,
		connector,
		deactivate,
		error,
		setError,
		library,
		chainId
	} = useWeb3React();

	console.log(useWeb3React());
	// Instantiates the contract after a wallet has been connected
	useEffect(() => {
		if (active) {
			(async () => {
				const signer = library.getSigner();
				console.log(signer);
				let contractAddress;
				switch (chainId) {
					case 1: // Mainnet
						contractAddress = '';
						break;
					case 3: // Ropsten
						contractAddress = '';
						break;
					case 4: // Rinkeby
						contractAddress = '0x964348dE4Ef406F1913a6745BF43f4AEBFf5b58C';
						break;
					case 5: // Goerli
						contractAddress = '';
						break;
					case 42: // Kovan
						contractAddress = '';
						break;
					case 31137: // Hardhat Local
						contractAddress = '';
				}
				const contract = new Contract(contractAddress, abi, signer);

				setContract(contract);
				const tx = await contract.setGreeting('yooo');
				console.log(tx);
				const result = await contract.greet();
				console.log(result);
			})();
		}
	}, [active]);

	// async function enableWallet() {
	// 	try {
	// 		if (window.ethereum) {
	// 			const signer = library.getSigner();
	// 			signer.getAddress().then(console.log);
	// 			const contract = new ethers.Contract(
	// 				'0x5FbDB2315678afecb367f032d93F642f64180aa3',
	// 				abi,
	// 				signer
	// 			);
	// 			setContract(contract);
	// 			const tx = await contract.setGreeting('hello');
	// 			console.log(tx);
	// 			const result = await contract.greet();
	// 			console.log(result);
	// 		}
	// 	} catch (e) {}
	// }

	// console.log(useWeb3React());

	return (
		<>
			{Object.keys(connectors).map(name => {
				const currentConnector = connectors[name];

				return (
					<button
						onClick={() => {
							activate(currentConnector);
						}}
						key={name}
					>
						{name}
					</button>
				);
			})}
			{active && (
				<button
					onClick={async () => {
						await contract.setGreeting('yooo');
					}}
				>
					TX
				</button>
			)}
		</>
	);
};

export default Wallets;
