var 이미지좌표 = '0';
var dictionary = {
    // 딕셔너리 자료구조
    바위: '0',
    가위: '-142px',
    보: '-284px',
};
var 인터벌;
var 이긴횟수 = 0;
var 진횟수 = 0;
var 비긴횟수 = 0;
var 횟수 = document.createElement('div');
document.body.append(횟수);
var 결과 = document.createElement('div');
document.body.append(결과);
function 인터벌메이커() {
    인터벌 = setInterval(function () {
        if (이미지좌표 === dictionary.바위) {
            이미지좌표 = dictionary.가위;
        } else if (이미지좌표 === dictionary.가위) {
            이미지좌표 = dictionary.보;
        } else {
            이미지좌표 = dictionary.바위;
        }
        document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + 이미지좌표 + ' 0';
    }, 100);
}
console.log(Object.entries(dictionary)); // 2차원 배열 됨
function 컴퓨터의선택(이미지좌표) {
    return Object.entries(dictionary).find(function (x) {
        return x[1] === 이미지좌표;
    })[0];
}
인터벌메이커();
var 점수표 = {
    가위: -1,
    바위: 0,
    보: 1,
};
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(인터벌);
        setTimeout(function () {
            인터벌메이커();
        }, 1000);
        var 나의선택 = 점수표[this.innerText];
        var computer = 점수표[컴퓨터의선택(이미지좌표)];
        if (나의선택 === computer) {
            결과.textContent = '비겼습니다.';
            비긴횟수++;
        } else if ([1, -2].includes(computer - 나의선택)) {
            결과.textContent = '졌습니다.';
            진횟수++;
        } else {
            결과.textContent = '이겼습니다.';
            이긴횟수++;
        }
        횟수.textContent = '이긴횟수 : ' + 이긴횟수 + '회, 진 횟수 : ' + 진횟수 + '회, 비긴 횟수 : ' + 비긴횟수;
    });
});
