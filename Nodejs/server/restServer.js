// 순수하게 노드로만 맛보는 서버 만들기

const http = require('http');
const fs = require('fs');
const users = {}; //메모리로 취급 여기다 담을꺼임 DB대신

// app.get('/users');  익스프레스 쓸 경우
// app.post('/users');

http.createServer((req, res) => {
    //자원에 대한 매서드가 달라질 수 있음
    if (req.method === 'GET') {
        if (req.url === '/') {
            return fs.readFile('./restFront.html', (err, data) => {
                // html읽은 버퍼가 담기게 됨
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        } else if (req.url === '/users') {
            return res.end(JSON.stringify(users)); // 객체를 JSON문자열로 감싸서 보냄
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            // 이름이 똑같은 정적파일들을 보내 줌 restfront.css, html 등
            return res.end(data); // 버퍼로 보내줌
        });
    } else if (req.method === 'POST') {
        if (req.url === '/') {
        } else if (req.url === '/users') {
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
        }
    } else if (req.method === 'PATCH') {
        if (req.url === '/') {
        } else if (req.url === '/users/') {
        }
    } else if (req.method === 'PUT') {
        if (req.url === '/') {
        } else if (req.url.startsWith('/users/')) {
            //id를 users/5, 1 등 에서 가져올꺼다 => 정규표현식으로 하거나 startswith
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
        }
    } else if (req.method === 'DELETE') {
        if (req.url === '/') {
        } else if (req.url.startsWith('/users/')) {
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
        }
    }
}).listen(8085, () => {
    // 이 프로그램이 종료되지 않고 유지되게 하는 장치
    console.log('8085번 포트에서 서버 대기 중입니다.');
});
