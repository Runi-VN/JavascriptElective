const fetch = require('node-fetch');
const URL = 'https://swapi.co/api/people/';
var now = require('performance-now');

/*
3 Async functions in serial and in parallel
 Execution in serial
 Use fetch and async/await to complete fetchPerson(..)below. 
 When implemented, each line in printNames() must be executed “sequentially”. 
 Verify this with the debugger.
*/

//Serial
async function fetchPerson(url) {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}
async function printNames() {
	console.log('Before');
	const person1 = await fetchPerson(URL + '1');
	const person2 = await fetchPerson(URL + '2');
	console.log(person1.name);
	console.log(person2.name);
	console.log('After all');
}
//Calculate time
async function calculateTime(func_to_time) {
	var start = now(); //start timing
	await func_to_time(); //run func
	var end = now();
	console.log(
		`Time to execute ${func_to_time.name} in ms:`,
		(end - start).toFixed(3)
	);
}
calculateTime(printNames);

/*
Execution in parallel
Fix the problem above, so that HTTP-requests are made in parallel.
Measure the time spent the same way as above, to convince yourself that;
 knowing how and when to perform request in serial or parallel is important.
*/

async function printNames_parallel() {
	console.log('Before');
	const promise_1 = fetchPerson(URL + '1');
	const promise_2 = fetchPerson(URL + '2');
	//Since we don't await we have promises
	(await Promise.all([promise_1, promise_2])).forEach(result => {
		console.log(result.name);
	});
	console.log('After all');
}
calculateTime(printNames_parallel);
