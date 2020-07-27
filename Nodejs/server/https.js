// 요즘은 https를 쓰는 것을 권장 함. 기관에서 발급하는 인증서 필요함.
// 유료도 있고, 무료도 있음 인증서를 쓰게 된다면, 인증서 경로를 넣어주어야함
const https = require('https');
const http2 = require('http2'); // 실험적인 모듈임. https 기반.

https.createServer((req, res) => {}).listen(80);
