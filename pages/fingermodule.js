import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('/bk2.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    background-color: #FFFFFF;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%) rotate(12.77deg) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotate(12.77deg) scale(0.98);
    opacity: 1;
  }
`;

const textReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.4;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const sensoryTextReveal = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse1 = keyframes`
  0%, 100% {
    transform: translateX(-135px) translateY(30px) rotate(-115deg) scale(1.21);
  }
  50% {
    transform: translateX(-135px) translateY(30px) rotate(-115deg) scale(1.30);
  }
`;

const pulse2 = keyframes`
  0%, 100% {
    transform: translateX(-235px) translateY(-14px) scale(1.3) rotate(-145deg);
  }
  50% {
    transform: translateX(-235px) translateY(-14px) scale(1.39) rotate(-145deg);
  }
`;

const rotateLeft = keyframes`
  from {
    transform: translateX(-135px) translateY(30px) rotate(-115deg) scale(1.21);
  }
  to {
    transform: translateX(-135px) translateY(30px) rotate(-475deg) scale(1.21);
  }
`;

const rotateRight = keyframes`
  from {
    transform: translateX(-235px) translateY(-14px) scale(1.3) rotate(-145deg);
  }
  to {
    transform: translateX(-235px) translateY(-14px) scale(1.3) rotate(215deg);
  }
`;

const slideInHeart = keyframes`
  from {
    transform: translateX(80%);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotate(12deg);
    opacity: 1;
  }
`;

const pulseFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

const FadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.6);
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  &.fade-in {
    animation: fadeInOverlay 1.5s forwards;
    backdrop-filter: blur(8px);
  }

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-in-out;
  overflow-x: hidden;
  overflow-y: hidden;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
`;

const BackgroundGradient1 = styled.div`
  position: absolute;
  width: 1041px;
  height: 1493px;
  left: 52px;
  top: 1000px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 30%, #B1C7AD 100%);
  transform: rotate(-90deg);
  transform-origin: top left;
`;

const BackgroundGradient2 = styled.div`
  position: absolute;
  width: 748.01px;
  height: 982px;
  left: 915.94px;
  top: -428.99px;
  background: linear-gradient(270deg, #B1C7AD 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-52.69deg) scale(1.25);
  z-index: 1;
`;

const HeartImage = styled.div`
  position: absolute;
  width: 1173.44px;
  height: 827.17px;
  left: 348px;
  top: 56px;
  background: url(/module/finger.png);
  background-size: contain;
  background-repeat: no-repeat;
  transform: scale(1.1);
  z-index: 1000;
  opacity: 0;
  animation: ${slideInHeart} 1.5s ease-out forwards;
`;

const Vector1 = styled.div`
  position: absolute;
  left: 17.53%;
  right: 42.89%;
  top: 7.94%;
  bottom: 47.25%;
  background: url(/p7.png);
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(-145px) translateY(30px) rotate(-115deg) scale(1.31);
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.5s forwards, 
             ${rotateLeft} 10s linear infinite 1.5s,
             ${pulseFade} 2s ease-in-out infinite 1.5s;
  z-index: 1;
`;

const Vector2 = styled.div`
  position: absolute;
  left: calc(95.57% - 100px);
  right: -23.28%;
  top: 65.74%;
  bottom: 2.88%;
  background: url(/p8.png);
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(-350px) translateY(-14px) scale(1.5) rotate(-145deg);
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.5s forwards, 
             ${rotateRight} 10s linear infinite 1.5s,
             ${pulseFade} 2s ease-in-out infinite 1.5s;
`;

const PibitLogo = styled.div`
  position: absolute;
  width: 562px;
  height: 75px;
  left: -65px;
  top: 20px;
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 102px;
  text-align: center;
  color: #FFFFFF;
  z-index: 1001;
`;

const HeaderLine = styled.div`
  position: absolute;
  width: 741px;
  height: 0px;
  left: 281px;
  top: 73px;
  border: 1px solid #FFFFFF;
  z-index: 1001;
`;

const HeaderLine2 = styled.div`
  position: absolute;
  width: 63px;
  height: 0px;
  left: 1230px;
  top: 74px;
  border: 1px solid #FFFFFF;
  z-index: 1001;
`;

const BackButton = styled.div`
  position: absolute;
  top: 35px;
  left: 20px;
  width: 320px;
  height: 80px;
  background-image: url('/whiteb.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  z-index: 1001;

  &:hover {
    transform: scale(1.1);
  }
`;

