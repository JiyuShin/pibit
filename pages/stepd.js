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

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  animation: ${fadeIn} 0.8s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/flowerhide.png') no-repeat center center;
    background-size: cover;
    z-index: -2;
  }

  &.fade-out {
    animation: ${fadeOut} 0.8s ease-in-out forwards;
  }
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
  left: 70px;
  top: 195px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #B5AECA;
  z-index: 3;
`;

const No7Text = styled.div`
  position: absolute;
  right: 150px;
  top: 215px;
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
    left: 280px;
    top: 485px;
    width: 300px;
    z-index: 3;
`;

const Step2Container = styled(StepContainer)`
    left: 950px;
    top: 295px;
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

const Blob1 = styled.div`
  position: absolute;
  width: 250.25px;
  height: 248.49px;
  left: 82px;
  top: 480.95px;
  background: #D3D1DF;
  opacity: 0.5;
  filter: blur(50px);
  transform: rotate(-53.8deg);
  z-index: 2;
`;

const Blob2 = styled.div`
  position: absolute;
  width: 284px;
  height: 282px;
  left: 183.07px;
  top: -92px;
  background: #D3D1DF;
  opacity: 0.5;
  filter: blur(50px);
  transform: rotate(55.02deg);
  z-index: 2;
`;

const Rectangle54 = styled.div`
  position: absolute;
  width: 386.8px;
  height: 176.3px;
  left: 800.76px;
  top: 475.72px;
  background: linear-gradient(200.03deg, #FFF7E2 13.39%, rgba(251, 245, 229, 0.5) 27.11%, rgba(253, 246, 227, 0) 57.8%);
  transform: matrix(1, -0.05, -0.05, -1, 0, 0);
  z-index: 4;
`;

const Rectangle53 = styled.div`
  position: absolute;
  width: 333.63px;
  height: 196.39px;
  left: 530.23px;
  top: 48.62px;
  background: linear-gradient(180deg, #F9F4E8 8.05%, rgba(255, 255, 255, 0) 97.56%);
  transform: matrix(-0.88, 0.48, 0.48, 0.88, 0, 0);
  z-index: 4;
`;

export default function StepdPage() {
    const router = useRouter();
    const [isExiting, setIsExiting] = useState(false);

    const handleReturnClick = () => {
        setIsExiting(true);
    };

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                router.push('/flowermodule');
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
                <link href="https://fonts.googleapis.com/css2?family=Pretendard+Variable:opsz,wght@10..144,600&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
            </Head>
            <Root className={isExiting ? 'fade-out' : ''}>
                <RoutineTitle>Flower Module Try On Routine</RoutineTitle>
                <No7Text>No.7</No7Text>

                <BackgroundGradient />
                <FingersImage />

                <Step1Container>
                    <StepTitle>STEP 1</StepTitle>
                    <StepDescription>
                        five flower 모듈의 가운데에 엄지손가락을 올려놓고 꾹 눌러주세요
                    </StepDescription>
                </Step1Container>

                <Step2Container>
                    <StepTitle>STEP 2</StepTitle>
                    <StepDescription>
                        엄지손가락을 올려놓은채로 시계방향으로 움직이며, 말랑한 5면으로 이루어진 공간에 가해진 압력을 느끼며 신체의 모든 감각을 이곳에 집중시켜보세요
                    </StepDescription>
                </Step2Container>
                
                <ReturnButton onClick={handleReturnClick}>
                    모듈소개로 돌아가기
                </ReturnButton>
                
                <Blob1 />
                <Blob2 />
                <Rectangle54 />
                <Rectangle53 />
            </Root>
        </>
    );
} 