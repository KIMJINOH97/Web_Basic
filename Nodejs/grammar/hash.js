var crypto = require('crypto'); // 내장 모듈 불러옴

console.log(crypto.createHash('sha512').update('비밀번호').digest('base64'));

const randomBytesPromise = util.promisify(crypto.randomBytes); // promise지원 하게 바꿔 줌
const pbkdf2Promise = util.promisify(crypto.pbkdf2); // promise지원 하게 바꿔 줌

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('zerocho바보', salt, 651395, 64, 'sha512', (err, key) => {
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });
});

randomBytesPromise(64)
    .then((buf) => {
        const salt = buf.toString('base64');
        return pbkdf2Promise('zerocho바보', salt, 651395, 64, 'sha512');
    })
    .then((key) => {})
    .catch((err) => {});

(async () => {
    const buf = await randomBytesPromise(64);
    const salt = buf.toString('base64');
    const key = await pbkdf2Promise('');
    console.log('password', key.toString('base64'));
})();
