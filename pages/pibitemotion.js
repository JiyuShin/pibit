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

const Root = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  background: linear-gradient(180deg, #D3E4FE 0%, #FFF7E0 100%);
  overflow-y: auto;
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
  top: 952px;
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
  top: 950px;
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
  top: 350px;
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
  top: 416px;
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
  top: calc(16.35% - 30px);
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
  top: calc(28.27% - 30px);
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
  top: calc(61.3% - 30px);
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
  background: #FFFFFF;
  border: 3px solid
    ${({ selected }) => (selected ? '#FFE066' : '#FFFFFF')};
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
  width: auto;
  left: ${({ dynamicLeft }) => dynamicLeft || '210px'};
  top: 719px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  z-index: 30;
`;

const HabitCardRow = styled.div`
  position: absolute;
  top: 190px;
  left: -15px;
  width: 100%;
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
  top: 526px;
  border: 0.5px solid #9A9A9A;
  transform: rotate(90deg);
  z-index: 22;
`;

const Ellipse19 = styled.div`
  position: absolute;
  width: 9px;
  height: 9px;
  left: calc(50% - 9px/2);
  top: 552px;
  background: #9A9A9A;
  border-radius: 50%;
  z-index: 23;
`;

const Rectangle45 = styled.div`
  position: absolute;
  width: 1607px;
  height: 242px;
  left: calc(50% - 1607px/2 + 8.5px);
  top: 684px;
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
  top: -65px;
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
  top: calc(73.4% - 27px);
  bottom: -3.72%;
  background: linear-gradient(180deg, rgba(237, 241, 245, 0) 17.54%, #EDF1F5 85.96%);
  height: 26.04%;
  width: calc(100% - 30px);
  z-index: 2147483647;
`;

const ExploreButton = styled.button`
  position: absolute;
  left: calc(50% - 257px/2 + 0.5px);
  top: 843px;
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

export default function PibitEmotion() {
  const router = useRouter();
  const { habit1 = '', habit2 = '', habit3 = '', habit4 = '', habit5 = '', name = '' } = router.query;
  const habits = [habit1, habit2, habit3, habit4, habit5];
  // habits 배열에서 두 그룹으로 분리
  const upperHabitSet = [
    '싫은 말이 있어도 그냥 참고 넘겨요',
    '혼자 있는게 더 편해요',
    '자리에 오래 앉아있는게 어려워요',
  ];
  const lowerHabitSet = [
    '무의식적으로 볼 안쪽을 씹은 적이 있어요',
    '지저분한걸 보면 바로 치우고 싶어요',
  ];
  const upperHabits = habits.filter(h => upperHabitSet.includes(h));
  const lowerHabits = habits.filter(h => lowerHabitSet.includes(h));
  const restHabits = habits.filter(h => !upperHabitSet.includes(h) && !lowerHabitSet.includes(h) && !lowerHabitSet.includes(h));

  // 하단 4개 항목 버튼 상태 관리
  const [cardItems, setCardItems] = useState([
    '손톱 물어뜯기',
    '무언가를 반복 확인하기',
    '입술 물어뜯기',
    '입안 깨물기',
  ]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const lastCardRef = useRef(null);
  const [dynamicLeft, setDynamicLeft] = useState('210px');

  const handleCardSelection = (i) => {
    setSelectedIdx(i);
  };

  useEffect(() => {
    if (cardItems.length === 5) {
      setDynamicLeft('210px');
    } else if (cardItems.length > 5 && lastCardRef.current) {
      const width = lastCardRef.current.offsetWidth;
      setDynamicLeft(`calc(210px - ${width}px)`);
    }
  }, [cardItems.length, cardItems[cardItems.length - 1]]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <Head>
        <title>PIBIT</title>
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
          <MainTitle>불안민감형에 해당할 확률이 높아요!</MainTitle>
          <SubDesc>불안 민감형은 작은 변화나 예기치 않은 상황에도 마음이 쉽게 긴장되고 조급해질 수 있어요. 그로 인해 손톱을 뜯거나 입술을 만지는 등의 습관이 무의식중에 나타나기도 해요. 자꾸 확인하거나, 대답을 기다리며 걱정이 많아지는 모습도 자주 보일 수 있어요. 이런 행동들은 마음을 진정시키려는 나름의 방식이지만, 나도 모르게 반복되기 쉬워요.</SubDesc>
          <UserDesc>
            {name ? `${name}님께 익숙할 수 있는 습관들이에요.` : '님께 익숙할 수 있는 습관들이에요.'}<br />
            해당되는 항목이 있다면 선택해주시고, 없거나 더 떠오르는 게 있다면 자유롭게 입력해 주세요!
          </UserDesc>
          <Line2 />
          <Ellipse19 />
          <Rectangle45 />
          <CardRow dynamicLeft={dynamicLeft}>
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
          {/* 상단 5개 습관 멘트 카드 - flex로 균일하게 배치, 두 줄로 분리 */}
          <HabitCardRow>
            {habits.slice(0, 3).map((text, i) => (
              <HabitCard key={i}>{text}</HabitCard>
            ))}
          </HabitCardRow>
          <HabitCardRow style={{ top: '240px', left: '-15px' }}>
            {habits.slice(3, 5).map((text, i) => (
              <HabitCard key={i + 3}>{text}</HabitCard>
            ))}
          </HabitCardRow>
          
          <ExploreButton 
            show={selectedIdx !== null} 
            onClick={() => {
              const selectedHabit = selectedIdx !== null ? cardItems[selectedIdx] : '';
              router.push({ 
                pathname: '/pibitloading', 
                query: { name, habit: selectedHabit } 
              })
            }}
          >
            모듈 탐색하기
          </ExploreButton>
        </Root>
      </main>
    </div>
  );
} 