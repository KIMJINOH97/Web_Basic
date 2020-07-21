const fs = require('fs');
//규칙이 없음 돌릴 때 마다 바뀜
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});
