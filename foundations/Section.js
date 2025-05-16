import styled from 'styled-components';

const SectionContainer = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 40px;
    height: 2px;
    background-color: #333;
  }
`;

export default function Section({ title, children }) {
  return (
    <SectionContainer>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionContainer>
  );
} 