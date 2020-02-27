const http = require('http');
const url = require('url');
const {getSecureRandoms} = require('./SecureRandomModule');

//Set up server
const server = http.createServer((req, res) => {
	if (req.url === '/api/getrandoms') {
		res.setHeader('Content-Type', 'application/json');
		//IIFE
		(async () => {
			const requestArray = [48, 40, 32, 24, 16, 8];
			let returnObject = {
				title: `${requestArray.length} secure randoms`
			};
			let result = await getSecureRandoms(requestArray);
			returnObject.randoms = result;
			res.write(JSON.stringify(returnObject, null, '\t')); //or 2
			return res.end();
		})();
	}
	if (req.url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write(`<h2>Simple node HTTP server demo</h2>
	  <p>Exposes this endpoint <a href="/api/getrandoms"><code>/api/getrandoms</code></a></p>`);
		return res.end();
	}
});

server.listen(3000);
console.log('listening on 3000');
