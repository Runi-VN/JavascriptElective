const {getSecureRandoms} = require('./SecureRandomModule');
/*
Exercise 1, d:
d) Create a new file and test the module, like so:
*/

//First, using plain promises
let testArray = [48, 36, 24, 16, 8];
getSecureRandoms(testArray).then(result => console.log(result));

//after that, using async/await
async function testApp() {
	let result = await getSecureRandoms(testArray);
	console.log(result);
}
testApp();
