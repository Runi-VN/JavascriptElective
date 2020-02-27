const fs = require('fs');

const buf = fs.readFileSync(process.argv[2]);

const buffToString = buf.toString();

const splitArray = buffToString.split('\n');

console.log(splitArray.length - 1); //1 too many
