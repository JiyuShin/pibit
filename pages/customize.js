import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import HomeButton from '../foundations/HomeButton';
import Link from 'next/link';

const twinkle = keyframes`
  0% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-5px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.5; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const gradientAnimation = keyframes`
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

const floatAnimation1 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-180px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation2 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-40px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation3 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-160px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation4 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation5 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-140px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation6 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-60px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation7 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-170px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation8 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation9 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-150px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation10 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation11 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-120px); }
  100% { transform: translateY(200px); }
`;

const floatAnimation12 = keyframes`
  0% { transform: translateY(200px); }
  50% { transform: translateY(-80px); }
  100% { transform: translateY(200px); }
`;

const buttonGlow = keyframes`
  0% {
    box-shadow: 0 0 300px rgba(142, 68, 173, 0.3);
  }
  50% {
    box-shadow: 0 0 1200px rgba(142, 68, 173, 0.5);
  }
  100% {
    box-shadow: 0 0 300px rgba(142, 68, 173, 0.3);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #e0f7fa, #fff5e6, #e0f7fa, #fff5e6);
  background-size: 400% 400%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} 2s infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: 600;
  color: #34495e;
  font-family: 'Pretendard', sans-serif;
  text-transform: uppercase;
  background: linear-gradient(45deg, #8e44ad, #34495e);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease infinite;
`;

const Title = styled.div`
  position: absolute;
  top: 12rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.4rem;
  font-weight: 700;
  color: #34495e;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  width: 100%;
`;

const ResultType = styled.span`
  display: inline-block;
  font-weight: 800;
  font-size: 2.4rem;
  font-family: 'Pretendard', sans-serif;
  background: linear-gradient(45deg, #8e44ad, #3498db);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 3s ease infinite;
`;

const Subtitle = styled.div`
  position: absolute;
  top: 16rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: #34495e;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  width: 100%;
`;

const HabitsContainer = styled.div`
  position: absolute;
  top: 22rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const HabitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.05s ease;
  font-family: 'Pretendard', sans-serif;
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: #8e44ad;
    transform: translateY(-2px);
    animation: ${buttonGlow} 2s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: -3000px;
    left: -3000px;
    right: -3000px;
    bottom: -3000px;
    border-radius: 6000px;
    background: radial-gradient(circle at center, 
      rgba(142, 68, 173, 0.15) 0%,
      rgba(142, 68, 173, 0.1) 20%,
      rgba(52, 152, 219, 0.05) 40%,
      rgba(52, 152, 219, 0.02) 60%,
      transparent 80%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.05s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 7rem;
  position: relative;
  z-index: 10;
`;

const CustomInput = styled.input`
  width: 300px;
  padding: 1rem;
  border: 2px solid #3498db;
  border-radius: 25px;
  font-size: 1.2rem;
  font-family: 'Pretendard', sans-serif;
  outline: none;
  transition: all 0.05s ease;
  position: relative;
  z-index: 10;

  &:focus {
    border-color: #8e44ad;
  }
`;

const CustomLabel = styled.label`
  display: block;
  color: #00838f;
  margin-top: 2rem;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  background-color: white;
  border: 2px solid #3498db;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.05s ease;
  font-family: 'Pretendard', sans-serif;
  position: relative;
  z-index: 10;
  
  &:hover {
    background-color: #8e44ad;
    color: white;
    border-color: #8e44ad;
  }
`;

const NextButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4dd0e1;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #26c6da;
    transform: scale(1.1);
  }
  
  &:disabled {
    background: #b0bec5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ThirdPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  overflow: hidden;
`;

const CardBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 3rem;
  width: 80%;
  max-width: 1000px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-top: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const SelectedHabitsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e0f7fa;
  padding: 2rem;
  overflow: hidden;
`;

const SelectedHabitsCard = styled.div`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SelectedHabitsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #006064;
  margin: 0;
  text-align: center;
`;

const HabitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2rem;
  background: #e0f7fa;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    background: #b2ebf2;
  }
`;

const HabitText = styled.p`
  font-size: 1.3rem;
  color: #006064;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::after {
    content: '고민이시군요!';
    color: #00838f;
    font-weight: 500;
  }
`;

const RecommendationBox = styled.div`
  background: #4dd0e1;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`;

const RecommendationText = styled.p`
  font-size: 1.2rem;
  color: white;
  margin: 0;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const BottomImage = styled.img`
  width: 180px;
  height: auto;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FloatingImage = styled.img`
  position: absolute;
  width: 400px;
  height: auto;
  opacity: 0.88;
  bottom: -240px;
  transform: translateX(-50%);
`;

const Module1 = styled(FloatingImage)`
  left: -5%;
  animation: ${floatAnimation1} 4s ease-in-out infinite;
`;

const Module2 = styled(FloatingImage)`
  left: 10%;
  animation: ${floatAnimation2} 4s ease-in-out infinite;
`;

const Module3 = styled(FloatingImage)`
  left: 25%;
  animation: ${floatAnimation3} 4s ease-in-out infinite;
`;

const Module4 = styled(FloatingImage)`
  left: 40%;
  animation: ${floatAnimation4} 4s ease-in-out infinite;
`;

const Module5 = styled(FloatingImage)`
  left: 55%;
  animation: ${floatAnimation5} 4s ease-in-out infinite;
`;

const Module6 = styled(FloatingImage)`
  left: 70%;
  animation: ${floatAnimation6} 4s ease-in-out infinite;
`;

const Module7 = styled(FloatingImage)`
  left: 0%;
  animation: ${floatAnimation7} 4s ease-in-out infinite;
`;

const Module8 = styled(FloatingImage)`
  left: 15%;
  animation: ${floatAnimation8} 4s ease-in-out infinite;
`;

const Module9 = styled(FloatingImage)`
  left: 30%;
  animation: ${floatAnimation9} 4s ease-in-out infinite;
`;

const Module10 = styled(FloatingImage)`
  left: 45%;
  animation: ${floatAnimation10} 4s ease-in-out infinite;
`;

const Module11 = styled(FloatingImage)`
  left: 60%;
  animation: ${floatAnimation11} 4s ease-in-out infinite;
`;

const Module12 = styled(FloatingImage)`
  left: 75%;
  animation: ${floatAnimation12} 4s ease-in-out infinite;
`;

export default function Customize() {
  const router = useRouter();
  const { name } = router.query;
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [customHabit, setCustomHabit] = useState('');

  const habits = [
    '손톱물어뜯기',
    '입술 뜯기',
    '다리 떨기',
    '머리카락 꼬기'
  ];

  const handleBackClick = () => {
    router.push('/customizedna');
  };

  const handleHabitClick = (habit) => {
    setSelectedHabit(habit);
    router.push({
      pathname: '/recommendation',
      query: { name, habit }
    });
  };

  const handleSubmit = () => {
    if (customHabit) {
      router.push({
        pathname: '/recommendation',
        query: { name, habit: customHabit }
      });
    }
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>←</BackButton>
      <Logo>PIBIT</Logo>
      <Title>
        {name}님은 <ResultType>불안민감형</ResultType> 기질에 해당해요!
      </Title>
      <Subtitle>
        해당 기질이 불러일으킬 수 있는 습관들 중 해당하는 하나를 선택해주세요!
      </Subtitle>
      <HabitsContainer>
        {habits.map((habit, index) => (
          <HabitButton
            key={index}
            selected={selectedHabit === habit}
            onClick={() => handleHabitClick(habit)}
          >
            {habit}
          </HabitButton>
        ))}
      </HabitsContainer>
      <InputRow>
        <CustomInput
          type="text"
          placeholder="직접 입력하기"
          value={customHabit}
          onChange={(e) => setCustomHabit(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>
          입력하기
        </SubmitButton>
      </InputRow>
      <Module1 src="/module/module001.png" alt="Module 1" />
      <Module2 src="/module/module003.png" alt="Module 2" />
      <Module3 src="/module/module004.png" alt="Module 3" />
      <Module4 src="/module/module005.png" alt="Module 4" />
      <Module5 src="/module/module006.png" alt="Module 5" />
      <Module6 src="/module/module001.png" alt="Module 6" />
      <Module7 src="/module/module003.png" alt="Module 7" />
      <Module8 src="/module/module004.png" alt="Module 8" />
      <Module9 src="/module/module005.png" alt="Module 9" />
      <Module10 src="/module/module006.png" alt="Module 10" />
      <Module11 src="/module/module001.png" alt="Module 11" />
      <Module12 src="/module/module003.png" alt="Module 12" />
      <button
        style={{ position: 'absolute', bottom: 40, right: 40, zIndex: 10, padding: '12px 24px', fontSize: 18, borderRadius: 8, background: '#8e44ad', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        onClick={() => router.push({ pathname: '/conversation', query: { name } })}
        disabled={!name}
      >
        실시간 채팅하기
      </button>
    </Container>
  );
} 