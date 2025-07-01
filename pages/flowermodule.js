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

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #B5AECA; }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const rotateYellowFlower = keyframes`
    from {
        transform: scale(1.8) rotate(0deg);
    }
    to {
        transform: scale(1.8) rotate(-360deg);
    }
`;

const rotateOrangeFlower = keyframes`
    from {
        transform: translateY(-20px) rotate(25.08deg) scale(1.6);
    }
    to {
        transform: translateY(-20px) rotate(-334.92deg) scale(1.6);
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF6B5 100%);
  transform: rotate(-90deg);
  transform-origin: top left;
`;

const BackgroundGradient2 = styled.div`
  position: absolute;
  width: 748.01px;
  height: 982px;
  left: 854.94px;
  top: -373.99px;
  background: linear-gradient(270deg, #DCD2E3 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-52.69deg) scale(1.15);
`;

const OrangeFlowerImage = styled.div`
  position: absolute;
  left: 65.95%;
  right: 7.73%;
  top: calc(63.37% - 72px);
  bottom: -3.69%;
  background: url('/orangef.png') no-repeat center center;
  background-size: contain;
  animation: ${rotateOrangeFlower} 10s linear infinite;
`;

const YellowFlowerImage = styled.div`
  position: absolute;
  left: 7.67%;
  right: 56.88%;
  top: 8.25%;
  bottom: 37.27%;
  background: url('/yellowf.png') no-repeat center center;
  background-size: contain;
  animation: ${rotateYellowFlower} 8s linear infinite;
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
`;

const HeaderLine = styled.div`
  position: absolute;
  width: 741px;
  height: 0px;
  left: 281px;
  top: 73px;
  border: 1px solid #FFFFFF;
`;

const HeaderLine2 = styled.div`
  position: absolute;
  width: 63px;
  height: 0px;
  left: 1230px;
  top: 74px;
  border: 1px solid #FFFFFF;
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
  z-index: 10;

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
  left: calc(50% - 1727px/2 - 15px);
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

const FlowerImage = styled.div`
  position: absolute;
  width: 1320.37px;
  height: 930.65px;
  left: calc(50% - 1320.37px/2 + 89.44px);
  top: calc(50% - 930.65px/2 + 35.02px - 20px - 12px);
  background: url('/module/flower.png');
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0px 9px 40px rgba(0, 0, 0, 0.13));
  transform: rotate(12.77deg) scale(0.98);
  pointer-events: none;
  opacity: 0;

  &.animated {
      animation: ${slideInFromRight} 1.5s ease-out forwards;
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
  color: #CCC1D3;
  cursor: pointer;
  z-index: 100;
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
  top: calc(89.71% - 22px - 17px - 12px - 16px + 10px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 42px;
  text-align: right;
  color: #B5AECA;
  
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
  background: linear-gradient(180deg, #FFF9D5 0%, #FFFFFF 100%);
  opacity: 0.6;
  box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const UserPreferenceCard = styled(InfoCard)`
  left: 16px;
  top: 763px;
`;

const UserPreferenceIcon = styled.div`
    box-sizing: border-box;
    position: absolute;
    left: calc(1.72% + 5px);
    right: calc(87.77% - 5px);
    top: calc(75.36% - 2px - 17px - 2px - 3px - 4px);
    bottom: 15.48%;
    background: url('/cus4.png') no-repeat center center;
    background-size: contain;
    transform: scale(1.85);
`;

const UserPreferenceTitle = styled.div`
    position: absolute;
    left: 6.88%;
    top: calc(80.96% - 17px);
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
    top: calc(86.25% - 17px);
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
  top: 763px;
`;

const CompanionTypeIcon = styled.div`
    position: absolute;
    width: 87px;
    height: 160px;
    left: 366px;
    top: 693px;
    background: url('/lump2.png') no-repeat center center;
    background-size: contain;
    transform: scale(2.57);
`;

const CompanionTypeTitle = styled.div`
    position: absolute;
    left: 27.77%;
    top: calc(80.35% - 17px);
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
    top: calc(85.85% - 17px);
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    text-align: right;
    color: #B5AECA;
    white-space: pre-line;
`;


export default function FlowerModulePage() {
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

    const line1 = 'Concentrated finger pressure';
    const line2 = 'or repetitive movements,';

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>PIBIT - Five Flower Module</title>
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
                    <OrangeFlowerImage />
                    <YellowFlowerImage />
                    <HeaderLine />
                    <HeaderLine2 />
                    <BackButton onClick={() => router.back()} />
                    <FiveFlowerBgText className={startTextAnimation ? 'animated' : ''}>
                        {'Five Flower'.split('').map((char, index) => (
                            <span key={index} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </FiveFlowerBgText>
                    <PibitLogo>PIBIT</PibitLogo>
                    <FlowerImage className={isImageAnimated ? 'animated' : ''} />
                    <ModuleVersionText>Module 1st Ver.</ModuleVersionText>
                    <FiveFlowerTitle>Five Flower</FiveFlowerTitle>
                    <Description className={startTextAnimation ? 'animated' : ''}>
                        {name ? `${name}님께 'Five Flower Module'을 추천드려요!` : "잠시만 기다려주세요..."}<br/>
                        마음에 드신다면 맞춤화 피빗 생성을 시작할게요!
                    </Description>
                    <CustomizeButton onClick={handleGenerateClick}>피빗 커스터마이징</CustomizeButton>
                    <GenerateButton onClick={handleProduceClick}>피빗 생성하기</GenerateButton>
                    <UserPreferenceCard />
                    <UserPreferenceIcon />
                    <UserPreferenceTitle>USER PREFERENCE</UserPreferenceTitle>
                    <UserPreferenceDescription><span style={{ fontSize: '22px' }}>75%</span>의 유저가 손톱물어뜯기 습관을<br/>개선하는데 이 모듈을 추천해요!</UserPreferenceDescription>
                    <CompanionTypeCard />
                    <CompanionTypeIcon />
                    <CompanionTypeTitle>COMPANION TYPE</CompanionTypeTitle>
                    <CompanionTypeDescription>꽃봉우리의 형태로 어떤 감정이든<br/>깊이 품어줄 수 있는 마음씨가 따듯하고<br/>다정한 동반자에요</CompanionTypeDescription>
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