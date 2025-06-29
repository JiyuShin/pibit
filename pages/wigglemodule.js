import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    background: url('/bk2.png') no-repeat center center fixed;
    background-size: cover;
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
    transform: translateX(-135px) translateY(30px) rotate(-5deg) scale(1.21);
  }
  50% {
    transform: translateX(-135px) translateY(30px) rotate(-5deg) scale(1.30);
  }
`;

const pulse2 = keyframes`
  0%, 100% {
    transform: translateX(-115px) translateY(56px) scale(1.9) rotate(5deg);
  }
  50% {
    transform: translateX(-115px) translateY(56px) scale(1.99) rotate(5deg);
  }
`;

const slideInHeart = keyframes`
  from {
    transform: translateX(80%);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(-80px) scale(1.35) rotate(25deg);
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
  overflow-y: auto;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
`;

const BackgroundGradient1 = styled.div`
  position: absolute;
  width: 1041px;
  height: 1493px;
  left: 52px;
  top: 1000px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 30%, #D3EADC 100%);
  transform: rotate(-90deg);
  transform-origin: top left;
`;

const BackgroundGradient2 = styled.div`
  position: absolute;
  width: 748.01px;
  height: 982px;
  left: 870.94px;
  top: -318.99px;
  background: linear-gradient(270deg, #D3EADC 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-52.69deg) scale(1.15);
  z-index: 1;
`;

const HeartImage = styled.div`
  position: absolute;
  width: 1342px;
  height: 946px;
  left: 233px;
  top: 81px;
  background: url(/module/wiggle.png);
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1000;
  filter: brightness(1.2);
  opacity: 0;
  animation: ${slideInHeart} 1.5s ease-out forwards;
`;

const WiggleVector1 = styled.div`
  position: absolute;
  left: 38.56%;
  right: 39.12%;
  top: -16.13%;
  bottom: 82.21%;
  background: url('/w2.png') no-repeat center center;
  background-size: contain;
  transform: translateX(-175px) translateY(-10px) rotate(34.97deg) scale(2.15);
`;

const WiggleVector2 = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%) rotate(85.41deg);
  background: url('/w3.png') no-repeat center center;
  background-size: contain;
  z-index: 1002;
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
  left: calc(50% - 1727px/2 + 5px);
  top: calc(50% - 449px/2 - 14.5px);
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 363px;
  line-height: 614px;
  text-align: center;
  color: #B5AECA;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
  pointer-events: none;
  
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
`;

const FiveFlowerTitle = styled.div`
  position: absolute;
  left: 60px;
  top: 207px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 80px;
  line-height: 30px;
  color: #B5AECA;
`;

const SensoryReliefText = styled.div`
  position: absolute;
  left: calc(65.55% - 40px);
  right: calc(1.06% + 40px);
  top: calc(89.71% - 22px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 42px;
  text-align: right;
  color: #FFF9D5;
  
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
  background: linear-gradient(180deg, #E8D1D7 0%, #FFFFFF 100%);
  opacity: 0.6;
  box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const UserPreferenceCard = styled(InfoCard)`
  left: 16px;
  top: 780px;
`;

const UserPreferenceIcon = styled.div`
    box-sizing: border-box;
    position: absolute;
    left: calc(1.72% + 5px);
    right: calc(87.77% - 5px);
    top: calc(75.36% - 2px);
    bottom: 15.48%;
    background: url('/cus5.png') no-repeat center center;
    background-size: contain;
    transform: translateX(-12px) scale(1.40);
    filter: blur(0.5px);
`;

const UserPreferenceTitle = styled.div`
    position: absolute;
    left: 6.88%;
    top: 80.96%;
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 23px;
    color: #B5AECA;
`;

const UserPreferenceDescription = styled.div`
    position: absolute;
    left: 2.58%;
    right: 81.28%;
    top: 86.25%;
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: right;
    color: #B5AECA;
`;

const CompanionTypeCard = styled(InfoCard)`
  left: 331px;
  top: 780px;
`;

const CompanionTypeIcon = styled.div`
    position: absolute;
    width: 87px;
    height: 160px;
    left: 366px;
    top: 710px;
    background: url('/lump3.png') no-repeat center center;
    background-size: contain;
    transform: scale(2.74);
`;

const CompanionTypeTitle = styled.div`
    position: absolute;
    left: 27.77%;
    top: 80.35%;
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 35px;
    color: #B5AECA;
`;

const CompanionTypeDescription = styled.div`
    position: absolute;
    left: 24.21%;
    right: 60.58%;
    top: 85.85%;
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: right;
    color: #B5AECA;
    white-space: pre-line;
`;

export default function WiggleModulePage() {
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
                pathname: '/flowerproduce',
                query: { name, selectedHabits, finalHabit }
            });
        }, 1500);
    };

    const line1 = 'Shaped by biting,';
    const line2 = 'tuned to restless lips.';

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>PIBIT - Wiggle Module</title>
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
                    <WiggleVector1 />
                    <WiggleVector2 />
                    <HeaderLine />
                    <HeaderLine2 />
                    <BackButton onClick={() => router.back()} />
                    <FiveFlowerBgText className={startTextAnimation ? 'animated' : ''}>
                        {'Wiggler'.split('').map((char, index) => (
                            <span key={index} style={{ 
                                animationDelay: `${0.1 * (index + 1)}s`,
                                marginRight: index === 3 ? '505px' : '0' 
                            }}>
                                {char}
                            </span>
                        ))}
                    </FiveFlowerBgText>
                    <PibitLogo>PIBIT</PibitLogo>
                    <ModuleVersionText>Module 3rd Ver.</ModuleVersionText>
                    <FiveFlowerTitle>Wiggler</FiveFlowerTitle>
                    <Description className={startTextAnimation ? 'animated' : ''}>
                        사용자님께 'Wiggler Module'을 추천드려요!
                        <br />
                        마음에 드신다면 맞춤화 피빗 생성을 시작할게요!
                    </Description>
                    <CustomizeButton onClick={handleGenerateClick}>피빗 커스터마이징</CustomizeButton>
                    <GenerateButton onClick={handleProduceClick}>피빗 생성하기</GenerateButton>
                    <UserPreferenceCard />
                    <UserPreferenceIcon />
                    <UserPreferenceTitle>USER PREFERENCE</UserPreferenceTitle>
                    <UserPreferenceDescription><span style={{ fontSize: '22px' }}>88%</span>의 유저가 손톱물어뜯기 습관을<br/>개선하는데 이 모듈을 추천해요!</UserPreferenceDescription>
                    <CompanionTypeCard />
                    <CompanionTypeIcon />
                    <CompanionTypeTitle>COMPANION TYPE</CompanionTypeTitle>
                    <CompanionTypeDescription>포근한 마음과 입술의 말랑함을 형태, <br/>질감이 감각적으로 반영된 섬세하고, <br/>감정을 가장 잘 이해해줄 수 있어요</CompanionTypeDescription>
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