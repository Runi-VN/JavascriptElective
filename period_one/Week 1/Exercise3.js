/*
3) Using the Prototype property to add new functionality to existing objects

Create a new version of the two functions (without the array argument) 
which you should add to the Array prototype property so they can be called on any array as sketched below:
*/

function myFilter(callback) {
	let result = [];
	this.forEach(element => {
		if (callback(element)) result.push(element);
	});
	return result;
}

function myMap(callback) {
	let result = [];
	this.forEach(element => {
		result.push(callback(element));
	});
	return result;
}

//Assigning to array
Array.prototype.myFilter = myFilter;
Array.prototype.myMap = myMap;

//Testing
const testArray_short = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let filter_test = testArray_short.myFilter(element => element >= 5);
console.log(filter_test); //5,6,7,8,9,10

let map_test = testArray_short.myMap(element => element * 3);
console.log(map_test); //3,6,9,12,15,18,21,24,27,30
