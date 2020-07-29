var express = require('express');
var router = express.Router();

/* GET /users/ listing. */
router.get('/', (req, res) => {
    console.log('네 번째 미들웨어');
    res.send('hello users'); // express에서 response 객체에다가 send라는 매서드를 추가해 준것
});

router.get('/posts', (req, res) => {});

router.get('/comments', (req, res) => {});

router.get('/list', (req, res) => {});

router.post('/', (req, res) => {});

/* delete /users/ */
router.delete('/', (req, res) => {});
// router.options 또한 특수한 미들웨어를 연결하는 매서드

module.exports = router;
