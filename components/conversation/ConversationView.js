import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import {
  Bg,
  Messages,
  Message,
  InputRow,
  Input,
  SendButtonContainer,
  SendButtonArrow,
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
} from './StyledComponents';
import { toneAndManner } from './constants';
// teenReplies는 현재 이 컴포넌트에서 직접 사용되지 않으므로 import하지 않습니다.
// 만약 필요하다면 import { teenReplies } from './constants'; 로 추가할 수 있습니다.

console.log('toneAndManner:', toneAndManner);
console.log('toneAndManner[0]:', toneAndManner[0]);
console.log('getSystemPrompt:', toneAndManner[0].getSystemPrompt('테스트유저'));

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
        const randomId = Math.floor(Math.random() * 10000);
        const defaultNickname = '유저' + randomId;
        setNickname(defaultNickname);
        router.query.name = defaultNickname;
      }
    }
  }, [name, router.isReady]);

  useEffect(() => {
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
      const tagToneId = data && data.id ? String(data.id).trim() : toneAndManner[0].id;
      setCurrentToneId(tagToneId);
      fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '안녕!', userName: nicknameRef.current, toneId: tagToneId }),
      })
      .then(res => res.json())
      .then(data => {
        const pibitMessage = { user: 'PIBIT', text: data.reply || '안녕!' };
        setMessages((prev) => [...prev, pibitMessage]);
      })
      .catch(() => {
        const pibitMessage = { user: 'PIBIT', text: '안녕!' };
        setMessages((prev) => [...prev, pibitMessage]);
      });
    });
    nfcSocketRef.current.on('tag-removed', (data) => {
      console.log('nfcSocket event: tag-removed', data);
      setIsChatStarted(false);
      setMessages([]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (nfcSocketRef.current) nfcSocketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { user: nickname, text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    if (socketRef.current) socketRef.current.emit('message', userMessage);
    setIsPibitLoading(true);
    fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: currentInput, userName: name || nickname, toneId: currentToneId }),
    })
      .then(res => res.json())
      .then(data => {
        setIsPibitLoading(false);
        if (data.reply) {
          const pibitMessage = { user: 'PIBIT', text: data.reply };
          setMessages((prev) => [...prev, pibitMessage]);
        } else if (data.error) {
          const errorMessage = { user: 'PIBIT', text: data.error };
          setMessages((prev) => [...prev, errorMessage]);
        }
      })
      .catch(() => {
        setIsPibitLoading(false);
        const errorMessage = { user: 'PIBIT', text: '앗, 지금은 대답하기 조금 어려워. 다시 시도해줘! (서버 에러)' };
        setMessages((prev) => [...prev, errorMessage]);
      });
  };

  return (
    <Bg>
      <BackButton onClick={() => router.back()}>
        <img src="/whiteb.png" alt="뒤로 가기" />
      </BackButton>
      <Ellipse26 />
      <Ellipse29 />
      <Ellipse31 />
      <Ellipse32 />
      <Ellipse33 />
      <Ellipse28 />

      {isChatStarted ? (
        <>
          <h2 style={{textAlign:'center',margin:'24px 0 0 0',color:'#7b61ff',fontWeight:700,fontSize:'2.1rem',letterSpacing:'-1px', zIndex: 2, position: 'relative'}}>피빗과의 실시간 채팅</h2>
          <Messages>
            {messages.map((msg, i) =>
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: msg.user === nickname ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  marginLeft: msg.user === nickname ? 0 : 60,
                  marginRight: msg.user === nickname ? 30 : 0,
                  marginTop: 8,
                  marginBottom: 8
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: msg.user === '하윙' ? '2.05rem' : '2.25rem',
                    color:
                      msg.user === 'PIBIT'
                        ? undefined
                      : msg.user === '하윙'
                        ? '#ffe082'
                        : '#ffe082',
                    marginRight: msg.user === nickname ? 0 : 4,
                    marginLeft: msg.user === nickname ? 4 : 0,
                    minWidth: 40,
                    textAlign: msg.user === nickname ? 'right' : 'left',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.1,
                    background: msg.user === 'PIBIT' ? 'linear-gradient(90deg, #7b61ff 0%, #3ec6ff 100%)' : undefined,
                    WebkitBackgroundClip: msg.user === 'PIBIT' ? 'text' : undefined,
                    WebkitTextFillColor: msg.user === 'PIBIT' ? 'transparent' : undefined,
                    backgroundClip: msg.user === 'PIBIT' ? 'text' : undefined,
                  }}
                >
                  {msg.user}
                </div>
                <Message me={msg.user === nickname} style={{ fontSize: '1.18rem', padding: '11px 16px', fontFamily: 'Pretendard SemiBold, Pretendard, sans-serif', background: msg.user === 'PIBIT' ? '#f3f0ff' : '#ffe082', color: msg.user === 'PIBIT' ? '#333' : '#333', border: msg.user === 'PIBIT' ? '1.5px solid #7b61ff' : '1.5px solid #ffe082' }}>
                  {msg.user === 'audio' ? (
                    <audio controls style={{ marginTop: 12 }}>
                      <source src={msg.audio} type="audio/wav" />
                      브라우저가 오디오 태그를 지원하지 않습니다.
                    </audio>
                  ) : (
                    <>
                      <span style={{marginLeft:2, fontSize: '1em', fontFamily: 'Pretendard SemiBold, Pretendard, sans-serif'}}>{msg.text}</span>
                      {msg.audio && (
                        <audio controls style={{ marginTop: 12 }}>
                          <source src={msg.audio} />
                          브라우저가 오디오 태그를 지원하지 않습니다.
                        </audio>
                      )}
                    </>
                  )}
                </Message>
              </div>
            )}
            {isPibitLoading && (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 60, marginTop: 8, marginBottom: 8 }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '2.25rem',
                  color: undefined,
                  marginRight: 0,
                  marginLeft: 0,
                  minWidth: 40,
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.1,
                  background: 'linear-gradient(90deg, #7b61ff 0%, #3ec6ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  PIBIT
                </div>
                <Message me={false} style={{ fontSize: '1.18rem', padding: '11px 16px', fontFamily: 'Pretendard SemiBold, Pretendard, sans-serif', background: '#f3f0ff', color: '#333', border: '1.5px solid #7b61ff', display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: 32 }}>
                    <span className="pibit-loading-dot" style={{ animation: 'pibit-dot 1s infinite', fontSize: '2rem', marginRight: 2 }}>.</span>
                    <span className="pibit-loading-dot" style={{ animation: 'pibit-dot 1s infinite 0.2s', fontSize: '2rem', marginRight: 2 }}>.</span>
                    <span className="pibit-loading-dot" style={{ animation: 'pibit-dot 1s infinite 0.4s', fontSize: '2rem' }}>.</span>
                  </span>
                </Message>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Messages>
        </>
      ) : (
        <>
          <Greeting>{nickname}님 안녕, 여기까지 오느라 수고 많았어!</Greeting>
          <MainInstruction>
            이제 나와 대화하면서 {nickname}에게 가장 효과적인 손톱물어뜯기<br />
            습관 개선 루틴을 체험해보고 커스터마이징을 진행해보자!
          </MainInstruction>
          <InfoBox1 />
          <InfoBox2 />
          <img
            src="/routine.png"
            alt="routine icon"
            style={{
              position: 'absolute',
              width: '113.4px',
              height: 'auto',
              left: '512px',
              top: '290px',
              zIndex: 3, // to be on top of other elements
            }}
          />
          <RoutineTitle>Routine Making</RoutineTitle>
          <RoutineDescription>
            생성하신 피빗 모듈의 구체적인 사용<br />
            방법과 습관, 감정을 케어해줄 수 있는<br />
            모듈 인터렉티브 스케줄을 제안해요
          </RoutineDescription>
          <img
            src="/custom.png"
            alt="customize icon"
            style={{
              position: 'absolute',
              width: '85.8px',
              height: 'auto',
              left: '788.73px',
              top: '300px',
              transform: 'rotate(15deg)',
              zIndex: 3,
            }}
          />
          <CustomizingTitle>Customizing</CustomizingTitle>
          <CustomizingDescription>
            모듈의 색상, 텍스쳐, 모듈과<br />
            함께 사용 가능한 귀여운<br />
            기능들을 선물하고 제안해요
          </CustomizingDescription>
          <NfcArea>
            <AnimatedExampleImage src="/example1.png" alt="NFC 모듈 사용 예시" />
          </NfcArea>
          <NfcInstruction>대화를 시작하기 위해 모듈의 바닥면을 박스 안에 넣어줘!</NfcInstruction>
        </>
      )}

      <InputRow onSubmit={handleSend}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          autoFocus
        />
      </InputRow>
      <SendButtonContainer type="submit" onClick={handleSend} />
      <SendButtonArrow />
      
      <style>{`
        @keyframes pibit-dot {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </Bg>
  );
}