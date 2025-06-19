import "@/styles/globals.css";
import { createGlobalStyle } from 'styled-components';
import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fff;
    color: #333;
    line-height: 1.6;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio('/aqua.mp3');
        audioRef.current.loop = true;
    }
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.log("브라우저 정책으로 인해 자동 재생이 차단되었습니다. 사용자 상호작용 후 재생됩니다.");
      });
    }
  }, []);
  
  const value = { playAudio };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AudioProvider>
  );
}
