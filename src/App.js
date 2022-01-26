import React, { useEffect, useState } from 'react';
import './App.css';
import { init, mintToken, getOwnBalance } from './Web3Client';
function App() {
  const [minted, setMinted] = useState(false);
  const [balance, setBalance] = useState(0);

  const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545';
  useEffect(() => {
    init();
  }, []);

  const fetchBalance = () => {
		getOwnBalance()
			.then((balance) => {
				setBalance(balance);
			})
			.catch((err) => {
				console.log(err);
			});
	};

  const mint = () => {
    mintToken()
      .then((tx) => {
        console.log(tx);
        setMinted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="App">
      {!minted ? <button onClick={mint}>Mint Token</button> : <p>Minted</p>}

      <p>Your balance is {balance}</p>
			<button onClick={() => fetchBalance()}>Refresh balance</button>
    </div>
  );
}

export default App;
