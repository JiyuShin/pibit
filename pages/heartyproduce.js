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
    margin: 0;
    padding: 0;
  }
  
  body {
    background: url('/bk2.png') no-repeat center center;
    background-size: cover;
    will-change: auto;
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
  will-change: opacity;
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
  opacity: ${({ show }) => (show ? 1 : 0)};
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
  opacity: ${({ show }) => (show ? 1 : 0)};
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
  transform: translate3d(calc(-50% - 135px), calc(-50% + 126px), 0) scale(${({ show }) => (show ? 0.78 : 0.22)});
  z-index: -2;
  opacity: ${({ show }) => (show ? 0.15 : 0)};
  transition: opacity 2s ease-out, transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, opacity;
`;

const ModelContainer = styled.div`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
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
  will-change: transform;
  backface-visibility: hidden;

  &:nth-child(even) {
    animation-direction: reverse;
  }
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

export default function HeartyProducePage() {
    const router = useRouter();
    const { name = '', selectedHabits, finalHabit } = router.query;
    const [showTitle, setShowTitle] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [showRectangle1, setShowRectangle1] = useState(false);
    const [showBubbleText1, setShowBubbleText1] = useState(false);
    const [showRectangle2, setShowRectangle2] = useState(false);
    const [showBubbleButton, setShowBubbleButton] = useState(false);

    const fullText1 = `안녕 만나서 반가워, 난 입술 피부 조직을 닮은\n말랑이를 쓸어내리며 마음을 살살 달래줄\n따듯하고 중독성 있는 존재야!`;
    const fullText2 = "대화를 시작하고 싶다면 나를 클릭해줘 !";

    useEffect(() => {
        const titleTimer = setTimeout(() => setShowTitle(true), 500);
        const loaderTimer = setTimeout(() => setShowLoader(true), 1000);
        const modelTimer = setTimeout(() => setShowModel(true), 2500);
        const timer1 = setTimeout(() => setShowRectangle1(true), 3500);
        const timer2 = setTimeout(() => setShowBubbleText1(true), 4000);
        return () => {
            clearTimeout(titleTimer);
            clearTimeout(loaderTimer);
            clearTimeout(modelTimer);
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
            pathname: '/heartconver',
            query: { name, selectedHabits: JSON.stringify(selectedHabits) },
        });
    }, [router, name, selectedHabits]);

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>PIBIT - Hearty Produce</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            </Head>
            <GlobalStyle />
            <Root>
                <LogoImage onClick={handleGoBack} />
                <ModelContainer show={showModel}>
                    <FlowerModelView onModelClick={handleStartConversation} modelPath="/heart21.glb"/>
                </ModelContainer>
                
                <ContainerLoader show={showLoader}>
                    <Ball style={{"--color": "#FF69B4", "--i": "13px", "--d": "6.8s"}} />
                    <Ball style={{"--color": "#FF1493", "--i": "19px", "--d": "3.5s"}} />
                    <Ball style={{"--color": "#FF6347", "--i": "11px", "--d": "4.9s"}} />
                    <Ball style={{"--color": "#FF4500", "--i": "17px", "--d": "9.3s"}} />
                    <Ball style={{"--color": "#FFA07A", "--i": "14px", "--d": "2.7s"}} />
                    <Ball style={{"--color": "#FFB6C1", "--i": "10px", "--d": "5.1s"}} />
                    <Ball style={{"--color": "#FFC0CB", "--i": "16px", "--d": "6.6s"}} />
                    <Ball style={{"--color": "#FFE4E1", "--i": "18px", "--d": "7.2s"}} />
                    <Ball style={{"--color": "#FFCCCB", "--i": "12px", "--d": "8.4s"}} />
                    <Ball style={{"--color": "#F08080", "--i": "20px", "--d": "3.9s"}} />
                    <Ball style={{"--color": "#CD5C5C", "--i": "15px", "--d": "4.6s"}} />
                    <Ball style={{"--color": "#DC143C", "--i": "19px", "--d": "5.7s"}} />
                    <Ball style={{"--color": "#B22222", "--i": "11px", "--d": "7.1s"}} />
                    <Ball style={{"--color": "#8B0000", "--i": "13px", "--d": "9.7s"}} />
                    <Ball style={{"--color": "#800000", "--i": "10px", "--d": "6.2s"}} />
                    <Ball style={{"--color": "#FFE4B5", "--i": "14px", "--d": "3.4s"}} />
                    <Ball style={{"--color": "#FFDAB9", "--i": "17px", "--d": "8.9s"}} />
                    <Ball style={{"--color": "#FFCBA4", "--i": "12px", "--d": "7.6s"}} />
                    <Ball style={{"--color": "#FFA500", "--i": "16px", "--d": "4.3s"}} />
                    <Ball style={{"--color": "#FF8C00", "--i": "18px", "--d": "2.8s"}} />
                </ContainerLoader>
                
                <Title show={showTitle}>{name ? `${name}님의` : '당신의'} 첫 맞춤형 Hearty Lip 피빗이 태어났어요!</Title>
                <Subtitle show={showTitle}>
                    데스크탑 앞에 놓여있는 hearty lip 모듈과의 대화를 통해<br/>
                    새로운 습관 개선 여정을 시작하세요
                </Subtitle>
                
                <Rectangle1 show={showRectangle1} />
                <BubbleText1 show={showBubbleText1}>
                    {showBubbleText1 && (
                        <Typewriter text={fullText1} onComplete={handleText1Complete} />
                    )}
                </BubbleText1>

                <Rectangle2 show={showRectangle2} />
                <BubbleButton 
                    show={showBubbleButton} 
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