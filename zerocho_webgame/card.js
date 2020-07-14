var 가로 = 4;
var 세로 = 3;
var 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔후보 = JSON.parse(JSON.stringify(색깔들)); // 참조 관계가 끊김, 고로 json 이용 or slice(1단계만 복사) 함
console.log(색깔들);

var 색깔 = [];
var 클릭플래그 = false;
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;

function 카드세팅(가로, 세로) {
    while (색깔후보.length > 0) {
        색깔.push(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
    }
    클릭플래그 = false;
    for (var i = 0; i < 가로 * 세로; i++) {
        var card = document.createElement('div');
        card.className = 'card'; // 클래스 넣음
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardfront = document.createElement('div');
        cardfront.className = 'card-front';
        var cardback = document.createElement('div');
        cardback.className = 'card-back';
        cardback.style.backgroundColor = 색깔[i];
        cardInner.appendChild(cardfront);
        cardInner.appendChild(cardback);
        card.appendChild(cardInner);
        (function (c) {
            card.addEventListener('click', function () {
                if (클릭플래그 && !완성카드.includes(c)) {
                    c.classList.toggle('flipped');
                    클릭카드.push(c);
                    if (클릭카드.length === 2) {
                        if (
                            클릭카드[0].querySelector('.card-back').style.backgroundColor ===
                            클릭카드[1].querySelector('.card-back').style.backgroundColor
                        ) {
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];
                            if (완성카드.length === 12) {
                                var 끝시간 = new Date();
                                alert('축하드립니다! 성공' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML = '';
                                완성카드 = [];
                                색깔 = [];
                                색깔후보 = 색깔들.slice();
                                console.log(색깔후보);
                                시작시간 = null;
                                카드세팅(가로, 세로);
                            }
                        } else {
                            클릭플래그 = false;
                            setTimeout(function () {
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭플래그 = true;
                                클릭카드 = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card, index) {
            card.classList.remove('flipped');
            클릭플래그 = true;
            시작시간 = new Date();
        });
    }, 3000);
}
카드세팅(가로, 세로);
