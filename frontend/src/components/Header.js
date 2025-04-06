import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Styled Components
const HeaderContainer = styled.header`
  background-color: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #000080;
  text-shadow: 1px 1px 0 #ffffff;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.span`
  color: #ff00ff;
  margin-right: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  color: #000080;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border: 1px solid transparent;
  
  &:hover {
    background-color: #d0d0d0;
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #808080;
    border-bottom: 1px solid #808080;
  }
`;

const MarqueeContainer = styled.div`
  background-color: #000000;
  color: #00ff00;
  padding: 0.3rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
`;

const MarqueeText = styled.div`
  display: inline-block;
  animation: ${marquee} 20s linear infinite;
`;

const BlinkingText = styled.span`
  animation: ${blink} 1s step-end infinite;
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Logo>
          <LogoIcon>💬</LogoIcon>
          RetroChain
        </Logo>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/chat">Chat</NavLink>
          <NavLink href="https://github.com/retrochain" target="_blank">GitHub</NavLink>
        </NavLinks>
      </HeaderContainer>
      <MarqueeContainer>
        <MarqueeText>
          Welcome to RetroChain - The 90s-style blockchain chatroom! Connect your wallet to start chatting. Mint memorable conversations as NFTs. Earn rewards through message mining. <BlinkingText>_</BlinkingText>
        </MarqueeText>
      </MarqueeContainer>
    </>
  );
};

export default Header;
