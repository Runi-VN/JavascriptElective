const http = require('http');
const os_info = require('./ex1_OSInfo');
const dos = require('./ex2_dosDetector');

//Set up DoS detection
const timeLimit = 2000;
const dos_detector = new dos.dos(timeLimit);

dos_detector.on('dos', e => {
	console.log(`Multiple requests within timelimit of ${timeLimit}. Info:\n`, e);
});

//Set up server
const server = http.createServer((req, res) => {
	if (req.url === '/api/os-info') {
		res.setHeader('Content-Type', 'application/json');
		//Return a response with OS-info, using the code implemented in part-a
		res.write(JSON.stringify(os_info.info(), null, '\t')); //or 2
		return res.end();
	}
	if (req.url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write(`<h2>Simple node HTTP server demo</h2>
	  <p>Exposes this endpoint <a href="/api/os-info"><code>/api/os-info</code></a></p>
	  <p>(D)DoS messages are console.log()'d</p>`);
		return res.end();
	}
});
server.on('connection', sock => {
	dos_detector.addUrl(sock.remoteAddress);
});
server.listen(3000);
console.log('listening on 3000');
//Register for the "DosDetected" event and console.log the url and time info
