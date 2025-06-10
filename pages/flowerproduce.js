import React, { Suspense } from 'react';
import Head from 'next/head';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const GlobalStyle = createGlobalStyle`
  body, html {
    overflow: hidden;
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

const ModelContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  z-index: 10;
`;

const BgImage = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: url('/pbk.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const Title = styled.h1`
  position: absolute;
  width: 876px;
  left: calc(50% - 876px/2 + 18px);
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
  left: calc(50% - 259px);
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
`;

const Rectangle2 = styled.div`
  position: absolute;
  width: 325px;
  height: 63px;
  left: 1135px;
  top: 354px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 0px 30px;
  transform: scaleX(-1);
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
`;

const BubbleButton = styled.button`
  position: absolute;
  width: 280px;
  left: 1161px;
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
`;

const FooterBrand = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 658px);
  top: 652px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
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
    top: 650px;
    font-family: 'Pretendard Variable', sans-serif;
    font-style: normal;
    font-weight: 700;
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
  top: 653px;
  border: 2px solid #B5AECA;
  border-radius: 50%;
`;

const FooterJourney = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 197px);
  top: 650px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  color: #B5AECA;
`;

function FlowerModel(props) {
  const { scene } = useGLTF('/flowerob.glb');
  return <primitive object={scene} {...props} />;
}

export default function FlowerProducePage() {
    const router = useRouter();
    const { name = "지수" } = router.query;

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
                <ModelContainer>
                  <Canvas>
                    <Suspense fallback={null}>
                      <ambientLight intensity={1.5} />
                      <directionalLight position={[5, 5, 5]} intensity={1} />
                      <FlowerModel scale={20} position={[0, -1.5, 0]} />
                      <OrbitControls />
                    </Suspense>
                  </Canvas>
                </ModelContainer>
                <Title>{name}님의 첫 맞춤형 피빗이 태어났어요!</Title>
                <Subtitle>
                    데스크탑 앞에 놓여있는 five flower 모듈과의 대화를 통해<br/>
                    새로운 습관 개선 여정을 시작하세요
                </Subtitle>
                
                <Rectangle1 />
                <BubbleText1>
                    안녕! 만나서 반가워, 난 {name}와 함께 지내며<br/>
                    손톱물어뜯기를 곁에서 케어해줄 따듯하고 포근한 존재야!
                </BubbleText1>

                <Rectangle2 />
                <BubbleButton>나와 대화를 시작하고 싶다면 클릭해줘 !</BubbleButton>
                
                <FooterJourney>Journey to create habit-caretaker companion pibit</FooterJourney>
                <CopyrightCircle />
                <CopyrightSymbol>a</CopyrightSymbol>
                <FooterBrand>PIBITCOMPANY</FooterBrand>
            </Root>
        </>
    );
} 