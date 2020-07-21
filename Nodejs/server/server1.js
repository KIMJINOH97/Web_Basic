const http = require('http');
const fs = require('fs');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http
    .createServer((req, res) => {
        console.log(req.url, parseCookies(req.headers.cookie)); // 쿠키 받다
        res.writeHead(200, { 'Set-Cookie': 'mycookie = test' }); // 요청 시 쿠키를 끼워보낸다 서버->클라이언트
        res.end('Hello Cookie');
    })
    .listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기중입니다.');
});
server.on('error', (err) => {
    console.error(err);
});
