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
  // const [step, setStep] = useState(0); // GPT 연동으로 step 상태는 더 이상 필요하지 않습니다.
  // const [userDay, setUserDay] = useState(''); // setUserDay는 있지만 userDay가 사용되지 않음. 아래 로직 확인 필요
  // const [showDunggutAudio, setShowDunggutAudio] = useState(false); // 현재 사용되지 않음
  const nfcSocketRef = useRef(null);

  useEffect(() => {
    console.log('[ConversationView] useEffect for name/router.isReady triggered. Name:', name, 'IsReady:', router.isReady);
    if (name) {
      setNickname(name);
      setMessages([]);
    } else {
      const randomId = Math.floor(Math.random() * 10000);
      const defaultNickname = '유저' + randomId;
      setNickname(defaultNickname);
      if (router.isReady && !name) {
        console.log('[ConversationView] Name not in query, setting router.query.name to:', defaultNickname);
        router.query.name = defaultNickname; 
      }
    }

    console.log('[ConversationView] Setting up socket.io...');
    socket = io({
      path: '/api/socket',
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('[ConversationView] Socket.io connected');
    });

    socket.on('message', (msg) => {
      console.log('[ConversationView] Received message via socket.io:', msg);
      if (msg.user !== nickname) { // nickname이 설정된 후 비교
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on('disconnect', () => {
      console.log('[ConversationView] Socket.io disconnected');
    });

    console.log('[ConversationView] Setting up NFC socket...');
    if (!nfcSocketRef.current) {
      nfcSocketRef.current = io('http://localhost:4000');
      nfcSocketRef.current.on('connect', () => {
        console.log('[ConversationView] nfcSocket connected');
      });
      nfcSocketRef.current.on('tag-read', (data) => {
        console.log('[ConversationView] nfcSocket event: tag-read', data);
        const pibitMessage = { user: 'PIBIT', text: '안녕!' };
        console.log('[ConversationView] Adding PIBIT message for tag-read:', pibitMessage);
        setMessages((prev) => [
          ...prev,
          pibitMessage
        ]);
      });
      nfcSocketRef.current.on('tag-removed', (data) => {
        console.log('[ConversationView] nfcSocket event: tag-removed', data);
        setMessages([]);
      });
      nfcSocketRef.current.on('disconnect', () => {
        console.log('[ConversationView] nfcSocket disconnected');
      });
      nfcSocketRef.current.on('connect_error', (err) => {
        console.error('[ConversationView] nfcSocket connect_error:', err);
      });
    }

    return () => {
      console.log('[ConversationView] Cleanup: Disconnecting sockets');
      if (socket) {
        socket.disconnect();
      }
      if (nfcSocketRef.current) {
        nfcSocketRef.current.disconnect();
        nfcSocketRef.current = null;
      }
    };
  }, [name, router.isReady, nickname]); // nickname을 의존성 배열에 추가

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    console.log('[ConversationView] handleSend triggered. Input:', input, 'Nickname:', nickname);
    if (!input.trim()) {
      console.log('[ConversationView] handleSend: Input is empty, returning.');
      return;
    }
    const userMessage = { user: nickname, text: input };
    console.log('[ConversationView] handleSend: User message created:', userMessage);
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // 비동기 fetch 전에 input 값을 저장
    setInput(''); 

    if (socket) {
      console.log('[ConversationView] handleSend: Emitting message via socket.io:', userMessage);
      socket.emit('message', userMessage);
    }

    console.log('[ConversationView] handleSend: Calling /api/gpt with message:', currentInput, 'and userName:', name || nickname);
    fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: currentInput, userName: name || nickname }),
    })
    .then(res => {
      console.log('[ConversationView] handleSend: Received raw response from /api/gpt:', res);
      if (!res.ok) {
        // res.json()을 호출하기 전에 에러 응답을 먼저 처리
        console.error('[ConversationView] handleSend: API response not OK. Status:', res.status);
        res.json().then(errData => {
          console.error('[ConversationView] handleSend: API error response data:', errData);
          const errorMessage = { user: 'PIBIT', text: errData.error || '앗, 지금은 대답하기 조금 어려워. 다시 시도해줘! (서버 에러)' };
          setMessages((prev) => [...prev, errorMessage]);
        }).catch(jsonError => {
          // JSON 파싱 실패 시
          console.error('[ConversationView] handleSend: Failed to parse API error response as JSON:', jsonError);
          const errorMessage = { user: 'PIBIT', text: '앗, 지금은 대답하기 조금 어려워. 다시 시도해줘! (응답 형식 오류)' };
          setMessages((prev) => [...prev, errorMessage]);
        });
        return Promise.reject(new Error(`API responded with status ${res.status}`)); // 이후 .then(data => ..) 실행 방지
      }
      return res.json();
    })
    .then(data => {
      console.log('[ConversationView] handleSend: Parsed data from /api/gpt:', data);
      if (data.reply) {
        const pibitMessage = { user: 'PIBIT', text: data.reply };
        console.log('[ConversationView] handleSend: Adding PIBIT message from API:', pibitMessage);
        setMessages((prev) => [...prev, pibitMessage]);
      } else if (data.error) {
        console.error('[ConversationView] handleSend: Error in API response data:', data.error);
        const errorMessage = { user: 'PIBIT', text: data.error }; // API가 보낸 에러 메시지 사용
        setMessages((prev) => [...prev, errorMessage]);
      }
    })
    .catch(error => {
      // 위에서 Promise.reject()를 호출했거나 네트워크 에러 등 다른 에러 발생 시
      console.error('[ConversationView] handleSend: Failed to fetch GPT response or process it:', error);
      // 이미 UI에 에러 메시지를 표시했을 수 있으므로, 중복 표시를 피하기 위해 여기서는 추가적인 setMessages는 하지 않거나, 다른 종류의 메시지를 표시할 수 있습니다.
      // 예를 들어, 네트워크 연결 문제와 API 자체 에러를 구분하고 싶을 때 사용합니다.
      // if (!messages.some(m => m.text.includes('앗, 지금은 대답하기 조금 어려워'))) {
      //   const errorMessage = { user: 'PIBIT', text: '앗, 네트워크 문제로 대답을 가져오지 못했어요.' };
      //   setMessages((prev) => [...prev, errorMessage]);
      // }
    });
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