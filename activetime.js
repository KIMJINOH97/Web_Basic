var 스크린 = document.querySelector('#screen');
var 시작시간;
var 상태 = {}; //사전
var 기록 = [];
var 타임아웃;
console.time('시간');
스크린.addEventListener('click', function () {
    if (스크린.classList.contains('waiting')) {
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요';
        //스크린.style.backgroundColor = 'red'; 왜 이 과정을 안 하냐,
        //ready는 스타일이 두개고 등등
        타임아웃 = setTimeout(function () {
            시작시간 = new Date();
            스크린.click();
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if (스크린.classList.contains('ready')) {
        //준비상태
        if (!시작시간) {
            // 시작시간이 없으면
            clearTimeout(타임아웃); // 부정출발
            스크린.textContent = '너무 성급하시 군요!';
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
        } else {
            스크린.textContent = '클릭하세요!';
            스크린.classList.remove('ready');
            스크린.classList.add('now');
        }
    } else if (스크린.classList.contains('now')) {
        var 끝시간 = new Date();
        기록.push((끝시간 - 시작시간) / 1000);
        console.log((끝시간 - 시작시간) / 1000);
        시작시간 = null;
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요.';
    }
    console.log('클릭'); // 클릭 됐는지 확인.
});
