const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

const server = http
    .createServer((req, res) => {
        // 올바른 요청인지 req를 봐 확인
        // req.headers.cookie; // 쿠키를헤더에 넣는 방법
        console.log(req.url, parseCookies(req.headers.cookie));
        const cookies = parseCookies(req.headers.cookie);
        if (req.url.startsWith('/login')) {
            //클라이언트에서 로그인이란 주소로 이름을 쿼리스트림을 붙여 서버로 요청함.
            //서버에서는 그것을 파싱하고 클라이언트에 제 이름을 쿠키로 삼으라는 명령과 함께 응답을 보냄.
            //쿠키 지워라 : 내용 탈취 당할 수 있음을 의미
            //쿠키 내용이 보이면 > 보안상 취약 세션을 쓰면 해결
            const { query } = url.parse(req.url); // url 주소 파싱
            const { name } = qs.parse(query); // 로그인 페이지에서 이름 파싱
            const expires = new Date(); // 현재 시간으로부터
            const randomInt = +new Date(); // 보안상 취약하므로 랜덤 넘버를 주기 위해 현재시간이 1970년에서 부터 지나온 ms로 뜸
            expires.setMinutes(expires.getMinutes() + 5); // 쿠키 유효 5분

            session[randomInt] = {
                name,
                expires,
            };
            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()};`,
                //서버는 randomInt로 접근 가능함
                //'Set-Cookie': `session=${encodeURIComponent(name)}; Expires=${expires.toGMTString()};`,
            });
            //res.writeHead(200, { 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/` });
            //expire 쿠키 유효시간 등 뒤는 쿠키에 대한 설정
            //302는 다른 페이지로 보내는 옵션 임시이동으로 브라우저에게 Location에 적힌 페이지로 이동하라는 뜻
            console.log(name);
            res.end(name);
        } else if (cookies.session && session[cookies.session].expires > new Date()) {
            // 유효기간 체크
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // content-type ... 이건 html에 한글을 위한 코드
            res.end(`${session[cookies.session].name}님 안녕하세요`);
        } else {
            fs.readFile('./server4.html', (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        }
        console.log('서버 실행');
    })
    .listen(8080);
// 서버 프로그램을 죽지않고 계속 실행하게 유지해줌
// 자기 자신 컴퓨터에만 돌아가는 개발용임 (현재는)

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기중입니다.');
});
server.on('error', (err) => {
    console.error(err);
});
