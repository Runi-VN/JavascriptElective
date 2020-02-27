export {}; //Fixes flaw with fetch import. TS throws an error: https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
// 1) Verify that you can use Node modules by requiring one of nodes built-in modules
let http = require('http');

// 2)Verify that you can use external node-modules, for example by using node-fetch:
const fetch = require('node-fetch');
