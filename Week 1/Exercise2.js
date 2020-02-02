/*
2) Implement user defined functions that take callbacks as an argument
Assume the JavaScript-array did not offer the filter method. Then you could implement it by yourself. 
a) Implement a function: myFilter(array, callback)that takes an array as the first argument, and a callback as the second.
Returns a new (filtered) array according to the code provided in the callback (that is with the same behaviour as the original filter method).

*/

const testArray = [...Array(1001).keys()]; //Array 0-1000

function myFilter(array, callback) {
	let result = [];
	array.forEach(element => {
		if (callback(element)) result.push(element);
	});
	return result;
}

let test_above = myFilter(testArray, element => {
	return element > 940;
});
console.log(test_above); //941-1000

let test_below = myFilter(testArray, element => {
	return element < 62;
});
console.log(test_below); //0-61

let test_range = myFilter(testArray, element => {
	return element > 10 && element < 25;
});

/*
Test the method with the same array and callback as in the example with the original filter method.
*/
console.log('myFilter', test_range); //11-24

console.log(
	'actual filter',
	testArray.filter(element => element > 10 && element < 25)
); //11-24
console.log('-----------^Implementing .filter()^-----------');
/*
b) Implement a function: 
myMap(array, callback)that, provided an array and a callback, 
provides the same functionality as calling the existing map method on an array.
*/

const testArray_short = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function myMap(array, callback) {
	let result = [];
	array.forEach(element => {
		result.push(callback(element));
	});
	return result;
}

let test_multiplication = myMap(testArray_short, element => {
	return element * 2;
});
console.log(test_multiplication); //2,4,6,8,10,12,14,16,18,20

let test_exponentiate_self = myMap(testArray_short, element => {
	return Math.pow(element, element);
});
console.log(test_exponentiate_self); //1,4,27,256,3125,46656,823543,16777216,387420489,10000000000

/*
Test the method with the same array and callback as in the example with the original map method.
*/
let test_subtract_by_2 = myMap(testArray_short, element => {
	return element - 2;
});
console.log('myMap', test_subtract_by_2); //-1,0,1,2,3,4,5,6,7,8
console.log(
	'actual map',
	testArray_short.map(element => element - 2)
); //-1,0,1,2,3,4,5,6,7,8

console.log('-----------^Implementing .map()^-----------');
