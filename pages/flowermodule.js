import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  opacity: 0;
  pointer-events: none;
  z-index: 999;
  &.fade-in {
    animation: fadeInOverlay 1.5s forwards;
  }

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.8;
    }
  }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  overflow: hidden;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const BgImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: url('/bk2.png');
  background-size: cover;
  background-position: center;
  filter: blur(35px);
  z-index: -1;
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
  left: 794.94px;
  top: -323.99px;
  background: linear-gradient(270deg, #DCD2E3 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-52.69deg);
`;

const OrangeFlowerImage = styled.div`
  position: absolute;
  left: 65.95%;
  right: 7.73%;
  top: calc(63.37% - 72px);
  bottom: -3.69%;
  background: url('/orangef.png') no-repeat center center;
  background-size: contain;
  transform: translateY(-20px) rotate(25.08deg) scale(1.6);
`;

const YellowFlowerImage = styled.div`
  position: absolute;
  left: 7.67%;
  right: 56.88%;
  top: 8.25%;
  bottom: 37.27%;
  background: url('/yellowf.png') no-repeat center center;
  background-size: contain;
  transform: scale(1.8);
`;

const PibitLogo = styled.div`
  position: absolute;
  width: 562px;
  height: 75px;
  left: -65px;
  top: 0px;
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 102px;
  text-align: center;
  color: #FFFFFF;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
`;

const HeaderLine = styled.div`
  position: absolute;
  width: 700px;
  height: 0px;
  left: 261px;
  top: 53px;
  border: 1px solid #FFFFFF;
`;

const HeaderLine2 = styled.div`
  position: absolute;
  width: 63px;
  height: 0px;
  left: 1225px;
  top: 54px;
  border: 1px solid #FFFFFF;
`;

const BackButton = styled.button`
  position: absolute;
  width: 52px;
  height: 52px;
  left: 35px;
  top: 19px;
  background: #FAF9FB;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0;
`;

const BackArrow = () => (
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22" stroke="#B5AECA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


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
  width: 1810px;
  height: 471px;
  left: calc(50% - 1810px/2);
  top: calc(50% - 471px/2 - 14.5px);
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 380px;
  line-height: 643px;
  text-align: center;
  color: #B5AECA;
  opacity: 0.4;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
  pointer-events: none;
`;

const FlowerImage = styled.div`
  position: absolute;
  width: 1320.37px;
  height: 930.65px;
  left: calc(50% - 1320.37px/2 + 89.44px);
  top: calc(50% - 930.65px/2 + 35.02px);
  background: url('/module/flower.png');
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0px 9px 40px rgba(0, 0, 0, 0.13));
  transform: rotate(12.77deg) scale(0.98);
  pointer-events: none;
`;

const Description = styled.div`
  position: absolute;
  left: 3.97%;
  top: 28.31%;
  width: calc(100% - 3.97% - 60.19%);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;
  color: #B5B5B5;
`;

const GenerateButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 226.38px;
  height: 48px;
  left: calc(50% - 226.38px/2 + 627.19px);
  top: 30px;
  background: #FFF7E0;
  border: 1px solid #FFD64D;
  box-shadow: 6px 6px 20px 3px rgba(100, 61, 130, 0.25);
  border-radius: 50px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 27px;
  color: #8B8B8B;
  cursor: pointer;
`;

const CustomizeButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 264px;
  height: 48px;
  left: 961px;
  top: 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #FFFFFF;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.08);
  border-radius: 41.5px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 27px;
  color: #CCC1D3;
  cursor: pointer;
`;

const ModuleVersionText = styled.div`
  position: absolute;
  left: 60px;
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
  left: calc(65.55% - 15px);
  right: calc(1.06% + 15px);
  top: calc(89.71% - 30px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 42px;
  text-align: right;
  color: #B5AECA;
  white-space: pre-line;
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
  top: 780px;
`;

const UserPreferenceIcon = styled.div`
    box-sizing: border-box;
    position: absolute;
    left: calc(1.72% + 5px);
    right: calc(87.77% - 5px);
    top: calc(75.36% - 2px);
    bottom: 15.48%;
    background: url('/cus4.png') no-repeat center center;
    background-size: contain;
    transform: scale(2.50);
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
    background: url('/lump2.png') no-repeat center center;
    background-size: contain;
    transform: scale(2.57);
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


export default function FlowerModulePage() {
    const router = useRouter();
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFading(true);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isFading) {
            const redirectTimer = setTimeout(() => {
                router.push('/stepd');
            }, 1500); // Fade-in 애니메이션 시간과 맞춤

            return () => clearTimeout(redirectTimer);
        }
    }, [isFading, router]);

    return (
        <>
            <Head>
                <title>PIBIT - Five Flower Module</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Pretendard+Variable:opsz,wght@10..144,600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <FadeOverlay className={isFading ? 'fade-in' : ''} />
            <Root>
                <BgImage />
                <BackgroundGradient1 />
                <BackgroundGradient2 />
                <OrangeFlowerImage />
                <YellowFlowerImage />

                <PibitLogo>PIBIT</PibitLogo>
                <HeaderLine />
                <HeaderLine2 />
                <BackButton onClick={() => router.back()}>
                    <BackArrow />
                </BackButton>
                
                <FiveFlowerBgText>Five Flower</FiveFlowerBgText>
                <FlowerImage />
                
                <ModuleVersionText>Module 1st Ver.</ModuleVersionText>
                <FiveFlowerTitle>FIVE FLOWER</FiveFlowerTitle>
                <Description>지수님께 'FIve Flower Module'을 추천드려요!<br/>마음에 드신다면 맞춤화 피빗 생성을 시작할게요!</Description>
                
                <CustomizeButton>피빗 커스터마이징</CustomizeButton>
                <GenerateButton>피빗 생성하기</GenerateButton>

                <UserPreferenceCard />
                <UserPreferenceIcon />
                <UserPreferenceTitle>USER PREFERENCE</UserPreferenceTitle>
                <UserPreferenceDescription><span style={{ fontSize: '22px' }}>75%</span>의 유저가 손톱물어뜯기 습관을<br/>개선하는데 이 모듈을 추천해요!</UserPreferenceDescription>

                <CompanionTypeCard />
                <CompanionTypeIcon />
                <CompanionTypeTitle>COMPANION TYPE</CompanionTypeTitle>
                <CompanionTypeDescription>꽃봉우리의 형태로 어떤 감정이든<br/>깊이 품어줄 수 있는 마음씨가 따듯하고<br/>다정한 동반자에요</CompanionTypeDescription>

                <SensoryReliefText>{`Concentrated\u00A0finger\u00A0pressure
for\u00A0sensory\u00A0relief`}</SensoryReliefText>
                <FooterText>Journey to create habit-caretaker companion pibit</FooterText>
            </Root>
        </>
    );
} 