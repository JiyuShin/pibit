import React, { useEffect, useState, useCallback, memo } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const FingerModelView = dynamic(() => import('../components/FingerModelView'), { 
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
    background-color: #ffffff;
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/bk2.png') no-repeat center center;
    background-size: cover;
    filter: saturate(1.8);
    z-index: -1;
  }
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 1s ease-in-out 0.3s;
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const Rectangle2 = styled.div`
  position: absolute;
  width: 325px;
  height: 63px;
  left: 1068px;
  top: 434px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 0px 30px;
  transform: ${({ $show }) => ($show ? 'scaleX(-1) translateY(0)' : 'scaleX(-1) translateY(20px)')};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: transform, opacity;
`;

const BubbleButton = styled.button`
  position: absolute;
  width: 280px;
  left: 1094px;
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(20px)')};
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

const move = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const ContainerLoader = styled.aside`
  --size: 314px;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 160px), calc(-50% + 156px)) scale(${({ $show }) => ($show ? 0.9 : 0.18)});
  z-index: -2;
  opacity: ${({ $show }) => ($show ? 0.3 : 0)};
  transition: opacity 2s ease-out, transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;



const Ball = styled.article`
  position: absolute;
  width: calc(var(--size) + var(--i));
  height: calc(var(--size) + var(--i));
  background-color: var(--color);
  border-radius: 50%;
  animation: ${move} 5s linear infinite both;
  transform-origin: var(--size);
  mix-blend-mode: difference;
  animation-duration: var(--d);
  filter: blur(28px) saturate(2.8);

  &:nth-child(even) {
    animation-direction: reverse;
  }
`;

const CopyrightCircle = styled.div`
  box-sizing: border-box;
   position: absolute;
  width: 18px;
  height: 18px;
  left: 1480px;
  top: 927px;
  border: 2px solid #B5AECA;
  border-radius: 50%;
`;

const FooterJourney = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 192px);
  top: 917px;
  font-family: 'Pretendard Variable Custom';
  font-style: normal;
  font-weight: 600;
  font-size: 13.12px;
  line-height: 36px;
  color: #B5AECA;
