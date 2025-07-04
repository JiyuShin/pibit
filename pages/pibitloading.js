import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`;

const moveBlob1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(150px, -50px) scale(1.2); }
  50% { transform: translate(50px, 100px) scale(0.8); }
  75% { transform: translate(-100px, 50px) scale(1.1); }
`;

const moveBlob2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-100px, 80px) scale(1.1); }
  50% { transform: translate(100px, -120px) scale(0.9); }
  75% { transform: translate(50px, 50px) scale(1.2); }
`;

const moveBlob3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(80px, 120px) scale(1.2); }
  50% { transform: translate(-120px, -80px) scale(0.8); }
  75% { transform: translate(40px, -60px) scale(1.1); }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${({ isExiting }) => isExiting ? '#FFFFFF' : '#f0f2f5'};
  transition: background-color 1.5s ease-in-out;
`;

const BlobContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur(80px); // Increased blur for softer edges
  opacity: 0.8;
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  will-change: transform;
`;

const Blob1 = styled(Blob)`
  background: #EAEDF7;
  width: 500px;
  height: 500px;
  top: 5%;
  left: 10%;
  animation: ${moveBlob1} 10s ease-in-out infinite alternate;
`;

const Blob2 = styled(Blob)`
  background: #E9E2ED;
  width: 600px;
  height: 600px;
  top: 20%;
  right: 5%;
  animation: ${moveBlob2} 12s ease-in-out infinite alternate;
`;

const Blob3 = styled(Blob)`
  background: #F2F2F7;
  width: 450px;
  height: 450px;
  bottom: 5%;
  left: 30%;
  animation: ${moveBlob3} 14s ease-in-out infinite alternate;
`;

const PibitLogo = styled.div`
  position: absolute;
  width: 562px;
  height: 75px;
  left: calc(50% - 562px/2 - 2px);
  top: 0px;
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 102px;
  text-align: center;
  color: #FFFFFF;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.07);
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
`;

const HeaderLine = styled.div`
  position: absolute;
  width: 424px;
  height: 0px;
  left: 801px;
  top: 54px;
  border: 2px solid #FFFFFF;
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
`;

const BackButton = styled.div`
  position: absolute;
  top: 15px;
  left: 20px;
  width: 320px;
  height: 80px;
  background-image: url('/whiteb.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 1.5s ease-in-out;
  z-index: 10;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  pointer-events: ${({ isExiting }) => (isExiting ? 'none' : 'auto')};

  &:hover {
    transform: scale(1.1);
  }
`;

const FooterText = styled.div`
  position: absolute;
  left: 40px;
  bottom: 18px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #B5AECA;
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
`;

const CompanyText = styled.div`
  position: absolute;
  right: 25px;
  bottom: 18px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  text-align: right;
  color: #B5AECA;
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
`;

const CenterImageContainer = styled.div`
    position: absolute;
    width: 593px;
    height: 593px;
    left: 459.5px;
    top: 184.5px;
    opacity: ${({ isExiting }) => isExiting ? 0 : 0.7};
    filter: blur(10px) drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.25));
    z-index: 1;
    background: url('/load.png') no-repeat center center;
    background-size: contain;
    animation: ${rotate} 5s linear infinite;
    transition: opacity 1.5s ease-in-out;
`;

const CenterText = styled.div`
  position: absolute;
  left: 27.65%;
  right: 25.07%;
  top: calc(49.8% - 5px);
  bottom: 41.34%;

  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;

  color: #B5B5B5;
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
`;

const CustomizeButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 264px;
  height: 48px;
  left: 1225px;
  top: 26px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #FFFFFF;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.08);
  border-radius: 41.5px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 27px;
  text-align: center;
  color: #B79BCA;
  cursor: pointer;
  z-index: 1;
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 1.5s ease-in-out;
  pointer-events: ${({ isExiting }) => (isExiting ? 'none' : 'auto')};
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  flex-direction: column;
`;

const Spinner = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('/load.png');
  background-size: contain;
  background-repeat: no-repeat;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 40px;
  font-family: 'Pretendard Variable';
  font-size: 24px;
  font-weight: 600;
  color: #555;
  animation: ${fadeIn} 1.5s ease-out;
  text-align: center;
  line-height: 1.6;
`;

export default function PibitLoadingPage() {
    const router = useRouter();
    const { name, selectedHabits, finalHabit } = router.query;
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                // finalHabit에 따라 적절한 모듈 페이지로 이동
                const moduleMapping = {
                    '손톱 물어뜯기': '/fingermodule',
                    '입술 물어뜯기': '/heartylip', 
                    '다리 떨기': '/wigglemodule',
                    '볼펜 딸깍거리기': '/Clickworkmodule',
                    '턱 괴기': '/puffymodule',
                    // 기타 습관들은 기본적으로 flowermodule로
                };
                
                const targetPage = moduleMapping[finalHabit] || '/flowermodule';
                
                router.push({
                    pathname: targetPage,
                    query: { name, selectedHabits, finalHabit }
                });
            }, 1500);
        }, 3000);

        return () => clearTimeout(timer);
    }, [router, name, selectedHabits, finalHabit]);
    
    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>PIBIT-로딩 중</title>
                <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
                <link rel="preload" href="/fonts/PretendardVariable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            </Head>
            <Root isExiting={isExiting}>
                <BlobContainer>
                    <Blob1 />
                    <Blob2 />
                    <Blob3 />
                </BlobContainer>
                <PibitLogo isExiting={isExiting}>PIBIT</PibitLogo>
                <HeaderLine isExiting={isExiting} />
                <BackButton onClick={handleBack} isExiting={isExiting} />
                <CustomizeButton isExiting={isExiting}>
                    피빗 커스터마이징
                </CustomizeButton>
                <CenterImageContainer isExiting={isExiting}/>
                <CenterText isExiting={isExiting}>
                    '{finalHabit}' 습관을 긴 시간동안 곁에서 {name}님과<br />
                    함께 관리해줄 맞춤화 피빗 제작을 시작할게요!
                </CenterText>
                <FooterText isExiting={isExiting}>Journey to create habit-caretaker companion pibit</FooterText>
                <CompanyText isExiting={isExiting}>© 2024 Pibit</CompanyText>
            </Root>
        </>
    );
} 