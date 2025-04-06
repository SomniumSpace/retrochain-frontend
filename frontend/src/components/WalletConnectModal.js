import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

// Styled Components
const WalletConnectContainer = styled.div`
  background-color: #000080;
  border: 4px solid #c0c0c0;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
  }
`;

const WindowHeader = styled.div`
  background-color: #c0c0c0;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  margin-bottom: 1rem;
`;

const WindowTitle = styled.h3`
  margin: 0;
  color: #000080;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background-color: #c0c0c0;
  border: 1px solid #808080;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  
  &:hover {
    background-color: #ff0000;
    color: #ffffff;
  }
`;

const WalletTitle = styled.h2`
  color: #00ffff;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 0 #ff00ff;
  animation: ${glitch} 5s infinite;
`;

const WalletOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WalletButton = styled.button`
  background-color: #c0c0c0;
  color: #000080;
  border: none;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
  
  &:hover {
    background-color: #d0d0d0;
  }
  
  &:active {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: translateY(2px);
  }
`;

const WalletIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-color: ${props => props.color || '#000080'};
  border-radius: ${props => props.rounded ? '50%' : '0'};
`;

const ConnectingText = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  
  &::after {
    content: '_';
    animation: ${blink} 1s step-end infinite;
  }
`;

const WalletConnectModal = ({ onClose, onConnect }) => {
  const [connecting, setConnecting] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = React.useState(null);
  
  const handleConnect = (walletType) => {
    setSelectedWallet(walletType);
    setConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      onConnect(walletType);
    }, 2000);
  };
  
  return (
    <WalletConnectContainer>
      <WindowHeader>
        <WindowTitle>Connect Your Wallet</WindowTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </WindowHeader>
      
      <WalletTitle>Choose Your Wallet</WalletTitle>
      
      {!connecting ? (
        <WalletOptions>
          <WalletButton onClick={() => handleConnect('metamask')}>
            <WalletIcon color="#F6851B" />
            MetaMask
          </WalletButton>
          
          <WalletButton onClick={() => handleConnect('walletconnect')}>
            <WalletIcon color="#3B99FC" rounded />
            WalletConnect
          </WalletButton>
          
          <WalletButton onClick={() => handleConnect('phantom')}>
            <WalletIcon color="#AB9FF2" />
            Phantom Wallet
          </WalletButton>
        </WalletOptions>
      ) : (
        <ConnectingText>
          Connecting to {selectedWallet}...
        </ConnectingText>
      )}
    </WalletConnectContainer>
  );
};

export default WalletConnectModal;
