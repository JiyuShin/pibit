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

  // 색상 선택 함수
  const handleColorSelect = (color) => {
    console.log('색상 선택:', color);
    setSelectedColor(color);
    setIsColorSelected(true);
    setShowShippingMessage(true);
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

  // 질감 이미지 프리로딩 함수 (즉시 로딩)
  const preloadTextureImages = () => {
    const imageNames = ['ff2', 'df', 'sil'];
    let loadedCount = 0;
    
    // 모든 이미지를 즉시 병렬 로딩
    const promises = imageNames.map((imageName) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          console.log(`✅ ${imageName}.png 로딩 완료 (${loadedCount}/${imageNames.length})`);
          
          // 첫 번째 이미지가 로딩되면 즉시 UI 표시
          if (imageName === 'ff2') {
            console.log('🎯 첫 번째 이미지 로딩 완료! UI 즉시 표시');
            setTextureImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = (error) => {
          console.error(`❌ ${imageName}.png 로딩 실패:`, error);
          reject(error);
        };
        
        // 모든 이미지 즉시 로딩 (지연 없음)
        img.src = `/${imageName}.png`;
      });
    });

    // 모든 이미지 로딩 결과 확인
    Promise.allSettled(promises)
      .then((results) => {
        const successCount = results.filter(r => r.status === 'fulfilled').length;
        console.log(`🎨 질감 이미지 프리로딩 결과: ${successCount}/${imageNames.length} 성공`);
        setTextureImagesLoaded(true); // 안전장치
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

  useEffect(() => {
    if (router.isReady) {
      if (name) {
        setNickname(name);
        setMessages([]);
      } else {
        setNickname('당신');
      }
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
    nfcSocketRef.current.on('connect', () => console.log('nfcSocket connected'));
    nfcSocketRef.current.on('disconnect', () => console.log('nfcSocket disconnected'));
    nfcSocketRef.current.on('connect_error', (err) => console.error('nfcSocket connect_error:', err));
    nfcSocketRef.current.on('tag-read', (data) => {
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
      
      // 모든 메시지를 allMessages에 순차적으로 추가
      setAllMessages([
        { user: 'Five Flower', text: `${nickname} 안녕! 만나게 되서 너무 반가워!`, isFixed: true }
      ]);
      
      setShowInitialMessage(true);
      setShowCircle(true);  // NFC 태그 읽힌 직후 바로 circle 표시
      
      setTimeout(() => {
        setAllMessages(prev => [...prev, { 
          user: 'Five Flower', 
          text: `나와 대화를 통해 어떤 것을 할 수 있는지 간략하게 설명할게!\n${nickname}에게 가장 적합한 모듈 사용 루틴과 커스터마이징으로 손톱물어뜯기를 개선해보자!`, 
          isFixed: true 
        }]);
        setShowSecondMessage(true);
        setTimeout(() => {
          setAllMessages(prev => [...prev, { 
            user: 'Five Flower', 
            text: `난 앞으로 ${nickname} 옆에서 손톱 대신 내 다섯 면과 움푹한 공간을 마음껏 눌러서 스트레스를 꾹 눌러보게 돕는 단단한 존재가 될거야 !`, 
            isFixed: true 
          }]);
          setShowThirdMessage(true);
          setTimeout(() => {
            setAllMessages(prev => [...prev, { 
              user: 'Five Flower', 
              text: `지수는 dna 감정유형 테스트 결과 불안민감형으로 결과가 나왔는데,\n지수의 일상에서 가장 불안하거나 예민해지는 순간이 있다면 언제야?`, 
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
        const customizingMessage = { user: 'Five Flower', text: '이제부턴 지수와 나의 루틴이 효과적으로 이루어질 수 있도록 모듈을 적합한 모습으로 커스터마이징을 시작할게!', isFixed: true };
        
        setMessages(prev => [...prev, customizingMessage]);
        setAllMessages(prev => [...prev, customizingMessage]);
        
        // 커스터마이징 단계로 변경
        setIsCustomizingPhase(true);
        
        // 3. 1.5초 후 나이 질문 메시지
        setTimeout(() => {
          const ageQuestionMessage = { user: 'Five Flower', text: '지수에게 가장 친근하고 적합한 동반자가 되기 위한 커스터마이징을 진행하기 위해서 지수의 나이를 알려줘!', isFixed: true };
          
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
            text: `그런 순간이 생길 때 주로 어떤 행동을 하는지, 어떤 생각들을 하는지 자유롭게 알려주면 지수의 행동,\n생각 루틴에 맞춘 five-flower 피빗 사용 루틴을 추천해줄게!`,
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
      preloadTextureImages();
      
      setTimeout(() => {
        let ageMessage = '';
        if (age >= 20 && age <= 39) {
          ageMessage = '20대 사용자들은 대부분 질감적으로 재밌고 특이한 것들을 선호해\n그래서 난 지수의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!';
        } else if (age >= 10 && age < 20) {
          ageMessage = '10대 사용자들은 대부분 부드럽고 친근한 질감을 좋아해\n그래서 난 지수의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!';
        } else if (age >= 40) {
          ageMessage = '40대 혹은 그 이상인 사용자들은 대부분 안정적이고 편안한 느낌을 주는 질감을 선호해\n그래서 난 지수의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!';
        } else {
          ageMessage = '지수의 나이에 알맞는 모듈을 형성하기 위해\nfive flower의 내부 공간을 꾸밀 질감 4가지를 추천할게. 마음에 드는 것을 선택해줘!';
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
        
        // 메시지 추가 후 즉시 UI 표시 (디버깅용)
        console.log('🎨 질감 선택 단계 즉시 활성화!');
        setIsTextureSelectionPhase(true);
      }, 1000);
      
      return; // API 호출 방지
    }

    // 사용자가 두 번째 질문에 답변한 이후부터 계속 API 호출
    const shouldCallAPI = () => {
      const userMessageCount = allMessages.filter(msg => msg.user === nickname).length + 1; // +1 for current message
      return userMessageCount >= 2; // 두 번째 사용자 답변부터 API 호출
    };

    if (shouldCallAPI()) {
      setIsPibitLoading(true);
      setIsTyping(true); // 타이핑 인디케이터 시작

      try {
        const userAnswerCount = allMessages.filter(msg => msg.user === nickname).length + 1; // 현재까지 사용자 답변 횟수
        
        let stepPrompt = '';
        
                 if (userAnswerCount === 2) {
           // Step 1: 감정 해소 방법 답변 받음 → 구체적인 내용 질문
           stepPrompt = `
당신은 Five Flower라는 손톱 물어뜯기 습관 개선을 도와주는 친구야.
성격: 따뜻하고 긍정적. 말투: 반말, 짧고 가벼움 ("좋아!", "그렇구나!")

사용자가 감정 해소 방법을 말했어. 이제 그 방법에 대해 더 구체적으로 친절하게 물어봐줘.

응답 형식:
1. 간단한 긍정적 반응 (1문장)
2. 구체적인 방법에 대한 친절한 질문 (예: "조금 더 자세히 알려줄 수 있어?", "어떤 식으로 하는지 궁금해!")

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 3) {
           // Step 2: 구체적인 내용 받음 → 효과에 대해 질문
           stepPrompt = `
당신은 Five Flower라는 손톱 물어뜯기 습관 개선을 도와주는 친구야.
성격: 따뜻하고 긍정적. 말투: 반말, 짧고 가벼움

사용자가 구체적인 방법을 말했어. 이제 그 방법의 효과에 대해 친절하게 물어봐줘.

응답 형식: 그 방법으로 스트레스를 풀 때 효과가 어떤지 친절하게 궁금해하며 질문 (예: "그렇게 할 때 기분이 어떤지 궁금해!", "효과가 어때?")

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 4) {
           // Step 3: 효과에 대해 답변 받음 → 편안한 시간/장소 질문
           stepPrompt = `
당신은 Five Flower라는 손톱 물어뜯기 습관 개선을 도와주는 친구야.
성격: 따뜻하고 긍정적. 말투: 반말, 짧고 가벼움

사용자가 효과에 대해 말했어. 이제 평상시 가장 기분 좋거나 편안한 순간이나 장소에 대해 친절하게 궁금해해줘.

반드시 이런 식으로 물어봐야 해:
"그럼 평소에 가장 기분 좋을 때는 언제야?" 또는 "어떤 곳에 있을 때 편안해?" 같은 질문

중요: 반드시 반말로 대답하고, 존댓말 절대 사용 금지
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 5) {
           // Step 4: 편안한 순간/장소 답변 받음 → 예민한/불안한 순간 질문
           stepPrompt = `
당신은 Five Flower라는 손톱 물어뜯기 습관 개선을 도와주는 친구야.
성격: 따뜻하고 긍정적. 말투: 반말, 짧고 가벼움

사용자가 편안한 순간/장소에 대해 말했어. 이제 반대로 가장 예민해지거나 불안해지는 순간에 대해 친절하게 궁금해해줘.

반드시 이런 식으로 물어봐야 해:
"그럼 반대로 어떤 순간이나 공간이 널 예민하게 만들거나 불안한 감정을 느끼게 해?"

중요: 
- 반드시 반말로 대답하고, 존댓말 절대 사용 금지
- 위 질문을 정확히 사용하거나 비슷한 의미로 물어보기
금지사항: "~함", "~있음?", "~냐", "ㅋㅋ", "~해봐", "~해", "~말해봐", "~하게 돼", 존댓말, 명령조 말투 등 사용 금지
`;
         } else if (userAnswerCount === 6) {
           // Step 5: 예민한/불안한 순간 답변 받음 → 최종 루틴 3가지 제공
           const allUserResponses = allMessages.filter(msg => msg.user === nickname).map(msg => msg.text).join(' / ');
           stepPrompt = `
당신은 Five Flower 모듈 사용 루틴을 추천해주는 전문가야.

★★★ Five Flower에 대한 핵심 정보 ★★★
- Five Flower는 손톱물어뜯기 습관 개선을 위한 물리적 촉각 모듈이다
- 손가락 모양을 본따 만든 형태로 되어 있다
- 중앙에 움푹 패여있는 공간이 있어서 엄지손가락으로 꾹 누르거나 눌렀다 뗐다를 반복할 수 있다
- 이를 통해 불안한 감정들을 떨쳐내고 생각 정리를 할 수 있다
- 궁극적 목표는 손가락을 사용한 습관행동(손톱물어뜯기)을 제어하는 것이다
- 절대로 향이나 냄새, 소리 등의 기능은 없다 - 오직 촉각적 상호작용만 가능하다

사용자의 응답 내용: ${allUserResponses}

사용자가 불안하거나 예민한 순간에 대해 말했어. 이제 사용자의 구체적인 상황을 반영한 Five Flower 모듈 사용 루틴 3가지를 추천해줘.

반드시 이 정확한 형식으로 응답해야 해:

"${nickname}에게 딱 맞는 Five Flower 사용 루틴 3가지를 추천해줄게!

📅 1. 불안감 완화 루틴
[사용자가 말한 불안한 상황에서 Five Flower의 중앙 움푹한 공간을 엄지손가락으로 어떻게 꾹 누르거나 눌렀다 뗐다 반복하여 불안한 감정을 떨쳐낼지 구체적으로 3-4줄 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]

📅 2. 집중력 향상 루틴  
[사용자 상황에 맞춰 Five Flower의 손가락 모양 부분과 중앙 공간을 엄지손가락으로 어떻게 누르고 조작하여 생각정리와 집중력을 높일지 3-4줄 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]

📅 3. 스트레스 해소 루틴
[사용자의 스트레스 상황에서 손톱물어뜯기 대신 Five Flower의 중앙을 눌렀다 뗐다 반복하여 습관행동을 제어하는 구체적인 사용법 3-4줄 설명. 반드시 "~봐", "~해", "~자" 등으로 끝내기]"

★★★ 절대 규칙 ★★★
1. 위 형식을 정확히 지키기
2. 📅 1, 📅 2, 📅 3 모두 포함하기
3. 각 루틴은 3-4줄로 완성된 문장 작성
4. 3번째 루틴까지 반드시 완전히 작성하기
5. 반말 사용하기
6. 오직 촉각적 상호작용만 언급 (엄지손가락으로 중앙 누르기, 눌렀다 뗐다 반복하기 등)
7. 사용자가 말한 구체적인 상황과 연결하기
8. 손톱물어뜯기 습관행동 제어라는 궁극적 목표 반영하기

★★★ 절대 금지사항 ★★★
- 향, 냄새, 소리, 시각적 효과 등 촉각 외의 감각 언급 금지
- "향을 맡아", "소리를 들어", "색깔을 봐" 등의 표현 절대 금지
- 존댓말, 미완성 문장, 추가 질문 금지
`;
         } else if (userAnswerCount >= 7) {
           // Step 6: 사용자가 루틴 선택 → 함께 실천하자는 메시지
           const previousMessages = allMessages.slice(-3).map(m => `${m.user}: ${m.text}`).join('\n');
           stepPrompt = `
당신은 Five Flower라는 손톱 물어뜯기 습관 개선을 도와주는 친구야.

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

        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: currentInput, 
            userName: name || nickname, 
            toneId: currentToneId,
            systemPrompt: stepPrompt
          }),
        });
        
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Failed to parse JSON response:", text);
          throw new Error("Server response was not valid JSON.");
        }

        setIsPibitLoading(false);
        setIsTyping(false); // 타이핑 인디케이터 종료
        if (data.reply) {
          console.log('🔥 API 응답:', data.reply); // 응답 로깅 추가
          console.log('📊 userAnswerCount:', userAnswerCount); // 사용자 답변 횟수 로깅
          
          const fiveFlowerMessage = { user: 'Five Flower', text: data.reply, isFixed: true };
          setMessages((prev) => [...prev, fiveFlowerMessage]);
          setAllMessages((prev) => [...prev, fiveFlowerMessage]);
          
          // 루틴이 포함된 메시지인지 확인 (📅 포함 여부로 판단)
          const hasRoutines = data.reply.includes('📅');
          console.log('📅 루틴 포함 여부:', hasRoutines);
          
          // 루틴 생성 완료 후 별도 질문 메시지 추가 (루틴이 실제로 포함되어 있을 때만)
          if (userAnswerCount === 6 && hasRoutines) {
            setTimeout(() => {
              const questionMessage = { user: 'Five Flower', text: '어떤 루틴이 가장 마음에 들어?', isFixed: true };
              setMessages((prev) => [...prev, questionMessage]);
              setAllMessages((prev) => [...prev, questionMessage]);
            }, 1000);
          } else if (userAnswerCount === 6 && !hasRoutines) {
            // 루틴이 포함되지 않은 경우 에러 로깅
            console.error('❌ 6단계에서 루틴이 생성되지 않았습니다:', data.reply);
          }
        } else if (data.error) {
          const errorMessage = { user: 'Five Flower', text: data.error, isFixed: true };
          setMessages((prev) => [...prev, errorMessage]);
          setAllMessages((prev) => [...prev, errorMessage]);
        }
      } catch (err) {
        console.error(err);
        setIsPibitLoading(false);
        setIsTyping(false); // 타이핑 인디케이터 종료
        const errorMessage = { user: 'Five Flower', text: '앗, 지금은 대답하기 조금 어려워. 다시 시도해줘! (서버 에러)', isFixed: true };
                 setMessages((prev) => [...prev, errorMessage]);
         setAllMessages((prev) => [...prev, errorMessage]);
       }
     }
 };

  const greetingText = `${nickname} 안녕, 여기까지 오느라 수고 많았어!`;
  const mainInstructionText = `이제 나와 대화하면서 ${nickname}에게 가장 효과적인 손톱물어뜯기\\n습관 개선 루틴을 체험해보고 커스터마이징을 진행해보자!`;

  if (!nickname) {
    return null; 
  }

  return (
    <>
      <style jsx global>{`
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .texture-selection-ui {
          animation: textureUIFadeIn 0.8s ease-out forwards;
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
              // 📅가 포함된 루틴 메시지이거나 "루틴을 수락해줘" 메시지에 버튼 표시
              const isRoutineRecommendation = isLastFiveFlowerMessage && 
                                              (msg.text.includes('📅') || msg.text.includes('루틴을 수락해줘')) && 
                                              !routineAccepted;
              
              // 디버깅 로그
              if (msg.user === 'Five Flower' && index === allMessages.length - 1) {
                console.log('🔍 버튼 표시 조건 확인:', {
                  userAnswerCount,
                  isLastFiveFlowerMessage,
                  routineAccepted,
                  hasScheduleEmoji: msg.text.includes('📅'),
                  isRoutineRecommendation,
                  messageText: msg.text.substring(0, 50) + '...'
                });
              }
              
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
                      marginLeft: '70px',
                      color: '#828282',
                      fontSize: '16px',
                      fontFamily: 'Pretendard Variable'
                    }}>
                      🎨 질감 이미지를 준비하고 있어... 잠시만 기다려줘!
                    </div>
                  )}
                  
                  {/* 질감 추천 메시지 바로 밑에 질감 선택 UI 표시 - 정확한 질감 메시지 인덱스이면서 이미지가 로딩된 후에만 */}
                  {index === textureMessageIndex && textureImagesLoaded && (
                    <div 
                      className="texture-selection-ui"
                      style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '580px',
                        marginTop: '20px',
                        marginLeft: '70px', // Five Flower 메시지와 같은 왼쪽 마진
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
                            setShowColorSelection(true);
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
                      <TextureArrowCircle onClick={() => {
                        console.log('화살표 버튼 클릭');
                        if (!selectedTexture) {
                          setCurrentTextureImage(prev => {
                            if (prev === 'ff2') return 'df';
                            if (prev === 'df') return 'sil';
                            return 'ff2'; // sil인 경우 ff2로
                          });
                        }
                      }}>
                        <TextureArrowIcon src="/arrow23.png" alt="arrow" />
                      </TextureArrowCircle>
                    </div>
                  )}
                  
                  {/* 질감 선택 완료 메시지 - 정확한 질감 메시지 인덱스일 때만 */}
                  {index === textureMessageIndex && showTextureMessage && selectedTexture && (
                    <div style={{
                      marginTop: '20px',
                      marginLeft: '70px',
                      color: '#828282',
                      fontSize: '16px',
                      fontFamily: 'Pretendard Variable',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line'
                    }}>
                                             좋은 선택이야! {getTextureDescription(selectedTexture)}은 확실히 눌렀을 때 강력한 자극을 줘서 다른 행동으로 이어지지 않고 스스로가 집중하고자 하는 것에 더 효과적일꺼야!{'\n'}이번엔 모듈의 외부를 이루는 영역의 색을 선택해서 커스터마이징을 마무리해줘 ! 심리적으로 편안해지는 색상들을 위주로 제안했어
                    </div>
                  )}
                  
                  {/* 색상 선택 UI - 질감 선택 UI 아래에 별도로 표시 */}
                  {index === textureMessageIndex && showColorSelection && showTextureMessage && selectedTexture && (
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
                          setIsColorSelecting(true);
                          // 동그라미들 즉시 나타내기 (속도 개선)
                          setVisibleColorOptions([]);
                          setTimeout(() => setVisibleColorOptions([0]), 50);
                          setTimeout(() => setVisibleColorOptions([0, 1]), 100);
                          setTimeout(() => setVisibleColorOptions([0, 1, 2]), 150);
                          setTimeout(() => setVisibleColorOptions([0, 1, 2, 3]), 200);
                        }}>
                        <span style={{
                          fontFamily: 'Pretendard Variable',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#828282'
                        }}>
                          {isColorSelecting ? '색상 선택하기' : '모듈 외부 색상'}
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
                  
                  {/* 색상 선택 완료 후 배송 메시지 - 정확한 질감 메시지 인덱스일 때만 */}
                  {index === textureMessageIndex && showShippingMessage && isColorSelected && selectedTexture && (
                    <div style={{
                      marginTop: '30px',
                      marginLeft: '70px',
                      color: '#828282',
                      fontSize: '16px',
                      fontFamily: 'Pretendard Variable',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line'
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
                        좋았어! {getColorName(selectedColor)}의 외부 모듈과 {getTextureDescription(selectedTexture)} 내부 모듈을 함께 지수네 집으로 배송할게!{'\n'}함께 선택한 루틴을 이번주에 진행해보자!{'\n'}커스터마이징 마무리와 배송을 위해 Five Flower 배송 시작 버튼을 눌러줘
                      </div>
                    </div>
                  )}
                  
                  {/* Five Flower 배송 시작 버튼 - 배송 메시지 표시 시에만 */}
                  {index === textureMessageIndex && showShippingMessage && isColorSelected && selectedTexture && (
                    <div style={{
                      marginTop: '20px',
                      marginLeft: '70px',
                      display: 'flex',
                      justifyContent: 'flex-start'
                    }}>
                      <button
                        onClick={() => {
                          console.log('Five Flower 배송 시작 버튼 클릭');
                          // 여기에 배송 시작 로직 추가 가능
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
                  )}
                  
                  {isRoutineRecommendation && (
                    <div style={{
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginTop: '20px', 
                      width: '100%',
                      zIndex: 9999,
                      position: 'relative'
                    }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('🔥 버튼 클릭됨!');
                          handleRoutineAccept();
                        }}
                        style={{
                          backgroundColor: '#7b61ff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '12px 24px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)',
                          boxShadow: '0 4px 15px rgba(123, 97, 255, 0.3)',
                          zIndex: 10000,
                          position: 'relative',
                          pointerEvents: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#6951e8';
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 6px 20px rgba(123, 97, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#7b61ff';
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 4px 15px rgba(123, 97, 255, 0.3)';
                        }}
                        onMouseDown={(e) => {
                          e.target.style.transform = 'scale(0.98)';
                        }}
                        onMouseUp={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                      >
                        루틴 수락하기
                      </button>
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
    </>
  );
}