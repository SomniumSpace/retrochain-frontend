import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WalletContext } from '../context/WalletContext';
import { AssetContext } from '../context/AssetContext';

const ProfileContainer = styled.div`
  background-color: #000080;
  border: 2px solid #c0c0c0;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Username = styled.h3`
  color: #ffffff;
  margin: 0;
`;

const ExperienceLevel = styled.div`
  background-color: ${props => {
    switch(props.level) {
      case 'Expert': return '#ff00ff';
      case 'Intermediate': return '#00ffff';
      case 'Beginner': return '#00ff00';
      default: return '#ffffff';
    }
  }};
  color: #000000;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid #c0c0c0;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Badge = styled.div`
  background-color: #c0c0c0;
  color: #000080;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #808080;
  border-bottom: 1px solid #808080;
`;

const ChainBadge = styled(Badge)`
  background-color: ${props => {
    switch(props.chain) {
      case 'ethereum': return '#627eea';
      case 'polygon': return '#8247e5';
      case 'optimism': return '#ff0420';
      case 'solana': return '#14f195';
      default: return '#c0c0c0';
    }
  }};
  color: #ffffff;
`;

const WalletProfile = () => {
  const { account, walletType } = useContext(WalletContext);
  const { 
    fetchAssets, 
    getUserExperienceLevel, 
    getTokenBadges,
    walletActivity,
    loading
  } = useContext(AssetContext);
  
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    if (account) {
      // Generate a username based on wallet address
      if (walletType === 'phantom') {
        setUsername('Phantom_User');
      } else {
        setUsername(`${account.substring(2, 6)}${account.substring(account.length - 4)}`);
      }
      
      // Fetch assets when wallet connects
      fetchAssets(account, null, walletType);
    }
  }, [account, walletType, fetchAssets]);
  
  if (!account) return null;
  
  const experienceLevel = getUserExperienceLevel();
  const tokenBadges = getTokenBadges();
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <Username>{username}</Username>
        <ExperienceLevel level={experienceLevel}>
          {experienceLevel}
        </ExperienceLevel>
      </ProfileHeader>
      
      <BadgeContainer>
        {walletActivity.chains.map((chain, index) => (
          <ChainBadge key={index} chain={chain}>
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </ChainBadge>
        ))}
        
        {tokenBadges.map((badge, index) => (
          <Badge key={index}>
            {badge === 'ethereum_holder' ? 'ETH Holder' : 'MATIC Supporter'}
          </Badge>
        ))}
        
        {walletActivity.transactionCount > 100 && (
          <Badge>100+ Transactions</Badge>
        )}
      </BadgeContainer>
    </ProfileContainer>
  );
};

export default WalletProfile;
