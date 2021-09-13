import { useWeb3React } from '@web3-react/core';
import { connectors } from './connectors';
import useContract from './hooks/useContract';

// Only show wallet connection when initialize connection.

const Wallets = () => {
	const { activate } = useWeb3React();
	const contract = useContract();

	// Use this console.log to view all the properties of the context
	// console.log(useWeb3React());

	return Object.keys(connectors).map(name => {
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
	});
};

export default Wallets;
