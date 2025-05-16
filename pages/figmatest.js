import React from 'react';
import { useRouter } from 'next/router';

export default function FigmaTest() {
  const router = useRouter();
  // 임시로 테스트용 이름
  // const name = '홍길동'; // 이 부분 주석 처리 또는 삭제
  const [name, setName] = React.useState('');
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/figma/figma_frame_1-3.png"
        alt="Figma 디자인 이미지"
        style={{ maxWidth: '100%', maxHeight: '80vh', border: '1px solid #ccc', borderRadius: 8 }}
      />
      <input
        style={{ marginTop: 24, padding: '0.5rem 1rem', fontSize: '1.1rem', borderRadius: 8, border: '1px solid #ccc' }}
        placeholder="이름을 입력하세요"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        style={{
          marginTop: 32,
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: 'white',
          background: '#fbc02d',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002',
          transition: 'background 0.2s',
        }}
        onClick={() => router.push({ pathname: '/conversation', query: { name } })}
        disabled={!name.trim()}
      >
        실시간 채팅 보기
      </button>
    </div>
  );
} 