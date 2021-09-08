import connectors from './connectors';
import { useWeb3React } from '@web3-react/core';

const Wallets = () => {
	// These are the context values the useWeb3React hook has
	const { account, activate, active, connector, deactivate, error, setError } =
		useWeb3React();

	return Object.keys(connectors).map(name => {
		const currentConnector = connectors[name];

		return (
			<button onClick={() => activate(currentConnector)} key={name}>
				{name}
			</button>
		);
	});
};

export default Wallets;
