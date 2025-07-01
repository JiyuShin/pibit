import React, { useEffect, useState, useCallback, memo } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const FlowerModelView = dynamic(() => import('../components/FlowerModelView'), { 
  ssr: false,
});

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable Custom';
    src: url('/fonts/PretendardVariable.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body, html {
    overflow-y: hidden;
    overflow-x: hidden;
  }
  
  body {
    background: url('/bk2.png') no-repeat center center fixed;
    background-size: cover;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  overflow: hidden;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const LogoImage = styled.div`
  position: absolute;
  top: 60px;
  left: 20px;
  width: 320px;
  height: 80px;
  background-image: url('/whiteb.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  position: absolute;
  width: 876px;
  left: 50%;
  transform: translateX(-50%);
  top: calc(5.5% + 30px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: #9E9E9E;
  margin: 0;
`;

const Subtitle = styled.p`
  position: absolute;
  width: 550px;
  height: 60px;
  left: 50%;
  transform: translateX(-50%);
  top: 143px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #9E9E9E;
  margin: 0;
`;

const Rectangle1 = styled.div`
  position: absolute;
  width: 406px;
  height: 112px;
  left: 86px;
  top: 342px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50px 50px 0px 50px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const Rectangle2 = styled.div`
  position: absolute;
  width: 325px;
  height: 63px;
  left: 1115px;
  top: 434px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 0px 30px;
  transform: ${({ show }) => (show ? 'scaleX(-1) translateY(0)' : 'scaleX(-1) translateY(20px)')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const BubbleText1 = styled.p`
  position: absolute;
  width: 380px;
  left: 102px;
  top: 363px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #B5B5B5;
  margin: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const BubbleButton = styled.button`
  position: absolute;
  width: 280px;
  left: 1141px;
  top: 450px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #B5B5B5;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: pre-wrap;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const FooterBrand = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 658px);
  top: 926px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 15.3px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;
`;

const CopyrightSymbol = styled.div`
    position: absolute;
    width: 458px;
    height: 43px;
    left: calc(50% - 458px / 2 + 733px);
    top: 924px;
    font-family: 'Pretendard Variable', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15.3px;
    line-height: 20px;
    text-align: center;
    color: #B5AECA;
`;

const CopyrightCircle = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 18px;
  height: 18px;
  left: calc(50% - 458px / 2 + 714px);
  top: 924px;
  border: 1px solid #B5AECA;
  border-radius: 50%;
  margin-right: 5px;
`;

const ModelContainer = styled.div`
  transform: translateY(-20px);
`;

const Typewriter = memo(function Typewriter({ text, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayText}</span>;
});

export default function FingerProducePage() {
  const router = useRouter();
  const { name, selectedHabits, finalHabit } = router.query;
  const [step, setStep] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setShowBubbles(true), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleNextStep = useCallback(() => {
    router.push('/pibitdna');
  }, [router]);

  const handleGoBack = () => {
    router.back();
  };

  const typewriterText = name 
    ? `${name}님의 손끝의 불안을 달래주는 Fingercouch 피빗이 탄생했어요!`
    : '손끝의 불안을 달래주는 Fingercouch 피빗이 탄생했어요!';

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>PIBIT - Fingercouch 생성</title>
        <meta name="description" content="Fingercouch 피빗 생성" />
      </Head>
      <main>
        <Root>
          <LogoImage onClick={handleGoBack} />
          
          <Title>
            {step >= 1 && (
              <Typewriter 
                text={typewriterText}
                onComplete={() => setStep(2)}
              />
            )}
          </Title>
          
          <Subtitle>
            {step >= 2 && (
              <Typewriter 
                text="섬세한 촉감으로 머리카락을 만지는 충동을 건강하게 풀어내는 동반자입니다."
              />
            )}
          </Subtitle>

          <ModelContainer>
            <FlowerModelView />
          </ModelContainer>

          <Rectangle1 show={showBubbles} />
          <BubbleText1 show={showBubbles}>
            손끝의 불안과 긴장을 부드럽게 풀어주는 Fingercouch 피빗은
            당신의 마음을 이해하고 섬세한 촉감으로 안정감을 선사합니다.
          </BubbleText1>

          <Rectangle2 show={showBubbles} />
          <BubbleButton show={showBubbles} onClick={handleNextStep}>
            내 피빗 DNA 보기
          </BubbleButton>

          <FooterBrand>Journey to create habit-caretaker companion pibit</FooterBrand>
          <CopyrightSymbol>© 2024 PIBIT</CopyrightSymbol>
          <CopyrightCircle />
        </Root>
      </main>
    </>
  );
} 