import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
let web3;




//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
  infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
  supportedChainIds: [1, 4],
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});




export async function connectWallet() {
  let r;

  // const web3 = new Web3(provider);

  try {
    r = await provider.enable();
  } catch (ex) {
    console.log('wall connect', ex);
  }
  console.log('wall connect', r);
  web3 = new Web3(provider);

  //  Get Accounts
  const accounts = await web3.eth.getAccounts();
  console.log('accounts', accounts);

  // //  Get Chain Id
  // const chainId = await web3.eth.chainId();
  // console.log('chainId', chainId);

  // //  Get Network Id
  // const networkId = await web3.eth.net.getId();
  // console.log('networkId', networkId);

  // // Send Transaction
  // const txHash = await web3.eth.sendTransaction(tx);
  // console.log('txHash', txHash);

  // // Sign Transaction
  // const signedTx = await web3.eth.signTransaction(tx);
  // console.log('signedTx', signedTx);

  // // Sign Message
  // const signedMessage = await web3.eth.sign(msg);
  // console.log('signedMessage', signedMessage);

  // // Sign Typed Data
  // const signedTypedData = await web3.eth.signTypedData(msg);
  // console.log('signedTypedData', signedTypedData);
  // try {
  //   r = await activate(walletconnect);
  // } catch (ex) {
  //   console.log('wall connect', ex);
  // }
  // You can also then use this:
  // provider.on('network', (network, oldNetwork) => {
  //   console.log(network.chainId);
  // });
  // // Subscribe to accounts change
  // provider.on('accountsChanged', (accounts) => {
  //   console.log('new test', accounts);
  // });

  // // Subscribe to chainId change
  // provider.on('chainChanged', (chainId) => {
  //   console.log('new test', chainId);
  // });

  // // Subscribe to session disconnection
  // provider.on('disconnect', (code, reason) => {
  //   console.log('new test', code, reason);
  // });

  // console.log('new test', await web3.eth.net.getNetworkType());
  // // web3.on('accountsChanged', function (accounts) {
  // //   // Time to reload your interface with accounts[0]!
  // // });

  // // web3.on('networkChanged', function (networkId) {
  // //   // Time to reload your interface with the new networkId
  // // });
  console.log('wall connect', r);
  return r[0];
}

export const onChainChangedHandler = () => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', async () => {
      if (window.ethereum.chainId !== '0x61') {
        const currentNetworkName = await web3.eth.net.getNetworkType();
        console.log('new test', 'wrong network', currentNetworkName);
      }
    });
  }
};
