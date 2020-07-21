const odd = '홀수 입니다';
const even = '짝수 입니다';

// 불림을 당하는 쪽에서도 허락을 해줘야함
module.exports = {
    odd: odd,
    even: even,
}; // 과거

module.exports = {
    odd,
    even,
}; // 현재
// 모듈의 속성인 exports로 직접 해도 됨
// exports.odd = odd;
// exports.even = even;
