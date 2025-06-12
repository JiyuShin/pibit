import styled, { keyframes, css } from 'styled-components';

const moveBlob1 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, 60px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const moveBlob2 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, -40px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

const moveBlob3 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-80px, -90px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const moveBlob4 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, 40px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

const nfcExampleAnimation = keyframes`
  0%, 25% { /* 3초 대기 */
    transform: translate(-320px, -50%);
    opacity: 1;
  }
  33.33% { /* 1초간 fade out */
    transform: translate(-320px, -50%);
    opacity: 0.15;
  }
  41.67% { /* 1초간 이동 */
    transform: translate(-50%, -50%);
    opacity: 0.15;
  }
  50% { /* 1초간 fade in */
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  75% { /* 3초 대기 */
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  83.33% { /* 1초간 fade out */
    transform: translate(-50%, -50%);
    opacity: 0.15;
  }
  91.67% { /* 1초간 이동 */
      transform: translate(-320px, -50%);
      opacity: 0.15;
  }
  100% { /* 1초간 fade in */
      transform: translate(-320px, -50%);
      opacity: 1;
  }
`;

export const Bg = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  background: linear-gradient(112.9deg, #D7D9EF 20.66%, #FCF3F8 67.15%, #FFFFFF 91.29%);
  overflow: hidden;
  border-radius: 20px;
  img {
    width: 96px;
    height: auto;
  }
`;

export const Ellipse26 = styled.div`
  position: absolute;
  width: 669px;
  height: 669px;
  left: -167px;
  top: -159px;
  background: linear-gradient(180deg, #CBDFFA 0%, #FFFFFF 100%);
  filter: blur(65px);
  animation: ${moveBlob1} 20s ease-in-out infinite;
`;

export const Ellipse29 = styled.div`
  position: absolute;
  width: 263px;
  height: 263px;
  left: 1163px;
  top: 443px;
  background: #DFDEF1;
  filter: blur(60px);
  animation: ${moveBlob2} 18s ease-in-out infinite;
`;

export const Ellipse32 = styled.div`
  position: absolute;
  width: 530px;
  height: 530px;
  left: 765px;
  top: 717px;
  background: #EDF2FC;
  filter: blur(60px);
  animation: ${moveBlob3} 25s ease-in-out infinite;
`;

export const Ellipse31 = styled.div`
  position: absolute;
  width: 384px;
  height: 384px;
  left: 48px;
  top: 683px;
  background: #E2D5E9;
  filter: blur(65px);
  animation: ${moveBlob4} 22s ease-in-out infinite;
`;

export const Ellipse33 = styled.div`
  position: absolute;
  width: 469px;
  height: 469px;
  left: -209px;
  top: 598px;
  background: #E2D5E9;
  filter: blur(65px);
  animation: ${moveBlob1} 17s ease-in-out infinite;
`;

export const Ellipse28 = styled.div`
  position: absolute;
  width: 480px;
  height: 480px;
  left: 1102px;
  top: 587px;
  background: linear-gradient(132.87deg, #F5B4E0 0%, #CBDFFA 104%);
  filter: blur(100px);
  animation: ${moveBlob2} 24s ease-in-out infinite;
`;

export const Messages = styled.div`
  position: absolute;
  top: 172px;
  left: calc(50% - 811px/2);
  width: 811px;
  height: 540px; /* 734 - 172 - 22 (margin) */
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  background: ${props => (props.me ? '#ffe082' : '#f3f0ff')};
  color: #333;
  border: 1.5px solid ${props => (props.me ? '#ffe082' : '#7b61ff')};
`;

export const InputRow = styled.form`
  position: absolute;
  width: 811px;
  height: 55px;
  left: calc(50% - 811px/2 + 0.5px);
  top: 734px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 2;
  font-size: 1rem;
  justify-content: center;
`;

export const Input = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  padding-left: 15px;

  &::placeholder {
    color: #b0b0b0;
  }
`;

export const SendButtonContainer = styled.button`
  box-sizing: border-box;
  position: relative;
  width: 45px;
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #B5AECA;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.17);
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
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

export const Greeting = styled.p`
  position: absolute;
  width: 567px;
  left: calc(50% - 567px/2 + 3.5px);
  top: calc(17.92% - 55px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #9E9E9E;
`;

export const MainInstruction = styled.p`
  position: absolute;
  width: 900px;
  left: calc(50% - 900px/2 + 3.5px);
  top: 176px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 1.5;
  text-align: center;
  color: #828282;
`;

export const InfoBox1 = styled.div`
  position: absolute;
  width: 245px;
  height: 139px;
  left: 511px;
  top: 300px;
  background: #FFFFFF;
  opacity: 0.8;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const InfoBox2 = styled.div`
  position: absolute;
  width: 243px;
  height: 139px;
  left: 785px;
  top: 300px;
  background: #FFFFFF;
  opacity: 0.8;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const AnimatedContentImage = styled.img`
  width: ${({ width }) => width || 'auto'};
  height: auto;
`;

export const RoutineTitle = styled.h3`
  position: absolute;
  width: 567px;
  left: calc(50% - 567px/2 - 76.5px);
  top: calc(37.78% - 55px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 30px;
  text-align: center;
  color: #828282;
`;

export const RoutineDescription = styled.p`
  position: absolute;
  width: 210px;
  left: 528.5px;
  top: calc(42.36% - 55px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #9E9E9E;
`;

export const CustomizingTitle = styled.h3`
  position: absolute;
  width: 567px;
  left: calc(50% - 567px/2 + 205.5px);
  top: calc(37.68% - 55px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 30px;
  text-align: center;
  color: #828282;
`;

export const CustomizingDescription = styled.p`
  position: absolute;
  width: 200px;
  left: 810px;
  top: calc(42.36% - 55px);
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #9E9E9E;
`;

export const NfcArea = styled.div`
  position: absolute;
  left: 50%;
  top: calc(77% - 270px);
  transform: translateX(-50%);
  width: 412px;
  height: 170.4px;
  border: 2px dashed #C2B6E5;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AnimatedExampleImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 120px;
  animation: ${nfcExampleAnimation} 12s ease-in-out infinite;
  animation-delay: 2s;
`;

export const NfcInstruction = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 278px; 
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #9E9E9E;
  width: 100%;
  text-align: center;
`;

export const BackButton = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  width: 96px;
  height: auto;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
  
  img {
    width: 100%;
    height: auto;
  }
`;

// ========================================================================
// UI 전환을 위한 컨테이너
// ========================================================================

const uiTransition = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;

export const PreChatContainer = styled.div`
  ${uiTransition}
`;

export const PostChatContainer = styled.div`
  ${uiTransition}
`;


// ========================================================================
// 새로운 채팅 UI 요소
// ========================================================================

export const FlowerImage = styled.div`
  position: absolute;
  width: 218.77px;
  height: 154.2px;
  left: calc(50% - 218.77px/2 - 418.54px);
  top: calc(50% - 154.2px/2 - 298.9px);
  background-image: url(/flower.png);
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0px 9px 40px rgba(0, 0, 0, 0.13));
  transform: rotate(12.77deg);
`;

export const DividerLine = styled.div`
  position: absolute;
  width: 805px;
  height: 0px;
  left: calc(50% - 805px/2 - 2.5px);
  top: 80px;
  border: 3px solid #C2BFBF;
`;

export const DateBox = styled.div`
  position: absolute;
  width: 305px;
  height: 43px;
  top: 59px;
  background: #DFDFDF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #FFFFFF;
`;

export const ChatTitle = styled.p`
  position: absolute;
  width: 121px;
  height: 30px;
  left: 418px;
  top: 172px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #828282;
`;

export const WelcomeMessage = styled.p`
  position: absolute;
  width: 222px;
  height: 25px;
  left: 418px;
  top: 215px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  left: -12.46%;
  right: -7.74%;
  top: 73.4%;
  bottom: -3.72%;
  background: linear-gradient(180deg, rgba(237, 241, 245, 0) 17.54%, #EDF1F5 85.96%);
`;

export const NewUIContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Pretendard Variable', sans-serif;
`;

export const HorizontalLine = styled.div`
  position: absolute;
  width: 100%;
  height: 0px;
  top: 120px;
  border: 3px solid #C2BFBF;
`;

export const ContentBox = styled.div`
  position: absolute;
  top: 172px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TitleText = styled.p`
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #828282;
  margin: 0;
`;

export const SubText = styled.p`
  margin-top: 13px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
`;

export const GradientBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200px;
  background: linear-gradient(180deg, rgba(237, 241, 245, 0) 17.54%, #EDF1F5 85.96%);
  z-index: -1;
`; 