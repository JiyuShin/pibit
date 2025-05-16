import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import {
  Bg,
  Messages,
  Message,
  InputRow,
  Input,
  SendBtn
} from './StyledComponents';
// teenReplies는 현재 이 컴포넌트에서 직접 사용되지 않으므로 import하지 않습니다.
// 만약 필요하다면 import { teenReplies } from './constants'; 로 추가할 수 있습니다.

let socket;

export default function ConversationView() {
  const router = useRouter();
  const { name } = router.query;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState('');
  const messagesEndRef = useRef(null);
  // const [nfcWelcomed, setNfcWelcomed] = useState(false); // 현재 사용되지 않음
  // const [awaitingFirstReply, setAwaitingFirstReply] = useState(false); // 현재 사용되지 않음
  const [step, setStep] = useState(0);
  // const [userDay, setUserDay] = useState(''); // setUserDay는 있지만 userDay가 사용되지 않음. 아래 로직 확인 필요
  // const [showDunggutAudio, setShowDunggutAudio] = useState(false); // 현재 사용되지 않음
  const nfcSocketRef = useRef(null);

  useEffect(() => {
    if (name) {
      setNickname(name);
      setMessages([]);
      setStep(0);
    } else {
      setNickname('유저' + Math.floor(Math.random() * 10000));
    }

    socket = io({
      path: '/api/socket',
      transports: ['websocket'],
    });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    if (!nfcSocketRef.current) {
      nfcSocketRef.current = io('http://localhost:4000');
      nfcSocketRef.current.on('connect', () => {
        console.log('nfcSocket connected');
      });
      nfcSocketRef.current.on('tag-read', (data) => {
        console.log('tag-read 이벤트 수신:', data);
        setMessages((prev) => [
          ...prev,
          { user: 'PIBIT', text: '안녕!' }
        ]);
        setStep(1);
      });
      nfcSocketRef.current.on('tag-removed', (data) => {
        console.log('tag-removed 이벤트 수신:', data);
        setMessages([]);
        setStep(0);
      });
      nfcSocketRef.current.on('disconnect', () => {
        console.log('nfcSocket disconnected');
      });
      nfcSocketRef.current.on('connect_error', (err) => {
        console.error('nfcSocket connect_error:', err);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (nfcSocketRef.current) {
        nfcSocketRef.current.disconnect();
        nfcSocketRef.current = null;
      }
    };
  }, [name]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { user: nickname, text: input };
    setMessages((prev) => [...prev, msg]);
    if (socket) {
      socket.emit('message', msg);
    }
    setInput('');
    if (step === 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: 'PIBIT', text: `${name}아 안녕! 난 ${name}의 10대 시절을 책임지는 PIBIT이야!` }
        ]);
      }, 1000);
      setStep(2);
    } else if (step === 2) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: 'PIBIT', text: '오랜만이네~ 오늘은 어떤 하루였는지 나에게 알려줘!' }
        ]);
      }, 1000);
      setStep(3);
    } else if (step === 3) {
      // setUserDay(input); // userDay가 사용되지 않아 주석 처리. 필요시 활성화
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: 'PIBIT', text: `그렇구나! ${input} 하루였네` }
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { user: 'PIBIT', text: '저번 등굣길에 너가 3번째로 만들었던 구름 모듈 소리 녹음했던거 들려줄게! 한번 들어봐 그때의 기분이 다시 느껴질거야' }
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { user: 'PIBIT', text: '바로 듣고 기분이 어떤지 알려줘! 좋으면 평상시에 나를 들고다니면서 듣기 좋은 노래도 전송해줄게!' }
            ]);
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { user: 'audio', audio: '/등굣길~.wav' }
              ]);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1000);
      setStep(4);
    } else if (step === 4) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { user: 'PIBIT', text: '좋았어, 지금 너가 느낀 감정에 어울릴만한 노래야!' }
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { user: 'audio', audio: '/살랑거리는 기분.m4a' }
          ]);
        }, 1200);
      }, 1000);
      setStep(5);
    }
  };

  return (
    <Bg>
      <h2 style={{textAlign:'center',margin:'24px 0 0 0',color:'#fbc02d'}}>실시간 채팅</h2>
      <Messages>
        {messages.map((msg, i) =>
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: msg.user === nickname ? 'row-reverse' : 'row',
              alignItems: 'center',
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
            <Message me={msg.user === nickname} style={{ fontSize: '1.18rem', padding: '11px 16px', fontFamily: 'Pretendard SemiBold, Pretendard, sans-serif' }}>
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
        <div ref={messagesEndRef} />
      </Messages>
      <InputRow onSubmit={handleSend}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          autoFocus
        />
        <SendBtn type="submit">전송</SendBtn>
      </InputRow>
    </Bg>
  );
} 