// 디비 연결이 안된다거나, 에러가 날 때(사용자 X)

const { fstat } = require('fs');

// setInterval(() => {
//     try {
//         console.log('시작');
//         throw new Error('서버를 고장내주마');
//     } catch (error) {
//         console.error(error);
//     }
// }, 1000);

// const fs = require('fs');
// setInterval(() => {
//     fs.unlink('./asdfasdf.js', (err) => {
//         if (err) {
//             console.log('시작');
//             console.log(err);
//             console.log('끝');
//         }
//     });
// }, 1000);

process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
}); // 모든 에러를 해결 가능하다? 반은 맞고 반은 틀림 모든 에러가 다 기록 되긴함.

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);
