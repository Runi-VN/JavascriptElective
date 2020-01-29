const fs = require('fs');
const path = require('path');

const extension = '.' + process.argv[3]; //provided as "md" instead of ".md". Manual fix.

fs.readdir(process.argv[2], 'utf8', (err, data) => {
	if (err) {
		console.log('error:', err);
	} else {
		data.forEach(element => {
			if (path.extname(element) == extension) console.log(element);
		});
		//console.log(data);
	}
});
