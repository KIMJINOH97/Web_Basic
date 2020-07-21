const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log('서버가 열렸습니다.');
    fs.readFile('./practice.html', (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    });
}).listen(8080);
