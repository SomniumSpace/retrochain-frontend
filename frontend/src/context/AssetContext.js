import React, { createContext, useState, useEffect } from 'react';

// Create context for asset detection
export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [nfts, setNfts] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletActivity, setWalletActivity] = useState({
    transactionCount: 0,
    firstTransactionDate: null,
    chains: []
  });

  // Function to fetch assets from a wallet
  const fetchAssets = async (address, provider, walletType) => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate fetching assets
      // In a real implementation, you would use APIs like Alchemy, Moralis, or TheGraph
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock NFT data
      const mockNfts = [
        {
          id: '1',
          name: 'Retro Pixel Avatar #1337',
          image: 'https://example.com/nft1.png',
          collection: 'RetroPixels',
          chain: 'ethereum'
        },
        {
          id: '2',
          name: '90s Memorabilia #42',
          image: 'https://example.com/nft2.png',
          collection: '90sNostalgia',
          chain: 'polygon'
        }
      ];
      
      // Mock token data
      const mockTokens = [
        {
          symbol: 'ETH',
          balance: '1.5',
          chain: 'ethereum'
        },
        {
          symbol: 'MATIC',
          balance: '250',
          chain: 'polygon'
        },
        {
          symbol: 'USDC',
          balance: '100',
          chain: 'polygon'
        }
      ];
      
      // Mock wallet activity data
      const mockWalletActivity = {
        transactionCount: 127,
        firstTransactionDate: '2021-05-15',
        chains: ['ethereum', 'polygon', 'optimism']
      };
      
      setNfts(mockNfts);
      setTokens(mockTokens);
      setWalletActivity(mockWalletActivity);
      
      return {
        nfts: mockNfts,
        tokens: mockTokens,
        walletActivity: mockWalletActivity
      };
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to get user experience level based on wallet activity
  const getUserExperienceLevel = () => {
    const { transactionCount, firstTransactionDate, chains } = walletActivity;
    
    if (!transactionCount) return 'Newbie';
    
    if (transactionCount > 100 && chains.length > 2) {
      return 'Expert';
    } else if (transactionCount > 50 || chains.length > 1) {
      return 'Intermediate';
    } else {
      return 'Beginner';
    }
  };

  // Function to get theme based on NFT collections
  const getThemeFromNFTs = () => {
    if (nfts.length === 0) return 'default';
    
    // Check for specific collections that would trigger themes
    const collections = nfts.map(nft => nft.collection.toLowerCase());
    
    if (collections.includes('retropixels')) {
      return 'pixel';
    } else if (collections.includes('90snostalgia')) {
      return '90s';
    } else if (collections.includes('vaporwave')) {
      return 'vaporwave';
    }
    
    return 'default';
  };

  // Function to get badge based on tokens
  const getTokenBadges = () => {
    const badges = [];
    
    tokens.forEach(token => {
      if (token.symbol === 'ETH' && parseFloat(token.balance) > 1) {
        badges.push('ethereum_holder');
      }
      if (token.symbol === 'MATIC' && parseFloat(token.balance) > 100) {
        badges.push('polygon_supporter');
      }
    });
    
    return badges;
  };

  return (
    <AssetContext.Provider
      value={{
        nfts,
        tokens,
        walletActivity,
        loading,
        error,
        fetchAssets,
        getUserExperienceLevel,
        getThemeFromNFTs,
        getTokenBadges
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;
