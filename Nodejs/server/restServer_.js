// 순수하게 노드로만 맛보는 서버 만들기
// npm이란 다른사람이 만들어둔 모듈이라 생각하면 됨
const http = require('http');
const fs = require('fs');
const users = {}; //메모리로 취급 여기다 담을꺼임 DB대신
const router = {
    // 많은 if문들을 router 객체로 만듬
    get: {
        '/': (req, res) => {
            return fs.readFile('./restFront.html', (err, data) => {
                // html읽은 버퍼가 담기게 됨
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        },
        '/users': () => {
            res.end(JSON.stringify(users)); // 객체를 JSON문자열로 감싸서 보냄
        },
        '*': (req, res) => {
            fs.readFile(`.${req.url}`, (err, data) => {
                // 이름이 똑같은 정적파일들을 보내 줌 restfront.css, html 등
                return res.end(data); // 버퍼로 보내줌
            });
        },
    },
    post: {
        '/users': () => {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            }); // 받는 단위는 chunk
            req.on('error', (err) => {
                console.error(err);
            });
            return req.on('end', () => {
                console.log(('POST 본문', body));
                const { name } = JSON.parse(body); //비구조화 할당 문법을 통해
                const id = +new Date(); // 현재시간으로함, 고유한 키를 부여해주는 것
                users[id] = name;
                res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('사용자 등록 성공');
            });
        },
    },
    patch: {
        '/': () => {},
        '/users': () => {},
    },
    put: {
        '/users': (req, res) => {
            const id = req.url.split('/')[2]; // 공백, users, 2번째
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            return req.on('end', () => {
                console.log('put', body);
                users[id] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        },
    },
    delete: {
        '/users': (req, res) => {
            const id = req.url.split('/')[2]; // 공백, users, 2번째
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            return req.on('end', () => {
                console.log('delete', body);
                delete users[id];
                return res.end(JSON.stringify(users));
            });
        },
    },
};
// app.get('/users');  익스프레스 쓸 경우
// app.post('/users');

http.createServer((req, res) => {
    const matchedurl = router[req.method.toLowerCase()][req.url]; // get, post 등이 소문자여서 lowercase로 바꿔줌
    (matchedurl || router[req.method.toLowerCase()]['*'])(req, res); // matchedurl이 있으면 쓰고 아니면 뒤에것
}).listen(8085, () => {
    // 이 프로그램이 종료되지 않고 유지되게 하는 장치
    console.log('8085번 포트에서 서버 대기 중입니다.');
});
