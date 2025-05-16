import Link from 'next/link';
import styled from 'styled-components';

const HomeButtonContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

const HomeButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #4dd0e1;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #26c6da;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export default function HomeButtonComponent() {
  return (
    <HomeButtonContainer>
      <Link href="/" passHref>
        <HomeButton>
          <span>🏠</span> 홈으로
        </HomeButton>
      </Link>
    </HomeButtonContainer>
  );
} 