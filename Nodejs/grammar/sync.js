const fs = require('fs');
console.log('시작');
// 차례대로 하도록 바꾸기
// fs.readFile('./readme.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log('1번', data.toString());
//     fs.readFile('./readme.txt', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         console.log('2번', data.toString());
//         fs.readFile('./readme.txt', (err, data) => {
//             if (err) {
//                 throw err;
//             }
//             console.log('3번', data.toString());
//             console.log('끝');
//         });
//     });
// });

let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