const FooterText = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 197px);
  top: 950px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  color: #B5AECA;
`;

const FiveFlowerBgText = styled.div`
  position: absolute;
  width: 1727px;
  height: 449px;
  left: calc(50% - 1727px/2 - 6px);
  top: calc(50% - 449px/2 - 45.5px);
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 326.7px;
  line-height: 614px;
  text-align: center;
  color: #B5AECA;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
  pointer-events: none;
  z-index: 2;
  
  span {
    opacity: 0;
    display: inline-block;
    animation-fill-mode: forwards;
  }

  &.animated span {
    animation: ${textReveal} 0.8s ease-out forwards;
  }
`;

const Description = styled.div`
  position: absolute;
  left: 64px;
  top: 284px;
  width: 450px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;
  color: #B5B5B5;
  opacity: 0;
  z-index: 1002;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
    animation-delay: 1.5s;
  }
`;

const GenerateButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 181.1px;
  height: 38.4px;
  left: calc(50% - 181.1px/2 + 627.19px);
  top: 53px;
  background: #FFF7E0;
  border: 1px solid #FFD64D;
  box-shadow: 5px 5px 16px 2px rgba(100, 61, 130, 0.25);
  border-radius: 40px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 22px;
  color: #8B8B8B;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1001;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const CustomizeButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 211.2px;
  height: 38.4px;
  left: 1022px;
  top: 53px;
  background: rgba(255, 255, 255, 0.2);
  border: 1.6px solid #FFFFFF;
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.08);
  border-radius: 33.2px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 22px;
  color: #FFFFFF;
  cursor: pointer;
  z-index: 1001;
`;

const ModuleVersionText = styled.div`
  position: absolute;
  left: 62px;
  top: 146px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 30px;
  color: #B5AECA;
  z-index: 1002;
`;

const FiveFlowerTitle = styled.div`
  position: absolute;
  left: 60px;
  top: 212px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 80px;
  line-height: 30px;
  color: #B5AECA;
  z-index: 1002;
`;

const SensoryReliefText = styled.div`
  position: absolute;
  left: calc(65.55% - 40px);
  right: calc(1.06% + 40px);
  top: calc(89.71% - 68px);
  bottom: calc(4.79% + 68px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 41.8px;
  line-height: 42px;
  text-align: right;
  color: #FFFFFF;
  z-index: 999;
  
  span {
    opacity: 0;
    display: inline-block;
    animation-fill-mode: forwards;
  }

  &.animated span {
    animation: ${sensoryTextReveal} 0.6s ease-out forwards;
  }
`;

const InfoCard = styled.div`
  position: absolute;
  width: 281px;
  height: 150px;
  background: linear-gradient(180deg, #B1C7AD 0%, #FFFFFF 100%);
  opacity: 0.6;
  box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const UserPreferenceCard = styled(InfoCard)`
  left: 36px;
  top: 760px;
`;

const UserPreferenceIcon = styled.div`
    position: absolute;
    width: 87px;
    height: 160px;
    left: 71px;
    top: 690px;
    background: url('/cus3.png') no-repeat center center;
    background-size: contain;
    transform: scale(3.02022);
    filter: blur(0.5px);
`;

const UserPreferenceTitle = styled.div`
    position: absolute;
    left: calc(6.88% + 15px);
    right: calc(78.44% - 15px);
    top: calc(80.96% - 16px);
    bottom: calc(14.87% + 20px);
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 23px;
    color: #79A86E;
`;

const UserPreferenceDescription = styled.div`
    position: absolute;
    left: calc(2.58% + 15px);
    right: calc(81.28% - 15px);
    top: calc(86.25% - 20px);
    bottom: calc(7.74% + 20px);
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: right;
    color: #79A86E;
`;

const CompanionTypeCard = styled(InfoCard)`
  left: 351px;
  top: 760px;
  width: 326px;
`;

const CompanionTypeIcon = styled.div`
    position: absolute;
    width: 87px;
    height: 160px;
    left: 386px;
    top: 690px;
    background: url('/lump.png') no-repeat center center;
    background-size: contain;
    transform: scale(2.74);
    color: #FFFFFF;
