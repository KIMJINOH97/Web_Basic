var 이미지좌표 = '0';
var dictionary = { // 딕셔너리 자료구조
    바위 : '0',
    가위 : '-142px',
    보 : '-284px'    
};
var 비김 = document.createElement('div')
document.body.append(비김);
var 인터벌 = setInterval(function () {
    if(이미지좌표 === dictionary.바위){
        이미지좌표 = dictionary.가위;
    }
    else if(이미지좌표 === dictionary.가위){
        이미지좌표 = dictionary.보;
    }
    else{
        이미지좌표 = dictionary.바위;
    }
    document.querySelector('#computer').style.background = 
    'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)'+ 이미지좌표 + ' 0';
}, 100);
console.log(Object.entries(dictionary)); // 2차원 배열 됨
function 컴퓨터의선택(이미지좌표){
    return Object.entries(dictionary).find(function(x){
        return x[1] === 이미지좌표;
    })[0];
}

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function (){
        clearInterval(인터벌);
        setTimeout(function(){
            인터벌 = setInterval(function () {
            if(이미지좌표 === dictionary.바위){
                이미지좌표 = dictionary.가위;
            }
            else if(이미지좌표 === dictionary.가위){
                이미지좌표 = dictionary.보;
            }
            else{
                이미지좌표 = dictionary.바위;
            }
            document.querySelector('#computer').style.background = 
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)'+ 이미지좌표 + ' 0';
        }, 100);
        }, 1000);        
        var 나의선택 = this.innerText;
        var computer = 컴퓨터의선택(이미지좌표);
        if(나의선택 === '가위'){
            if(computer === '가위'){
                비김.textContent = '비겼습니다.';
            }
        }
    });
});
