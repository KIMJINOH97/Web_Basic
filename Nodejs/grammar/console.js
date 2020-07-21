// console 객체 안에 디버깅을 도와주는 많은 매서드가 있음
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};

console.time('전체 시간'); // 성능 검사
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있음');
console.log(string, number, boolean);
console.error('에러 메세지는 console.error에 담아주세요');

console.dir(obj, { colors: false, depth: 2 }); // 컬러X 2단계 가능
console.dir(obj, { colors: true, depth: 1 }); // 컬러 추가 후 1단계까지

console.time('시간 측정');
for (let i = 0; i < 10000; i++) {
    continue;
}
console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적'); // 호출 스택을 추적할 수 있음
}
function a() {
    b();
}

a();

console.timeEnd('전체 시간'); // 13~ 17까지의 시간 안의 인자 값이 같아야함