`;

const CompanionTypeTitle = styled.div`
    position: absolute;
    left: calc(31.73% + 5px);
    right: calc(53.58% - 5px);
    top: calc(80.35% - 16px);
    bottom: calc(11.51% + 20px);
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 35px;
    color: #79A86E;
`;

const CompanionTypeDescription = styled.div`
    position: absolute;
    left: calc(21% + 5px);
    right: calc(57% - 5px);
    top: calc(86% - 20px);
    bottom: calc(5.15% + 20px);
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: right;
    color: #79A86E;
    white-space: pre-line;
`;

export default function FingerModulePage() {
    const router = useRouter();
    const { name, selectedHabits, finalHabit } = router.query;
    const [isExiting, setIsExiting] = useState(false);
    const [startTextAnimation, setStartTextAnimation] = useState(false);
    const [isImageAnimated, setIsImageAnimated] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsImageAnimated(true);

        const timer = setTimeout(() => {
            setStartTextAnimation(true);
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    const handleGenerateClick = () => {
        setShowOverlay(true);
        setTimeout(() => {
            router.push('/stepd');
        }, 1500);
    };

    const handleProduceClick = () => {
        if (isExiting) return;
        setIsExiting(true);
        setTimeout(() => {
            router.push({
                pathname: '/fingerproduce',
                query: { name, selectedHabits, finalHabit }
            });
        }, 1500);
    };

    const line1 = 'Tactile loop tracing to';
    const line2 = 'soothe impulsive tension';

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>PIBIT - Finger Module</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
                <meta name="description" content="피빗 모듈 선택" />
            </Head>
            <main>
                <Root>
                    {showOverlay && <FadeOverlay className="fade-in" />}
                    <BackgroundGradient1 />
                    <BackgroundGradient2 />
                    <HeartImage />
                    <Vector1 />
                    <Vector2 />
                    <HeaderLine />
                    <HeaderLine2 />
                    <BackButton onClick={() => router.back()} />
                    <FiveFlowerBgText className={startTextAnimation ? 'animated' : ''}>
                        {'FingerCouch'.split('').map((char, index) => (
                            <span key={`first-${index}`} style={{
                                animationDelay: `${0.1 * (index + 1)}s`
                            }}>
                                {char}
                            </span>
                        ))}
                    </FiveFlowerBgText>
                    <PibitLogo>PIBIT</PibitLogo>
                                    <ModuleVersionText>Module 5th Ver.</ModuleVersionText>
                <FiveFlowerTitle>Fingercouch</FiveFlowerTitle>
                                          <Description className={startTextAnimation ? 'animated' : ''}>
                          사용자님께 'Fingercouch Module'을 추천드려요!
                        <br />
                        마음에 드신다면 맞춤화 피빗 생성을 시작할게요!
                    </Description>
                    <CustomizeButton onClick={handleGenerateClick}>피빗 커스터마이징</CustomizeButton>
                    <GenerateButton onClick={handleProduceClick}>피빗 생성하기</GenerateButton>
                    <UserPreferenceCard />
                    <UserPreferenceIcon />
                    <UserPreferenceTitle>USER PREFERENCE</UserPreferenceTitle>
                    <UserPreferenceDescription><span style={{ fontSize: '22px' }}>93%</span>의 유저가 머리카락 당기기<br/>습관 개선에 이 모듈을 추천해요!</UserPreferenceDescription>
                    <CompanionTypeCard />
                    <CompanionTypeIcon />
                    <CompanionTypeTitle>COMPANION TYPE</CompanionTypeTitle>
                    <CompanionTypeDescription>섬세한 당김과 풀어내는 반복을 대신할 수 있는<br/>부드러운 촉감으로 머리카락을 만지는 충동을<br/>건강하게 풀어낼 수 있어요.</CompanionTypeDescription>
                    <SensoryReliefText className={startTextAnimation ? 'animated' : ''}>
                        <div style={{ whiteSpace: 'nowrap' }}>
                            {line1.split('').map((char, index) => (
                                <span key={`l1-${index}`} style={{ animationDelay: `${0.05 * (index + 1)}s` }}>
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </div>
                        <div>
                            {line2.split('').map((char, index) => (
                                <span key={`l2-${index}`} style={{ animationDelay: `${0.05 * (line1.length + index + 1)}s` }}>
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </div>
                    </SensoryReliefText>
                    <FooterText>Journey to create habit-caretaker companion pibit</FooterText>
                </Root>
            </main>
        </>
    );
} 