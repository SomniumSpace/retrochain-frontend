import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { WalletContext } from '../context/WalletContext';
import WalletConnectModal from './WalletConnectModal';

const WalletButtonContainer = styled.div`
  margin-bottom: 1rem;
`;

const RetroButton = styled.button`
  background-color: #c0c0c0;
  color: #000080;
  border: none;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:active {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
`;

const WalletAddress = styled.div`
  background-color: #000000;
  color: #00ff00;
  border: 2px inset #c0c0c0;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NetworkBadge = styled.div`
  background-color: ${props => props.isCorrectNetwork ? '#00ff00' : '#ff0000'};
  color: #000000;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  margin-top: 0.5rem;
  display: inline-block;
  border: 1px solid #c0c0c0;
`;

const WalletButton = () => {
  const { 
    account, 
    walletType, 
    isConnecting, 
    connectWallet, 
    disconnect,
    isPolygon,
    switchToPolygon
  } = useContext(WalletContext);
  
  const [showModal, setShowModal] = useState(false);
  
  const handleConnect = () => {
    if (account) {
      disconnect();
    } else {
      setShowModal(true);
    }
  };
  
  const handleWalletSelect = async (type) => {
    const success = await connectWallet(type);
    if (success) {
      setShowModal(false);
    }
  };
  
  const handleSwitchNetwork = async () => {
    await switchToPolygon();
  };
  
  const formatAddress = (address) => {
    if (!address) return '';
    if (address.startsWith('Phantom')) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const getWalletLabel = () => {
    if (isConnecting) return 'Connecting...';
    if (account) return 'Disconnect Wallet';
    return 'Connect Wallet';
  };
  
  return (
    <WalletButtonContainer>
      <RetroButton onClick={handleConnect}>
        {getWalletLabel()}
      </RetroButton>
      
      {account && (
        <>
          <WalletAddress>
            {formatAddress(account)} ({walletType})
          </WalletAddress>
          
          {walletType === 'metamask' && (
            <>
              <NetworkBadge isCorrectNetwork={isPolygon()}>
                {isPolygon() ? 'Polygon Network' : 'Wrong Network'}
              </NetworkBadge>
              
              {!isPolygon() && (
                <RetroButton onClick={handleSwitchNetwork} style={{ marginTop: '0.5rem' }}>
                  Switch to Polygon
                </RetroButton>
              )}
            </>
          )}
        </>
      )}
      
      {showModal && (
        <WalletConnectModal 
          onClose={() => setShowModal(false)} 
          onConnect={handleWalletSelect}
        />
      )}
    </WalletButtonContainer>
  );
};

export default WalletButton;
