import React, { createContext, useState, useContext } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from './WalletContext';

// ABI for RetroChainNFT contract
const NFT_ABI = [
  "function mintChatMoment(bytes32 messageHash, address recipient) external payable returns (uint256)",
  "function isMessageMinted(bytes32 messageHash) external view returns (bool)",
  "event ChatMomentMinted(uint256 tokenId, bytes32 messageHash, address minter)"
];

// ABI for MessageMining contract
const MINING_ABI = [
  "function rewardUser(address user, bytes32 messageHash) external",
  "function isEligibleForReward(address user) external view returns (bool)"
];

// Create context for NFT and mining functionality
export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const { account, provider, walletType, isPolygon } = useContext(WalletContext);
  const [nftContract, setNftContract] = useState(null);
  const [miningContract, setMiningContract] = useState(null);
  const [mintingStatus, setMintingStatus] = useState('idle'); // idle, minting, success, error
  const [miningStatus, setMiningStatus] = useState('idle'); // idle, mining, success, error
  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [error, setError] = useState(null);

  // Initialize contracts when provider is available
  React.useEffect(() => {
    if (provider && isPolygon()) {
      try {
        const signer = provider.getSigner();
        
        // NFT contract
        const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
        const nftContractInstance = new ethers.Contract(nftContractAddress, NFT_ABI, signer);
        setNftContract(nftContractInstance);
        
        // Mining contract
        const miningContractAddress = process.env.REACT_APP_MINING_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
        const miningContractInstance = new ethers.Contract(miningContractAddress, MINING_ABI, signer);
        setMiningContract(miningContractInstance);
      } catch (err) {
        console.error('Error initializing contracts:', err);
        setError('Failed to initialize blockchain contracts');
      }
    }
  }, [provider, isPolygon]);

  // Function to mint chat moment as NFT
  const mintChatMoment = async (messages) => {
    if (!nftContract || !account) {
      setError('Wallet not connected or wrong network');
      return null;
    }
    
    try {
      setMintingStatus('minting');
      setError(null);
      
      // Create a hash of the messages
      const messageContent = messages.map(msg => `${msg.user}: ${msg.text}`).join('\n');
      const messageHash = ethers.utils.id(messageContent);
      
      // Check if already minted
      const alreadyMinted = await nftContract.isMessageMinted(messageHash);
      if (alreadyMinted) {
        setError('This conversation has already been minted');
        setMintingStatus('error');
        return null;
      }
      
      // Mint fee in ETH
      const mintFee = ethers.utils.parseEther('0.01');
      
      // Mint the NFT
      const tx = await nftContract.mintChatMoment(messageHash, account, {
        value: mintFee
      });
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      // Get token ID from event
      const event = receipt.events.find(e => e.event === 'ChatMomentMinted');
      const tokenId = event.args.tokenId.toString();
      
      // Add to minted NFTs
      const newNFT = {
        tokenId,
        messageHash,
        messages,
        timestamp: new Date().toISOString()
      };
      
      setMintedNFTs(prev => [...prev, newNFT]);
      setMintingStatus('success');
      
      return tokenId;
    } catch (err) {
      console.error('Error minting chat moment:', err);
      setError(err.message || 'Failed to mint NFT');
      setMintingStatus('error');
      return null;
    }
  };

  // Function to check if a message is eligible for mining rewards
  const checkMiningEligibility = async () => {
    if (!miningContract || !account) {
      return false;
    }
    
    try {
      return await miningContract.isEligibleForReward(account);
    } catch (err) {
      console.error('Error checking mining eligibility:', err);
      return false;
    }
  };

  // Function to simulate message mining (in a real app, this would be done by a backend service)
  const simulateMessageMining = async (message) => {
    if (!account) {
      setError('Wallet not connected');
      return false;
    }
    
    try {
      setMiningStatus('mining');
      setError(null);
      
      // In a real implementation, this would be handled by a backend service
      // that would call the contract method after quality assessment
      
      // Simulate mining delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMiningStatus('success');
      return true;
    } catch (err) {
      console.error('Error mining message:', err);
      setError(err.message || 'Failed to mine message');
      setMiningStatus('error');
      return false;
    }
  };

  // Function to sign a message
  const signMessage = async (message) => {
    if (!provider || !account) {
      setError('Wallet not connected');
      return null;
    }
    
    try {
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      console.error('Error signing message:', err);
      setError(err.message || 'Failed to sign message');
      return null;
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        nftContract,
        miningContract,
        mintingStatus,
        miningStatus,
        mintedNFTs,
        error,
        mintChatMoment,
        checkMiningEligibility,
        simulateMessageMining,
        signMessage
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
