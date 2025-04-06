import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Styled Components
const FooterContainer = styled.footer`
  background-color: #c0c0c0;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #000080;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: #000080;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BlockchainIcon = styled.span`
  display: inline-block;
  animation: ${rotate} 10s linear infinite;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00ff00;
  animation: ${blink} 2s step-end infinite;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          <BlockchainIcon>⛓️</BlockchainIcon>
          RetroChain © 2025
        </Copyright>
        
        <StatusIndicator>
          <StatusDot />
          Connected to Polygon Network
        </StatusIndicator>
        
        <FooterLinks>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
