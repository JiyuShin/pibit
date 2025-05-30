import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    background: #fff;
  }
`;

const Root = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1512px;
  min-height: 982px;
  overflow: hidden;
  background: transparent;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100vw;
    height: 100vh;
    background: url('/introbk.png') center center / cover no-repeat;
    /* transform: scaleX(-1); */
    z-index: 0;
    pointer-events: none;
  }
`;

const PngImg = styled.img`
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
`;

const PibitLogo = styled.div`
  position: absolute;
  left: calc(50% + 23px);
  top: calc(18.5vh - 45px);
  transform: translate(-50%, 0);
  font-family: 'Pretendard', 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24.4944vw;
  line-height: 1;
  text-align: center;
  color: #fff;
  text-shadow: 4px 4px 38px rgba(0,0,0,0.07);
  letter-spacing: 0.01em;
  white-space: nowrap;
  z-index: 2;
`;

const EngTitle = styled.div`
  position: absolute;
  left: 50%;
  top: calc(38.5vh + 30px + 140px - 1.25vw + 2vw - 45px);
  transform: translate(-50%, 0);
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 3.75vw;
  line-height: 1.2;
  text-align: center;
  color: #fff;
  text-shadow: 4px 4px 38px rgba(0,0,0,0.07), 2px 2px 8px rgba(0,0,0,0.18);
  z-index: 2;
`;

const MainTitle = styled.div`
  position: absolute;
  left: 50%;
  top: calc(5.5vh - 28px);
  transform: translate(-50%, 0);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 0.99vw;
  line-height: 1.6;
  text-align: center;
  color: #fff;
  z-index: 2;
`;

const MainButton = styled.button`
  position: absolute;
  left: 50%;
  top: calc(60vh + 131px);
  transform: translate(-50%, 0);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.56vw;
  line-height: 1.2;
  color: #B5AECA;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 29px;
  box-shadow: 9px 9px 20px 3px rgba(100, 61, 130, 0.25);
  padding: 1vw 2.5vw;
  min-width: 260px;
  min-height: 72px;
  cursor: pointer;
  z-index: 3;
  transition: background 0.2s;
  &:hover {
    background: #ece6d9;
  }
`;

const BottomDesc = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(10vh + 36px);
  transform: translateX(-50%);
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 11.7pt;
  color: #fff;
  text-align: center;
  z-index: 2147483647;
  white-space: nowrap;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.18);
`;

const BottomLeftDesc = styled.div`
  position: absolute;
  left: 25px;
  bottom: calc(10vh + 36px);
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 8.8pt;
  color: #B5AECA;
  text-align: left;
  letter-spacing: 0.01em;
  z-index: 20;
  text-transform: none;
`;

const CompanyLogoText = styled.div`
  position: absolute;
  right: 22px;
  bottom: calc(10vh + 36px);
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 12pt;
  color: #B5AECA;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  z-index: 20;
`;

export default function PibitHomepage() {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <Root>
        {/* 오브젝트 이미지들 (첨부 이미지 기준, zIndex/크기/위치 조정) */}
        <PngImg src="/module/puffy.png" style={{left:'calc(2vw + 710px)',top:'calc(2vh + 490px)',width:'28.5vw',height:'21vw',zIndex:1,transform:'rotate(-11deg)'}} alt="puffy" />
        <PngImg src="/module/finger.png" style={{left:'calc(60vw - 6px)',top:'calc(7vh + 363px)',width:'40.04vw',height:'27.3vw',zIndex:1,filter:'brightness(1.15) drop-shadow(0px 10px 30px rgba(0,0,0,0.1))',transform:'rotate(61deg)'}} alt="finger" />
        <PngImg src="/module/pinch.png" style={{left:'calc(18vw - 385px)',top:'calc(38vh - 70px)',width:'40.4838vw',height:'28.33866vw',zIndex:10,transform:'matrix(-1,0.02,0.02,1,0,0)'}} alt="pinch1" />
        <PngImg src="/module/flower.png" style={{left:'calc(67vw - 453px)',top:'calc(50vh + 108px)',width:'14.904vw',height:'10.764vw',zIndex:1,filter:'drop-shadow(0px 9px 40px rgba(0,0,0,0.13))',transform:'rotate(15deg)',opacity:0.6}} alt="flower2" />
        <PngImg src="/module/wiggle.png" style={{left:'calc(40vw - 296px)',top:'calc(62vh - 13px)',width:'33.6743vw',height:'22.95975vw',zIndex:1,transform:'rotate(143deg)',opacity:0.7}} alt="wiggle1" />
        <PngImg src="/module/flower.png" style={{left:'calc(55vw + 233px)',top:'calc(30vh - 44px)',width:'46.2vw',height:'31.5vw',zIndex:1,filter:'drop-shadow(0px 9px 40px rgba(0,0,0,0.13))',transform:'rotate(-14deg)'}} alt="flower1" />
        <PngImg src="/module/heart.png" style={{left:'calc(8vw - 2px)',top:'calc(55vh + 20px)',width:'34.459425vw',height:'24.1215975vw',zIndex:11,transform:'rotate(0.3deg)'}} alt="heart" />
        <PngImg src="/module/puffy.png" style={{left:'calc(72vw - 438px)',top:'calc(60vh - 9px)',width:'10vw',height:'6.923vw',zIndex:1,transform:'rotate(175deg)',opacity:0.2}} alt="puffy2" />
        <PngImg src="/module/wiggle.png" style={{left:'calc(-30vw + 43px)',top:'calc(-10vh - 170px)',width:'69.3vw',height:'48.51vw',zIndex:0,filter:'drop-shadow(0px 10px 40px rgba(0,0,0,0.15))',transform:'rotate(22deg)'}} alt="wiggle2" />
        <PngImg src="/module/pinch.png" style={{left:'calc(90vw - 705px)',top:'calc(60vh + 159px)',width:'22.404vw',height:'15.996vw',zIndex:1,transform:'rotate(-25deg)'}} alt="pinch-right" />
        {/* 텍스트/로고 */}
        <PibitLogo>PIBIT</PibitLogo>
        <MainTitle>나만의 습관개선 감각 동반자를 만나다. 'Pibit'에 오신 것을 환영해요!<br/>당신의 긴 삶의 여정을 함께 도와줄 동반자가 기다리고 있어요.</MainTitle>
        <EngTitle>Your Future Habit Carer</EngTitle>
        <MainButton onClick={() => router.push('/pibitintro')}>새로운 동반자 만나기</MainButton>
        <BottomDesc>
          Welcome to your journey of creating your next future companion. A habit-caretaker companion pibit
        </BottomDesc>
        <BottomLeftDesc>Journey to create habit-caretaker companion pibit</BottomLeftDesc>
        <CompanyLogoText>PIBITCOMPANY ⓐ</CompanyLogoText>
      </Root>
    </>
  );
} 