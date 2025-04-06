import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { WalletContext } from '../context/WalletContext';
import { AssetContext } from '../context/AssetContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WalletButton from '../components/WalletButton';
import WalletProfile from '../components/WalletProfile';
import ThemeCustomizer from '../components/ThemeCustomizer';
import CrossChainSelector from '../components/CrossChainSelector';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  background-color: ${props => props.theme.primary || '#000080'};
  border: 4px solid ${props => props.theme.secondary || '#c0c0c0'};
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin-top: 1rem;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
  color: ${props => props.theme.primary || '#000080'};
  padding: 0.5rem 1rem;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  margin-bottom: 1rem;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const OnlineCount = styled.div`
  font-size: 1rem;
`;

const ChatWindow = styled.div`
  flex: 1;
  background-color: #000000;
  border: 2px inset ${props => props.theme.secondary || '#c0c0c0'};
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  color: #00ff00;
`;

const MessageForm = styled.form`
  display: flex;
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
  border: 2px inset #808080;
  padding: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  background-color: #000000;
  color: #00ff00;
  border: 2px inset ${props => props.theme.secondary || '#c0c0c0'};
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
  color: ${props => props.theme.primary || '#000080'};
  border: none;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:active {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.theme.secondary || '#c0c0c0'};
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
  padding: 1rem;
  margin-left: 1rem;
`;

const UserList = styled.div`
  margin-top: 1rem;
`;

const UserItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${props => props.theme.primary || '#000080'};
  color: ${props => props.theme.text || '#ffffff'};
  border: 1px solid ${props => props.theme.text || '#ffffff'};
`;

const ChatLayout = styled.div`
  display: flex;
`;

const MintButton = styled.button`
  background-color: ${props => props.theme.highlight || '#ff00ff'};
  color: ${props => props.theme.text || '#ffffff'};
  border: none;
  border-top: 2px solid #ff99ff;
  border-left: 2px solid #ff99ff;
  border-right: 2px solid #990099;
  border-bottom: 2px solid #990099;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:active {
    border-top: 2px solid #990099;
    border-left: 2px solid #990099;
    border-right: 2px solid #ff99ff;
    border-bottom: 2px solid #ff99ff;
  }
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
`;

const Username = styled.span`
  color: ${props => props.isCurrentUser 
    ? (props.theme.highlight || '#ff00ff') 
    : (props.theme.accent || '#00ffff')};
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

const WalletRequiredMessage = styled.div`
  background-color: #000000;
  color: #ff0000;
  border: 2px solid #ff0000;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.primary || '#000080'};
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.primary || '#000080'};
  padding-bottom: 0.3rem;
`;

const ChatRoom = () => {
  const { account, walletType, isPolygon } = useContext(WalletContext);
  const { fetchAssets } = useContext(AssetContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedChain, setSelectedChain] = useState('polygon');
  
  // Mock data for demonstration
  const users = [
    { id: 1, name: 'CryptoKid95', address: '0x1234...5678' },
    { id: 2, name: 'BlockchainBob', address: '0xabcd...efgh' },
    { id: 3, name: 'ETHGirl', address: '0x9876...5432' },
    { id: 4, name: 'SatoshiFan', address: '0xijkl...mnop' },
    { id: 5, name: 'Web3Wizard', address: '0xqrst...uvwx' },
  ];
  
  // Initialize with some mock messages
  React.useEffect(() => {
    const initialMessages = [
      { id: 1, user: 'CryptoKid95', text: 'Hey everyone! Welcome to RetroChain!', timestamp: '11:22', address: '0x1234...5678' },
      { id: 2, user: 'BlockchainBob', text: 'This 90s style is bringing back memories!', timestamp: '11:23', address: '0xabcd...efgh' },
      { id: 3, user: 'ETHGirl', text: 'Love the retro vibes here', timestamp: '11:24', address: '0x9876...5432' },
      { id: 4, user: 'SatoshiFan', text: 'Anyone remember ICQ and mIRC?', timestamp: '11:25', address: '0xijkl...mnop' },
      { id: 5, user: 'CryptoKid95', text: 'Those were the days! Before social media took over', timestamp: '11:26', address: '0x1234...5678' },
    ];
    setMessages(initialMessages);
    
    // Fetch assets when component mounts if wallet is connected
    if (account) {
      fetchAssets(account, null, walletType);
    }
  }, [account, walletType, fetchAssets]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && account) {
      const now = new Date();
      const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // In a real app, this would send the message to the server
      const newMessage = {
        id: messages.length + 1,
        user: account.substring(0, 6),
        text: message,
        timestamp,
        address: account,
        chain: selectedChain
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const handleChainChange = (chainId) => {
    setSelectedChain(chainId);
    // In a real app, this would switch the message feed to the selected chain
    console.log(`Switched to ${chainId} chain`);
  };
  
  const isUserMessage = (messageAddress) => {
    if (!account) return false;
    return messageAddress === account;
  };
  
  return (
    <ThemeCustomizer>
      <div>
        <Header />
        
        <ChatHeader>
          <ChatTitle>RetroChain Chat</ChatTitle>
          <OnlineCount>{users.length} users online</OnlineCount>
        </ChatHeader>
        
        {!account && (
          <WalletRequiredMessage>
            Please connect your wallet to join the chat
          </WalletRequiredMessage>
        )}
        
        {account && walletType === 'metamask' && !isPolygon() && (
          <WalletRequiredMessage>
            Please switch to Polygon network to use all features
          </WalletRequiredMessage>
        )}
        
        <ChatLayout>
          <ChatContainer>
            <ChatWindow>
              {messages
                .filter(msg => !selectedChain || msg.chain === selectedChain)
                .map((msg) => (
                <Message key={msg.id}>
                  <Username isCurrentUser={isUserMessage(msg.address)}>
                    {msg.user}:
                  </Username>
                  <MessageText> {msg.text}</MessageText>
                  <Timestamp>{msg.timestamp}</Timestamp>
                </Message>
              ))}
            </ChatWindow>
            
            <MessageForm onSubmit={handleSubmit}>
              <MessageInput 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={account ? "Type your message..." : "Connect wallet to chat"} 
                disabled={!account}
              />
              <SendButton type="submit" disabled={!account}>Send</SendButton>
            </MessageForm>
          </ChatContainer>
          
          <Sidebar>
            <WalletButton />
            
            {account && <WalletProfile />}
            
            <SectionTitle>Online Users</SectionTitle>
            <UserList>
              {users.map((user) => (
                <UserItem key={user.id}>{user.name}</UserItem>
              ))}
            </UserList>
            
            {account && <CrossChainSelector onChainChange={handleChainChange} />}
            
            <MintButton 
              disabled={!account || (walletType === 'metamask' && !isPolygon())}
            >
              Mint Chat Moment
            </MintButton>
          </Sidebar>
        </ChatLayout>
        
        <Footer />
      </div>
    </ThemeCustomizer>
  );
};

export default ChatRoom;
