import Walletlink from 'walletlink';
import { Web3Provider } from '@ethersproject/providers';
import { verifyMessage } from '@ethersproject/wallet';
import { ethers } from 'ethers';

const ETH_JSONRPC_URL = process.env.NEXT_PUBLIC_RINKEBY_API_KEY;
const CHAIN_ID = 3;

const CoinBase = () => {
	async function enableCoinBase() {
		const walletLink = new Walletlink({
			appName: 'Climate DAO',
			appLogoUrl: 'https://example.com/logo.png',
			darkMode: false
		});

		// // Initialize a Web3 Provider object
		const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
		const provider = new Web3Provider(ethereum);

		const [account] = await ethereum.send('eth_requestAccounts');
		const signer = provider.getSigner(
			// '0x9977593c73566afE015BEfF0a3ea06Cf521763D8'
			account
		);
		console.log(signer);
		const signerAddress = await signer.getAddress();
		console.log(signerAddress);
		const coinbaseAddress = '0x9977593c73566afE015BEfF0a3ea06Cf521763D8';
		console.log(signerAddress === coinbaseAddress);

		try {
			// const messageBytes = ethers.utils.arrayify('hi');
			const signature = await signer.signMessage('hi');
			console.log(signature);
			const address = verifyMessage('hi', signature);
			// const addressBytes = verifyMessage(messageBytes, signature);
			console.log(address);
			// console.log(addressBytes);

			console.log(address.toLowerCase() === signerAddress.toLowerCase());
			// console.log(addressBytes.toLowerCase() === signerAddress.toLowerCase());
		} catch (e) {
			console.log(e);
		}
	}

	return <button onClick={enableCoinBase}>Enable Coinbase</button>;
};

export default CoinBase;
