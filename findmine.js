var dataset = [];
var tbody = document.querySelector('#table tbody');

document.querySelector('#exec').addEventListener('click', function(){
    tbody.innerHTML = '';
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치 뽑기 // 첫 클릭은 지뢰가 아니다 구현!
    var 후보군 = Array(hor*ver)
        .fill()
        .map(function (요소, 인덱스){
            return 인덱스;
        });
    var 셔플 = [];
    while(후보군.length > hor*ver-mine){
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0];
        셔플.push(이동값);
    }
    console.log(셔플);

    //지뢰 테이블 만들기

    for(var i=0; i<ver; i+=1){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j=0; j<hor; j+=1){
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log(부모tr, 부모tbody, 부모tbody.children, e.currentTarget, 칸, 줄);
                if(e.currentTarget.textContent === '' ||
                    e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                }
                else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                }
                else if(e.currentTarget.textContent === '?'){
                    if(dataset[줄][칸] === 1){
                        e.currentTarget.textContent = '';
                    }
                    else{
                        e.currentTarget.textContent = 'X';
                    }
                }
                console.log(dataset);
            });
            td.addEventListener('click', function(e){
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                if(dataset[줄][칸] === 'X'){
                    e.currentTarget.textContent = '펑';
                }
                else{
                    var 지뢰갯수 = 0;
                    var x = [-1,-1,0,1,1,1,0,-1];
                    var y = [0,-1,-1,-1,0,1,1,1];
                    for(var k=0; k<8; k++){
                        var dx = 줄+y[k];
                        var dy = 칸+x[k];
                        if(dx>=0 && dy>=0 && dx<=ver && dy<=hor){
                            if(dataset[dx][dy] == 'X')
                                지뢰갯수++;
                        }
                    }
                    e.currentTarget.textContent = 지뢰갯수;
                }
                })
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //지뢰 심기
    for(var k=0; k<셔플.length; k++){
        var 세로 = Math.floor(셔플[k]/ver); //배열 시작 0부터임
        var 가로 = 셔플[k] % hor;
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 'X';
    }
});


tbody.addEventListener('contextmenu', function(e){
    console.log('커런트타겟', e.currentTarget);
    console.log(e.target);
})