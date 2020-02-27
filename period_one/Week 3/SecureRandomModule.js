let crypto = require('crypto');
function makeSecureRandom(requestArray) {
	let promiseArray = [];
	requestArray.forEach(element => {
		let myPromise = new Promise((resolve, reject) => {
			crypto.randomBytes(element, function(err, buffer) {
				if (err) reject(err);
				resolve({length: element, random: buffer.toString('hex')});
			});
		});
		promiseArray.push(myPromise);
	});

	return promiseArray;
}
async function getSecureRandoms(arrayInput) {
	let result = makeSecureRandom(arrayInput);
	return Promise.all(result).then(result => result);
}

module.exports.getSecureRandoms = getSecureRandoms;
