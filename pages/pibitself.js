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
  transform: translate(25%, 30%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  z-index: 30;
`;

// 습관 추가 카드
const AddCard = styled.div`
  box-sizing: border-box;
  position: static;
  width: 395px;
  height: 181px;
  background: #FFFFFF;
  border: 4px solid #F4D3FF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  transition: box-shadow 0.2s, border 0.2s;
  &:hover {
    box-shadow: 6px 6px 15px rgba(244, 211, 255, 0.8);
  }
`;

// 습관 추가 카드 내부 텍스트
const AddCardText = styled.div`
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #C3C3C3;
  text-align: center;
`;

const InputField = styled.input`
  width: 200px;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const SubmitHabitButton = styled.button`
  background: #F4D3FF;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ResultButton = styled.button`
  position: absolute;
  width: 235px;
  height: 60px;
  left: calc(50% - 235px/2 - 2px);
  top: 864px;
  background: #B4AEE8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 27px;
  color: #FFFFFF;
  z-index: 30;
  cursor: pointer;
  border: none;
`;

const CardContainer = styled.div`
  width: 395px;
  height: 181px;
  position: relative;
`;

const Card = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border: 4px solid #F4D3FF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  z-index: 20;
`;

const CardFront = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  background-color: #fff;
`;

const CardTitle = styled.div`
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #595959;
  margin-bottom: 5px;
`;

const CardDesc = styled.div`
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #AEAEAE;
`;

const CardContent = styled.div`
  font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #8D8D8D;
  margin-top: 10px;
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
  z-index: 100;
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

const PlusIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 12.5V47.5" stroke="#D9D9D9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 30H47.5" stroke="#D9D9D9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PibitSelf() {
  const router = useRouter();
  const { name } = router.query;
  const [hovered, setHovered] = useState(null);
  const [selectedCards, setSelectedCards] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [habitCards, setHabitCards] = useState([
    { title: "손톱 물어뜯기", desc: "긴장, 불안할 때", content: "하루에 2번 이상" },
    { title: "머리카락 뽑기", desc: "스트레스 받을 때", content: "하루에 5번 이상" },
  ]);

  const cardDetails = [
    { text: '부정적인 감정', dynamicLeft: '210px' },
    { text: '긍정적인 감정', dynamicLeft: '500px' },
    { text: '애매한 감정', dynamicLeft: '790px' },
    { text: '복합적인 감정', dynamicLeft: '1080px' },
  ];

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleCardSelection = (i) => {
    setSelectedCards((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const handleNewHabitChange = (e) => {
    setNewHabit(e.target.value);
  };
  
  const handleHabitSubmit = () => {
    if (newHabit.trim() !== '') {
      setHabitCards([...habitCards, { title: newHabit, desc: "새로운 습관", content: "빈도 설정" }]);
      setNewHabit('');
      setShowInput(false);
    }
  };

  const handleNext = () => {
    const selectedHabits = habitCards.filter((_, index) => selectedCards[index]);
    router.push({
      pathname: '/pibitloading',
      query: {
        habits: JSON.stringify(selectedHabits.map(h => h.title))
      },
    });
  };

  const calculateLeft = (index, total) => {
    const cardWidth = 247;
    const gap = 25;
    const totalWidth = total * cardWidth + (total - 1) * gap;
    const startLeft = (1512 - totalWidth) / 2;
    return startLeft + index * (cardWidth + gap);
  };
  
  const [cardStates, setCardStates] = useState(
    habitCards.map(() => ({ isFlipped: false, isHovered: false }))
  );
  
  const handleMouseEnter = (index) => {
    setCardStates(prev => prev.map((c, i) => i === index ? { ...c, isHovered: true } : c));
  };

  const handleMouseLeave = (index) => {
    setCardStates(prev => prev.map((c, i) => i === index ? { ...c, isHovered: false } : c));
  };
  
  const handleAddCard = () => {
    if (habitCards.length < 5) {
      setHabitCards([...habitCards, { title: "새로운 습관", desc: "습관 설명", content: "빈도" }]);
    }
  };

  useEffect(() => {
    setCardStates(habitCards.map(() => ({ isFlipped: false, isHovered: false })));
  }, [habitCards]);
  
  return (
    <>
      <Head>
        <title>PIBIT-Self</title>
        <link href="https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" as="style" crossOrigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </Head>
      <Root>
        <BackButton onClick={() => router.back()}>
            <BackArrow />
        </BackButton>
        <BgImage />
        <FullImage src='/full.png' />
        <FullImageRight src='/full.png' />
        
        <Logo>PIBIT</Logo>
        <CompanyEng>Journey to create habit-caretaker companion pibit</CompanyEng>
        <Company>PIBITCOMPANY@</Company>
        
        <UserTitle>
            {name ? `${name}님의` : '당신의'} 감정 발현의 원인이 되는<br/>
            '<span style={{ color: '#E4BFFF' }}>부정적 감정</span>'을 선택하고
        </UserTitle>
        <UserEtc>등을 선택해주세요</UserEtc>

        <HabitCardRow>
          {habitCards.map((habit, index) => (
            <CardContainer 
              key={index} 
              onClick={() => handleCardSelection(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                border: selectedCards[index] ? '4px solid #F4D3FF' : 'none',
                borderRadius: '24px' 
              }}
            >
              <CardFront>
                <CardTitle>{habit.title}</CardTitle>
                <CardDesc>{habit.desc}</CardDesc>
                <CardContent>{habit.content}</CardContent>
              </CardFront>
            </CardContainer>
          ))}
          {habitCards.length < 5 && (
            showInput ? (
              <AddCard>
                <InputField 
                  type="text"
                  value={newHabit}
                  onChange={handleNewHabitChange}
                  placeholder="새 습관 입력"
                />
                <SubmitHabitButton onClick={handleHabitSubmit}>추가</SubmitHabitButton>
              </AddCard>
            ) : (
              <AddCard onClick={handleShowInput}>
                <PlusIcon />
              </AddCard>
            )
          )}
        </HabitCardRow>
        
        <MainTitle>
          오늘, 어떤 감정을 느끼셨나요?
        </MainTitle>
        <SubDesc>
          감정을 선택하고, 감정이 유발하는 나의 특정 행동 루틴을 선택해주세요<br/>
          (중복 선택 가능)
        </SubDesc>
        
        <CardRow dynamicLeft={`${(1512 - (cardDetails.length * 247 + (cardDetails.length - 1) * 25)) / 2}px`}>
          {cardDetails.map((card, index) => (
            <CardButton
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCardSelection(index + habitCards.length)}
              selected={selectedCards[index + habitCards.length]}
              hovered={hovered === index}
            >
              {card.text}
            </CardButton>
          ))}
        </CardRow>

        <UserDesc>
          위의 습관들은 사용자 '{name || '당신'}' 님이 앱 사용 전<br/>
          제공해주신 데이터들을 기반으로 생성되었어요
        </UserDesc>
        
        <ResultButton onClick={handleNext}>
          결과보기
        </ResultButton>
      </Root>
    </>
  );
} 