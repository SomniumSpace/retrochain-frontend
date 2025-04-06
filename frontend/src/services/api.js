// API service for interacting with the backend
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Message services
export const messageService = {
  // Get messages for a room
  getMessages: async (roomId) => {
    try {
      const response = await api.get(`/messages/${roomId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
  
  // Send a message (with signature)
  sendMessage: async (message, signature, senderAddress, roomId, chain) => {
    try {
      const response = await api.post('/messages', {
        content: message,
        signature,
        senderAddress,
        roomId,
        chain
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Mint message as NFT
  mintMessageAsNFT: async (messageIds, minterAddress, tokenId, roomId) => {
    try {
      const response = await api.post('/messages/mint', {
        messageIds,
        minterAddress,
        tokenId,
        roomId
      });
      return response.data;
    } catch (error) {
      console.error('Error minting message:', error);
      throw error;
    }
  }
};

// User services
export const userService = {
  // Get user profile
  getUserProfile: async (address) => {
    try {
      const response = await api.get(`/users/${address}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Create or update user
  createOrUpdateUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }
  }
};

// Room services
export const roomService = {
  // Get all public rooms
  getRooms: async () => {
    try {
      const response = await api.get('/rooms');
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },
  
  // Create a new room
  createRoom: async (roomData) => {
    try {
      const response = await api.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }
};

// Socket service for real-time communication
export const createSocketService = (io, token) => {
  const socket = io(API_URL.replace('/api', ''), {
    auth: {
      token
    }
  });
  
  return {
    // Connect to socket
    connect: () => {
      socket.connect();
    },
    
    // Disconnect from socket
    disconnect: () => {
      socket.disconnect();
    },
    
    // Join a room
    joinRoom: (roomId) => {
      socket.emit('join_room', roomId);
    },
    
    // Send a message
    sendMessage: (data) => {
      socket.emit('send_message', data);
    },
    
    // Mint a message
    mintMessage: (data) => {
      socket.emit('mint_message', data);
    },
    
    // Listen for new messages
    onMessage: (callback) => {
      socket.on('receive_message', callback);
    },
    
    // Listen for minted messages
    onMessageMinted: (callback) => {
      socket.on('message_minted', callback);
    },
    
    // Listen for errors
    onError: (callback) => {
      socket.on('error', callback);
    }
  };
};

export default {
  messageService,
  userService,
  roomService,
  createSocketService
};
