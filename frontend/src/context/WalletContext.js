import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';

// Create context for wallet authentication
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      // Check for MetaMask
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            
            setAccount(accounts[0]);
            setProvider(provider);
            setWalletType('metamask');
            setChainId(network.chainId);
          }
        } catch (error) {
          console.error("Error checking existing connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  // Connect to MetaMask
  const connectMetaMask = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      
      setAccount(accounts[0]);
      setProvider(provider);
      setWalletType('metamask');
      setChainId(network.chainId);
      
      // Setup event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
      
      return true;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setError(error.message);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect to WalletConnect
  const connectWalletConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // For simplicity in this demo, we'll simulate WalletConnect
      // In a real implementation, you would use the WalletConnect library
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAccount('0xWalletConnect...1234');
      setProvider({});
      setWalletType('walletconnect');
      setChainId(137); // Polygon
      
      return true;
    } catch (error) {
      console.error("Error connecting to WalletConnect:", error);
      setError(error.message);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect to Phantom
  const connectPhantom = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // For simplicity in this demo, we'll simulate Phantom
      // In a real implementation, you would use the Phantom wallet adapter
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAccount('Phantom...5678');
      setProvider({});
      setWalletType('phantom');
      setChainId(0); // Solana doesn't use EVM chainId
      
      return true;
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
      setError(error.message);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      disconnect();
    } else {
      // User switched accounts
      setAccount(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainIdHex) => {
    // Need to reload the page as recommended by MetaMask
    window.location.reload();
  };

  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
  };

  // Disconnect wallet
  const disconnect = () => {
    if (window.ethereum && walletType === 'metamask') {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    }
    
    setAccount(null);
    setProvider(null);
    setWalletType(null);
    setChainId(null);
  };

  // Connect wallet based on type
  const connectWallet = async (type) => {
    switch (type) {
      case 'metamask':
        return await connectMetaMask();
      case 'walletconnect':
        return await connectWalletConnect();
      case 'phantom':
        return await connectPhantom();
      default:
        setError('Invalid wallet type');
        return false;
    }
  };

  // Check if connected to Polygon
  const isPolygon = () => {
    return chainId === 137 || chainId === 80001; // Mainnet or Mumbai testnet
  };

  // Switch to Polygon network
  const switchToPolygon = async () => {
    if (!provider || walletType !== 'metamask') return false;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // 137 in hex
      });
      return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x89',
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/']
              }
            ],
          });
          return true;
        } catch (addError) {
          console.error("Error adding Polygon network:", addError);
          setError(addError.message);
          return false;
        }
      }
      console.error("Error switching to Polygon network:", error);
      setError(error.message);
      return false;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        walletType,
        chainId,
        isConnecting,
        error,
        connectWallet,
        disconnect,
        isPolygon,
        switchToPolygon
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
