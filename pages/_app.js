import "@/styles/globals.css";
import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react';

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
      <Component {...pageProps} />
    </AudioProvider>
  );
}
