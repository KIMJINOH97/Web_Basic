var word = prompt("단어를 입력하세요.")
while (1) {
    var connect = prompt(word)
    if (connect[0] === word[word.length - 1]) {
        alert("딩동댕");
        word = answer;
    }
    else {
        alert("땡");
    }
}