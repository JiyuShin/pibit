import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #006064;
  margin-bottom: 2rem;
  text-align: center;
`;

const HabitList = styled.div`
  margin-bottom: 2rem;
`;

const HabitItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #e0f7fa;
  border-radius: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const HabitText = styled.span`
  font-size: 1.2rem;
  color: #00838f;
  margin-right: 1rem;
`;

const ResponseText = styled.span`
  font-size: 1.2rem;
  color: #006064;
  font-weight: 600;
`;

const Recommendation = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: #4dd0e1;
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
`;

const ImageGallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const getShapeRecommendation = (count) => {
  const shapes = {
    1: '원형',
    2: '타원형',
    3: '삼각형',
    4: '사각형',
    5: '오각형',
    6: '육각형',
    7: '칠각형'
  };
  return shapes[count] || '원형';
};

export default function RecommendationPage() {
  const router = useRouter();
  const { habits } = router.query;
  const habitList = habits ? habits.split(',') : [];

  return (
    <Container>
      <Content>
        <Title>선택하신 습관들을 확인해주세요</Title>
        <HabitList>
          {habitList.map((habit, index) => (
            <HabitItem key={index}>
              <HabitText>{habit}</HabitText>
              <ResponseText>고민이시군요!</ResponseText>
            </HabitItem>
          ))}
        </HabitList>
        <Recommendation>
          {habitList.length}개의 습관을 고치고 싶은 분들께는 {getShapeRecommendation(habitList.length)} 바디를 추천드려요.
        </Recommendation>
        <ImageGallery>
          <ImageContainer>
            <Image
              src="/three.png"
              alt="Three Shape"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src="/four.png"
              alt="Four Shape"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src="/five.png"
              alt="Five Shape"
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
        </ImageGallery>
      </Content>
    </Container>
  );
} 