const express = require('express'); // express genarator가 자동으로 express 패키지를 넣어줌
const { HttpError } = require('http-errors');
const app2 = express(); // app 객체를 만듬
const logger = require('morgan');
var cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser'); 내장 되어서 이젠 필요 X
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const indexRouter = require('./routes/index'); // index 생략 가능
const usersRouter = require('./routes/users');
// app2.use(logger('dev'), express.static(path.join(__dirname, 'public')), express.json(), express.urlencoded({ extended: false }))
// 이렇게 연달아 app.매서드(미들웨어, 미들웨어, ...) 가능

app2.set('views', path.join(__dirname, 'views'));
app2.set('view engine', 'pug'); // pug는 html을 대체하는 것을 view에 장착해줌

app2.use(logger('dev')); // logger미들웨어는 라우터에 왔을 때, res.send를 보냈을 때 요청과 응답을 기록 ex) GET /304.27. ..
// 남들이 만든 미들웨어, 미들웨어는 순서가 중요함.
//use는 미들웨어를 app에다 연결 시켜주는 매서드 (use는 모든 경우에 다 연결되는 미들웨어임)
//GET, POST, DELETE는 GET,POST요청들에만 걸리는 미들웨어를 장착함. 주소가 붙으면 그 주소와 일치하는 요청에만 걸림
app2.use(express.static(path.join(__dirname, 'public'))); // 내장 express 정적파일 보관 : public 안의 것들을 가져옴. 원하는 파일이 없을 때 next
app2.use(express.json()); // 내장
app2.use(express.urlencoded({ extended: false })); // 내장 express
app2.use(cookieParser('secret code')); // 남들이 만든 미들웨어 쿠키를 파싱해주는 미들웨어. 쿠키를 활성화
// 쿠키가 클라이언트에 저장 됨. 서버가 응답으로 send 보내면 클라이언트가 저장함. 그 쿠키가 서버가 저장하라는건지 위조된건지
// 확인하는 비밀 키가 필요함. 키와 쿠키가 같이 오면 거절하고, (일종의 비밀번호)
app2.use(
    session({
        // 구조를 외워봐야함. 메모리 세션이라도 쿠키를 쓰니 secret code 해줌
        resave: false, // 요청이 들어 올 때 마다 달라진 부분 없어도 재 저장함. 낭비임.
        saveUninitialized: false, // 처음의 빈 세션 객체라도 저장을 할 지
        secret: 'secret code', // 세션아이디도 쿠키로함.
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
); // 나중 passport쓸땐 session 보다 아래에 있어야 인식함 순서 중요. 메모리 세션을 활성화함
app2.use(flash()); // 만약 로그인을 실패 했을 때, 팝업 메세지가 1회용으로 뜨는데(본인 인증 불일치 메세지 등). 뜨는 것

// app.get() app.post() 등 여러개 할 수 있는데 왜 라우터 씀? > /list, /post 등등 여러개가 올 수 있음 1000줄 넘게 올 수도 있음
// 너무길어지면 지저분함.
app2.use((req, res, next) => {
    // next를 호출해야 다음 미들웨어로 감
    // req.on('data') 원래는 이걸 썼었는데 bodyParser 쓰면 알아서 해줌
    // req.on('end')
    console.log('첫 번째 미들웨어');
    next();
    /*if (+new Date() % 2 === 0) {
        next();
    } else {
        res.send('50% 당첨'); // statuse 기본값은 200이라 생략함 붙이는 습관 좋음
    } 이런 조건문 가능*/
});
app2.use((res, req, next) => {
    console.log('두 번째 미들웨어');
    next();
});

app2.use('/', indexRouter); // app.use('/abc') + router.get('/df') = GET/abc/df 합쳐진 거라 보면 됨 app.use('/') + router.post('/') = POST/
app2.use('/users', usersRouter);

//위의 주소들에 걸리지 않는다면, 하염없이 기다림.. 실제로는 timeout > 404 not FOUND
app2.use((req, res, next) => {
    res.status(404).send('NOT FOUND'); // http 상태 404로 만들고, NOT FOUND 적기. express에서는 writeHead 대신 status씀
}); // 브라우저에서 사람들이 주소를쳐서 내는 client쪽에서 하는 에러

//500번대 에러
app2.use((err, req, res, next) => {
    // 서버에서 나는 에러
    console.error(err);
    res.status(500).send('SERVER ERROR');
});

module.exports = app2; // 하나의 모듈로 만들어서 export함
