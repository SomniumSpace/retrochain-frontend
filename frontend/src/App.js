import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LandingPage from './pages/LandingPage';
import ChatRoom from './pages/ChatRoom';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'VT323', monospace;
    background-color: #000080;
    color: #ffffff;
    line-height: 1.6;
  }
  
  a {
    color: #00ffff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    font-family: 'VT323', monospace;
    cursor: pointer;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </AppContainer>
    </>
  );
}

export default App;
