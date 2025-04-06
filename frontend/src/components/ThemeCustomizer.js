import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { AssetContext } from '../context/AssetContext';

// Theme definitions based on NFT collections
const themes = {
  default: {
    primary: '#000080', // Navy blue
    secondary: '#c0c0c0', // Silver
    accent: '#00ffff', // Cyan
    highlight: '#ff00ff', // Magenta
    text: '#ffffff', // White
    fontFamily: "'VT323', monospace",
  },
  pixel: {
    primary: '#222034', // Dark blue-gray
    secondary: '#4b5bab', // Medium blue
    accent: '#99e550', // Lime green
    highlight: '#ff004d', // Hot pink
    text: '#ffffff', // White
    fontFamily: "'Press Start 2P', cursive",
  },
  '90s': {
    primary: '#ff6b97', // Pink
    secondary: '#ffdd59', // Yellow
    accent: '#00d2d3', // Teal
    highlight: '#5f27cd', // Purple
    text: '#ffffff', // White
    fontFamily: "'Comic Sans MS', cursive",
  },
  vaporwave: {
    primary: '#91d5ff', // Light blue
    secondary: '#ff71ce', // Pink
    accent: '#01cdfe', // Cyan
    highlight: '#b967ff', // Purple
    text: '#fffb96', // Light yellow
    fontFamily: "'VT323', monospace",
  }
};

// Global styles for each theme
const getGlobalStyles = (theme) => css`
  body {
    background-color: ${theme.primary};
    color: ${theme.text};
    font-family: ${theme.fontFamily};
  }
  
  a {
    color: ${theme.accent};
  }
  
  button {
    font-family: ${theme.fontFamily};
  }
`;

// Styled component for theme preview
const ThemePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ThemePreviewItem = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => themes[props.themeName].primary};
  border: 2px solid ${props => themes[props.themeName].secondary};
  color: ${props => themes[props.themeName].text};
  cursor: pointer;
  
  ${props => props.isActive && `
    border: 2px solid ${themes[props.themeName].highlight};
    box-shadow: 0 0 10px ${themes[props.themeName].highlight};
  `}
`;

const ThemeTitle = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const ThemeColorSwatch = styled.div`
  display: flex;
  width: 80%;
`;

const ColorBlock = styled.div`
  height: 20px;
  flex: 1;
`;

// Main ThemeCustomizer component
const ThemeCustomizer = ({ children }) => {
  const { nfts, getThemeFromNFTs } = useContext(AssetContext);
  const [activeTheme, setActiveTheme] = useState('default');
  
  useEffect(() => {
    // Set theme based on NFTs when they load
    const nftTheme = getThemeFromNFTs();
    setActiveTheme(nftTheme);
  }, [nfts, getThemeFromNFTs]);
  
  const handleThemeChange = (themeName) => {
    setActiveTheme(themeName);
  };
  
  return (
    <ThemeProvider theme={themes[activeTheme]}>
      <div>
        {children}
        
        <ThemePreviewContainer>
          {Object.keys(themes).map(themeName => (
            <ThemePreviewItem 
              key={themeName}
              themeName={themeName}
              isActive={activeTheme === themeName}
              onClick={() => handleThemeChange(themeName)}
            >
              <ThemeColorSwatch>
                <ColorBlock style={{ backgroundColor: themes[themeName].primary }} />
                <ColorBlock style={{ backgroundColor: themes[themeName].secondary }} />
                <ColorBlock style={{ backgroundColor: themes[themeName].accent }} />
              </ThemeColorSwatch>
              <ThemeTitle>{themeName}</ThemeTitle>
            </ThemePreviewItem>
          ))}
        </ThemePreviewContainer>
      </div>
    </ThemeProvider>
  );
};

export default ThemeCustomizer;
