const querystring = require('querystring');
const url = require('url');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodjs');
const query = querystring.parse(parsedUrl.query);

console.log('querystring.parse(): ', query);
