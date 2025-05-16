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

io.on('connection', (socket) => {
  console.log("✅ 웹사이트와 소켓 연결됨");

  const nfc = new NFC(); // 리더기 초기화

  nfc.on('reader', reader => {
    console.log(`🎯 리더기 연결됨: ${reader.name}`);

    reader.on('card', card => {
      console.log(`📥 태그 인식됨: ${card.uid}`);
      socket.emit('tag-read', { text: '지유야 안녕' }); // 메시지 변경
    });

    reader.on('error', err => {
      console.error(`❌ 리더기 오류: ${err}`);
    });

    reader.on('end', () => {
      console.log(`🔌 리더기 연결 종료: ${reader.name}`);
    });
  });

  nfc.on('error', err => {
    console.error('NFC 전체 오류', err);
  });
});

server.listen(4000, () => {
  console.log("📡 소켓 서버 실행 중 (포트 4000)");
}); 