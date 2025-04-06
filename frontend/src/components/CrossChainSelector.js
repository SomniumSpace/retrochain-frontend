import React, { useContext } from 'react';
import styled from 'styled-components';
import { WalletContext } from '../context/WalletContext';
import { AssetContext } from '../context/AssetContext';

const CrossChainContainer = styled.div`
  margin-top: 1rem;
`;

const ChainSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ChainButton = styled.button`
  background-color: ${props => props.isActive ? props.color : '#c0c0c0'};
  color: ${props => props.isActive ? '#ffffff' : '#000080'};
  border: none;
  border-top: 2px solid ${props => props.isActive ? props.color : '#ffffff'};
  border-left: 2px solid ${props => props.isActive ? props.color : '#ffffff'};
  border-right: 2px solid ${props => props.isActive ? props.darkColor : '#808080'};
  border-bottom: 2px solid ${props => props.isActive ? props.darkColor : '#808080'};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:active {
    border-top: 2px solid ${props => props.isActive ? props.darkColor : '#808080'};
    border-left: 2px solid ${props => props.isActive ? props.darkColor : '#808080'};
    border-right: 2px solid ${props => props.isActive ? props.color : '#ffffff'};
    border-bottom: 2px solid ${props => props.isActive ? props.color : '#ffffff'};
  }
`;

const ChainInfo = styled.div`
  background-color: #000000;
  border: 2px inset #c0c0c0;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CrossChainSelector = ({ onChainChange }) => {
  const { walletType, chainId, switchToPolygon } = useContext(WalletContext);
  const { walletActivity } = useContext(AssetContext);
  
  // Define supported chains with their colors
  const chains = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      color: '#627eea', 
      darkColor: '#3c5cba',
      chainId: 1
    },
    { 
      id: 'polygon', 
      name: 'Polygon', 
      color: '#8247e5', 
      darkColor: '#6b35c9',
      chainId: 137
    },
    { 
      id: 'optimism', 
      name: 'Optimism', 
      color: '#ff0420', 
      darkColor: '#cc0319',
      chainId: 10
    },
    { 
      id: 'solana', 
      name: 'Solana', 
      color: '#14f195', 
      darkColor: '#0fa06a',
      chainId: 0 // Not EVM
    }
  ];
  
  // Filter chains based on wallet activity
  const availableChains = walletActivity.chains.length > 0
    ? chains.filter(chain => walletActivity.chains.includes(chain.id))
    : chains;
  
  // Determine active chain based on current chainId
  const getActiveChain = () => {
    if (walletType === 'phantom') return 'solana';
    
    switch(chainId) {
      case 1: return 'ethereum';
      case 137: return 'polygon';
      case 10: return 'optimism';
      default: return null;
    }
  };
  
  const activeChain = getActiveChain();
  
  const handleChainSelect = (chainId) => {
    if (chainId === 'polygon' && walletType === 'metamask') {
      switchToPolygon();
    }
    
    if (onChainChange) {
      onChainChange(chainId);
    }
  };
  
  return (
    <CrossChainContainer>
      <h3>Cross-Chain Support</h3>
      
      <ChainSelector>
        {availableChains.map(chain => (
          <ChainButton 
            key={chain.id}
            color={chain.color}
            darkColor={chain.darkColor}
            isActive={activeChain === chain.id}
            onClick={() => handleChainSelect(chain.id)}
          >
            {chain.name}
          </ChainButton>
        ))}
      </ChainSelector>
      
      <ChainInfo>
        {activeChain 
          ? `Connected to ${chains.find(c => c.id === activeChain)?.name || activeChain}`
          : 'Not connected to a supported chain'}
      </ChainInfo>
    </CrossChainContainer>
  );
};

export default CrossChainSelector;
