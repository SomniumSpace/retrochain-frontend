import React, { useState, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BlockchainContext } from '../context/BlockchainContext';

// Animations
const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Styled Components
const NFTMintContainer = styled.div`
  background-color: ${props => props.theme.primary || '#000080'};
  border: 4px solid ${props => props.theme.secondary || '#c0c0c0'};
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
`;

const WindowHeader = styled.div`
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
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
  color: ${props => props.theme.primary || '#000080'};
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
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

const MintTitle = styled.h2`
  color: ${props => props.theme.highlight || '#ff00ff'};
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 0 ${props => props.theme.accent || '#00ffff'};
  animation: ${glitch} 5s infinite;
`;

const ChatPreview = styled.div`
  background-color: #000000;
  border: 2px inset ${props => props.theme.secondary || '#c0c0c0'};
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  max-height: 200px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
`;

const Username = styled.span`
  color: ${props => props.theme.highlight || '#ff00ff'};
  font-weight: bold;
`;

const MessageText = styled.span`
  color: #00ff00;
`;

const Timestamp = styled.span`
  color: #808080;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const MintButton = styled.button`
  background-color: ${props => props.theme.highlight || '#ff00ff'};
  color: #ffffff;
  border: none;
  border-top: 2px solid #ff99ff;
  border-left: 2px solid #ff99ff;
  border-right: 2px solid #990099;
  border-bottom: 2px solid #990099;
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.1s;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: #ff33ff;
  }
  
  &:active {
    border-top: 2px solid #990099;
    border-left: 2px solid #990099;
    border-right: 2px solid #ff99ff;
    border-bottom: 2px solid #ff99ff;
    transform: translateY(2px);
  }
  
  &:disabled {
    background-color: #808080;
    cursor: not-allowed;
  }
`;

const NFTPreview = styled.div`
  background-color: #000000;
  border: 2px solid ${props => props.theme.highlight || '#ff00ff'};
  padding: 1rem;
  margin-top: 1.5rem;
  text-align: center;
`;

const NFTImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  background-color: ${props => props.theme.primary || '#000080'};
  border: 2px solid ${props => props.theme.accent || '#00ffff'};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const NFTText = styled.div`
  color: ${props => props.theme.accent || '#00ffff'};
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const MintingStatus = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #00ff00;
  font-family: 'Courier New', monospace;
`;

const LoadingDots = styled.span`
  animation: ${pulse} 1s infinite;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ff0000;
  background-color: rgba(255, 0, 0, 0.1);
`;

const FeeInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ffffff;
`;

const NFTMintModal = ({ onClose, selectedMessages }) => {
  const { 
    mintChatMoment, 
    mintingStatus, 
    error, 
    mintedNFTs 
  } = useContext(BlockchainContext);
  
  const [tokenId, setTokenId] = useState(null);
  
  const handleMint = async () => {
    const result = await mintChatMoment(selectedMessages);
    if (result) {
      setTokenId(result);
    }
  };
  
  return (
    <NFTMintContainer>
      <WindowHeader>
        <WindowTitle>Mint Chat Moment as NFT</WindowTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </WindowHeader>
      
      <MintTitle>Chat Snapshot</MintTitle>
      
      <ChatPreview>
        {selectedMessages.map((msg, index) => (
          <Message key={index}>
            <Username>{msg.user}: </Username>
            <MessageText>{msg.text}</MessageText>
            <Timestamp>{msg.timestamp}</Timestamp>
          </Message>
        ))}
      </ChatPreview>
      
      {mintingStatus === 'idle' && (
        <>
          <FeeInfo>
            Minting fee: 0.01 MATIC
          </FeeInfo>
          <MintButton onClick={handleMint}>
            Mint as NFT
          </MintButton>
        </>
      )}
      
      {mintingStatus === 'minting' && (
        <MintingStatus>
          Minting your chat moment to the blockchain<LoadingDots>...</LoadingDots>
        </MintingStatus>
      )}
      
      {mintingStatus === 'success' && (
        <>
          <MintingStatus>
            Successfully minted! 🎉
          </MintingStatus>
          
          <NFTPreview>
            <NFTImage>
              <span style={{ color: '#ff00ff', fontSize: '2rem' }}>NFT</span>
            </NFTImage>
            <NFTText>RetroChain Chat Moment #{tokenId || '1337'}</NFTText>
          </NFTPreview>
        </>
      )}
      
      {mintingStatus === 'error' && error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
    </NFTMintContainer>
  );
};

// Default selected messages for demo
NFTMintModal.defaultProps = {
  selectedMessages: [
    { user: 'CryptoKid95', text: 'This 90s style is amazing!', timestamp: '11:42' },
    { user: 'BlockchainBob', text: 'Totally! Reminds me of the good old days', timestamp: '11:43' },
    { user: 'ETHGirl', text: 'I\'m minting this conversation right now!', timestamp: '11:44' },
  ]
};

export default NFTMintModal;
