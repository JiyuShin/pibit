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

const BgImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: url('/bk2.png') no-repeat center center;
  background-size: cover;
  z-index: -100;
`;

const LogoImage = styled.div`
  position: absolute;
  top: 15px;
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
  top: 5.5%;
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
  top: 113px;
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
  height: 100px;
  left: 86px;
  top: 262px;
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
  top: 354px;
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
  top: 288px;
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
  top: 370px;
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
  top: 831px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;
`;

const CopyrightSymbol = styled.div`
    position: absolute;
    width: 458px;
    height: 43px;
    left: calc(50% - 458px / 2 + 733px);
    top: 829px;
    font-family: 'Pretendard Variable', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
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
  top: 832px;
  border: 2px solid #B5AECA;
  border-radius: 50%;
`;

const FooterJourney = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 192px);
  top: 822px;
  font-family: 'Pretendard Variable Custom';
  font-style: normal;
  font-weight: 600;
  font-size: 14.58px;
  line-height: 36px;
  color: #B5AECA;
`;

const Typewriter = memo(function Typewriter({ text, onComplete }) {
    const [displayText, setDisplayText] = useState('');
    const index = React.useRef(0);
    const timerRef = React.useRef(null);

    const type = React.useCallback(() => {
        if (index.current < text.length) {
            setDisplayText((prev) => prev + text.charAt(index.current));
            index.current += 1;
            timerRef.current = setTimeout(type, 200);
        } else {
            if (onComplete) onComplete();
        }
    }, [text, onComplete]);

    React.useEffect(() => {
        setDisplayText('');
        index.current = 0;
        if (text.length > 0) {
            setDisplayText(text[0]);
            index.current = 1;
            timerRef.current = setTimeout(type, 200);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, type]);

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

export default function FlowerProducePage() {
    const router = useRouter();
    const { name: queryName, selectedHabits } = router.query;
    const [name, setName] = useState("당신");
    const [showRectangle1, setShowRectangle1] = useState(false);
    const [showBubbleText1, setShowBubbleText1] = useState(false);
    const [showRectangle2, setShowRectangle2] = useState(false);
    const [showBubbleButton, setShowBubbleButton] = useState(false);

    const fullText1 = " 안녕! 만나서 반가워, 난 지수와 함께 지내며\n손톱물어뜯기를 곁에서 돌봐줄 따듯하고 포근한 존재야!";
    const fullText2 = " 대화를 시작하고 싶다면 나를 클릭해줘 !";

    useEffect(() => {
        if (router.isReady && queryName) {
            setName(queryName);
        }
    }, [router.isReady, queryName]);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowRectangle1(true), 500);
        const timer2 = setTimeout(() => setShowBubbleText1(true), 1000);
        return () => {
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
            <GlobalStyle />
            <Head>
                <title>PIBIT - 피빗 생성 완료</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Pretendard+Variable:opsz,wght@10..144,600&display=swap" rel="stylesheet" />
            </Head>
            <Root>
                <BgImage />
                <LogoImage onClick={handleGoBack} />
                <FlowerModelView onModelClick={handleStartConversation}/>
                <Title>{name}님의 첫 맞춤형 피빗이 태어났어요!</Title>
                <Subtitle>
                    데스크탑 앞에 놓여있는 five flower 모듈과의 대화를 통해<br/>
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