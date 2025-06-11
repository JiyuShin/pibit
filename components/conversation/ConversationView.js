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
  width: 805px;
  height: 0px;
  left: calc(50% - 805px/2);
  top: 80px;
  border: 1px solid #C2BFBF;
`;

const ContentBox = styled.div`
  position: absolute;
  top: 172px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TitleText = styled.p`
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: #828282;
  margin: 0;
`;

const SubText = styled.p`
  margin-top: 13px;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #828282;
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

export default function ConversationView() {
  const router = useRouter();
  const { name } = router.query;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState('');
  const messagesEndRef = useRef(null);
  // const [nfcWelcomed, setNfcWelcomed] = useState(false); // 현재 사용되지 않음
  // const [awaitingFirstReply, setAwaitingFirstReply] = useState(false); // 현재 사용되지 않음
  // const [step, setStep] = useState(0); // GPT 연동으로 step 상태는 더 이상 필요하지 않습니다.
  // const [userDay, setUserDay] = useState(''); // setUserDay는 있지만 userDay가 사용되지 않음. 아래 로직 확인 필요
  // const [showDunggutAudio, setShowDunggutAudio] = useState(false); // 현재 사용되지 않음
  const [currentToneId, setCurrentToneId] = useState(toneAndManner[0].id);
  const [isPibitLoading, setIsPibitLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  
  const socketRef = useRef(null);
  const nfcSocketRef = useRef(null);

  const nicknameRef = useRef(nickname);
  useEffect(() => {
    nicknameRef.current = nickname;
  }, [nickname]);

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
    nfcSocketRef.current.on('tag-read', async (data) => {
      setIsChatStarted(true);
      const tagToneId = data && data.id ? String(data.id).trim() : toneAndManner[0].id;
      setCurrentToneId(tagToneId);
      try {
        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: '안녕!', userName: nicknameRef.current, toneId: tagToneId }),
        });
        const text = await res.text();
        let resData;
        try {
          resData = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON on tag-read:", text);
          throw new Error("Server response was not valid JSON on tag-read.");
        }
        const pibitMessage = { user: 'PIBIT', text: resData.reply || '안녕!' };
        setMessages((prev) => [...prev, pibitMessage]);
      } catch (err) {
        console.error(err);
        const pibitMessage = { user: 'PIBIT', text: '안녕!' };
        setMessages((prev) => [...prev, pibitMessage]);
      }
    });
    nfcSocketRef.current.on('tag-removed', (data) => {
      console.log('nfcSocket event: tag-removed', data);
      setIsChatStarted(false);
      setMessages([]);
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
      setCurrentDate(`${year}. ${month}. ${day}`);
    }
  }, [isChatStarted]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { user: nickname, text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    if (socketRef.current) socketRef.current.emit('message', userMessage);
    setIsPibitLoading(true);

    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, userName: name || nickname, toneId: currentToneId }),
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
      if (data.reply) {
        const pibitMessage = { user: 'PIBIT', text: data.reply };
        setMessages((prev) => [...prev, pibitMessage]);
      } else if (data.error) {
        const errorMessage = { user: 'PIBIT', text: data.error };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error(err);
      setIsPibitLoading(false);
      const errorMessage = { user: 'PIBIT', text: '앗, 지금은 대답하기 조금 어려워. 다시 시도해줘! (서버 에러)' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const greetingText = `${nickname} 안녕, 여기까지 오느라 수고 많았어!`;
  const mainInstructionText = `이제 나와 대화하면서 ${nickname}에게 가장 효과적인 손톱물어뜯기\\n습관 개선 루틴을 체험해보고 커스터마이징을 진행해보자!`;

  if (!nickname) {
    return null; 
  }

  return (
    <Bg>
      <BackButton onClick={() => router.back()}>
        <img src="/whiteb.png" alt="뒤로 가기" />
      </BackButton>
      
      <AnimatePresence>
        {!isChatStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <PreChatContainer show={true}>
              <Ellipse26 />
              <Ellipse29 />
              <Ellipse31 />
              <Ellipse32 />
              <Ellipse33 />
              <Ellipse28 />
              <Greeting>
                {greetingText.replace(/\\n/g, '\n')}
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
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatStarted && (
           <NewUIContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
            exit={{ opacity: 0 }}
           >
            <NewGradientBox />
            <NewDateBox>
              <NewDateText>{currentDate}</NewDateText>
            </NewDateBox>
            <HorizontalLine />
            <ContentBox>
              <TitleText>Five Flower</TitleText>
              <SubText>{nickname} 안녕! 만나게 되서 너무 반가워!</SubText>
            </ContentBox>
            
            {/* The chat messages part is removed as per the new requirement */}
            {/* If chat functionality is needed alongside this new UI, it needs to be integrated here */}

            <InputRow onSubmit={handleSend}>
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
          </NewUIContainer>
        )}
      </AnimatePresence>
    </Bg>
  );
}