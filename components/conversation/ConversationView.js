import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bg,
  Messages,
  Message,
  InputRow,
  Input,
  SendButtonContainer,
  Ellipse26,
  Ellipse29,
  Ellipse32,
  Ellipse31,
  Ellipse33,
  Ellipse28,
  Greeting,
  MainInstruction,
  InfoBox1,
  InfoBox2,
  RoutineTitle,
  RoutineDescription,
  CustomizingTitle,
  CustomizingDescription,
  NfcArea,
  AnimatedExampleImage,
  NfcInstruction,
  BackButton,
  AnimatedContentImage,
  PreChatContainer,
  PostChatContainer,
  FlowerImage,
  DividerLine,
  DateBox,
  DateText,
  ChatTitle,
  WelcomeMessage,
  GradientOverlay,
  YearDateText,
  // 질감 선택 UI 컴포넌트들
  TextureSelectionEllipse,
  TextureSelectionBox,
  TextureImage,
  FlowerLogo,
  TextureTypeLabel,
  TextureSelectButton,
  TextureSelectText,
  TextureArrowCircle,
  TextureArrowIcon,
  TextureOption1,
  TextureOption2,
  TextureOption3,
  TextureOption4,
  // 최종 모달 컴포넌트들
  FinalModalOverlay,
  FinalModalContainer,
  FinalModalText,
  FinalModalBoxImage,
  FinalModalFlowerImage,
  FinalModalNameContainer,
  FinalModalNameInput,
  FinalModalNameButton,
  // 배송 완료 컴포넌트들
  ShippingCompleteOverlay,
  ShippingCompleteBox,
  ShippingCompleteContainer,
  ShippingCompleteText,
  ShippingCompleteBoxMockup,
  FadeTransitionOverlay,
  // 로딩 애니메이션 컴포넌트들
  LoadingAnimation,
  LoadingText,
} from './StyledComponents';
import { toneAndManner } from './constants';
// teenReplies는 현재 이 컴포넌트에서 직접 사용되지 않으므로 import하지 않습니다.
// 만약 필요하다면 import { teenReplies } from './constants'; 로 추가할 수 있습니다.

const NewUIContainer = styled(motion.div)`
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

const NewDateBox = styled.div`
  position: absolute;
  width: 305px;
  height: 43px;
  top: 60px;
  background: #DFDFDF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const NewDateText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #FFFFFF;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: 855px;
  height: 0px;
  left: calc(50% - 855px/2);
  top: 80px;
  border: 1px solid #C2BFBF;
`;

const FirstTitleRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 750px !important;
  top: 136px !important;
  z-index: 20;
`;

const FirstMessageText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
  position: relative;
  left: 580px !important;
  top: 105px !important;
  text-align: left;
  z-index: 20;
  width: 400px;
`;

const TitleText = styled.p`
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #828282;
  margin: 0;
  transform: translate(-109px, -48px);
  z-index: 20;
`;

const SubText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
  position: relative;
  left: 400px !important;
  top: -108px !important;
  z-index: 20;
  width: 400px;
`;

const SecondTitleRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 750px !important;
  top: 226px !important;
  z-index: 20;
`;

const SecondMessageText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
  position: relative;
  left: 580px !important;
  top: 195px !important;
  text-align: left;
  z-index: 20;
  width: 400px;
`;

const ThirdTitleRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 750px !important;
  top: 316px !important;
  z-index: 20;
`;

const ThirdMessageText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
  position: relative;
  left: 580px !important;
  top: 281px !important;
  width: 400px;
  text-align: left;
  z-index: 20;
`;

const NewGradientBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 200px;
  background: linear-gradient(180deg, rgba(237, 241, 245, 0) 17.54%, #EDF1F5 85.96%);
  z-index: -1;
`;

// 루틴 박스 스타일 컴포넌트
const RoutineBox = styled.div`
  background: white;
  border-radius: 15px;
  padding: 18px 20px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  width: fit-content;
  max-width: 100%;
  display: inline-block;
  text-align: left;
  min-width: 300px;
`;

// 루틴 메시지를 파싱하고 렌더링하는 함수
const renderRoutineMessage = (text) => {
  // 📅로 시작하는 루틴 부분과 일반 텍스트 부분을 분리
  const parts = text.split(/(?=📅)/);
  
  return (
    <div style={{ width: '100%' }}>
      {parts.map((part, index) => {
        if (part.trim().startsWith('📅')) {
          // 루틴 부분은 흰색 박스로 렌더링
          const lines = part.trim().split('\n');
          const title = lines[0]; // 첫 번째 줄이 제목
          const content = lines.slice(1).join('\n'); // 나머지가 내용
          
          return (
            <div key={index} style={{ display: 'block', width: '100%', marginBottom: '8px' }}>
              <RoutineBox>
                <div style={{ margin: 0 }}>
                  {/* 제목 부분 - 더 굵게 */}
                  <div style={{
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    textAlign: 'left'
                  }}>
                    {title}
                  </div>
                  {/* 내용 부분 */}
                  {content && (
                    <div style={{ 
                      color: '#333', 
                      fontSize: '15px', 
                      fontWeight: '400',
                      lineHeight: '1.7',
                      whiteSpace: 'pre-line',
                      textAlign: 'left',
                      letterSpacing: '0.2px'
                    }}>
                      {content}
                    </div>
                  )}
                </div>
              </RoutineBox>
            </div>
          );
        } else {
          // 일반 텍스트는 그대로
          return (
            <div key={index} style={{ 
              color: '#828282', 
              fontSize: '16px', 
              lineHeight: '1.65',
              whiteSpace: 'pre-line',
              marginBottom: part.trim() ? '10px' : '0',
              width: '100%'
            }}>
              {part.trim()}
            </div>
          );
        }
      })}
    </div>
  );
};

export default function ConversationView() {
  const router = useRouter();
  const { name } = router.query;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState('');
  const messagesEndRef = useRef(null);
  const [isRoutinePhase, setIsRoutinePhase] = useState(false);
  const [isCustomizingPhase, setIsCustomizingPhase] = useState(false);
  // const [nfcWelcomed, setNfcWelcomed] = useState(false); // 현재 사용되지 않음
  // const [awaitingFirstReply, setAwaitingFirstReply] = useState(false); // 현재 사용되지 않음
  // const [step, setStep] = useState(0); // GPT 연동으로 step 상태는 더 이상 필요하지 않습니다.
  // const [userDay, setUserDay] = useState(''); // setUserDay는 있지만 userDay가 사용되지 않음. 아래 로직 확인 필요
  // const [showDunggutAudio, setShowDunggutAudio] = useState(false); // 현재 사용되지 않음
  const [currentToneId, setCurrentToneId] = useState(toneAndManner[0].id);
  const [isPibitLoading, setIsPibitLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [nfcData, setNfcData] = useState(null);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showThirdMessage, setShowThirdMessage] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [secondQuestionSent, setSecondQuestionSent] = useState(false);
  const [routineAccepted, setRoutineAccepted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTextureSelectionPhase, setIsTextureSelectionPhase] = useState(false);
  const [userAge, setUserAge] = useState(null);
  const [currentTextureImage, setCurrentTextureImage] = useState('ff2'); // 'ff2', 'df', 'sil' 순환
  const [isTextureSelecting, setIsTextureSelecting] = useState(false); // 질감 선택 모드
  const [visibleOptions, setVisibleOptions] = useState([]); // 보이는 옵션들 [0, 1, 2, 3]
  const [textureImagesLoaded, setTextureImagesLoaded] = useState(false); // 질감 이미지 프리로딩 상태
  const [selectedTexture, setSelectedTexture] = useState(null); // 선택된 질감
  const [showTextureMessage, setShowTextureMessage] = useState(false); // 질감 선택 완료 메시지 표시
  const [showColorSelection, setShowColorSelection] = useState(false); // 색상 선택 UI 표시
  const [isColorSelecting, setIsColorSelecting] = useState(false); // 색상 선택 모드
  const [visibleColorOptions, setVisibleColorOptions] = useState([]); // 색상 선택 동그라미들
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // 선택된 색상, 기본값은 흰색
  const [textureMessageIndex, setTextureMessageIndex] = useState(-1); // 질감 추천 메시지의 인덱스
  const [showShippingMessage, setShowShippingMessage] = useState(false); // 배송 메시지 표시
  const [isColorSelected, setIsColorSelected] = useState(false); // 색상 선택 완료 여부
  const [showFinalModal, setShowFinalModal] = useState(false); // 최종 모달 표시
  const [moduleName, setModuleName] = useState(''); // 모듈 이름
  const [submittedModuleName, setSubmittedModuleName] = useState(''); // 제출된 모듈 이름
  const [showShippingComplete, setShowShippingComplete] = useState(false); // 배송 완료 화면 표시
  const [isTextureLoading, setIsTextureLoading] = useState(false); // 질감 이미지 로딩 상태
  const [isColorLoading, setIsColorLoading] = useState(false); // 색상 UI 로딩 상태
  const [showFadeTransition, setShowFadeTransition] = useState(false); // fade 전환 효과
  const [isImageChanging, setIsImageChanging] = useState(false); // 화살표 버튼 클릭 시 이미지 변경 로딩
  
  const socketRef = useRef(null);
  const nfcSocketRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const secondQuestionSentRef = useRef(false);

  // 선택된 질감에 따른 설명 생성 함수
  const getTextureDescription = (textureType) => {
    switch(textureType) {
      case 'ff2':
        return '털털한 질감';
      case 'df':
        return '돌기같은 질감';
      case 'sil':
        return '젤리같은 질감';
      default:
        return '특별한 질감';
    }
  };

  // 색상 선택 UI 로딩 시작 (즉시 로딩)
  const startColorLoading = () => {
    console.log('🎨 색상 UI 즉시 로딩');
    setIsColorLoading(true);
    
    // 0.2초 후 즉시 로딩 완료
    setTimeout(() => {
      console.log('🎨 색상 UI 로딩 완료');
      setIsColorLoading(false);
    }, 200);
  };

  // 색상 선택 함수
  const handleColorSelect = (color) => {
    console.log('색상 선택:', color);
    setSelectedColor(color);
    setIsColorSelected(true);
    // 색상만 선택, 배송 메시지는 아직 표시하지 않음 (색상 선택하기 버튼을 눌러야 함)
  };

  // 색상명 변환 함수
  const getColorName = (color) => {
    switch(color) {
      case '#FFDF76':
        return '연노랑';
      case '#DDEBC1':
        return '연초록';
      case '#C5E1FF':
        return '연파랑';
      case '#EEC9E0':
        return '연분홍';
      default:
        return '흰색';
    }
  };

  // 모듈 이름 제출 핸들러
  const handleModuleNameSubmit = () => {
    if (moduleName.trim()) {
      console.log('모듈 이름 제출:', moduleName);
      // 제출된 모듈 이름 저장
      setSubmittedModuleName(moduleName);
      // 최종 모달 닫고 배송 완료 화면 표시
      setShowFinalModal(false);
      setTimeout(() => {
        setShowShippingComplete(true);
        // 🎭 배송완료 화면 표시 후 3초 뒤 fade 전환 시작
        setTimeout(() => {
          console.log('🎭 Fade out 시작');
          setShowFadeTransition(true);
          // fade out 완료 후 0.8초 뒤 index.js로 이동
          setTimeout(() => {
            console.log('🎭 Index.js로 이동');
            router.push('/');
          }, 800);
        }, 3000); // 3초 후 fade 시작
      }, 500); // 0.5초 후 배송 완료 화면 표시
      setModuleName('');
    }
  };

  // 🔥 초고속 질감 이미지 프리로딩 (로딩 애니메이션 포함)
  const preloadTextureImages = () => {
    console.log('🚀 질감 이미지 로딩 시작');
    setIsTextureLoading(true);
    
    const imageNames = ['ff2', 'df', 'sil'];
    const imagePromises = [];
    
    // 🔥 모든 이미지를 Promise로 병렬 로딩
    imageNames.forEach((imageName) => {
      const imagePromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ ${imageName}.png 로딩 완료`);
          resolve(imageName);
        };
        img.onerror = () => {
          console.error(`❌ ${imageName}.png 로딩 실패`);
          reject(imageName);
        };
        img.src = `/${imageName}.png`;
      });
      imagePromises.push(imagePromise);
    });
    
    // 모든 이미지 로딩 완료 후 UI 표시
    Promise.allSettled(imagePromises)
      .then(() => {
        console.log('🎨 모든 질감 이미지 로딩 완료');
        setIsTextureLoading(false);
        setTextureImagesLoaded(true);
      })
      .catch(() => {
        console.log('⚠️ 일부 이미지 로딩 실패, 그래도 진행');
        setIsTextureLoading(false);
        setTextureImagesLoaded(true);
      });
  };

  const nicknameRef = useRef(nickname);
  useEffect(() => {
    nicknameRef.current = nickname;
  }, [nickname]);

  // 질감 선택 단계 시작 시 이미지 프리로딩
  useEffect(() => {
    if (isTextureSelectionPhase && !textureImagesLoaded) {
      console.log('질감 이미지 프리로딩 시작...');
      preloadTextureImages();
    }
  }, [isTextureSelectionPhase, textureImagesLoaded]);

  // 🔥 배경 이미지 미리 로드하여 버벅거림 방지
  useEffect(() => {
    const preloadBackgroundImage = () => {
      const img = new Image();
      img.onload = () => {
        console.log('✅ 배경 이미지 미리 로드 완료');
        // 브라우저 캐시에 확실히 저장
        document.head.appendChild(document.createElement('link')).rel = 'prefetch';
        document.head.lastChild.href = '/newbk2.png';
      };
      img.onerror = () => {
        console.error('❌ 배경 이미지 로드 실패');
      };
      img.src = '/newbk2.png'; // 배경 이미지 미리 로드
    };
    
    preloadBackgroundImage();
  }, []);

  // 🔥 이름 초기화 개선 - 항상 이름이 설정되도록 보장
  useEffect(() => {
    if (router.isReady) {
      const userName = name || '당신';
      console.log('🔧 이름 설정:', { name, userName, routerQuery: router.query });
      setNickname(userName);
      setMessages([]);
    }
  }, [name, router.isReady]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    socketRef.current = io({
      path: '/api/socket',
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => console.log('Socket.io connected'));
    socketRef.current.on('disconnect', () => console.log('Socket.io disconnected'));
    socketRef.current.on('message', (msg) => {
      if (msg.user !== nicknameRef.current) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    nfcSocketRef.current = io('http://localhost:4000', { transports: ['websocket'] });
    nfcSocketRef.current.on('connect', () => {
      console.log('✅ NFC 서버 연결 성공!');
      console.log('🔍 NFC 태그를 리더기에 대보세요...');
      console.log('💡 테스트: 콘솔에서 testNFC() 함수를 실행하면 가상 NFC 태그 이벤트가 발생합니다');
      
      // 전역 테스트 함수 추가
      window.testNFC = () => {
        const testData = {
          id: '0488bb12361e90',
          name: 'Five Flower',
          message: '안녕! 난 five flower이야, 만나게 되서 너무 반가워!'
        };
        console.log('🧪 테스트 NFC 이벤트 발생:', testData);
        // 직접 tag-read 이벤트 핸들러 호출
        document.dispatchEvent(new CustomEvent('test-nfc-tag', { detail: testData }));
      };
      
      // 테스트 이벤트 리스너 추가
      document.addEventListener('test-nfc-tag', (event) => {
        // tag-read 이벤트 핸들러와 동일한 로직 실행
        const data = event.detail;
        console.log('🎉 테스트 NFC 태그 감지됨!', data);
        
        setIsChatStarted(true);
        setShowInitialMessage(false);
        setShowSecondMessage(false);
        setShowThirdMessage(false);
        setShowCircle(false);
        setAllMessages([]);
        setSecondQuestionSent(false);
        secondQuestionSentRef.current = false;
        setRoutineAccepted(false);
        setIsRoutinePhase(false);
        setIsCustomizingPhase(false);
        setIsTextureSelectionPhase(false);
        setUserAge(null);
        setCurrentTextureImage('ff2');
        setSelectedTexture(null);
        setShowTextureMessage(false);
        setShowColorSelection(false);
        setIsColorSelecting(false);
        setVisibleColorOptions([]);
        setSelectedColor('#FFFFFF');
        setTextureMessageIndex(-1);
        setTextureImagesLoaded(false);
        setShowShippingMessage(false);
        setIsColorSelected(false);
        
        const isFiveFlowerTag = data.id === '0488bb12361e90';
        const name = isFiveFlowerTag ? 'Five Flower' : (data.name || '방문객');
        const message = isFiveFlowerTag ? '안녕! 난 five flower이야, 만나게 되서 너무 반가워!' : (data.message || data.text || '만나서 반가워요!');

        const structuredData = { id: data.id, name, message };
        setNfcData(structuredData);
        
        const initialMessage = { user: 'PIBIT', text: message };
        setMessages([initialMessage]);
        
        // 🔥 안전한 이름 사용 - nickname이 빈 값일 때 대비
        const safeNickname = nickname || name || '당신';
        console.log('🔧 NFC 메시지 생성:', { nickname, name, safeNickname });
        
        // 모든 메시지를 allMessages에 순차적으로 추가
        setAllMessages([
          { user: 'Five Flower', text: `${safeNickname} 안녕! 만나게 되서 너무 반가워!`, isFixed: true }
        ]);
        
        setShowInitialMessage(true);
        setShowCircle(true);  // NFC 태그 읽힌 직후 바로 circle 표시
        
        setTimeout(() => {
          setAllMessages(prev => [...prev, { 
            user: 'Five Flower', 
            text: `나와 대화를 통해 어떤 것을 할 수 있는지 간략하게 설명할게!\n${safeNickname}에게 가장 적합한 모듈 사용 루틴과 커스터마이징으로 손톱물어뜯기를 개선해보자!`, 
            isFixed: true 
          }]);
          setShowSecondMessage(true);
          setTimeout(() => {
            setAllMessages(prev => [...prev, { 
              user: 'Five Flower', 
              text: `난 앞으로 ${safeNickname}가 손톱 대신 내 다섯 면과 움푹한 공간을 마음껏 눌러서 스트레스를 꾹 눌러보게 돕는 단단한 존재가 될거야 !`, 
              isFixed: true 
            }]);
            setShowThirdMessage(true);
            setTimeout(() => {
              setAllMessages(prev => [...prev, { 
                user: 'Five Flower', 
                text: `${safeNickname}는 dna 감정유형 테스트 결과 불안민감형으로 결과가 나왔는데,\n${safeNickname}의 일상에서 가장 불안하거나 예민해지는 순간이 있다면 언제야?`, 
                isFixed: true 
              }]);
            }, 1000);
          }, 1000);
        }, 1000);

        const tagToneId = data && data.id ? String(data.id).trim() : toneAndManner[0].id;
        setCurrentToneId(tagToneId);
      });
    });
    nfcSocketRef.current.on('disconnect', () => console.log('❌ NFC 서버 연결 끊어짐'));
    nfcSocketRef.current.on('connect_error', (err) => {
      console.error('❌ NFC 서버 연결 실패:', err);
      console.log('💡 NFC 서버가 실행 중인지 확인하세요 (포트 4000)');
    });
    nfcSocketRef.current.on('tag-read', (data) => {
      console.log('🎉 NFC 태그 감지됨!', data);
      setIsChatStarted(true);
      setShowInitialMessage(false);
      setShowSecondMessage(false);
      setShowThirdMessage(false);
      setShowCircle(false);
      setAllMessages([]);
      setSecondQuestionSent(false);
      secondQuestionSentRef.current = false;
      setRoutineAccepted(false);
      setIsRoutinePhase(false);
      setIsCustomizingPhase(false);
      setIsTextureSelectionPhase(false);
      setUserAge(null);
      setCurrentTextureImage('ff2');
      setSelectedTexture(null);
      setShowTextureMessage(false);
      setShowColorSelection(false);
      setIsColorSelecting(false);
      setVisibleColorOptions([]);
      setSelectedColor('#FFFFFF');
      setTextureMessageIndex(-1);
      setTextureImagesLoaded(false);
      setShowShippingMessage(false);
      setIsColorSelected(false);
      
      const isFiveFlowerTag = data.id === '0488bb12361e90';
      const name = isFiveFlowerTag ? 'Five Flower' : (data.name || '방문객');
      const message = isFiveFlowerTag ? '안녕! 난 five flower이야, 만나게 되서 너무 반가워!' : (data.message || data.text || '만나서 반가워요!');

      const structuredData = { id: data.id, name, message };
      setNfcData(structuredData);
      
      const initialMessage = { user: 'PIBIT', text: message };
      setMessages([initialMessage]);
      
      // 🔥 안전한 이름 사용 - nickname이 빈 값일 때 대비
      const safeNickname = nickname || name || '당신';
      console.log('🔧 실제 NFC 메시지 생성:', { nickname, name, safeNickname });
      
      // 모든 메시지를 allMessages에 순차적으로 추가
      setAllMessages([
        { user: 'Five Flower', text: `${safeNickname} 안녕! 만나게 되서 너무 반가워!`, isFixed: true }
      ]);
      
      setShowInitialMessage(true);
      setShowCircle(true);  // NFC 태그 읽힌 직후 바로 circle 표시
      
              setTimeout(() => {
          setAllMessages(prev => [...prev, { 
            user: 'Five Flower', 
            text: `나와 대화를 통해 어떤 것을 할 수 있는지 간략하게 설명할게!\n${safeNickname}에게 가장 적합한 모듈 사용 루틴과 커스터마이징으로 손톱물어뜯기를 개선해보자!`, 
            isFixed: true 
          }]);
          setShowSecondMessage(true);
          setTimeout(() => {
            setAllMessages(prev => [...prev, { 
              user: 'Five Flower', 
              text: `난 앞으로 ${safeNickname}가 손톱 대신 내 다섯 면과 움푹한 공간을 마음껏 눌러서 스트레스를 꾹 눌러보게 돕는 단단한 존재가 될거야 !`, 
              isFixed: true 
            }]);
            setShowThirdMessage(true);
            setTimeout(() => {
              setAllMessages(prev => [...prev, { 
                user: 'Five Flower', 
                text: `${safeNickname}는 dna 감정유형 테스트 결과 불안민감형으로 결과가 나왔는데,\n${safeNickname}의 일상에서 가장 불안하거나 예민해지는 순간이 있다면 언제야?`, 
                isFixed: true 
              }]);
            }, 1000);
          }, 1000);
        }, 1000);

      const tagToneId = data && data.id ? String(data.id).trim() : toneAndManner[0].id;
      setCurrentToneId(tagToneId);
    });
    nfcSocketRef.current.on('tag-removed', (data) => {
      console.log('nfcSocket event: tag-removed', data);
      setIsChatStarted(false);
      setMessages([]);
      setNfcData(null);
      setShowSecondMessage(false);
      setShowThirdMessage(false);
      setShowCircle(false);
      setAllMessages([]);
      setSecondQuestionSent(false);
      secondQuestionSentRef.current = false;
      setRoutineAccepted(false);
      setIsRoutinePhase(false);
      setIsCustomizingPhase(false);
      setIsTextureSelectionPhase(false);
      setUserAge(null);
      setCurrentTextureImage('ff2');
      setSelectedTexture(null);
      setShowTextureMessage(false);
      setShowColorSelection(false);
      setIsColorSelecting(false);
      setVisibleColorOptions([]);
      setSelectedColor('#FFFFFF');
      setTextureMessageIndex(-1);
      setTextureImagesLoaded(false);
      setShowShippingMessage(false);
      setIsColorSelected(false);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (nfcSocketRef.current) nfcSocketRef.current.disconnect();
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isChatStarted) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const days = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = days[today.getDay()];
      setCurrentDate(`${year}. ${month}. ${day} (${dayOfWeek})`);
    }
  }, [isChatStarted]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      // 부드러운 스크롤 애니메이션 적용
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [allMessages]);

  // 🔥 질감/색상 UI 크기만큼만 스크롤 (즉시 반응)
  useEffect(() => {
    if (messagesContainerRef.current && (isTextureSelectionPhase || showColorSelection)) {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          const container = messagesContainerRef.current;
          const currentScrollTop = container.scrollTop;
          
          // UI 크기만큼만 스크롤 (600px UI 기준)
          const targetScroll = currentScrollTop + 300; // UI가 잘 보이도록 300px만 스크롤
          
          container.scrollTo({
            top: Math.min(targetScroll, container.scrollHeight - container.clientHeight),
            behavior: 'smooth'
          });
          
          console.log('📜 UI 크기만큼 스크롤:', { 
            currentScrollTop,
            targetScroll,
            isTextureSelectionPhase, 
            showColorSelection
          });
        }
      }, 50); // 더 빠른 반응
    }
  }, [isTextureSelectionPhase, showColorSelection]);

  const handleRoutineAccept = () => {
    console.log('🔥 handleRoutineAccept 클릭됨!');
    setRoutineAccepted(true);
    
    // 메시지들을 순차적으로 부드럽게 추가하는 함수
    const addMessagesSequentially = () => {
      // 1. 루틴 수락 확인 메시지
      const acceptMessage = { user: 'Five Flower', text: '좋아 수락 완료! 앞으로 나랑 같이 이 루틴대로 실천해보면서 습관으로 이어지지 않도록 해보자!', isFixed: true };
      
      setMessages(prev => [...prev, acceptMessage]);
      setAllMessages(prev => [...prev, acceptMessage]);
      
      // 2. 1초 후 커스터마이징 시작 메시지
      setTimeout(() => {
        const customizingMessage = { user: 'Five Flower', text: `이제부턴 ${nickname}와 나의 루틴이 효과적으로 이루어질 수 있도록 모듈을 적합한 모습으로 커스터마이징을 시작할게!`, isFixed: true };
        
        setMessages(prev => [...prev, customizingMessage]);
        setAllMessages(prev => [...prev, customizingMessage]);
        
        // 커스터마이징 단계로 변경
        setIsCustomizingPhase(true);
        
        // 3. 1.5초 후 나이 질문 메시지
        setTimeout(() => {
          const ageQuestionMessage = { user: 'Five Flower', text: `${nickname}에게 가장 친근하고 적합한 동반자가 되기 위한 커스터마이징을 진행하기 위해서 ${nickname}의 나이를 알려줘!`, isFixed: true };
          
          setMessages(prev => [...prev, ageQuestionMessage]);
          setAllMessages(prev => [...prev, ageQuestionMessage]);
        }, 1500);
      }, 1000);
    };
    
    // 메시지 추가 시작
    addMessagesSequentially();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { user: nickname, text: input };
    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setAllMessages((prev) => {
      const newMessages = [...prev, userMessage];
      // 사용자가 첫 번째 질문에 답변한 경우 (Five Flower 4개 메시지 + 사용자 1개 메시지 = 5개)
      if (newMessages.length === 5 && !secondQuestionSentRef.current) {
        secondQuestionSentRef.current = true;
        setSecondQuestionSent(true);
        setTimeout(() => {
          setAllMessages(current => [...current, {
            user: 'Five Flower',
            text: `그런 순간이 생길 때 주로 어떤 행동을 하는지, 어떤 생각들을 하는지 자유롭게 알려주면 ${nickname}의 행동,\n생각 루틴에 맞춘 five-flower 피빗 사용 루틴을 추천해줄게!`,
            isFixed: true
          }]);
          // 루틴 추천 단계로 변경
          setIsRoutinePhase(true);
        }, 1000);
      }
      return newMessages;
    });
    setInput('');
    if (socketRef.current) socketRef.current.emit('message', userMessage);

    // 커스터마이징 단계에서 나이를 입력받은 경우 질감 선택 단계로 진행
    if (isCustomizingPhase && !isTextureSelectionPhase && currentInput.match(/\d+/)) {
      const age = parseInt(currentInput.match(/\d+/)[0]);
      console.log('🎂 나이 입력 감지:', {
        age,
        isCustomizingPhase,
        isTextureSelectionPhase,
        currentInput
      });
      setUserAge(age);
      
      // 🚀 나이 입력 즉시 이미지 프리로딩 시작!
      console.log('🎨 질감 이미지 미리 로딩 시작...');
      setIsTextureLoading(true);
      preloadTextureImages();
      
      // 이미지 로딩 시간 (로딩 애니메이션이 보이도록 충분한 시간)
      setTimeout(() => {
        setIsTextureLoading(false);
      }, 600); // 600ms로 늘려서 로딩 애니메이션이 보이도록
      
      setTimeout(() => {
        let ageMessage = '';
        if (age >= 20 && age <= 29) {
          ageMessage = `20대 사용자들은 대부분 질감적으로 재밌고 특이한 것들을 선호해\n그래서 난 ${nickname}의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!`;
        } else if (age >= 30 && age <= 39) {
                      ageMessage = `30대 사용자들은 대부분 질감적으로 재밌고 특이한 것들을 선호해\n그래서 난 ${nickname}의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!`;
        } else if (age >= 10 && age < 20) {
                      ageMessage = `10대 사용자들은 대부분 부드럽고 친근한 질감을 좋아해\n그래서 난 ${nickname}의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!`;
        } else if (age >= 40) {
                      ageMessage = `40대 또는 그 이상의 사용자들은 안정적이고 편안한 감정과 분위기를 만들어내는 소재들을 선호해!\n그래서 난 ${nickname}의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!`;
        } else {
                      ageMessage = `${nickname}의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!`;
        }
        
        const textureMessage = { user: 'Five Flower', text: ageMessage, isFixed: true };
        console.log('🎨 질감 메시지 생성:', {
          ageMessage,
          contains4가지: ageMessage.includes('4가지 질감을 추천할게')
        });
        setMessages(prev => [...prev, textureMessage]);
        setAllMessages(prev => {
          const newMessages = [...prev, textureMessage];
          // 질감 추천 메시지의 인덱스 저장
          setTextureMessageIndex(newMessages.length - 1);
          return newMessages;
        });
        
        // 메시지 추가 후 즉시 UI 표시
        console.log('🎨 질감 선택 단계 즉시 활성화!');
        setIsTextureSelectionPhase(true);
        
        // 🔥 질감 UI가 잘 보이도록 적당히 스크롤
        setTimeout(() => {
          if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const currentScrollTop = container.scrollTop;
            const targetScroll = currentScrollTop + 350; // 질감 UI가 잘 보이도록 350px 스크롤
            
            container.scrollTo({
              top: Math.min(targetScroll, container.scrollHeight - container.clientHeight),
              behavior: 'smooth'
            });
            console.log('📜 질감 UI 나타남 - 적당히 스크롤:', { 
              currentScrollTop,
              targetScroll
            });
          }
        }, 80); // 더 빠른 반응
      }, 1000);
      
      return; // API 호출 방지
    }

    // 사용자가 두 번째 질문에 답변한 이후부터 계속 API 호출
    const shouldCallAPI = () => {
      const userMessageCount = allMessages.filter(msg => msg.user === nickname).length + 1; // +1 for current message
      console.log('🔍 shouldCallAPI 확인 - userMessageCount:', userMessageCount, 'shouldCall:', userMessageCount >= 2);
      return userMessageCount >= 2; // 두 번째 사용자 답변부터 API 호출
    };

    console.log('📋 현재 상태 - allMessages 길이:', allMessages.length, 'nickname:', nickname);
    console.log('📋 사용자 메시지들:', allMessages.filter(msg => msg.user === nickname).map(m => m.text));

    if (shouldCallAPI()) {
      setIsPibitLoading(true);
      setIsTyping(true); // 타이핑 인디케이터 시작

      try {
        const userAnswerCount = allMessages.filter(msg => msg.user === nickname).length + 1; // 현재까지 사용자 답변 횟수
        console.log('🚀 API 호출 시작 - userAnswerCount:', userAnswerCount, 'currentInput:', currentInput);
        
        let stepPrompt = '';
        
                 if (userAnswerCount === 2) {
           // Step 1: 감정 해소 방법 답변 받음 → 구체적인 내용 질문
           stepPrompt = `
당신은 Five Flower라는 친구야. 사용자의 감정 유형을 파악해서 불안하거나 예민한 감정이 불필요한 행동(손톱물어뜯기 등)으로 발현되지 않도록 예방하는 것이 목적이야.
성격: 따뜻하고 공감적. 말투: 반말, 자연스럽고 친근함

사용자가 감정 해소 방법을 말했어. 먼저 공감하고, 그 다음에 구체적인 내용을 자연스럽게 물어봐줘.

응답 형식:
1. 사용자의 방법에 대한 공감과 이해 (예: "아, 그렇구나!", "그런 방식이구나")
2. 자연스럽고 친근하게 구체적인 내용 질문 (예: "좀 더 자세히 알려줄 수 있어?", "어떤 식으로 하는지 궁금해!")

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지. 친구같이 자연스럽게!
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 3) {
           // Step 2: 구체적인 내용 받음 → 효과에 대해 질문
           stepPrompt = `
당신은 Five Flower라는 친구야. 사용자의 감정 유형을 파악해서 불안하거나 예민한 감정이 불필요한 행동(손톱물어뜯기 등)으로 발현되지 않도록 예방하는 것이 목적이야.
성격: 따뜻하고 공감적. 말투: 반말, 자연스럽고 친근함

사용자가 구체적인 방법을 말했어. 먼저 사용자의 말에 공감하고, 그 다음에 효과에 대해 자연스럽게 물어봐줘.

응답 형식:
1. 사용자의 말에 대한 공감과 이해 (예: "아, 그런 생각들이 많아지는구나", "그럴 때 마음이 복잡해지겠어")
2. 자연스럽게 효과에 대해 궁금해하며 질문 (예: "그렇게 할 때 좀 나아져?", "그래도 조금은 도움이 돼?")

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지. 기계적이지 않고 친구같이 자연스럽게!
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 4) {
           // Step 3: 효과에 대해 답변 받음 → 편안한 시간/장소 질문
           stepPrompt = `
당신은 Five Flower라는 친구야. 사용자의 감정 유형을 파악해서 불안하거나 예민한 감정이 불필요한 행동(손톱물어뜯기 등)으로 발현되지 않도록 예방하는 것이 목적이야.
성격: 따뜻하고 공감적. 말투: 반말, 자연스럽고 친근함

사용자가 효과에 대해 솔직하게 말했어. 먼저 사용자의 감정에 공감하고 이해해주고, 그 다음에 자연스럽게 편안한 순간에 대해 물어봐줘.

응답 형식:
1. 사용자의 솔직한 말에 대한 공감과 이해 (예: "그렇구나, 완전히 해결되는 건 아니지만 잠깐이라도 잊을 수 있다면 그것도 의미가 있어", "아, 그런 마음 이해돼")
2. 자연스럽게 편안한 순간으로 화제 전환 (예: "그럼 반대로 평소에 가장 편안하고 기분 좋을 때는 언제야?", "어떤 순간에 마음이 가장 평온해져?")

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지. 갑작스럽지 않고 자연스럽게 화제 전환하기!
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 5) {
           // Step 4: 편안한 순간/장소 답변 받음 → 예민한/불안한 순간 질문
           stepPrompt = `
당신은 Five Flower라는 친구야. 사용자의 감정 유형을 파악해서 불안하거나 예민한 감정이 불필요한 행동(손톱물어뜯기 등)으로 발현되지 않도록 예방하는 것이 목적이야.
성격: 따뜻하고 공감적. 말투: 반말, 자연스럽고 친근함

사용자가 편안한 순간/장소에 대해 말했어. 먼저 그 말에 공감하고, 그 다음에 자연스럽게 반대되는 상황(불안한 순간)에 대해 물어봐줘.

응답 형식:
1. 사용자의 편안한 순간에 대한 공감 (예: "그런 순간엔 정말 마음이 편안하겠어", "좋은 시간이구나!")
2. 자연스럽게 반대 상황으로 화제 전환 (예: "그럼 반대로 어떤 순간이나 공간이 널 예민하게 만들거나 불안한 감정을 느끼게 해?")

중요: 
- 반드시 반말로 대답하고, 존댓말 절대 사용 금지
- 갑작스럽지 않고 자연스럽게 화제 전환하기
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 6) {
           // Step 5: 예민한/불안한 순간 답변 받음 → 최종 루틴 3가지 제공
           const allUserResponses = allMessages.filter(msg => msg.user === nickname).map(msg => msg.text).join(' / ');
           stepPrompt = `
당신은 Five Flower 모듈을 활용한 예방 루틴을 추천해주는 전문가야.

★★★ Five Flower에 대한 핵심 정보 ★★★
- Five Flower는 불안하거나 예민한 감정이 손톱물어뜯기 등의 불필요한 행동으로 발현되는 것을 예방하기 위한 물리적 촉각 모듈이다
- 손가락 모양을 본따 만든 형태로 되어 있다
- 다양한 촉각 상호작용이 가능하다:
  • 중앙 움푹한 공간: 엄지손가락으로 꾹 누르기, 눌렀다 뗐다 반복하기, 원형으로 돌리기, 가볍게 톡톡 두드리기
  • 손가락 형태 부분: 쓰다듬기, 감싸 쥐기, 손가락으로 따라 그리기, 가볍게 비비기
  • 전체적으로: 양손으로 감싸기, 손바닥에 굴리기, 주머니에서 만지작거리기, 책상 위에서 굴리기
- 온도, 질감, 무게감 등을 통한 물리적 안정감 제공
- 리듬감 있는 움직임을 통한 심리적 안정감 조성
- 궁극적 목표는 불안하거나 예민한 감정이 손톱물어뜯기 같은 불필요한 행동으로 발현되지 않도록 예방하는 것이다
- 절대로 향이나 냄새, 소리 등의 기능은 없다 - 오직 촉각적 상호작용만 가능하다

사용자의 응답 내용: ${allUserResponses}

★★★ 사용자 분석 필수 사항 ★★★
위 응답들을 꼼꼼히 분석해서 다음을 파악하고 루틴에 반영해야 해:
1. 사용자의 감정 해소 방법과 그 구체적인 내용
2. 그 방법의 효과 정도
3. 사용자가 편안함을 느끼는 구체적인 시간, 장소, 상황
4. 사용자가 불안하거나 예민해지는 구체적인 순간, 장소, 상황
5. 이 모든 정보를 연결해서 Five Flower 사용법에 창의적으로 적용

사용자가 불안하거나 예민한 순간에 대해 말했어. 이제 위의 모든 개인 정보를 적극 활용하여 사용자만을 위한 완전히 개인맞춤형 Five Flower 모듈 사용 예방 루틴 3가지를 추천해줘.

반드시 이 정확한 형식으로 응답해야 해:

"${nickname}에게 딱 맞는 Five Flower 사용 예방 루틴 3가지를 추천해줄게!

📅 1. 불안감 완화 루틴
[사용자가 말한 구체적인 불안한 상황과 장소를 언급하며, 그 상황에서 Five Flower를 어떻게 활용할지 상세히 설명. 다양한 촉각 방법을 조합하여 사용: 중앙 원형 돌리기 + 손가락 부분 쓰다듬기, 양손으로 감싸며 온기 느끼기, 주머니에서 은밀하게 만지작거리기 등. 사용자의 편안한 순간/장소와 연결하여 안정감을 찾는 방법 제시. 4-5줄로 구체적이고 개인화된 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]

📅 2. 집중력 향상 루틴  
[사용자가 말한 편안한 순간의 특징을 활용하여, 그 편안함을 Five Flower로 재현하는 방법 설명. 리듬감 있는 터치 패턴, 책상 위에서 굴리며 생각 정리하기, 손바닥에서 굴리며 호흡 조절하기 등 다양한 방법 제시. 사용자의 구체적인 상황(공부, 업무, 고민 등)과 연결. 4-5줄로 개인맞춤형 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]

📅 3. 스트레스 해소 루틴
[사용자가 말한 불안한 순간과 편안한 순간을 모두 활용하여, 스트레스 상황에서 편안함으로 전환하는 구체적인 Five Flower 사용법 제시. 감정 상태에 따른 다른 터치 방식: 격렬한 감정일 때는 강하게 꾹꾹 누르기, 진정이 필요할 때는 부드럽게 쓰다듬기 등. 장소와 상황을 고려한 은밀하고 효과적인 사용법. 4-5줄로 실용적이고 개인화된 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]"

★★★ 절대 규칙 ★★★
1. 위 형식을 정확히 지키기
2. 📅 1, 📅 2, 📅 3 모두 포함하기
3. 각 루틴은 4-5줄로 완성된 문장 작성
4. 3번째 루틴까지 반드시 완전히 작성하기
5. 반말 사용하기
6. 다양한 촉각적 상호작용 방법을 창의적으로 조합하여 사용 (단순히 "꾹 누르기"만 반복하지 말고, 원형 돌리기, 쓰다듬기, 감싸 쥐기, 굴리기, 비비기, 톡톡 두드리기 등 다양하게 활용)
7. 사용자가 말한 구체적인 불안한 상황, 편안한 순간, 장소, 감정을 반드시 언급하며 개인맞춤형으로 작성
8. 예방이 핵심 목적임을 반영하기
9. 실제 사용 가능한 구체적이고 실용적인 방법 제시 (언제, 어디서, 어떻게)

★★★ 절대 금지사항 ★★★
- 향, 냄새, 소리, 시각적 효과 등 촉각 외의 감각 언급 금지
- "향을 맡아", "소리를 들어", "색깔을 봐" 등의 표현 절대 금지
- 존댓말, 미완성 문장, 추가 질문 금지
- 사용자를 이미 습관을 가진 사람으로 간주하는 표현 금지
- 단순하고 반복적인 "꾹꾹 누르기"만 계속 언급하는 것 금지
- 추상적이고 모호한 설명 금지 - 반드시 구체적이고 실용적으로 작성
`;
         } else if (userAnswerCount >= 7) {
           // Step 6: 사용자가 루틴 선택 → 함께 실천하자는 메시지
           const previousMessages = allMessages.slice(-3).map(m => `${m.user}: ${m.text}`).join('\n');
           stepPrompt = `
당신은 Five Flower라는 친구야. 사용자의 감정 유형을 파악해서 불안하거나 예민한 감정이 불필요한 행동(손톱물어뜯기 등)으로 발현되지 않도록 예방하는 것이 목적이야.

최근 대화 내용:
${previousMessages}

사용자가 루틴 중 하나를 선택했어. 이제 함께 그 루틴을 실천하자는 긍정적인 메시지를 친절하게 보내야 해.

반드시 다음과 같이 응답해야 해:
"좋아 그럼 다음 단계로 넘어가기 위해 루틴을 수락해줘!"

중요: 
- 반드시 반말로 대답
- 위 메시지를 정확히 사용
- 추가 설명이나 다른 내용 없이 위 메시지만 보내기
- 존댓말 절대 사용 금지
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         }

        console.log('📝 stepPrompt 생성 완료 - userAnswerCount:', userAnswerCount);
        console.log('📝 stepPrompt 길이:', stepPrompt.length);
        if (userAnswerCount === 6) {
          console.log('🎯 6번째 메시지 - 루틴 생성 단계');
          console.log('📝 stepPrompt 미리보기:', stepPrompt.substring(0, 200) + '...');
        }

        // 강화된 재시도 로직
        const performAPICall = async () => {
          let retryCount = 0;
          const maxRetries = 5; // 최대 5회 재시도
          
          console.log('🚀 performAPICall 시작 - userAnswerCount:', userAnswerCount);
          
          while (retryCount <= maxRetries) {
            try {
              console.log(`🔄 API 호출 시도 ${retryCount + 1}/${maxRetries + 1}...`);
              console.log('📤 요청 데이터:', { 
                message: currentInput, 
                userName: name || nickname, 
                toneId: currentToneId,
                systemPromptLength: stepPrompt.length
              });
              
              // 타임아웃이 적용된 fetch 함수
              const fetchWithTimeout = async (url, options, timeout = 30000) => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);
                
                try {
                  const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                  });
                  clearTimeout(timeoutId);
                  return response;
                } catch (error) {
                  clearTimeout(timeoutId);
                  if (error.name === 'AbortError') {
                    throw new Error('요청 시간이 초과되었습니다.');
                  }
                  throw error;
                }
              };
              
              const res = await fetchWithTimeout('/api/gpt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  message: currentInput, 
                  userName: name || nickname, 
                  toneId: currentToneId,
                  systemPrompt: stepPrompt,
                  userAnswerCount: userAnswerCount
                })
              });
              
              if (!res.ok) {
                console.error(`❌ HTTP ${res.status}: ${res.statusText}`);
                
                // 재시도 가능한 상태 코드 확인
                if (res.status === 429 || res.status >= 500) {
                  throw new Error(`서버 오류 (${res.status}): 재시도 가능`);
                } else if (res.status === 404) {
                  throw new Error("API 엔드포인트를 찾을 수 없습니다. 서버를 재시작해주세요.");
                } else {
                  throw new Error(`요청 실패 (${res.status}): ${res.statusText}`);
                }
              }
              
              const text = await res.text();
              console.log('📝 서버 응답 길이:', text.length);
              console.log('📝 서버 응답 미리보기:', text.substring(0, 300));
              
              let data;
              try {
                data = JSON.parse(text);
                console.log('✅ JSON 파싱 성공');
                console.log('📝 파싱된 데이터:', { hasReply: !!data.reply, hasError: !!data.error });
                if (data.reply) {
                  console.log('📝 reply 길이:', data.reply.length);
                  console.log('📝 reply 미리보기:', data.reply.substring(0, 200));
                }
              } catch (parseErr) {
                console.error("❌ JSON 파싱 실패:", text.substring(0, 200));
                throw new Error("서버 응답을 해석할 수 없습니다.");
              }
              
              console.log('✅ API 호출 성공!');
              return data;
              
            } catch (err) {
              console.error(`❌ 시도 ${retryCount + 1} 실패:`, err.message);
              
              // 재시도 불가능한 에러인지 확인
              const isRetryable = err.message.includes('재시도 가능') ||
                                err.message.includes('시간이 초과') ||
                                err.message.includes('Failed to fetch') ||
                                err.message.includes('NetworkError') ||
                                err.message.includes('ERR_NETWORK') ||
                                err.message.includes('ERR_INTERNET_DISCONNECTED');
              
              if (retryCount >= maxRetries || !isRetryable) {
                console.error(`❌ 최종 실패 (${retryCount + 1}회 시도):`, err.message);
                throw err;
              }
              
              // 지수 백오프 지연 (최대 10초)
              const delay = Math.min(1000 * Math.pow(2, retryCount), 10000) + Math.random() * 1000;
              console.log(`⏳ ${delay.toFixed(0)}ms 후 재시도...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              
              retryCount++;
            }
          }
        };
        
        // API 호출 실행
        const data = await performAPICall();

        setIsPibitLoading(false);
        setIsTyping(false); // 타이핑 인디케이터 종료
        console.log('🎉 API 호출 완료! userAnswerCount:', userAnswerCount);
        
        if (data.reply) {
          console.log('🔥 API 응답 받음:', data.reply.substring(0, 100) + '...'); // 응답 로깅 추가
          console.log('📊 userAnswerCount:', userAnswerCount); // 사용자 답변 횟수 로깅
          
          // 긴 메시지를 자동으로 줄바꿈 처리
          let processedReply = data.reply;
          if (processedReply.length > 80) { // 80자 이상일 때 줄바꿈 처리
            // 문장의 중간 지점 찾기 (물음표나 느낌표 뒤)
            const midPoint = Math.floor(processedReply.length / 2);
            let breakPoint = -1;
            
            // 중간점 근처에서 적절한 줄바꿈 지점 찾기
            for (let i = midPoint - 20; i < midPoint + 20; i++) {
              if (i >= 0 && i < processedReply.length) {
                const char = processedReply[i];
                if (char === '!' || char === '?' || char === '.') {
                  breakPoint = i + 1;
                  break;
                }
              }
            }
            
            // 적절한 지점을 찾았으면 줄바꿈 추가
            if (breakPoint !== -1 && breakPoint < processedReply.length - 10) {
              processedReply = processedReply.slice(0, breakPoint) + '\n' + processedReply.slice(breakPoint).trim();
            }
          }
          
          const fiveFlowerMessage = { user: 'Five Flower', text: processedReply, isFixed: true };
          setMessages((prev) => [...prev, fiveFlowerMessage]);
          setAllMessages((prev) => [...prev, fiveFlowerMessage]);
          
          // 루틴이 포함된 메시지인지 확인 (📅 포함 여부로 판단)
          const hasRoutines = data.reply.includes('📅');
          console.log('📅 루틴 포함 여부:', hasRoutines, '(userAnswerCount:', userAnswerCount, ')');
          
          // 루틴 생성 완료 후 별도 질문 메시지 추가 (루틴이 실제로 포함되어 있을 때만)
          if (userAnswerCount === 6 && hasRoutines) {
            console.log('✅ 6단계 루틴 생성 성공 - 1초 후 질문 메시지 추가');
            setTimeout(() => {
              console.log('📨 질문 메시지 추가 중...');
              const questionMessage = { user: 'Five Flower', text: '어떤 루틴이 가장 마음에 들어?', isFixed: true };
              setMessages((prev) => [...prev, questionMessage]);
              setAllMessages((prev) => [...prev, questionMessage]);
              console.log('✅ 질문 메시지 추가 완료');
            }, 1000);
          } else if (userAnswerCount === 6 && !hasRoutines) {
            // 루틴이 포함되지 않은 경우 에러 로깅
            console.error('❌ 6단계에서 루틴이 생성되지 않았습니다. 응답 전문:', data.reply);
          } else if (userAnswerCount === 6) {
            console.log('🔍 6단계 처리 - hasRoutines:', hasRoutines);
          }
        } else if (data.error) {
          const errorMessage = { user: 'Five Flower', text: data.error, isFixed: true };
          setMessages((prev) => [...prev, errorMessage]);
          setAllMessages((prev) => [...prev, errorMessage]);
        }
      } catch (err) {
        console.error('❌ 모든 재시도 실패:', err);
        setIsPibitLoading(false);
        setIsTyping(false); // 타이핑 인디케이터 종료
        
        // 6번째 메시지 (루틴 생성)에서 실패한 경우 기본 루틴 제공
        const userAnswerCount = allMessages.filter(msg => msg.user === nickname).length + 1;
        console.log('⚠️ API 에러 발생 - userAnswerCount:', userAnswerCount);
        
        if (userAnswerCount === 6) {
          // 6번째 메시지에서 실패 시 기본 루틴 제공
          console.log('🚨 6번째 메시지 API 실패 - 기본 루틴 제공');
          const defaultRoutine = `${nickname}에게 딱 맞는 Five Flower 사용 루틴 3가지를 추천해줄게!

📅 1. 불안감 완화 루틴
불안하거나 초조할 때 Five Flower의 중앙 움푹한 공간을 엄지손가락으로 천천히 꾹 눌러봐. 3초간 누르고 3초간 빼는 걸 5번 반복하면서 깊게 숨을 쉬어봐. 손톱 물어뜯고 싶은 마음이 차츰 가라앉을 거야.

📅 2. 집중력 향상 루틴  
공부하거나 일할 때 집중이 안 될 때는 Five Flower의 손가락 모양 부분을 가볍게 누르면서 생각을 정리해봐. 중앙을 리듬감 있게 톡톡 눌러주면 머릿속이 맑아지고 집중력이 높아질 거야.

📅 3. 스트레스 해소 루틴
스트레스받아서 손톱을 물어뜯고 싶을 때는 Five Flower 중앙을 빠르게 눌렀다 뗐다 반복해봐. 10번 정도 반복하면서 스트레스를 모듈로 전달한다고 생각해봐. 습관적인 행동을 건강한 방식으로 바꿀 수 있을 거야.`;
          
          console.log('📝 기본 루틴 메시지 추가 중...');
          const errorMessage = { user: 'Five Flower', text: defaultRoutine, isFixed: true };
          setMessages((prev) => [...prev, errorMessage]);
          setAllMessages((prev) => [...prev, errorMessage]);
          console.log('✅ 기본 루틴 메시지 추가 완료');
          
          // 루틴 생성 완료 후 질문 메시지 추가
          setTimeout(() => {
            console.log('📨 기본 루틴 후 질문 메시지 추가 중...');
            const questionMessage = { user: 'Five Flower', text: '어떤 루틴이 가장 마음에 들어?', isFixed: true };
            setMessages((prev) => [...prev, questionMessage]);
            setAllMessages((prev) => [...prev, questionMessage]);
            console.log('✅ 기본 루틴 후 질문 메시지 추가 완료');
          }, 1000);
        } else {
          // 다른 단계에서는 간단한 대답 불가 메시지
          const errorMessage = { user: 'Five Flower', text: '잠깐, 생각을 정리하고 있어. 다시 말해줄래?', isFixed: true };
          setMessages((prev) => [...prev, errorMessage]);
          setAllMessages((prev) => [...prev, errorMessage]);
        }
       }
     }
 };

  // 🔥 pibitintro.js에서 입력된 이름 사용 - 없으면 nickname, 둘 다 없으면 '당신'
  const safeDisplayName = name || nickname || '당신';
  const greetingText = `${safeDisplayName} 안녕, 여기까지 오느라 수고 많았어!`;
  const mainInstructionText = `이제 나와 대화하면서 ${safeDisplayName}에게 가장 효과적인 손톱물어뜯기\\n습관 예방 루틴을 체험해보고 커스터마이징을 진행해보자!`;

  // 🔥 항상 렌더링하도록 수정 - 배경이 항상 보이도록 보장
  console.log('🔧 렌더링 확인:', { nickname, safeDisplayName, name, routerReady: router.isReady });

  return (
    <>
      {/* 🔥 고정 배경 레이어 - 메시지 생성과 완전히 독립적 */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/newbk2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: -10,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'auto',
          backfaceVisibility: 'hidden',
          contain: 'strict'
        }}
      />
      
      <style jsx global>{`
        /* 🔥 배경 이미지 미리 로드 및 캐시 */
        body::before {
          content: '';
          position: absolute;
          left: -9999px;
          background-image: url(/newbk2.png);
        }
        
        /* 🔥 질감 이미지들 미리 로드 및 캐시 강화 */
        body::after {
          content: '';
          position: absolute;
          left: -9999px;
          background-image: url(/ff2.png), url(/df.png), url(/sil.png);
        }
        
        /* 🔥 이미지 로딩 최적화 */
        img {
          image-rendering: optimizeSpeed;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes textureUIFadeIn {
          from {
            opacity: 0;
            transform: translate3d(0, 15px, 0) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .texture-selection-ui {
          animation: textureUIFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        @keyframes colorUIFadeIn {
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .color-selection-ui {
          animation: colorUIFadeIn 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        @keyframes shippingUIFadeIn {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .shipping-ui {
          animation: shippingUIFadeIn 0.2s ease-out forwards;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
      `}</style>
      <Bg>
      <BackButton onClick={() => router.back()}>
        <img src="/whiteb.png" alt="뒤로 가기" />
      </BackButton>
      {!isChatStarted && (
        <>
          <PreChatContainer show={true}>
            <Ellipse26 />
            <Ellipse29 />
            <Ellipse31 />
            <Ellipse32 />
            <Ellipse33 />
            <Ellipse28 />
            <Greeting>
              {greetingText.replace(/\n/g, '\n')}
            </Greeting>
            <MainInstruction>
              {mainInstructionText.split('\\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < mainInstructionText.split('\\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </MainInstruction>
            <InfoBox1 />
            <InfoBox2 />
            <div style={{ position: 'absolute', left: '521px', top: '295px' }}>
              <AnimatedContentImage
                src="/routine.png"
                alt="routine icon"
                width="167.9px"
              />
            </div>
            <RoutineTitle>Routine Making</RoutineTitle>
            <RoutineDescription>
              생성하신 피빗 모듈의 구체적인 사용<br />
              방법과 습관, 감정을 케어해줄 수 있는<br />
              모듈 인터렉티브 스케줄을 제안해요
            </RoutineDescription>
            <div style={{ position: 'absolute', left: '780px', top: '295px', transform: 'none' }}>
              <AnimatedContentImage
                src="/custom.png"
                alt="customize icon"
                width="120px"
              />
            </div>
            <CustomizingTitle>Customizing</CustomizingTitle>
            <CustomizingDescription>
              모듈의 색상, 텍스쳐, 모듈과<br />
              함께 사용 가능한 귀여운<br />
              기능들을 선물하고 제안해요
            </CustomizingDescription>
            <NfcArea>
              <AnimatedExampleImage src="/example1.png" alt="NFC 모듈 사용 예시" />
            </NfcArea>
            <NfcInstruction>
              "모듈의 바닥면을 박스 안에 부착하여 대화를 시작해보세요!"
            </NfcInstruction>
          </PreChatContainer>
        </>
      )}
      {isChatStarted && (
        <>
          {showInitialMessage && (
            <FlowerImage />
          )}
          <DividerLine />
          <div style={{ position: 'absolute', top: 59, left: '50%', transform: 'translateX(-50%)', width: 400, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/module/flower.png" alt="flower" style={{ position: 'absolute', left: -445, top: 'calc(50% + 125px)', transform: 'translateY(-50%)', width: 160, height: 160, zIndex: 2, objectFit: 'contain' }} />
            <DateBox isRoutinePhase={isRoutinePhase} isCustomizingPhase={isCustomizingPhase}>
              <YearDateText isRoutinePhase={isRoutinePhase} isCustomizingPhase={isCustomizingPhase}>
                {isCustomizingPhase ? '모듈 커스터마이징' : (isRoutinePhase ? '모듈 루틴 추천' : currentDate.replace(/\s*\([^)]*\)/, ''))}
              </YearDateText>
              {!isRoutinePhase && !isCustomizingPhase && <DateText>{currentDate}</DateText>}
            </DateBox>
          </div>

          <Messages ref={messagesContainerRef}>
            {allMessages.map((msg, index) => {
              // 버튼 표시 조건: 📅가 포함된 루틴 추천 메시지나 함께 실천하자는 메시지에 버튼 표시
              const userAnswerCount = allMessages.filter(m => m.user === nickname).length;
              const isLastFiveFlowerMessage = msg.user === 'Five Flower' && index === allMessages.length - 1;
              // 🔥 루틴 수락 버튼 표시 조건 - "루틴을 수락해줘" 메시지에만 표시
              const isRoutineAcceptMessage = msg.text.includes('루틴을 수락해줘');
              const isRoutineRecommendation = msg.user === 'Five Flower' && 
                                              isRoutineAcceptMessage && 
                                              !routineAccepted;
              
              return (
                <div key={index}>
                  <Message me={msg.user === nickname} isFixed={msg.isFixed}>
                    {msg.isFixed ? (
                      <>
                        <strong style={{color: '#828282', fontSize: '19px'}}>{msg.user}</strong>
                        {msg.text.includes('📅') ? (
                          // 루틴 추천 메시지인 경우 특별한 렌더링
                          renderRoutineMessage(msg.text)
                        ) : (
                          // 일반 메시지
                          <div style={{color: '#828282', fontSize: '16px', lineHeight: '1.65', whiteSpace: 'pre-line'}}>
                            {msg.text}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {msg.text}
                      </>
                    )}
                  </Message>
                  
                  {/* 질감 추천 메시지 바로 밑에 로딩 인디케이터 - 정확한 질감 메시지 인덱스일 때만 */}
                  {index === textureMessageIndex && !textureImagesLoaded && (
                    <div style={{
                      marginTop: '20px',
                      marginLeft: '90px',
                      color: '#828282',
                      fontSize: '16px',
                      fontFamily: 'Pretendard Variable'
                    }}>
                      🎨 질감 이미지를 준비하고 있어... 잠시만 기다려줘!
                    </div>
                  )}
                  
                  {/* 질감 추천 메시지 바로 밑에 로딩 중일 때 로딩 애니메이션 표시 */}
                  {index === textureMessageIndex && isTextureLoading && (
                    <div 
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '20px',
                        marginLeft: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <TextureSelectionEllipse />
                      <TextureSelectionBox isLoading={true}>
                        <LoadingAnimation>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                        </LoadingAnimation>
                        <LoadingText>질감 이미지 준비 중...</LoadingText>
                      </TextureSelectionBox>
                      <FlowerLogo />
                    </div>
                  )}
                  
                  {/* 🎨 이미지 변경 중 로딩 애니메이션 */}
                  {index === textureMessageIndex && textureImagesLoaded && isImageChanging && (
                    <div 
                      className="texture-selection-ui"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '20px',
                        marginLeft: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <TextureSelectionEllipse />
                      <TextureSelectionBox isLoading={true}>
                        <LoadingAnimation>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                        </LoadingAnimation>
                        <LoadingText>이미지 변경 중...</LoadingText>
                      </TextureSelectionBox>
                      <FlowerLogo />
                      <TextureTypeLabel isVisible={true}>
                        {currentTextureImage === 'ff2' ? 'Furry Type' : 
                         currentTextureImage === 'df' ? 'Lumpy Type' : 'Jello Type'}
                      </TextureTypeLabel>
                      <TextureSelectButton 
                        isSelecting={false}
                        onClick={() => {}} // 로딩 중에는 클릭 불가
                        style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                        <span style={{
                          fontFamily: 'Pretendard Variable',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#828282'
                        }}>
                          질감 선택하기
                        </span>
                      </TextureSelectButton>
                      <TextureArrowCircle 
                        style={{ 
                          cursor: 'not-allowed',
                          opacity: 0.6
                        }}>
                        <TextureArrowIcon src="/arrow23.png" alt="arrow" />
                      </TextureArrowCircle>
                    </div>
                  )}
                  
                  {/* 질감 추천 메시지 바로 밑에 질감 선택 UI 표시 - 정확한 질감 메시지 인덱스이면서 이미지가 로딩된 후에만 */}
                  {index === textureMessageIndex && textureImagesLoaded && !isTextureLoading && !isImageChanging && (
                    <div 
                      className="texture-selection-ui"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '20px',
                        marginLeft: '70px', // UI 요소는 원래 위치 유지 (텍스트와 다름)
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <TextureSelectionEllipse />
                      <TextureSelectionBox>
                        <TextureImage 
                          imageName="ff2" 
                          isVisible={currentTextureImage === 'ff2'} 
                          direction="left"
                        />
                        <TextureImage 
                          imageName="df" 
                          isVisible={currentTextureImage === 'df'} 
                          direction="right"
                        />
                        <TextureImage 
                          imageName="sil" 
                          isVisible={currentTextureImage === 'sil'} 
                          direction="right"
                        />
                      </TextureSelectionBox>
                      <FlowerLogo />
                      <TextureTypeLabel isVisible={true}>
                        {currentTextureImage === 'ff2' ? 'Furry Type' : 
                         currentTextureImage === 'df' ? 'Lumpy Type' : 'Jello Type'}
                      </TextureTypeLabel>
                      <TextureSelectButton 
                        isSelecting={isTextureSelecting}
                        onClick={() => {
                          console.log('질감 선택 버튼 클릭');
                          if (!selectedTexture) {
                            setSelectedTexture(currentTextureImage);
                            setShowTextureMessage(true);
                            // 색상 로딩 시작
                            startColorLoading();
                            setShowColorSelection(true);
                            // 🔥 색상 선택 UI가 잘 보이도록 적당히 스크롤
                            setTimeout(() => {
                              if (messagesContainerRef.current) {
                                const container = messagesContainerRef.current;
                                const currentScrollTop = container.scrollTop;
                                const targetScroll = currentScrollTop + 250; // 색상 UI가 잘 보이도록 250px 스크롤
                                
                                container.scrollTo({
                                  top: Math.min(targetScroll, container.scrollHeight - container.clientHeight),
                                  behavior: 'smooth'
                                });
                                console.log('📜 색상 UI 표시 - 적당히 스크롤');
                              }
                            }, 50);
                          }
                        }}>
                        <span style={{
                          fontFamily: 'Pretendard Variable',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#828282'
                        }}>
                          {selectedTexture ? '질감 선택 완료' : '질감 선택하기'}
                        </span>
                      </TextureSelectButton>
                      <TextureArrowCircle 
                        style={{ 
                          transition: 'transform 0.05s ease',
                          cursor: selectedTexture ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => {
                          console.log('🔥 화살표 버튼 클릭 - 로딩 애니메이션 추가');
                          if (!selectedTexture && !isImageChanging) {
                            // 🎨 이미지 변경 로딩 시작
                            setIsImageChanging(true);
                            
                            setTimeout(() => {
                              // 이미지 전환
                              setCurrentTextureImage(prev => {
                                const nextImage = prev === 'ff2' ? 'df' : 
                                                 prev === 'df' ? 'sil' : 'ff2';
                                console.log(`🎨 이미지 전환: ${prev} → ${nextImage}`);
                                return nextImage;
                              });
                              
                              // 로딩 완료
                              setTimeout(() => {
                                setIsImageChanging(false);
                              }, 150); // 이미지 로딩 완료까지 150ms
                            }, 100); // 100ms 후 이미지 변경
                          }
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'scale(0.95)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}>
                        <TextureArrowIcon src="/arrow23.png" alt="arrow" />
                      </TextureArrowCircle>
                    </div>
                  )}
                  
                  {/* 질감 선택 완료 메시지 - 정확한 질감 메시지 인덱스일 때만 */}
                  {index === textureMessageIndex && showTextureMessage && selectedTexture && (
                    <div 
                      className="color-selection-ui"
                      style={{
                        marginTop: '20px',
                        marginLeft: '90px',
                        color: '#828282',
                        fontSize: '16px',
                        fontFamily: 'Pretendard Variable',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-line'
                      }}>
                                             좋은 선택이야! {getTextureDescription(selectedTexture)}은 확실히 눌렀을 때 강력한 자극을 줘서 다른 행동으로 이어지지 않고 스스로가 집중하고자 하는 것에 더 효과적일꺼야!{'\n'}이번엔 모듈의 외부를 이루는 영역의 색을 선택해서 커스터마이징을 마무리해줘 ! 심리적으로 편안해지는 색상들을 위주로 제안했어
                    </div>
                  )}
                  
                  {/* 색상 선택 UI 로딩 애니메이션 */}
                  {index === textureMessageIndex && showColorSelection && showTextureMessage && selectedTexture && isColorLoading && (
                    <div 
                      className="color-selection-ui"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '40px',
                        marginLeft: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <TextureSelectionEllipse />
                      <TextureSelectionBox backgroundColor={selectedColor} isLoading={true}>
                        <LoadingAnimation>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                          <div className="loading-dot"></div>
                        </LoadingAnimation>
                        <LoadingText>색상 옵션 준비 중...</LoadingText>
                      </TextureSelectionBox>
                      <FlowerLogo />
                    </div>
                  )}
                  
                  {/* 색상 선택 UI - 질감 선택 UI 아래에 별도로 표시 */}
                  {index === textureMessageIndex && showColorSelection && showTextureMessage && selectedTexture && !isColorLoading && (
                    <div 
                      className="color-selection-ui"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '40px', // 질감 선택 UI와 간격 확보
                        marginLeft: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                      <TextureSelectionEllipse />
                      <TextureSelectionBox backgroundColor={selectedColor}>
                        <TextureImage 
                          imageName={selectedTexture} 
                          isVisible={true} 
                          direction="left"
                        />
                      </TextureSelectionBox>
                      <FlowerLogo />
                      <TextureTypeLabel isVisible={true}>
                        {selectedTexture === 'ff2' ? 'Furry Type' : 
                         selectedTexture === 'df' ? 'Lumpy Type' : 'Jello Type'}
                      </TextureTypeLabel>
                      <TextureSelectButton 
                        isSelecting={isColorSelecting}
                        onClick={() => {
                          console.log('모듈 외부 색상 버튼 클릭');
                          if (!isColorSelecting) {
                            setIsColorSelecting(true);
                            // ⚡ 색상 동그라미들 즉시 표시
                            setVisibleColorOptions([]);
                            setTimeout(() => setVisibleColorOptions([0]), 1);
                            setTimeout(() => setVisibleColorOptions([0, 1]), 2);
                            setTimeout(() => setVisibleColorOptions([0, 1, 2]), 3);
                            setTimeout(() => setVisibleColorOptions([0, 1, 2, 3]), 4);
                            
                            // 🔥 색상 옵션이 잘 보이도록 약간 스크롤
                            setTimeout(() => {
                              if (messagesContainerRef.current) {
                                const container = messagesContainerRef.current;
                                const currentScrollTop = container.scrollTop;
                                const targetScroll = currentScrollTop + 150; // 색상 옵션이 보이도록 150px 스크롤
                                
                                container.scrollTo({
                                  top: Math.min(targetScroll, container.scrollHeight - container.clientHeight),
                                  behavior: 'smooth'
                                });
                                console.log('📜 색상 옵션 표시 - 약간 스크롤');
                              }
                            }, 20);
                          } else if (isColorSelected) {
                            // "색상 선택하기" 버튼을 눌렀을 때만 배송 메시지 표시
                            console.log('색상 선택 완료 - 배송 메시지 표시');
                            setShowShippingMessage(true);
                            // ⚡ 배송 메시지가 잘 보이도록 적당히 스크롤
                            setTimeout(() => {
                              if (messagesContainerRef.current) {
                                const container = messagesContainerRef.current;
                                const currentScrollTop = container.scrollTop;
                                const targetScroll = currentScrollTop + 200; // 배송 메시지가 보이도록 200px 스크롤
                                
                                container.scrollTo({
                                  top: Math.min(targetScroll, container.scrollHeight - container.clientHeight),
                                  behavior: 'smooth'
                                });
                                console.log('📜 배송 메시지 표시 - 적당히 스크롤');
                              }
                            }, 100);
                          }
                        }}>
                        <span style={{
                          fontFamily: 'Pretendard Variable',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#828282'
                        }}>
                          {isColorSelecting ? (isColorSelected ? '색상 선택 완료!' : '색상 선택하기') : '모듈 외부 색상보기'}
                        </span>
                      </TextureSelectButton>
                      
                      {/* 색상 선택 동그라미 4개 조건부 렌더링 */}
                      {visibleColorOptions.includes(0) && (
                        <TextureOption1 onClick={() => handleColorSelect('#FFDF76')} />
                      )}
                      {visibleColorOptions.includes(1) && (
                        <TextureOption2 onClick={() => handleColorSelect('#DDEBC1')} />
                      )}
                      {visibleColorOptions.includes(2) && (
                        <TextureOption3 onClick={() => handleColorSelect('#C5E1FF')} />
                      )}
                      {visibleColorOptions.includes(3) && (
                        <TextureOption4 onClick={() => handleColorSelect('#EEC9E0')} />
                      )}
                    </div>
                  )}
                  
                  {/* 색상 선택 완료 후 배송 메시지와 버튼을 하나로 묶어서 위로 이동 */}
                  {index === textureMessageIndex && showShippingMessage && isColorSelected && selectedTexture && (
                    <div 
                      className="shipping-ui"
                      style={{
                        marginTop: '-85px',
                        marginLeft: '90px'
                      }}>
                      {/* 배송 메시지 */}
                      <div style={{
                        color: '#828282',
                        fontSize: '16px',
                        fontFamily: 'Pretendard Variable',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-line',
                        marginBottom: '12px'
                      }}>
                        <div style={{
                          fontWeight: 600,
                          fontSize: '19px',
                          color: '#828282',
                          marginBottom: '10px'
                        }}>
                          Five Flower
                        </div>
                        <div>
                          좋았어! {getColorName(selectedColor)}의 외부 모듈과 {getTextureDescription(selectedTexture)} 내부 모듈을 함께 {nickname}네 집으로 배송할게!{'\n'}함께 선택한 루틴을 이번주에 진행해보자!{'\n'}커스터마이징 마무리와 배송을 위해 Five Flower 배송 시작 버튼을 눌러줘
                        </div>
                      </div>
                      
                      {/* Five Flower 배송 시작 버튼 */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                      }}>
                        <button
                          onClick={() => {
                            console.log('Five Flower 배송 시작 버튼 클릭');
                            setShowFinalModal(true);
                          }}
                          style={{
                            backgroundColor: '#A8CCEB',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '14px 28px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(168, 204, 235, 0.3)',
                            fontFamily: 'Pretendard Variable'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#92B8DA';
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(168, 204, 235, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#A8CCEB';
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(168, 204, 235, 0.3)';
                          }}
                          onMouseDown={(e) => {
                            e.target.style.transform = 'scale(0.98)';
                          }}
                          onMouseUp={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                          }}
                        >
                          Five Flower 배송 시작
                        </button>
                      </div>
                    </div>
                  )}
                  
                  

                </div>
              );
            })}
            
            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <Message isFixed={true}>
                <strong style={{color: '#828282', fontSize: '19px'}}>Five Flower</strong>
                <div style={{
                  color: '#828282', 
                  fontSize: '16px', 
                  lineHeight: '1.65',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>
                    {(() => {
                      const userAnswerCount = allMessages.filter(m => m.user === nickname).length;
                      return userAnswerCount === 6 ? 'five-flower 루틴 생성중..' : '답변을 작성 중입니다';
                    })()}
                  </span>
                  <div style={{
                    display: 'flex',
                    gap: '2px'
                  }}>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#828282',
                      borderRadius: '50%',
                      animation: 'typing 1.4s infinite ease-in-out',
                      animationDelay: '0ms'
                    }}></span>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#828282',
                      borderRadius: '50%',
                      animation: 'typing 1.4s infinite ease-in-out',
                      animationDelay: '200ms'
                    }}></span>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#828282',
                      borderRadius: '50%',
                      animation: 'typing 1.4s infinite ease-in-out',
                      animationDelay: '400ms'
                    }}></span>
                  </div>
                </div>
              </Message>
            )}
                    </Messages>
          
          {/* 🔥 완전 독립적인 루틴 수락하기 버튼 - 화면에 고정 */}
          {(() => {
            const lastMessage = allMessages[allMessages.length - 1];
            const shouldShow = lastMessage && 
                             lastMessage.user === 'Five Flower' && 
                             lastMessage.text.includes('루틴을 수락해줘') && 
                             !routineAccepted;
            
            return shouldShow ? (
              <div
                style={{
                  position: 'fixed',
                  left: '50%',
                  bottom: '120px',
                  transform: 'translateX(-50%)',
                  zIndex: 999999999,
                  pointerEvents: 'auto'
                }}
                onClick={() => {
                  console.log('🔥 컨테이너 클릭됨');
                  handleRoutineAccept();
                }}
              >
                <div
                  style={{
                    backgroundColor: '#7b61ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '14px 28px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontFamily: 'Pretendard Variable, sans-serif',
                    boxShadow: '0 6px 20px rgba(123, 97, 255, 0.4)',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '144px',
                    minHeight: '45px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#6951e8';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#7b61ff';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  루틴 수락하기
                </div>
              </div>
            ) : null;
          })()}
            
            {showCircle && (
            <img 
              src="/circle.png" 
              alt="circle" 
              style={{
                position: 'absolute', 
                left: '50%', 
                top: 'calc(50% + 250px)', 
                transform: 'translate(-50%, -50%) scale(0.15)', 
                width: 'auto', 
                height: 'auto',
                zIndex: 1,
                opacity: showCircle ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }} 
            />
          )}
          <InputRow onSubmit={handleSend} style={{position: 'absolute', left: '50%', bottom: '70px', transform: 'translateX(-50%)'}}>
            <Input
              type="text"
              placeholder="메시지 보내기"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SendButtonContainer type="submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22V2M5 9L12 2L19 9" stroke="#B5AECA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SendButtonContainer>
          </InputRow>
        </>
      )}
    </Bg>
    
    {/* 최종 모달 */}
    {showFinalModal && (
      <FinalModalOverlay onClick={() => setShowFinalModal(false)}>
        <FinalModalContainer onClick={(e) => e.stopPropagation()}>
          <FinalModalText>
            {name ? `${name}와` : '당신과'} 오랜 기간동안 함께할 습관, 감정 동반자가 된 나 Five Flower 모듈의 이름을 지어주면 배송이 시작돼 !
          </FinalModalText>
          <FinalModalBoxImage />
          <FinalModalFlowerImage />
          <FinalModalNameContainer>
            <FinalModalNameInput
              type="text"
              placeholder="모듈의 이름을 입력해주세요"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleModuleNameSubmit();
                }
              }}
            />
            <FinalModalNameButton
              onClick={handleModuleNameSubmit}
              disabled={!moduleName.trim()}
            >
              배송 시작하기
            </FinalModalNameButton>
          </FinalModalNameContainer>
        </FinalModalContainer>
      </FinalModalOverlay>
    )}
    
    {/* 배송 완료 화면 (화면 중앙, 블러 배경) */}
    {showShippingComplete && (
      <ShippingCompleteOverlay>
        <ShippingCompleteContainer>
          <ShippingCompleteBox>
            <ShippingCompleteText>
              <div className="shipping-title">배송 완료!</div>
              <div className="shipping-content">{submittedModuleName}과 함께 {name ? `${name}님의` : '당신의'} 습관과 감정을 오랜 시간동안 함께 관리하고 살아가길 기대할게요!</div>
            </ShippingCompleteText>
          </ShippingCompleteBox>
          <ShippingCompleteBoxMockup />
        </ShippingCompleteContainer>
      </ShippingCompleteOverlay>
    )}
    
    {/* Fade 전환 오버레이 */}
    <FadeTransitionOverlay isVisible={showFadeTransition} />
    </>
  );
}