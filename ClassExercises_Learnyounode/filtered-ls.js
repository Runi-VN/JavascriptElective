const fs = require('fs');

fs.readFile(process.argv, 'utf8', (err, data) => {
  if (err) throw err;
  data.
  console.log(data.split('\n').length - 1);
});
