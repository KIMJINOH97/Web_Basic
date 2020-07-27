// http, https 등 쓰는 것에 대해 노드가 single thread라는 거에 대해서는 변함 없음.
// single thread는 코어를 하나 쓰겠다는 의미임
// 노는 코어들을 활용하는 법 > cluster

const http = require('http');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length; // 코어가 몇 개인지

if (cluster.isMaster) {
    // master는 일꾼들의 배치, 등 관리 함
    console.log('마스터 프로세스 아이디', process.pid);
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork(); // cpu개수만큼 서버를 만듬
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(worker.process.pid, '워커가 종료되었습니다.');
        cluster.fork();
    });
} else {
    // worker인 경우 즉 실제로 일 하는 사람들
    http.createServer((req, res) => {
        // 서버를 돌림
        res.end('http server');
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8080);
    console.log(process.pid, '워커 실행');
}
