import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';

const rotate = keyframes`
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(315deg);
  }
`;

const rotateRight = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(405deg);
  }
`;

const moveGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const PageContainer = styled.div`
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  background: linear-gradient(180deg, #D3E4FE 0%, #FFF7E0 100%);
  overflow-y: hidden;
  overflow-x: hidden;
`;

const FullImage = styled.img`
  position: fixed;
  left: -380px;
  top: -310px;
  width: 840px;
  height: 1008px;
  z-index: 2147483647;
  opacity: 0.47;
  pointer-events: none;
  animation: ${rotate} 20s linear infinite;
`;

const FullImageRight = styled.img`
  position: fixed;
  left: calc(50% + 750px);
  top: calc(50% + 180px);
  width: 600px;
  height: 720px;
  z-index: 1;
  opacity: 0.57;
  pointer-events: none;
  animation: ${rotateRight} 20s linear infinite;
`;

const BgImage = styled.div`
  position: absolute;
  width: 1512px;
  height: 1069px;
  left: 0px;
  top: -12px;
  background: url('/대지 3@4x.png');
  background-size: cover;
  z-index: 0;
`;

const Logo = styled.div`
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
  z-index: 10;
`;

const Company = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 658px);
  top: 917px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;
  z-index: 10;
`;

const CompanyEng = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 197px);
  top: 915px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  color: #B5AECA;
  z-index: 10;
`;

// --- Ellipse 데코레이션 컴포넌트 ---
const Ellipse = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

// --- 주요 타이틀, 설명, 결과, 카드, 버튼 등 ---
const MainTitle = styled.div`
  position: absolute;
  width: 1086px;
  height: 87px;
  left: calc(50% - 1086px/2);
  top: 395px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 55px;
  line-height: 27px;
  text-align: center;
  color: #707070;
  z-index: 2147483647;
`;
const SubDesc = styled.div`
  position: absolute;
  width: 717px;
  height: 81px;
  left: calc(50% - 717px/2 + 0.5px);
  top: 455px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 27px;
  text-align: center;
  color: #B9B9B9;
  z-index: 20;
