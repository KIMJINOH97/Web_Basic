// 클로저 문제 일어남
for(var i=0; i<100; i++){
    function 클로저(){
        setTimeout(function(){
            console.log(i);
        }, i*1000);
    }
} 


//해결책
for(var i=0; i<100; i++){
    function 클로저(j){
        setTimeout(function(){
            console.log(j);
        }, j*1000);
    }
    클로저(i);
}

//클로저 문제 해결 후 즉시 실행
for(var i=0; i<100; i++){
    (function 클로저(j){
        setTimeout(function(){
            console.log(j);
        }, j*100);
    })(i); // 즉시 실행 함수
}