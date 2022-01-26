import Web3 from 'web3';
import contract from './contracts/NFT.json';
let selectedAccount;
let isInitalized = false;
let nftContract;
let erc20Contract;
let bal;
export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== undefined) {
    // metamask is installed
    provider
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(accounts);
      })
      .catch((e) => {
        console.log(e);
        return;
      });

    provider.on('accountsChanged', (accounts) => {
      console.log(accounts);
      selectedAccount = accounts[0];
    });
    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    console.log(contract.networks);
    nftContract = new web3.eth.Contract(
      contract.abi,
      contract.networks[networkId].address
    );

    const erc20Abi = [
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    erc20Contract = new web3.eth.Contract(
      erc20Abi,
      // Dai contract on Rinkeby
      '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'
    );

    bal = async () => {
      return await web3.eth.getBalance(selectedAccount);
    };
    isInitalized = true;
  }
};

export const getOwnBalance = async () => {
  if (!isInitalized) {
    await init();
  }
  return bal();
  // return erc20Contract.methods
  // 	.balanceOf(selectedAccount)
  // 	.call()
  // 	.then((balance) => {
  // 		return Web3.utils.fromWei(balance);
  // 	});
};

export const mintToken = async () => {
  if (!isInitalized) {
    await init();
  }
  return nftContract.methods
    .mint(selectedAccount)
    .send({ from: selectedAccount });
};
