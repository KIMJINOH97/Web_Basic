const http = require('http');
const fs = require('fs');
const users = {};

http.createServer((req, res) => {
    //자원에 대한 매서드가 달라질 수 있음
    if (req.method === 'GET') {
        if (req.url === '/') {
            return fs.readFile('./restFront.html', (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        } else if (req.url === '/users/') {
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            // 이름이 똑같은 정적파일들을 보내 줌
            return res.end(data);
        });
    } else if (req.method === 'POST') {
        if (req.url === '/') {
        } else if (req.url === '/users/') {
        }
    } else if (req.method === 'PATCH') {
        if (req.url === '/') {
        } else if (req.url === '/users/') {
        }
    } else if (req.method === 'PUT') {
        if (req.url === '/') {
        } else if (req.url === '/users/') {
        }
    } else if (req.method === 'DELETE') {
        if (req.url === '/') {
        } else if (req.url === '/users/') {
        }
    }
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중입니다.');
});
