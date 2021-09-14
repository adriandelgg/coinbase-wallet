import { useWeb3React } from '@web3-react/core';
import { connectors } from './connectors';
import useContract from './hooks/useContract';

const Wallets = () => {
	const { activate, active } = useWeb3React();
	const contract = useContract();

	// ! Use this console.log to view all the properties of the context
	// console.log(useWeb3React());

	// ! To get the signer, extract library from useWeb3React()
	// and call `const signer = library.getSigner()` where there you can call signer functions

	return (
		// Only show wallet connection when initialize connection.
		!active &&
		Object.keys(connectors).map(name => {
			const currentConnector = connectors[name];

			return (
				<button
					key={name}
					onClick={() => {
						activate(currentConnector);
					}}
				>
					{name}
				</button>
			);
		})
	);
};

export default Wallets;