`;
const UserTitle = styled.div`
  position: absolute;
  width: 431px;
  left: calc(50% - 431px/2 - 5px);
  top: calc(16.35% - 30px + 45px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 38px;
  line-height: 27px;
  text-align: center;
  color: #595959;
  z-index: 2147483647;
`;
const UserEtc = styled.div`
  position: absolute;
  left: calc(61.9% + 20px);
  top: calc(28.27% - 30px + 45px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 38px;
  line-height: 27px;
  text-align: center;
  color: #707070;
  z-index: 2147483647;
`;
const UserDesc = styled.div`
  position: absolute;
  width: 905px;
  left: calc(50% - 905px/2 + 0.5px);
  top: calc(61.3% - 30px + 45px);
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #B9B9B9;
  z-index: 20;
`;

// 카드 버튼 스타일
const CardButton = styled.button`
  box-sizing: border-box;
  position: static;
  width: 247px;
  height: 69px;
  
  background: linear-gradient(270deg, #ffffff, #fffde7, #fff59d, #fffde7, #ffffff);
  background-size: 400% 400%;
  animation: ${moveGradient} 8s ease infinite;

  border: 3px solid
    ${({ selected }) => (selected ? '#FFE066' : 'transparent')};
  box-shadow: 3px 3px 10px
    ${({ hovered, selected }) =>
      hovered || selected
        ? 'rgba(255, 214, 77, 0.35)'
        : 'rgba(0, 0, 0, 0.22)'};
  border-radius: 25px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 21px;
  line-height: 30px;
  color: #828181;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  margin-right: 25px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
  &:last-child {
    margin-right: 0;
  }
`;

const CardButtonWide = styled(CardButton)`
  width: 283px;
`;

const CardButtonSmall = styled(CardButton)`
  width: 247px;
`;

const CardRow = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  top: 774px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  z-index: 30;
`;

const HabitCardRow = styled.div`
  position: absolute;
  top: 235px;
  left: -50px;
  width: 1530px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  z-index: 2147483647;
`;

const HabitCard = styled.div`
  box-sizing: border-box;
  position: static;
  background: #FFFFFF;
  border: 2px solid #FFD64D;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10.4px;
  line-height: 24px;
  text-align: center;
  color: #9A9A9A;
  text-shadow: 4px 4px 38px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 19px;
  min-width: 120px;
  width: auto;
  max-width: 340px;
  height: 38px;
  z-index: 50;
`;

const Rectangle10 = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 240px;
  height: 48px;
  left: 1247px;
  top: 29px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #FFFFFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 41.5px;
  z-index: 20;
`;

const EmotionTypeText = styled.div`
  position: absolute;
  width: 218px;
  height: 31px;
  left: calc(50% - 218px/2 + 614px);
  top: 40px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 27px;
  text-align: center;
  color: #FFFFFF;
  z-index: 21;
`;

const Line1 = styled.div`
  position: absolute;
  width: 446px;
  height: 0px;
  left: 801px;
  top: 52px;
  border-top: 2px solid #FFFFFF;
  z-index: 19;
`;

const Line2 = styled.div`
  position: absolute;
  width: 54px;
  height: 0px;
  left: calc(50% - 54px/2 - 0.5px);
  top: 571px;
  border: 0.5px solid #9A9A9A;
  transform: rotate(90deg);
  z-index: 22;
`;

const Ellipse19 = styled.div`
  position: absolute;
  width: 9px;
  height: 9px;
  left: calc(50% - 9px/2);
  top: 597px;
  background: #9A9A9A;
  border-radius: 50%;
  z-index: 23;
`;

const Rectangle45 = styled.div`
  position: absolute;
  width: 1607px;
  height: 172px;
  left: calc(50% - 1607px/2 + 8.5px);
  top: 729px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  z-index: 20;
`;

const TopLayer = styled.div`
  position: absolute;
  width: 503px;
  height: 318px;
  left: calc(50% - 503px/2 - 16.5px);
  top: 88px;
  opacity: 0.8;
  z-index: 9999;
`;

const TopImage = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: url('/TPu8CZ.tif');
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const TopRect = styled.div`
  position: absolute;
  left: 50%;
  top: -20px;
  width: 689px;
  height: 689px;
  background: url('/circle.png');
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(-50%);
  z-index: 2147483647;
  pointer-events: none;
`;

const TopRect43 = styled.div`
  position: absolute;
  left: calc(-12.46% + 60px);
  right: -7.74%;
  top: calc(73.4% - 27px + 45px);
  bottom: -3.72%;
  background: linear-gradient(180deg, rgba(237, 241, 245, 0) 17.54%, #EDF1F5 85.96%);
  height: 26.04%;
  width: calc(100% - 30px);
  z-index: 2147483647;
`;

const ExploreButton = styled.button`
  position: absolute;
  left: calc(50% - 257px/2 + 0.5px);
  top: 888px;
  width: 200px;
  height: 51px;
  background: #FFF7E0;
  border-radius: 50px;
  border: 2px solid #FFD64D;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #828181;
  cursor: pointer;
  box-shadow: 2px 2px 8px 3px rgba(0, 0, 0, 0.1);
  z-index: 40;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;

export default function InternallyPage() {
  const router = useRouter();
  const { name, selectedHabits: habitsJson } = router.query;
  
  const [selectedHabits, setSelectedHabits] = useState([]);

  // 하단 버튼 상태 복구
  const [cardItems, setCardItems] = useState([
    '턱 괴기',
    '머리카락 당기기',
  ]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const lastCardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (habitsJson) {
      try {
        const parsedHabits = JSON.parse(habitsJson);
        setSelectedHabits(parsedHabits);
      } catch (e) {
        console.error("Failed to parse habits JSON:", e);
        setSelectedHabits([]);
      }
    }
  }, [habitsJson]);

  const handleCardSelection = (i) => {
    if (i === 0) { 
      router.push('/puffymodule');
    } else if (i === 1) {
      router.push('/fingermodule');
    } else {
      setSelectedIdx(i);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisible && selectedIdx !== null) {
      const finalHabit = cardItems[selectedIdx];
      setTimeout(() => {
        router.push({
          pathname: '/pibitloading',
          query: { name, selectedHabits: habitsJson, finalHabit }
        });
      }, 500); // fade-out 시간과 일치
    }
  }, [isVisible, selectedIdx, name, habitsJson, cardItems, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer isVisible={isVisible}>
      <Head>
        <title>PIBIT-내부감각</title>
        <meta name="description" content="PIBIT" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <Root>
          <FullImage src="/full.png" alt="full" />
          <FullImageRight src="/full.png" alt="full-right" />
          <TopLayer>
            <TopImage />
            <TopRect />
            <TopRect43 />
          </TopLayer>
          <BgImage />
          <Logo>PIBIT</Logo>
          <Line1 />
          <Rectangle10 />
          <EmotionTypeText>감정유형 알아가기</EmotionTypeText>
          <Company>PIBITCOMPANY ⓐ</Company>
          <CompanyEng>Journey to create habit-caretaker companion pibit</CompanyEng>
          {/* 타이틀, 설명, 결과, 카드, 버튼, 데코레이션 등 */}
          <UserTitle>{name ? `${name}님은` : '님은'}</UserTitle>
          <UserEtc>에 따라</UserEtc>
          <MainTitle>내면몰입형에 해당할 확률이 높아요!</MainTitle>
          <SubDesc>
            내면 몰입형은 혼자 있을 때 생각이나 감정에 자연스럽게 깊이 몰입하는 경향이 있습니다.
            <br />
            마음을 가라앉히고 집중하기 위해 몸을 편안하게 지탱하는 자세를 자주 취하게 되며,
            <br />
            그렇기 때문에 멍하니 있거나 생각이 많아질 때 자연스럽게 <span style={{ color: '#707070', fontWeight: '700' }}>턱을 괴거나 머리카락을 당기는</span> 습관으로 이어질 수 있습니다.
          </SubDesc>
          <UserDesc>
            {name ? `${name}님의` : '당신의'} 감정유형에 따른 습관 분석이 완료되었어요!<br />
            평소에 익숙할 수도, 예상치 못한 습관일 수도 있는 이 습관을 선택하여 따듯한 동반자 피빗을 만나보세요.
          </UserDesc>
          <Line2 />
          <Ellipse19 />
          <Rectangle45 />
          
          {/* 하단 버튼 복구 */}
          <CardRow>
            {cardItems.map((text, i) => (
              <CardButton
                key={i}
                type="button"
                selected={selectedIdx === i}
                hovered={hoveredIdx === i}
                onClick={() => handleCardSelection(i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                ref={i === cardItems.length - 1 ? lastCardRef : undefined}
              >
                {text}
              </CardButton>
            ))}
          </CardRow>

          {/* 상단 4개 습관 카드 - 두 줄로 나누어 표시 */}
          <HabitCardRow>
            {selectedHabits.slice(0, 2).map((text, i) => (
              <HabitCard key={i}>{text}</HabitCard>
            ))}
          </HabitCardRow>
          <HabitCardRow style={{ top: '285px' }}>
            {selectedHabits.slice(2, 4).map((text, i) => (
              <HabitCard key={i + 2}>{text}</HabitCard>
            ))}
          </HabitCardRow>
          
        </Root>
      </main>
    </PageContainer>
  );
} 