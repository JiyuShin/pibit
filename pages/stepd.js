import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeInFlower21 = keyframes`
  from { opacity: 0; }
  to { opacity: 0.8; }
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

const blinking = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  overflow: hidden;
  animation: ${fadeIn} 1.5s ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 0.8s ease-in-out forwards;
  }
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
  opacity: 0.4;
`;

const ContentContainer = styled.div`
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out forwards;
    animation-delay: 0.5s;
`;

const BackgroundGradient = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 1663px;
  height: 490px;
  left: -48px;
  top: 200px;
  background: radial-gradient(60.76% 483.5% at 51.08% 50%, #FFFEFA 0%, #FFF7E0 27.88%, #E7ECFF 100%);
  border: 1px solid #B5AECA;
  filter: blur(1px);
  border-radius: 30px;
  z-index: 1;
`;

const RoutineTitle = styled.div`
  position: absolute;
  left: 50px;
  top: 210px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #B5AECA;
  z-index: 3;
`;

const No7Text = styled.div`
  position: absolute;
  right: 28px;
  top: 188px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 100px;
  color: #B5AECA;
  z-index: 3;
`;

const FingersImage = styled.div`
  position: absolute;
  width: 898px;
  height: 382px;
  left: calc(50% - 449px);
  top: 315px;
  background: url('/fingers.png') no-repeat center center;
  background-size: contain;
  z-index: 3;
`;

const StepContainer = styled.div`
    position: absolute;
    font-family: 'Pretendard Variable', sans-serif;
    color: #B5AECA;
`;

const Step1Container = styled(StepContainer)`
    left: 251px;
    top: 485px;
    width: 300px;
    z-index: 3;
`;

const Step2Container = styled(StepContainer)`
    left: 962px;
    top: 318px;
    width: 380px;
    z-index: 3;
`;

const StepTitle = styled.div`
    font-weight: 500;
    font-size: 25px;
    line-height: 42px;
`;

const StepDescription = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    margin-top: 10px;
`;

const ReturnButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 181.54px;
  height: 38.49px;
  left: 1305px;
  top: 625px;
  background: #FFFFFF;
  border: 1px solid #B5AECA;
  border-radius: 50px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #B5B5B5;
  cursor: pointer;
  z-index: 3;
`;

const Flower22Image = styled.img`
  position: absolute;
  width: 250.25px;
  height: auto;
  left: 82px;
  top: 527.95px;
  transform: rotate(1.2deg) scale(1.55);
  z-index: 9999;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
`;

const Flower21Image = styled.img`
  position: absolute;
  width: 507.41px;
  height: auto;
  left: -78.93px;
  top: 160px;
  transform: rotate(1.32deg);
  z-index: 5;
  opacity: 0;
  animation-name: ${fadeInFlower21};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
`;

const Rectangle54 = styled.div`
  position: absolute;
  width: 386.8px;
  height: 176.3px;
  left: calc(50% - 33.4px);
  top: calc(50% + 464.85px);
  background: linear-gradient(200.03deg, #FDF6E2 13.39%, rgba(253, 246, 226, 0.5) 27.11%, rgba(253, 246, 226, 0) 57.8%);
  transform: matrix(1, -0.05, -0.05, -1, 0, 0);
  z-index: 4;
`;

const Rectangle53 = styled.div`
  position: absolute;
  width: 333.63px;
  height: 196.39px;
  left: 371.23px;
  top: 338.62px;
  background: linear-gradient(180deg, #FDF6E2 8.05%, rgba(255, 255, 255, 0) 97.56%);
  transform: matrix(-0.88, 0.48, 0.48, 0.88, 0, 0) scale(0.9);
  z-index: 4;
`;

const Arrow2Image = styled.img`
  position: absolute;
  left: 661px;
  top: 461px;
  z-index: 9999;
  transform: scale(0.16);
  transform-origin: top left;
  opacity: 0;
  animation: ${blinking} 1.5s infinite ease-in-out;
  animation-delay: 1.5s;
`;

const ArrowImage = styled.img`
  position: absolute;
  left: calc(50% - 81px);
  top: calc(50% - 88px);
  transform: translate(-50%, -50%) scale(0.12);
  z-index: 9999;
  opacity: 0;
  animation: ${blinking} 1.5s infinite ease-in-out;
  animation-delay: 1.5s;
`;

export default function StepdPage() {
    const router = useRouter();
    const { name, habit } = router.query;
    const [isExiting, setIsExiting] = useState(false);

    const handleReturnClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            router.push({
                pathname: '/flowermodule',
                query: { name, habit, from: 'stepd' }
            });
        }, 800);
    };

    const handleCustomizeClick = () => {
        setIsExiting(true);
    };

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                router.push('/flowermodule?from=stepd');
            }, 800); 

            return () => clearTimeout(timer);
        }
    }, [isExiting, router]);

    return (
        <>
            <Head>
                <title>PIBIT - Module Try On</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <Root className={isExiting ? 'fade-out' : ''}>
                <BgImage />
                <BackgroundGradient1 />
                <BackgroundGradient2 />
                <OrangeFlowerImage />
                <YellowFlowerImage />
                <FiveFlowerBgText>Five Flower</FiveFlowerBgText>
                <Flower22Image src="/flower22.png" alt="flower 22" />
                <Flower21Image src="/flower21.png" alt="flower 21" />
                <Arrow2Image src="/arrow2.png" alt="화살표" />
                <ArrowImage src="/arrow.png" alt="중앙 화살표" />

                <ContentContainer>
                    <RoutineTitle>Flower Module Try On Routine</RoutineTitle>
                    <No7Text>No.7</No7Text>

                    <BackgroundGradient />
                    <FingersImage />

                    <Step1Container>
                        <StepTitle>STEP 1</StepTitle>
                        <StepDescription>
                            five flower 모듈의 가운데에<br/>엄지손가락을 올려놓고 꾹 눌러주세요
                        </StepDescription>
                    </Step1Container>

                    <Step2Container>
                        <StepTitle>STEP 2</StepTitle>
                        <StepDescription>
                            엄지손가락을 올려놓은채로 시계방향으로 움직이며,<br/>말랑한 5면으로 이루어진 공간에 가해진 압박을 느끼며<br/>신체의 모든 감각을 이곳에 집중시켜보세요
                        </StepDescription>
                    </Step2Container>
                    
                    <ReturnButton onClick={handleReturnClick}>
                        모듈소개로 돌아가기
                    </ReturnButton>
                    
                    <Rectangle54 />
                    <Rectangle53 />
                </ContentContainer>
            </Root>
        </>
    );
} 