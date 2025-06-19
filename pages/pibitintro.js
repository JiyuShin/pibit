import styled, { createGlobalStyle, keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const floatAnimationUp = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: auto;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/introbk.png') center center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => props.isFadingOut ? fadeOutAnimation : fadeInAnimation} 0.5s ease-out forwards;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('/introbk.png') center center / cover no-repeat #FFFFFF;
  transform: scale(${props => props.scale});
`;

const BgImage = styled.div`
  position: absolute;
  width: 2238.45px;
  height: 1582.66px;
  left: -580.73px;
  top: -246.9px;
  background: url('/대지 3@4x.png');
  background-size: cover;
  transform: rotate(-0.14deg);
`;

const Desc = styled.div`
  position: absolute;
  width: 1086px;
  height: 87px;
  left: calc(50% - 1086px/2 + 13px);
  top: 167px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16.56px;
  line-height: 30px;
  text-align: center;
  color: #B0B0B0;
`;

const GradientRect = styled.div`
  position: absolute;
  width: 739.45px;
  height: 982px;
  left: 664.94px;
  top: 282.01px;
  background: linear-gradient(270deg, #DCD2E3 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-52.69deg);
`;

const Flower = styled.div`
  position: absolute;
  width: 535.5px;
  height: 377.1px;
  left: 218px;
  top: 232px;
  background: url('/module/flower.png');
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  animation: ${floatAnimationUp} 2.5s ease-in-out infinite;
  animation-delay: 0.1s;
`;

const Puffy = styled.div`
  position: absolute;
  width: 485.78px;
  height: 342.40px;
  left: 758.74px;
  top: 222.4px;
  background: url('/module/puffy.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(26.64deg);
  pointer-events: none;
  animation: ${floatAnimation} 2.5s ease-in-out infinite;
  animation-delay: 0.6s;
`;

const WhiteRect = styled.div`
  position: absolute;
  width: 487px;
  height: 420px;
  left: 50%;
  top: calc(50% + 186px);
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 36px 36px 36px;
`;

const WhiteRectTitle = styled.div`
  width: 100%;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #939393;
  margin-bottom: 32px;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 30px;
`;

const Label = styled.div`
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #939393;
  margin-top: 10px;
  margin-bottom: 8px;
  padding-left: 0;
  min-width: 60px;
  margin-left: 0;
`;

const InputRect = styled.input`
  width: 229px;
  height: 54px;
  background: #E6E2EA;
  border-radius: 12px;
  border: none;
  font-size: 20px;
  padding: 0 20px;
  margin-bottom: 0;
  display: block;
  margin-left: 0;
  margin-right: 0;
  pointer-events: auto;
  position: relative;
  z-index: 10;
`;

const FindYourOwnPibit = styled.div`
  position: absolute;
  width: 100vw;
  height: 228px;
  left: 0;
  top: -25px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 180px;
  line-height: 215px;
  text-align: center;
  color: #FFFFFF;
`;

const Wiggle = styled.div`
  position: absolute;
  width: 694.79px;
  height: 489.72px;
  left: 132.93px;
  top: 563px;
  background: url('/module/wiggle.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(19.68deg);
  pointer-events: none;
  animation: ${floatAnimationUp} 2.5s ease-in-out infinite;
  animation-delay: 0.3s;
`;

const Pinch = styled.div`
  position: absolute;
  width: 536.38px;
  height: 378.06px;
  left: 1093.82px;
  top: 1014.41px;
  background: url('/module/pinch.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: matrix(0.7, -0.72, -0.72, -0.7, 0, 0);
  pointer-events: none;
  animation: ${floatAnimationUp} 2.5s ease-in-out infinite;
  animation-delay: 0.8s;
`;

const Finger = styled.div`
  position: absolute;
  width: 553.99px;
  height: 390.48px;
  left: 735.9px;
  top: 623.03px;
  background: url('/module/finger.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(10.03deg);
  filter: brightness(1.12);
  z-index: 3000;
  pointer-events: none;
  animation: ${floatAnimation} 2.5s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const Heart = styled.div`
  position: absolute;
  width: 545.05px;
  height: 384.17px;
  left: 112.61px;
  top: 405px;
  background: url('/module/heart.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: rotate(21.31deg);
  pointer-events: none;
  animation: ${floatAnimation} 2.5s ease-in-out infinite;
  animation-delay: 0.4s;
`;

const Company = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 658px);
  top: 952px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;
`;

const Company2 = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 733px);
  top: 950px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;
`;

const Ellipse = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 18px;
  height: 18px;
  left: 1480px;
  top: 953px;
  border: 2px solid #B5AECA;
  border-radius: 50%;
`;

const Journey = styled.div`
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

const PinchBetween = styled.div`
  position: absolute;
  width: 458.75px;
  height: 323.34px;
  left: 870px;
  top: 412px;
  background: url('/module/pinch.png');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2000;
  transform: rotate(-17deg);
  filter: brightness(1.1);
  pointer-events: none;
`;

const StartButton = styled.button`
  width: 180px;
  height: 54px;
  background: rgba(230, 226, 234, 0.5);
  border-radius: 24px;
  border: 2px solid #B5AECA;
  color: #B5AECA;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-top: 32px;
  cursor: pointer;
  box-shadow: 0px 8px 25px 0px rgba(80, 80, 80, 0.25);
  transition: background 0.2s, border 0.2s, color 0.2s;
  pointer-events: auto;
  z-index: 9999;
  position: fixed;
  left: calc(50% + 10px);
  bottom: 72px;
  transform: translateX(-50%);

  &:hover {
    background: rgba(230, 226, 234, 0.7);
    border: 3px solid #B5AECA;
    color: #8B6AD9;
  }
`;

const PibitIntro = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleNavigate = () => {
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        router.push({
          pathname: '/pibitdna',
          query: { name: name },
        });
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, router, name]);

  return (
    <>
      <GlobalStyle />
      <Container isFadingOut={isFadingOut}>
        <ContentWrapper>
          <BgImage />
          <Flower />
          <Puffy />
          <PinchBetween />
          <WhiteRect>
            <WhiteRectTitle>
              본격적으로 시작하기 전 원활한<br />
              피빗 생성을 위해 이름과 나이를 입력해주세요!
            </WhiteRectTitle>
            <InputRow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'calc(100% - 65px)', marginLeft: 23 }}>
                <Label style={{ minWidth: 60 }}>이름</Label>
                <InputRect value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'calc(100% - 65px)', marginLeft: 23 }}>
                <Label style={{ minWidth: 60 }}>나이</Label>
                <InputRect value={age} onChange={e => setAge(e.target.value)} />
              </div>
            </InputRow>
          </WhiteRect>
          <StartButton onClick={handleNavigate}>시작하기</StartButton>
          <FindYourOwnPibit>FindYourOwnPibit</FindYourOwnPibit>
          <Desc>
            이곳은 당신의 감정과 습관을 조금 더 정확히 이해해보는 공간입니다. 알고 있었지만 놓치고 있던, 혹은 아직 눈치채지 못한 감정과 습관들을<br />
            피빗과 함께 하나씩 들여다보는 과정을 통해 당신만의 습관개선 피빗을 형성해보세요!
          </Desc>
          <Wiggle />
          <Pinch />
          <Finger />
          <Heart />
          <Company>PIBITCOMPANY</Company>
          <Company2>a</Company2>
          <Ellipse />
          <Journey>Journey to create habit-caretaker companion pibit</Journey>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default PibitIntro;