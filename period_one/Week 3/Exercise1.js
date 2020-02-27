/*
1 Wrap a callback implementation in a promise based implementation
In this exercise you must wrap a callback based design, in a promise, so you can use it with the .then notation and also with async/await
In this exercise you must create a design to produce an object with 6 secure randoms as sketched below:
{
  "title": "6 Secure Randoms",
  "randoms": [
    {"length": 48,"random": "A string with 48 random hex-characters"},
    {"length": 40,"random": "A string with 40 random hex-characters"},
    {"length": 32,"random": "A string with 32 random hex-characters"},
    {"length": 24,"random": "A string with 24 random hex-characters"},
    {"length": 16,"random": "A string with 16 random hex-characters"},
    {"length": 8,"random":  "A string with 8 random hex-characters"}
  ]
}

The 6 strings must be presented in the order given above.

You must use Nodes built in crypto module (the asynchronous version of the function)
*/
const crypto = require('crypto');
function getHex(size, callback) {
	cb = callback;
	crypto.randomBytes(size, function(err, buffer, cb) {
		if (err) throw err;
		dat = buffer.toString('hex');
		callback(dat);
		return dat;
	});
}

let returnObject = undefined;
function getSecureRandoms(requestArray, callback) {
	//idk about callbacks

	returnObject = {
		title: `${requestArray.length} secure randoms`,
		randoms: []
	};
	requestArray.forEach(element => {
		getHex(element, hex =>
			returnObject.randoms.push(
				{length: element, random: hex},
				console.log(returnObject)
			)
		);
	});
	//return returnObject;
}

/*
a) First implement the functionality without promises, using callbacks.

Hint: You don't have to complete this implementation, 
but implement it for the first 2-3 numbers so you have an example of the "pyramid of doom". 
Also consider the code if you were asked to produce 100 randoms ;-)
*/
//let result = getSecureRandoms([48, 40, 32, 24, 16, 8]);
//console.log(result);

/*
b) Use Promises to solve the problem.
Hints: 
Create a function makeSecureRandom(size) that returns a promise, using the callback based design,provided by the randomBytes(..) method.
Since the result from one calculation does not influence the next (only order matters), use Promise.all(..) to execute the operations in parallel.

Extra: You could refine what you have created to instead take an array
*/
function makeSecureRandom(requestArray) {
	let crypto = require('crypto');
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
async function app() {
	let result = makeSecureRandom([48, 40, 32, 24, 16, 8]);
	return Promise.all(result).then(result => console.log(result));
}
app();

/*
c) Refactor your solution into a module and export it
*/

//see SecureRandomModule.js

require('crypto').randomBytes(48, function(err, buffer) {
	let secureHex = buffer.toString('hex');
	console.log(secureHex); //Add to object instead as requested
	require('crypto').randomBytes(40, function(err, buffer) {
		let secureHex = buffer.toString('hex');
		console.log(secureHex); //Add to object instead as requested
		require('crypto').randomBytes(32, function(err, buffer) {
			let secureHex = buffer.toString('hex');
			console.log(secureHex); //Add to object instead as requested
			require('crypto').randomBytes(24, function(err, buffer) {
				let secureHex = buffer.toString('hex');
				console.log(secureHex); //Add to object instead as requested
				require('crypto').randomBytes(16, function(err, buffer) {
					let secureHex = buffer.toString('hex');
					console.log(secureHex); //Add to object instead as requested
					require('crypto').randomBytes(8, function(err, buffer) {
						let secureHex = buffer.toString('hex');
						console.log(secureHex); //Add to object instead as requested
					});
				});
			});
		});
	});
});
