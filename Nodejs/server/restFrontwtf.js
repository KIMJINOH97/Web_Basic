// GET 주소(www.zerocho.com/users)
// 제로초 닷컴의 사용자를 가져오는 것
// POST 주소(www.zerocho.com/users)
// 게시물을 가져오는 것
// PUT 주소(www.zerocho.com/users/1)
// 1번 유저를 수정하다
// PATCH  주소(www.zerocho.com/users/2)
// 2번 유저의 부분 수정
// DELETE  주소(www.zerocho.com/users/5)
// 5번 사용자를 지우다

async function getUser() {
    // 로딩 시 사용자 가져오는 함수
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        //사용자 마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                //수정 버튼 클릭
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name) {
                    return alert('이름을 반드시 입력하셔야 합니다.');
                }
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                // 삭제 버튼 클릭
                try {
                    await axios.delete('/user/' + key);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            userDiv.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (err) {
        console.error(err);
    }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요.');
    }
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});
