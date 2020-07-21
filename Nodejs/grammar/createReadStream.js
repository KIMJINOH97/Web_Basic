const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk); // data배열에 chunk들이 차 있음
    console.log('data', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.error(err);
});
