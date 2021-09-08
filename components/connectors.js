import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

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

export const network = new NetworkConnector({
	urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
	defaultChainId: 1
});

export const walletconnect = new WalletConnectConnector({
	rpc: { 1: RPC_URLS[1] },
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[4],
	appName: 'NameOfDapp'
});

export const ledger = new LedgerConnector({
	chainId: 1,
	url: RPC_URLS[1],
	pollingInterval: POLLING_INTERVAL
});

const connectors = {
	Injected: injected,
	Network: network,
	WalletConnect: walletconnect,
	WalletLink: walletlink,
	Ledger: ledger
};

export default connectors;
