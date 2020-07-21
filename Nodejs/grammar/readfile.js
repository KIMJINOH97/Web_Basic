const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    // 콜백으로 받음
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
