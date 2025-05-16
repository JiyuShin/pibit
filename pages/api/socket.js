import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    res.socket.server.io = io;

    // 클라이언트 연결 시
    io.on('connection', (socket) => {
      // 메시지 수신 후 전체 브로드캐스트
      socket.on('message', (msg) => {
        io.emit('message', msg);
      });
    });
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 