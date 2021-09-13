import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';

// prettier-ignore
const abi = [ { "inputs": [ { "internalType": "string", "name": "_greeting", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "greet", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_greeting", "type": "string" } ], "name": "setGreeting", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

const useContract = () => {
	const { active, account, library, chainId } = useWeb3React();

	return useMemo(() => {
		if (active) {
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
				case 31337: // Hardhat Local
					contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
			}

			const signer = library.getSigner();
			try {
				return new Contract(contractAddress, abi, signer);
			} catch (e) {
				console.log(e);
				return null;
			}
		}
	}, [chainId, account, library]);
};

export default useContract;
