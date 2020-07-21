const fs = require('fs');
const zlib = require('zlib'); // 파일 압축함
//파일을 복사하는 방법
const zlibStream = zlib.createGzip(); // 압축
const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(zlibStream).pipe(writeStream);

// const readStream = fs.copyFile('./readme4.txt', './writeme4.txt', (err)=>{
//console.error(err);
//});
