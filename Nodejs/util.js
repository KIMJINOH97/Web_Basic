const util = require('util');
const crypto = require('crypto');

const dontuseme = util.deprecate((x, y) => {
    // 지원이 조만간 중단될 매서드임을 알려줄 때 사용 ex) 네이버 지도 최단거리 중단
    console.log(x + y);
}, '이 함수는 2018년 12월 부로 지원하지 않습니다');

dontuseme(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes); // promise지원 하게 바꿔 줌
const pbkdf2Promise = util.promisify(crypto.pbkdf2); // promise지원 하게 바꿔 줌
