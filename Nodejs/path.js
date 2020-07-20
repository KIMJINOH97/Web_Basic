const path = require('path');
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.basename(__filename));
console.log(path.parse(__filename));

console.log(
    path.format({
        root: 'C:\\',
        dir: 'C:\\WEB\\Nodejs',
        base: 'path.js',
        ext: '.js',
        name: 'path',
    })
);

console.log(path.normalize('C://WEB//Nodejs//path.js'));

console.log(path.join(__dirname, '..', '..', '/users', '.', '/Nodejs'));
