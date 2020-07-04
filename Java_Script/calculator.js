while (1) {
    var num1 = Math.ceil(Math.random() * 9) + 1
    var num2 = Math.ceil(Math.random() * 9) + 1
    var result = num1 * num2
    while (1) {
        var answer = prompt(String(num1) + '곱하기' + String(num2) + '는?')
        if (result === Number(answer)) {
            alert("딩동댕");
            break;
        }
        else {
            alert("땡");
        }
    }
}