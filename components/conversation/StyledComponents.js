import styled from 'styled-components';

export const Bg = styled.div`
  min-height: 100vh;
  background: #fffde7;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const Messages = styled.div`
  flex: 1;
  width: 100%;
  padding: 32px 0 90px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled.div`
  align-self: ${props => (props.me ? 'flex-end' : 'flex-start')};
  background: ${props => (props.me ? '#ffe082' : '#fff')};
  color: #333;
  padding: 8px 14px;
  border-radius: 16px;
  font-size: 1.1rem;
  max-width: 80%;
  box-shadow: 0 1px 4px #0001;
  margin: 0 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: bold;
`;

export const InputRow = styled.form`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100vw;
  max-width: 800px;
  background: #fffde7;
  display: flex;
  gap: 8px;
  padding: 16px 16px 24px 16px;
  /* box-shadow: 0 -2px 16px #0001; */
  z-index: 10;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1.5px solid #ffe082;
  font-size: 1.1rem;
  outline: none;
  max-width: 650px;
  box-shadow: none !important;
  background: #fff;
`;

export const SendBtn = styled.button`
  background: #ffe082;
  color: #333;
  border: none;
  border-radius: 14px;
  padding: 0 18px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd54f;
  }
`;

export const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  vertical-align: middle;
`;

export const Profile3DContainer = styled.div`
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
`; 