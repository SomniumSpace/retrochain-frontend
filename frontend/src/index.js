import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { AssetProvider } from './context/AssetContext';
import { BlockchainProvider } from './context/BlockchainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider>
      <AssetProvider>
        <BlockchainProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlockchainProvider>
      </AssetProvider>
    </WalletProvider>
  </React.StrictMode>
);
