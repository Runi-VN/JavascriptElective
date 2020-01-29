const myModule = require('./mymodule');

function app() {
	myModule(process.argv[2], process.argv[3], function callback(err, data) {
		if (err) console.log('an error happened: ', err);
		data.forEach(element => {
			console.log(element);
		});
	});
}
app();
