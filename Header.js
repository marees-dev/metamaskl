import { connectWallet } from './connectors';

  const log_submit = () => {
    dispatch(
      stateAction.updateAndStoreLocally(
        userConstant.ACCOUNT,
        accountTest,
        'account'
      )
    );
    if (isMeta && chainId === 97) {
      // alert('activity')
      dispatch(
        stateAction.updateAndStoreLocally(
          userConstant.ACTIVATE_STATUS,
          true,
          'isloggin'
        )
      );
      dispatch(
        stateAction.updateAndStoreLocally(userConstant.CHAIN, chainId, 'chain')
      );
      addToast('Logged with Meta Mask Successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else if (isWallet) {
      dispatch(
        stateAction.updateAndStoreLocally(
          userConstant.WALLET_STATUS,
          true,
          'isWallet'
        )
      );
      dispatch(
        stateAction.updateAndStoreLocally(
          userConstant.WALLET_ACCOUNT,
          accountTest,
          'walletAccount'
        )
      );
    }
    setModal1(!modal1);
    setModal(!modal);
    localStorage.getItem('user');
    localStorage.getItem('email');
    console.log(login, '________________________________--isMetano');
  };

  // // log the walletconnect URI
  // React.useEffect(() => {
  //   console.log('running');
  //   const logURI = (uri) => {
  //     console.log('WalletConnect URI', uri);
  //   };
  //   walletconnect.on(URI_AVAILABLE, logURI);
  //   return () => {
  //     walletconnect.off(URI_AVAILABLE, logURI);
  //   };
  // }, []);

  localStorage.setItem('email', email);
  localStorage.setItem('user', active);
  localStorage.setItem('user_detail', accountTest);
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  // for wallet COnnect
  const connectToWallet = async () => {
    setMeta(false);
    const account = await connectWallet();
    setAccountTest(account);
    setWallet(true);
    setMetaLog(true);
  };
  /**
   * Check wallet is connected
   */
  const checkWalletConnect = () => {
    console.log(isWallet, 'wallet connect');
    console.log(typeof accountTest, 'wallet connect');
    isWallet &&
      typeof accountTest === 'string' &&
      addToast('Wallet Connected to Successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    isWallet &&
      typeof accountTest !== 'string' &&
      addToast('Wallet Not connected', {
        appearance: 'success',
        autoDismiss: true,
      });
  };
  useEffect(() => {
    checkWalletConnect();
    if (isWallet && typeof accountTest === 'string') {
      handleAccountConnected();
    }
  }, [isWallet, accountTest]);

  /**
   * handle wallet/metaMask connected
   *
   */
  const handleAccountConnected = () => {
    localStorage.removeItem('token');

    dispatch(
      userAction.login(
        {
          address: accountTest,
          email: email,
          nickName: name,
          user: getUserLogin(),
        },
        (resp) => {
          console.log(resp, 'wallet connect');
          if (!resp.error) {
            log_submit();
            set_loader(false);
            return;
          } else if (resp.message === 'Address already exist') {
            addToast(`Address Already Exist`, {
              appearance: 'error',
              autoDismiss: true,
            });
          } else {
            addToast(
              `Your Metamask Active Address ${
                accountTest && accountTest.substring(0, 12)
              }...${
                accountTest &&
                accountTest.substring(accountTest && accountTest.length - 10)
              } has already Regiser with Other user`,
              { appearance: 'error', autoDismiss: true }
            );
            setMetaLog(false);
            set_loader(false);
            return;
          }
        }
      )
    );
  };
