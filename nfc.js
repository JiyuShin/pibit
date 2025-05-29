const { NFC } = require('nfc-pcsc');

const nfc = new NFC();

nfc.on('reader', reader => {
  console.log(`리더기 연결됨: ${reader.name}`);

  reader.on('card', card => {
    console.log(`NFC 태그 감지됨:`, card);
  });

  reader.on('card.off', card => {
    console.log('NFC 태그 제거됨');
  });

  reader.on('error', err => {
    console.error('리더기 에러:', err);
  });

  reader.on('end', () => {
    console.log('리더기 연결 해제');
  });
});

nfc.on('error', err => {
  console.error('NFC 에러:', err);
}); 