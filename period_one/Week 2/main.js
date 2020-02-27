//Used for testing as required by assignment
const osinfo = require('./ex1_OSInfo');
const dos = require('./ex2_dosDetector');

//Exercise 1
console.log(osinfo.info());

//Exercise 2

const timeLimit = 2000;
const dos_detector = new dos.dos(timeLimit);

dos_detector.on('dos', e => {
	console.log(`Multiple requests within timelimit of ${timeLimit}. Info:\n`, e);
});

dos_detector.addUrl('https://www.dr.dk/');

for (let index = 0; index < 10; index++) {
	setTimeout(() => {
		dos_detector.addUrl('https://www.dr.dk/');
	}, timeLimit - Math.random() * (1500 - 200) + 200);
}

// setTimeout(() => {
//   dos_detector.addUrl('https://www.dr.dk/');
// }, timeLimit - 200);
