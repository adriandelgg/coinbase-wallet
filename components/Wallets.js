import { useWeb3React } from '@web3-react/core';
import connectors from './connectors';
import useContract from './hooks/useContract';

const Wallets = () => {
	const { activate } = useWeb3React();
	const contract = useContract();
	// Use this console.log to view all the properties of the context
	// console.log(useWeb3React());

	return Object.keys(connectors).map(name => {
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
	});
};

export default Wallets;
