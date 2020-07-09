/* 1-10 빨강
   11-20 주황
   21-30 노란
   31-40 파란
   41-15 초록
   js 로 css 조작
   */
[undefined, undefined, undefined];
[1,2,3];
// 짝지어 바꾸준다. mapping이라 한다.

// var 후보군 = Array(45); // 보통 []
// var 필 = 후보군.fill();
// var 맵 = 필.map(function(요소, 인덱스){
//     return 인덱스+1;
// });
// console.log(맵);

var 후보군 = Array(45).fill().map(function (요소, 인덱스){
    return 인덱스+1;
})
console.log(후보군);

var 셔플 = [];
while(후보군.length > 0){
    var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
    셔플.push(이동값);
}
console.log(셔플);
var 보너스 = 셔플[셔플.length-1];
var 당첨숫자들 = 셔플.slice(0,6);

var 결과창 = document.getElementById('결과창');

function 공스타일 (숫자, 결과창){
    var 매개공 = document.createElement("div");
    매개공.textContent = 숫자;
    매개공.style.display = 'inline-block';
    매개공.style.border = '1px solid black';
    매개공.style.borderRadius = '10px';
    매개공.style.width = '20px';
    매개공.style.hegiht = '20px';
    매개공.style.textAlign = 'center';
    매개공.style.marginRight = '10px';
    매개공.className = '공아이디' + 숫자;
    var 배경색;
    if(숫자 <= 10){
        배경색 = 'red';
    }
    else if(숫자 <=20){
        배경색 = 'orange';
    }
    else if(숫자 <= 30){
        배경색 = 'yellow';
    }
    else if(숫자 <= 40){
        배경색 = 'blue';
    }
    else{
        배경색 = 'green';
    }
    
    매개공.style.backgroundColor = 배경색;
    결과창.appendChild(매개공);
}

setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[0], 결과창);
    }, 1000); // 밀리초 단위

    setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[1], 결과창);
    }, 2000); // 밀리초 단위
    setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[2], 결과창);
    }, 3000); // 밀리초 단위
    setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[3], 결과창);
    }, 4000); // 밀리초 단위
    setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[4], 결과창);
    }, 5000); // 밀리초 단위
    setTimeout(function 비동기콜백함수(){
        공스타일(당첨숫자들[5], 결과창);
    }, 6000); // 밀리초 단위

    setTimeout(function 비동기콜백함수(){
    var 보너스칸 = document.getElementsByClassName('보너스칸')[0];
    공스타일(보너스, 보너스칸);
    }, 7000);