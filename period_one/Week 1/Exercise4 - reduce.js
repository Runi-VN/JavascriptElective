/*
reduce is used to reduce an array into a single item (a number, string, object, etc). 
This is a very common problem in all languages. 
For some specific problems, so common that
the array actually has a specific “reduce” function called join, which can reduce an array into a string separated by whatever we choose.
*/
const all = ['Lars', 'Peter', 'Jan', 'Bo'];

//a) Use join to create a single string from all, with names: comma-, space. and  # - separated.
var allJoin = all.join(' ');
console.log(allJoin);
var allJoin = all.join(', ');
console.log(allJoin);
var allJoin = all.join('#');
console.log(allJoin);

/*
b) Given this array: <>
Create a reducer function that will return the sum (105) of all values in numbers
*/
const numbers = [2, 3, 67, 33];

function reducer_getSum(acc, val) {
	return acc + val;
}
console.log(numbers.reduce(reducer_getSum)); //105

/*
c) Given this array:
<>
Create a reducer function that will return the average age of all members.
*/
let members = [
	{name: 'Peter', age: 18},
	{name: 'Jan', age: 35},
	{name: 'Janne', age: 25},
	{name: 'Martin', age: 22}
];

function reducer_getAverage(acc, val, index, array) {
	//val = value | element
	acc += val.age;
	if (index === array.length - 1) {
		return acc / array.length;
	}
	return acc;
}

console.log(members.reduce(reducer_getAverage, 0)); //25
//initialValue = 0. Otherwise we "hook" onto the whole object {name/age}

/*
d)       Imagine you were to create a system that could count votes for the presidential election in USA.
Given this array of votes: 
<>
Create a reduce function that will return a single object like {Clinton: 3, Trump: 4, None: 1 }
*/
let votes = [
	'Clinton',
	'Trump',
	'Clinton',
	'Clinton',
	'Trump',
	'Trump',
	'Trump',
	'None'
];

function reducer_votes(acc, val) {
	if (!acc[val]) acc[val] = 1;
	//if targeted vote doesn't exist, initialize as key:value (object) with value 1
	else acc[val] += 1; //if targeted vote exists, add 1 to its value
	return acc;
}
console.log(votes.reduce(reducer_votes, {})); //{ Clinton: 3, Trump: 4, None: 1 }
//initialValue empty object
