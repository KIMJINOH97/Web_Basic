var dataset = [];
var tbody = document.querySelector('#table tbody');
var 중단flag = false;
var 연칸 = 0;
document.querySelector('#exec').addEventListener('click', function(){
    tbody.innerHTML = '';
    dataset = [];
    중단flag = false;
    연칸 = 0;
    var hor = parseInt(document.querySelector('#hor').value); //가로
    var ver = parseInt(document.querySelector('#ver').value); // 세로
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
            arr.push(0);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function(e){
                if(중단flag){
                    return;
                }
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log(부모tr, 부모tbody, 부모tbody.children, e.currentTarget, 칸, 줄);
                if(e.currentTarget.textContent === '' ||
                    e.currentTarget.textContent === 'X'){
                    e.currentTarget.classList.add('flag');
                    e.currentTarget.textContent = '!';
                }
                else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                }
                else if(e.currentTarget.textContent === '?'){
                    if(dataset[줄][칸] === 0){
                        e.currentTarget.textContent = '';
                    }
                    else{
                        e.currentTarget.textContent = 'X';
                    }
                    e.currentTarget.classList.remove('question');
                        e.currentTarget.classList.add('td');
                }
                console.log(dataset);
            });
            td.addEventListener('click', function(e){
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                console.log()
                if(중단flag || dataset[줄][칸] === 1){
                    return;
                }
                e.currentTarget.classList.add('opened');
                연칸++;
                //var x = [-1,-1,0,1,1,1,0,-1];
                //var y = [0,-1,-1,-1,0,1,1,1];
                if(dataset[줄][칸] === 'X'){
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패 ㅠㅠ';
                    중단flag = true;
                }
                else{
                    var 지뢰갯수 = 0;
                    /*for(var k=0; k<8; k++){
                        var dx = 줄+y[k];
                        var dy = 칸+x[k];
                        if(dx>=0 && dy>=0 && dx<ver && dy<hor){
                            if(dataset[dx][dy] === 'X')
                                지뢰갯수++;
                        }
                    }*/
                    var 주변 = [dataset[줄][칸-1], dataset[줄][칸+1]];
                    dataset[줄][칸] = 1;
                    if(dataset[줄-1]){
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                    }
                    if(dataset[줄+1]){
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }
                    지뢰갯수 = 주변.filter(function(y){
                        return y ==='X';
                    }).length;
                    // 거짓인 값 기본 : false, 0, undefined, null, NAN 등
                    e.currentTarget.textContent = 지뢰갯수 || '';
                    if(지뢰갯수 === 0){
                    //주변 8칸 동시 오픈(재귀 함수)
                        var 주변칸 = [];
                        if(tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1]
                            ])
                        }
                        주변칸 = 주변칸.concat([
                        tbody.children[줄].children[칸-1],
                        tbody.children[줄].children[칸+1],
                        ]);
                        if(tbody.children[줄+1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1]
                            ])
                        }
                        주변칸.filter(function(v) {return !!v}).forEach(function(옆칸){
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            if(dataset[옆칸줄][옆칸칸] === 0){
                                옆칸.click();
                            }
                        });
                    }
                }
                if(연칸 === hor*ver-mine){
                    중단flag = true;
                    document.querySelector('#result').textContent = '성공하셨습니다.';
                }
            })
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //지뢰 심기
    for(var k=0; k<셔플.length; k++){
        var 행 = Math.floor(셔플[k]/hor); //배열 시작 0부터임
        var 열 = 셔플[k] % hor;
        tbody.children[행].children[열].textContent = 'X';
        dataset[행][열] = 'X';
    }
});


tbody.addEventListener('contextmenu', function(e){
    console.log('커런트타겟', e.currentTarget);
    console.log(e.target);
})