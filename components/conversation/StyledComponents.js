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

const typing = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Bg = styled.div`
  position: relative;
  width: 1512px;
  height: 982px;
  margin: 0 auto;
  /* 🔥 배경 복원 - 이중 보장을 위해 Bg 컴포넌트에도 배경 설정 */
  background-image: url(/newbk2.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  border-radius: 20px;
  /* 성능 최적화 */
  transform: translate3d(0, 0, 0);
  will-change: auto;
  backface-visibility: hidden;
  contain: layout style paint;
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
  left: calc(50% - 1200px/2);
  width: 1200px;
  height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  background: transparent;
  border: none;
  box-sizing: border-box;
  /* 🔥 메시지 컨테이너 최적화 - 리렌더링 성능 향상 */
  transform: translate3d(0, 0, 0);
  will-change: scroll-position;
  backface-visibility: hidden;
  contain: layout style paint;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Message = styled.div`
  ${props => props.isFixed ? `
    max-width: 100%;
  ` : `
    width: fit-content;
    max-width: 60%;
    min-width: 80px;
  `}
  padding: ${props => (props.isFixed ? '15px 20px' : '10px 15px')};
  border-radius: ${props => (props.isFixed ? '0' : '20px')};
  margin-bottom: ${props => (props.isFixed ? '30px' : '10px')};
  background: ${props => (props.isFixed ? 'transparent' : (props.me ? '#ffffff' : '#f3f0ff'))};
  color: #333;
  border: ${props => (props.isFixed ? 'none' : `1.5px solid ${props.me ? '#cccccc' : '#7b61ff'}`)};
  align-self: ${props => (props.me ? 'flex-end' : 'flex-start')};
  margin-left: ${props => {
    if (props.isFixed) return '70px';
    return props.me ? 'auto' : '0';
  }};
  margin-right: ${props => (props.me ? '0' : 'auto')};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  white-space: pre-wrap;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  transform: translateY(0);
  /* 🔥 개별 메시지 최적화 */
  backface-visibility: hidden;
  will-change: transform, opacity;
  contain: layout style;
  
  &.fade-out {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const InputRow = styled.form`
  width: 691px;
  height: 55px;
  background: #FFFFFF;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border: 1px solid #E0E0E0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 10;
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
  color: #333333;

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
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
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
  top: calc(17.92% - 75px);
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
  top: 131px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.5;
  text-align: center;
  color: #828282;
  white-space: pre-wrap;
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
  top: calc(37.78% - 64px);
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
  top: calc(42.36% - 70px);
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
  top: calc(37.68% - 62px);
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
  top: calc(42.36% - 68px);
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
  width: 966px;
  height: 0px;
  left: calc(50% - 966px/2 - 2.5px);
  top: 80px;
  border: 1.35px solid #FFFFFF;
`;

export const DateBox = styled.div`
  position: absolute;
  width: 230px;
  height: 43px;
  left: calc(50% - 230px/2 + 0.5px);
  top: 4px;
  background: ${props => 
    props.isCustomizingPhase ? '#FFF9C4' : 
    (props.isRoutinePhase ? '#E8E1FF' : '#FFFFFF')
  };
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding-top: 10px;
  transition: background-color 0.5s ease-in-out;
`;

export const DateText = styled.p`
  position: absolute;
  width: 127px;
  height: 30px;
  left: 696px;
  top: 66px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15pt;
  line-height: 30px;
  text-align: center;
  color: #BFBCBC;
  display: none;
`;

export const ChatTitle = styled.p`
  position: absolute;
  width: 300px;
  height: 30px;
  left: 266px;
  top: 172px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 30px;
  text-align: left;
  color: #828282;
  white-space: nowrap;
`;

export const WelcomeMessage = styled.p`
  position: absolute;
  width: auto;
  height: 25px;
  left: 266px;
  top: 200px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #828282;
  line-height: 25px;
  text-align: left;
  white-space: nowrap;
`;

export const YearDateText = styled.p`
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 15pt;
  line-height: 1.2;
  text-align: center;
  color: ${props => 
    props.isCustomizingPhase ? '#828282' : 
    (props.isRoutinePhase ? '#7B61FF' : '#BFBCBC')
  };
  margin: 0;
  padding: 0;
  margin-top: -8px;
  transition: color 0.5s ease-in-out;
`;

// ========================================================================
// 질감 선택 UI 컴포넌트들
// ========================================================================

// Ellipse 50 - 큰 원형 배경 (메시지 바로 밑에 위치)
export const TextureSelectionEllipse = styled.div`
  position: absolute;
  width: 363px;
  height: 363px;
  left: 68px;
  top: 5px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
`;

// Rectangle 70 - 큰 흰색 박스 (질감 선택 영역)
export const TextureSelectionBox = styled.div`
  position: absolute;
  width: 440px;
  height: 220px;
  left: 25px;
  top: 65px;
  background: ${props => props.backgroundColor || '#FFFFFF'};
  border-radius: 23px;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* 로딩 상태일 때만 center 정렬 */
  ${props => props.isLoading ? `
    display: flex;
    align-items: center;
    justify-content: center;
  ` : ''}
`;

// 로딩 애니메이션 컴포넌트
export const LoadingAnimation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  .loading-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #92B5BA;
    animation: loadingPulse 1.4s ease-in-out infinite both;
  }
  
  .loading-dot:nth-child(1) { animation-delay: -0.32s; }
  .loading-dot:nth-child(2) { animation-delay: -0.16s; }
  .loading-dot:nth-child(3) { animation-delay: 0s; }
  
  @keyframes loadingPulse {
    0%, 80%, 100% {
      transform: scale(0.6);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const LoadingText = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #92B5BA;
  margin-left: 12px;
`;

// 텍스처 이미지 컴포넌트 (🔥 초고속 즉시 전환)
export const TextureImage = styled.div`
  position: absolute;
  top: 5px;
  left: 57px;
  width: 100%;
  height: 100%;
  background: url('/${props => props.imageName}.${props => {
    // .webp 이미지들
    if (props.imageName === 'oranges' || props.imageName === 'bluish' || props.imageName === 'pink' || props.imageName === 'mint' || props.imageName === 'Furry8' || props.imageName === 'sili7' || props.imageName === 'lumpy2' || props.imageName === 'yellowh' || props.imageName === 'blueh' || props.imageName === 'purpleh' || props.imageName === 'minth') {
      return 'webp';
    }
    return 'png';
  }}') center center/52.5% no-repeat;
  background-size: 52.5%;
  background-repeat: no-repeat;
  /* JPEG/JPG 이미지들의 흰색 배경 투명 처리 (색상 UI용 PNG 이미지들은 제외) */
  ${props => (props.imageName === 'Furry8' || props.imageName === 'sili7' || props.imageName === 'lumpy2') && `
    mix-blend-mode: multiply;
    filter: contrast(1.1) brightness(1.05);
  `}
  /* 🔥 즉시 전환 - 거의 0에 가까운 전환 시간 */
  transform: translate3d(${props => props.isVisible ? '0' : (props.direction === 'left' ? '-100%' : '100%')}, 0, 0) scale(1);
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: transform 0.001s linear, opacity 0.001s linear;
  /* 🚀 강화된 GPU 가속 */
  will-change: transform, opacity, background-image;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  /* 브라우저 최적화 */
  contain: layout style paint;
  image-rendering: optimizeSpeed;
  
  ${props => props.isVisible && `
    &:hover {
      transform: translate3d(0, 0, 0) scale(1.3);
      transition: transform 0.1s ease-out;
    }
  `}
  

`;

// Flower logo - 왼쪽 상단에 배치
export const FlowerLogo = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 31px;
  top: 215px;
  background: url('/h1.png') center/contain no-repeat;
  z-index: 2;
`;

// Texture Type Label - furry.png 보일 때 왼쪽에 표시되는 텍스트
export const TextureTypeLabel = styled.div`
  position: absolute;
  left: 48px;
  top: 83px;
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 19.1pt;
  line-height: 1.2;
  color: #92B5BA;
  z-index: 2;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.04s ease-out;
`;



// Rectangle 71 - 작은 흰색 박스 (버튼)
export const TextureSelectButton = styled.div`
  position: absolute;
  width: 149px;
  height: 57px;
  left: ${props => props.isSelecting ? '30px' : '165px'};
  top: 329px;
  background: #FFFFFF;
  border-radius: 23px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

// 질감 선택하기 텍스트 (삭제 - 버튼 안에 직접 텍스트 넣음)
export const TextureSelectText = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #828282;
  pointer-events: none;
`;

// Ellipse 49 - 작은 원형 (화살표 버튼 배경) 🔥 초고속 즉시 반응
export const TextureArrowCircle = styled.div`
  position: absolute;
  width: 57px;
  height: 57px;
  left: 437px;
  top: 142px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 🔥 즉시 반응 - 가장 빠른 전환 */
  transition: transform 0.001s linear, box-shadow 0.05s ease-out;
  z-index: 3;
  /* 🚀 강화된 GPU 가속 */
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  contain: layout style paint;
  
  &:hover {
    transform: scale(1.1) translate3d(0, 0, 0);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: scale(0.95) translate3d(0, 0, 0);
  }
`;

// Arrow right - 화살표 아이콘
export const TextureArrowIcon = styled.img`
  width: 34px;
  height: 34px;
  pointer-events: none;
  object-fit: contain;
`;

// 질감 선택 원형 요소들 (Ellipse 51-55)
export const TextureOption1 = styled.div`
  position: absolute;
  width: 60.42px;
  height: 59.36px;
  left: 195px;
  top: 329px;
  background: #FFEB9C;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0) rotate(6deg);
  animation: popIn 0.08s ease-out forwards;
  will-change: transform;
  
  @keyframes popIn {
    to {
      transform: scale(1) rotate(6deg);
    }
  }
  
  &:hover {
    transform: scale(1.1) rotate(6deg);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const TextureOption2 = styled.div`
  position: absolute;
  width: 60.42px;
  height: 59.36px;
  left: 268px;
  top: 329px;
  background: #87CEEB;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0) rotate(6deg);
  animation: popIn 0.08s ease-out forwards;
  will-change: transform;
  
  @keyframes popIn {
    to {
      transform: scale(1) rotate(6deg);
    }
  }
  
  &:hover {
    transform: scale(1.1) rotate(6deg);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const TextureOption3 = styled.div`
  position: absolute;
  width: 60.42px;
  height: 59.36px;
  left: 341px;
  top: 329px;
  background: #E6E6FA;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0) rotate(6deg);
  animation: popIn 0.08s ease-out forwards;
  will-change: transform;
  
  @keyframes popIn {
    to {
      transform: scale(1) rotate(6deg);
    }
  }
  
  &:hover {
    transform: scale(1.1) rotate(6deg);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const TextureOption4 = styled.div`
  position: absolute;
  width: 60.42px;
  height: 59.36px;
  left: 414px;
  top: 329px;
  background: #A8E6A3;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transform: scale(0) rotate(6deg);
  animation: popIn 0.08s ease-out forwards;
  will-change: transform;
  
  @keyframes popIn {
    to {
      transform: scale(1) rotate(6deg);
    }
  }
  
  &:hover {
    transform: scale(1.1) rotate(6deg);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;



// 최종 모달 overlay (즉시 나타남)
export const FinalModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.1s ease-in-out forwards;
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

// Rectangle 72 - 최종 모달 메인 박스 (즉시 나타남)
export const FinalModalContainer = styled.div`
  position: relative;
  width: 572px;
  height: 450px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  opacity: 0;
  transform: scale(0.8);
  animation: modalSlideIn 0.1s ease-out forwards;
  will-change: transform, opacity;
  backface-visibility: hidden;
  
  @keyframes modalSlideIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// 최종 모달 텍스트 (즉시 나타남)
export const FinalModalText = styled.div`
  position: absolute;
  width: 442px;
  height: 64px;
  left: 65px;
  top: 36px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  color: #828282;
  opacity: 0;
  animation: textFadeIn 0.1s ease-out 0.05s forwards;
  will-change: opacity;
  
  @keyframes textFadeIn {
    to {
      opacity: 1;
    }
  }
`;

// opened box 이미지 (즉시 나타남)
export const FinalModalBoxImage = styled.div`
  position: absolute;
  width: 570px;
  height: 379.2px;
  left: 1px;
  top: 70px;
  background: url('/box.png') center/contain no-repeat;
  filter: brightness(1.15) contrast(1.05) saturate(1.1);
  opacity: 0;
  transform: translateY(20px);
  animation: boxSlideIn 0.15s ease-out 0.1s forwards;
  will-change: transform, opacity;
  backface-visibility: hidden;
  
  @keyframes boxSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// flower/finger 이미지 (즉시 나타남)
export const FinalModalFlowerImage = styled.div`
  position: absolute;
  width: 239.83px;
  height: 169.05px;
  left: calc(50% - 239.83px/2 + 16.29px);
  top: calc(50% - 169.05px/2 - 20.66px);
  background: ${props => `url('/module/${props.moduleType === 'finger' ? 'finger' : props.moduleType === 'wiggle' ? 'wiggle' : props.moduleType === 'heart' ? 'heart' : props.moduleType === 'puffy' ? 'puffy' : 'flower'}.png')`} center/contain no-repeat;
  filter: drop-shadow(0px 9px 40px rgba(0, 0, 0, 0.13));
  opacity: 0;
  transform: rotate(12.77deg) scale(0.8) translateY(15px);
  animation: flowerFadeInPop 0.2s ease-out 0.2s forwards;
  will-change: transform, opacity;
  backface-visibility: hidden;
  
  @keyframes flowerFadeInPop {
    0% {
      opacity: 0;
      transform: rotate(12.77deg) scale(0.8) translateY(15px);
    }
    50% {
      opacity: 0.7;
      transform: rotate(12.77deg) scale(0.95) translateY(5px);
    }
    100% {
      opacity: 1;
      transform: rotate(12.77deg) scale(1) translateY(0);
    }
  }
`;

// 모듈 이름 입력 영역 (즉시 나타남)
export const FinalModalNameContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 320px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  animation: nameInputFadeIn 0.15s ease-out 0.4s forwards;
  will-change: opacity;
  
  @keyframes nameInputFadeIn {
    to {
      opacity: 1;
    }
  }
`;

// 모듈 이름 입력 필드
export const FinalModalNameInput = styled.input`
  width: 280px;
  height: 40px;
  padding: 0 15px;
  border: 2px solid #7b61ff;
  border-radius: 20px;
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 500;
  color: #333;
  background: #fff;
  outline: none;
  text-align: center;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    border-color: #6951e8;
    box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.1);
    transform: scale(1.02);
  }
`;

// 모듈 이름 제출 버튼
export const FinalModalNameButton = styled.button`
  width: 180px;
  height: 40px;
  background: #7b61ff;
  color: white;
  border: none;
  border-radius: 20px;
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #6951e8;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(123, 97, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// 배송 완료 오버레이 (블러 배경)
export const ShippingCompleteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: overlayFadeInBlur 0.5s ease-out forwards;
  
  @keyframes overlayFadeInBlur {
    to {
      opacity: 1;
    }
  }
`;

// Rectangle 73 - 배송 완료 흰색 박스 (화면 중앙)
export const ShippingCompleteBox = styled.div`
  position: relative;
  width: 450px;
  height: 120px;
  background: #FFFFFF;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  animation: slideInCompleteCenter 0.6s ease-out 0.2s forwards;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @keyframes slideInCompleteCenter {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// 배송 완료 컨테이너 (화면 중앙 정렬)
export const ShippingCompleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: containerSlideIn 0.6s ease-out 0.1s forwards;
  
  @keyframes containerSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// 배송 완료 텍스트 (화면 중앙, 0.14배 축소)
export const ShippingCompleteText = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  color: #828282;
  text-align: center;
  transform: scale(0.86); /* 0.14배 줄이기 (1 - 0.14 = 0.86) */
  transform-origin: center; /* 중앙 기준으로 축소 */
  
  .shipping-title {
    font-weight: 700;
    font-size: 22px;
    line-height: 26px;
    margin-bottom: 6px;
  }
  
  .shipping-content {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  }
`;

// Box mockup2 이미지 (화면 중앙)
export const ShippingCompleteBoxMockup = styled.div`
  width: 200px;
  height: 200px;
  background: url('/box2.png') center/contain no-repeat;
  transform: rotate(-16.87deg) scale(0);
  animation: boxMockupPopCenter 0.6s ease-out 0.4s forwards;
  will-change: transform;
  backface-visibility: hidden;
  filter: drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.15));
  
  @keyframes boxMockupPopCenter {
    0% {
      transform: rotate(-16.87deg) scale(0);
    }
    60% {
      transform: rotate(-16.87deg) scale(1.1);
    }
    100% {
      transform: rotate(-16.87deg) scale(1);
    }
  }
`;

// Fade 전환 오버레이
export const FadeTransitionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  z-index: 99999;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;



 