import { onChainChangedHandler, provider } from './connectors';  

useEffect(() => {
    onChainChangedHandler()
  }, [window])