`;

const Typewriter = memo(function Typewriter({ text, onComplete }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const timerId = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timerId);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 100);

        return () => {
            clearInterval(timerId);
        };
    }, [text, onComplete]);

    return (
        <>
            {displayText.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    {i < displayText.split('\n').length - 1 && <br />}
                </React.Fragment>
            ))}
        </>
    );
});
Typewriter.displayName = 'Typewriter';

export default function FingerProducePage() {
    const router = useRouter();
    const { name = '지수', selectedHabits, finalHabit } = router.query;
    const [showTitle, setShowTitle] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const [showRectangle1, setShowRectangle1] = useState(false);
    const [showBubbleText1, setShowBubbleText1] = useState(false);
    const [showRectangle2, setShowRectangle2] = useState(false);
    const [showBubbleButton, setShowBubbleButton] = useState(false);

    const fullText1 = `안녕! 만나서 반가워, 난 ${name}와 함께\n지내며 머리카락 대신 내 고리들을 천천히 문질러\n긴장을 풀고 당기는 습관을 자연스럽게 덜어주는 친구야!`;
    const fullText2 = "대화를 시작하고 싶다면 나를 클릭해줘 !";

    useEffect(() => {
        const titleTimer = setTimeout(() => setShowTitle(true), 500);
        const loaderTimer = setTimeout(() => setShowLoader(true), 1000);
        const timer1 = setTimeout(() => setShowRectangle1(true), 3500);
        const timer2 = setTimeout(() => setShowBubbleText1(true), 4000);
        return () => {
            clearTimeout(titleTimer);
            clearTimeout(loaderTimer);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleText1Complete = useCallback(() => {
        const timer3 = setTimeout(() => setShowRectangle2(true), 1000);
        const timer4 = setTimeout(() => setShowBubbleButton(true), 1500);
        return () => {
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    const handleStartConversation = useCallback(() => {
        router.push({
            pathname: '/converf',
            query: { name, selectedHabits: JSON.stringify(selectedHabits) },
        });
    }, [router, name, selectedHabits]);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>PIBIT - Finger Produce</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            </Head>
            <GlobalStyle />
            <Root>
                <LogoImage onClick={handleGoBack} />
                <FingerModelView onModelClick={handleStartConversation} modelPath="/finger23.glb"/>
                
                <ContainerLoader $show={showLoader}>
                    <Ball style={{"--color": "#ff6347", "--i": "13px", "--d": "6.8s"}} />
                    <Ball style={{"--color": "#00ced1", "--i": "19px", "--d": "3.5s"}} />
                    <Ball style={{"--color": "#adff2f", "--i": "11px", "--d": "4.9s"}} />
                    <Ball style={{"--color": "#9370db", "--i": "17px", "--d": "9.3s"}} />
                    <Ball style={{"--color": "#ff1493", "--i": "14px", "--d": "2.7s"}} />
                    <Ball style={{"--color": "#00bfff", "--i": "10px", "--d": "5.1s"}} />
                    <Ball style={{"--color": "#7fff00", "--i": "16px", "--d": "6.6s"}} />
                    <Ball style={{"--color": "#dc143c", "--i": "18px", "--d": "7.2s"}} />
                    <Ball style={{"--color": "#8a2be2", "--i": "12px", "--d": "8.4s"}} />
                    <Ball style={{"--color": "#48d1cc", "--i": "20px", "--d": "3.9s"}} />
                    <Ball style={{"--color": "#ff4500", "--i": "15px", "--d": "4.6s"}} />
                    <Ball style={{"--color": "#00ff7f", "--i": "19px", "--d": "5.7s"}} />
                    <Ball style={{"--color": "#ba55d3", "--i": "11px", "--d": "7.1s"}} />
                    <Ball style={{"--color": "#1e90ff", "--i": "13px", "--d": "9.7s"}} />
                    <Ball style={{"--color": "#ffa500", "--i": "10px", "--d": "6.2s"}} />
                    <Ball style={{"--color": "#ff69b4", "--i": "14px", "--d": "3.4s"}} />
                    <Ball style={{"--color": "#00fa9a", "--i": "17px", "--d": "8.9s"}} />
                    <Ball style={{"--color": "#9400d3", "--i": "12px", "--d": "7.6s"}} />
                    <Ball style={{"--color": "#ffb6c1", "--i": "16px", "--d": "4.3s"}} />
                    <Ball style={{"--color": "#20b2aa", "--i": "18px", "--d": "2.8s"}} />
                </ContainerLoader>
                
                <Title $show={showTitle}>{name}님의 첫 맞춤형 Fingercouch 피빗이 태어났어요!</Title>
                <Subtitle $show={showTitle}>
                    데스크탑 앞에 놓여있는 fingercouch 모듈과의 대화를 통해<br/>
                    새로운 습관 개선 여정을 시작하세요
                </Subtitle>
                
                <Rectangle1 $show={showRectangle1} />
                <BubbleText1 $show={showBubbleText1}>
                    {showBubbleText1 && (
                        <Typewriter text={fullText1} onComplete={handleText1Complete} />
                    )}
                </BubbleText1>

                <Rectangle2 $show={showRectangle2} />
                <BubbleButton 
                    $show={showBubbleButton} 
                    onClick={handleStartConversation}
                >
                    {showBubbleButton && <Typewriter text={fullText2} />}
                </BubbleButton>
                
                <FooterJourney>Journey to create habit-caretaker companion pibit</FooterJourney>
                <CopyrightCircle />
                <CopyrightSymbol>a</CopyrightSymbol>
                <FooterBrand>PIBITCOMPANY</FooterBrand>
            </Root>
        </>
    );
} 