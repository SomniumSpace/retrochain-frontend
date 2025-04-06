import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WalletButton from '../components/WalletButton';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  background-color: #000080;
  border: 4px solid #c0c0c0;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #00ffff;
  text-shadow: 2px 2px 0 #ff00ff;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const RetroButton = styled(Link)`
  background-color: #c0c0c0;
  color: #000080;
  border: none;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.1s;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background-color: #d0d0d0;
    text-decoration: none;
  }
  
  &:active {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: translateY(2px);
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
`;

const FeatureItem = styled.div`
  background-color: #000080;
  border: 2px solid #c0c0c0;
  padding: 1rem;
  margin: 0.5rem;
  width: 250px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  color: #ff00ff;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #ffffff;
`;

const BlinkingText = styled.span`
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const WalletSection = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 1rem auto;
`;

const LandingPage = () => {
  return (
    <div>
      <Header />
      
      <LandingContainer>
        <Title>RetroChain Chat</Title>
        <Subtitle>A 90s-style chatroom with blockchain superpowers <BlinkingText>_</BlinkingText></Subtitle>
        
        <WalletSection>
          <WalletButton />
        </WalletSection>
        
        <RetroButton to="/chat">
          Enter Chatroom
        </RetroButton>
        
        <FeatureList>
          <FeatureItem>
            <FeatureTitle>Wallet Login</FeatureTitle>
            <FeatureDescription>Connect with MetaMask, WalletConnect, or Phantom</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>Cross-Chain</FeatureTitle>
            <FeatureDescription>Chat with users across multiple blockchains</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>NFT Moments</FeatureTitle>
            <FeatureDescription>Mint memorable conversations as NFTs</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>Message Mining</FeatureTitle>
            <FeatureDescription>Earn rewards for quality participation</FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </LandingContainer>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
