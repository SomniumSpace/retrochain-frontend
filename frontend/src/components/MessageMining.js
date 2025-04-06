import React, { useState, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BlockchainContext } from '../context/BlockchainContext';

// Animations
const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const MiningContainer = styled.div`
  background-color: ${props => props.theme.primary || '#000080'};
  border: 4px solid ${props => props.theme.secondary || '#c0c0c0'};
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const MiningTitle = styled.h3`
  color: ${props => props.theme.accent || '#00ffff'};
  margin-bottom: 1rem;
  text-align: center;
`;

const MiningDescription = styled.p`
  color: #ffffff;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const MiningStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  padding: 0.8rem;
  background-color: #000000;
  border: 2px inset ${props => props.theme.secondary || '#c0c0c0'};
  color: #00ff00;
  font-family: 'Courier New', monospace;
`;

const MiningIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border: 2px solid #00ff00;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${rotate} 1s linear infinite;
`;

const MiningButton = styled.button`
  background-color: ${props => props.theme.accent || '#00ffff'};
  color: ${props => props.theme.primary || '#000080'};
  border: none;
  border-top: 2px solid #99ffff;
  border-left: 2px solid #99ffff;
  border-right: 2px solid #008888;
  border-bottom: 2px solid #008888;
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.1s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #33ffff;
  }
  
  &:active {
    border-top: 2px solid #008888;
    border-left: 2px solid #008888;
    border-right: 2px solid #99ffff;
    border-bottom: 2px solid #99ffff;
    transform: translateY(2px);
  }
  
  &:disabled {
    background-color: #808080;
    cursor: not-allowed;
  }
`;

const RewardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: rgba(0, 255, 0, 0.1);
  border: 1px solid #00ff00;
`;

const RewardLabel = styled.span`
  color: #ffffff;
`;

const RewardValue = styled.span`
  color: #00ff00;
  font-weight: bold;
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

const MessageMining = () => {
  const { 
    checkMiningEligibility, 
    simulateMessageMining, 
    miningStatus, 
    error 
  } = useContext(BlockchainContext);
  
  const [isEligible, setIsEligible] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0);
  
  // Check eligibility on component mount
  useEffect(() => {
    const checkEligibility = async () => {
      const eligible = await checkMiningEligibility();
      setIsEligible(eligible);
    };
    
    checkEligibility();
    
    // Check eligibility every minute
    const interval = setInterval(checkEligibility, 60000);
    
    return () => clearInterval(interval);
  }, [checkMiningEligibility]);
  
  const handleMineMessage = async () => {
    const success = await simulateMessageMining();
    if (success) {
      setTotalRewards(prev => prev + 1);
      setIsEligible(false);
      
      // Reset eligibility after cooldown period
      setTimeout(() => {
        setIsEligible(true);
      }, 60000); // 1 minute cooldown for demo purposes
    }
  };
  
  return (
    <MiningContainer>
      <MiningTitle>Message Mining</MiningTitle>
      
      <MiningDescription>
        Earn RETRO tokens by participating in quality conversations.
        Active and valuable contributions are rewarded through message mining.
      </MiningDescription>
      
      {miningStatus === 'idle' && (
        <MiningStatus>
          {isEligible 
            ? 'You are eligible for mining rewards!' 
            : 'Waiting for cooldown period to end...'}
        </MiningStatus>
      )}
      
      {miningStatus === 'mining' && (
        <MiningStatus>
          <MiningIcon />
          Mining your message<LoadingDots>...</LoadingDots>
        </MiningStatus>
      )}
      
      {miningStatus === 'success' && (
        <MiningStatus>
          Successfully mined! Received 1 RETRO token 🎉
        </MiningStatus>
      )}
      
      {miningStatus === 'error' && error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      <MiningButton 
        onClick={handleMineMessage} 
        disabled={!isEligible || miningStatus === 'mining'}
      >
        Mine Messages
      </MiningButton>
      
      <RewardInfo>
        <RewardLabel>Total Rewards Earned:</RewardLabel>
        <RewardValue>{totalRewards} RETRO</RewardValue>
      </RewardInfo>
    </MiningContainer>
  );
};

export default MessageMining;
