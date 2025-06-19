import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  overflow: hidden;
  background: transparent;
  transform-origin: top left;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%;
    height: 100%;
    background: url('/introbk.png') center center / cover no-repeat;
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
  left: 779px; /* 50% + 23px */
  top: 171px; /* 151px + 20px */
  transform: translate(-50%, 0);
  font-family: 'Pretendard', 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 352px; /* 370px * 0.95 */
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
  left: 756px; /* 50% */
  top: 523px; /* 508px + 15px */
  transform: translate(-50%, 0);
  font-family: 'Pragati Narrow', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 57px; /* 3.75vw */
  line-height: 1.2;
  text-align: center;
  color: #fff;
  text-shadow: 4px 4px 38px rgba(0,0,0,0.07), 2px 2px 8px rgba(0,0,0,0.18);
  z-index: 2;
`;

const MainTitle = styled.div`
  position: absolute;
  left: 756px; /* 50% */
  top: 126px; /* 76px + 50px */
  transform: translate(-50%, 0);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px; /* 0.99vw */
  line-height: 1.6;
  text-align: center;
  color: #fff;
  z-index: 2;
`;

const MainButton = styled.button`
  position: absolute;
  left: 771px; /* 50% + 15px */
  top: 735px; /* 685px + 50px */
  transform: translate(-50%, 0);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px; /* 1.56vw */
  line-height: 1.2;
  color: #B5AECA;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 29px;
  box-shadow: 9px 9px 20px 3px rgba(100, 61, 130, 0.25);
  padding: 15px 38px; /* 1vw 2.5vw */
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
  left: 756px; /* 50% */
  bottom: 84px; /* 134px - 50px */
  transform: translateX(-50%);
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 15.6px; /* 11.7pt */
  color: #fff;
  text-align: center;
  z-index: 2147483647;
  white-space: nowrap;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.18);
`;

const BottomLeftDesc = styled.div`
  position: absolute;
  left: 25px;
  bottom: 84px; /* 134px - 50px */
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 11.7px; /* 8.8pt */
  color: #B5AECA;
  text-align: left;
  letter-spacing: 0.01em;
  z-index: 20;
  text-transform: none;
`;

const CompanyLogoText = styled.div`
  position: absolute;
  right: 22px;
  bottom: 84px; /* 134px - 50px */
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 16px; /* 12pt */
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
        <PngImg src="/module/puffy.png" style={{left: '1140px', top: '520px', width: '431px', height: '317px', zIndex: 1, transform: 'rotate(-11deg)'}} alt="puffy" />
        <PngImg src="/module/finger.png" style={{left: '900px', top: '475px', width: '605px', height: '413px', zIndex: 1, filter: 'brightness(1.15) drop-shadow(0px 10px 30px rgba(0,0,0,0.1))', transform: 'rotate(61deg)'}} alt="finger" />
        <PngImg src="/module/pinch.png" style={{left: '-112px', top: '312px', width: '612px', height: '428px', zIndex: 10, transform: 'matrix(-1,0.02,0.02,1,0,0)'}} alt="pinch1" />
        <PngImg src="/module/flower.png" style={{left: '570px', top: '610px', width: '225px', height: '163px', zIndex: 1, filter: 'drop-shadow(0px 9px 40px rgba(0,0,0,0.13))', transform: 'rotate(15deg)', opacity: 0.6}} alt="flower2" />
        <PngImg src="/module/wiggle.png" style={{left: '310px', top: '586px', width: '509px', height: '347px', zIndex: 1, transform: 'rotate(143deg)', opacity: 0.7}} alt="wiggle1" />
        <PngImg src="/module/flower.png" style={{left: '1180px', top: '260px', width: '699px', height: '476px', zIndex: 1, filter: 'drop-shadow(0px 9px 40px rgba(0,0,0,0.13))', transform: 'rotate(-14deg)'}} alt="flower1" />
        <PngImg src="/module/heart.png" style={{left: '120px', top: '570px', width: '521px', height: '365px', zIndex: 11, transform: 'rotate(0.3deg)'}} alt="heart" />
        <PngImg src="/module/puffy.png" style={{left: '650px', top: '590px', width: '151px', height: '105px', zIndex: 1, transform: 'rotate(175deg)', opacity: 0.2}} alt="puffy2" />
        <PngImg src="/module/wiggle.png" style={{left: '-413px', top: '-268px', width: '1048px', height: '733px', zIndex: 0, filter: 'drop-shadow(0px 10px 40px rgba(0,0,0,0.15))', transform: 'rotate(22deg)'}} alt="wiggle2" />
        <PngImg src="/module/pinch.png" style={{left: '650px', top: '760px', width: '339px', height: '242px', zIndex: 1, transform: 'rotate(-25deg)'}} alt="pinch-right" />
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