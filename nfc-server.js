const { NFC } = require('nfc-pcsc');
const { Server } = require('socket.io');
const http = require('http');

// 1. 웹소켓 서버 생성 (포트 4000)
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// NFC 태그 ID와 데이터 매핑
const tagMappings = {
  '0488bb12361e90': { name: 'Five Flower', message: '안녕! 난 five flower이야, 만나게 되서 너무 반가워!' }
};

const nfc = new NFC(); // NFC 리더기를 서버 시작 시 한 번만 초기화

nfc.on('error', err => {
  console.error('NFC 라이브러리 오류:', err);
});

nfc.on('reader', reader => {
  console.log(`🎯 리더기 연결됨: ${reader.name}`);
  console.log('💳 카드를 기다리는 중...');

  reader.on('card', card => {
    const tagData = tagMappings[card.uid];
    let payload;

    if (tagData) {
      payload = {
        id: card.uid,
        name: tagData.name,
        message: tagData.message,
      };
    } else {
      // 등록되지 않은 태그의 기본값
      payload = {
        id: card.uid,
        name: '방문객',
        message: '만나서 반가워요!',
      };
    }
    
    console.log('[NFC 서버 emit payload]', payload);
    io.emit('tag-read', payload); // 모든 연결된 클라이언트에게 전송
  });

  reader.on('error', err => {
    console.error(`❌ 리더기 오류: ${err}`);
  });

  reader.on('end', () => {
    console.log(`🔌 리더기 연결 종료: ${reader.name}`);
  });
});

io.on('connection', (socket) => {
  console.log(`✅ 웹사이트와 소켓 연결됨 (클라이언트 ID: ${socket.id})`);

  socket.on('disconnect', () => {
    console.log(`🔌 웹사이트와 소켓 연결 끊어짐 (클라이언트 ID: ${socket.id})`);
  });
});

server.listen(4000, () => {
  console.log("📡 소켓 서버 실행 중 (포트 4000)");
}); 