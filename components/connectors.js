import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
	1: process.env.NEXT_PUBLIC_MAINNET_API_KEY,
	3: process.env.NEXT_PUBLIC_ROPSTEN_API_KEY,
	4: process.env.NEXT_PUBLIC_RINKEBY_API_KEY,
	5: process.env.NEXT_PUBLIC_GOERLI_API_KEY,
	42: process.env.NEXT_PUBLIC_KOVAN_API_KEY
};

export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 42, 31337]
});

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1] },
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[4],
	appName: 'Climate DAO'
});

const connectors = {
	Injected: injected,
	WalletConnect: walletconnect,
	WalletLink: walletlink
};

export default connectors;
