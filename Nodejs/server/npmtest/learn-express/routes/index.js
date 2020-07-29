var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('test2', {
        title3: 'ㅋㅋ',
        fruits: ['사과', '배', '오렌지'],
    });
    // res.sendFile(html 파일경로); 가능 단점: 조건문 X 이를 극복 > 템플릿 엔진
    //res.render('index', { title: 'Express' });
    /*try {
        throw new Error('서버를 고장내주마');
    } catch (error) {
        next(error); // 다음 미들웨어를 다 건너뛰고 에러처리 미들웨어로 이동함.
    }*/
});

// http.createServer(app) 으로 만들 수도 있음
router.get('/', (req, res) => {
    //next 할 수 있는데 안 한거라 여기서 끝나버림 실제로 next하지않고 res 매서드도 사용하지 않으면 클라이언트 무한로딩(실제로는 timeout까지)
    console.log('세 번째 미들웨어');
    res.send('hello express');
});

router.post('/', (req, res) => {});

module.exports = router;
