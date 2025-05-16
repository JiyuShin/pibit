import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.$primary ? '#000' : 'transparent'};
  color: ${props => props.$primary ? '#fff' : '#000'};
  border: 1px solid #000;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$primary ? '#333' : '#f5f5f5'};
  }
`;

export default function Button({ children, primary, ...props }) {
  return <StyledButton $primary={primary} {...props}>{children}</StyledButton>;
} 