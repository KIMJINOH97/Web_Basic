// const timeout = setTimeout(() => {
//     console.log('1.5초 후 실행');
// }, 1500);

// const interval = setInterval(() => {
//     console.log('1초마다 실행');
// }, 1000);

// const timeout2 = setTimeout(() => {
//     console.log('실행되지 않습니다');
// }, 3000);

// setTimeout(() => {
//     clearTimeout(timeout2); // 취소 시킬 때 제한 시간 내 무언가 했을 때
//     clearTimeout(interval);
// }, 2500);

const im = setImmediate(() => console.log('즉시 실행')); // 굳이 왜 쓸까?
clearImmediate(im);

console.log(__filename);
console.log(__dirname);
for (let i = 0; i < 100000; i++) {
    console.log(i);
    process.exit();
}
