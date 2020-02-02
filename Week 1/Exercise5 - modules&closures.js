/*
1) Implement and test the Closure Counter Example from today's lecture
*/

console.log(
	"Already done before and I don't remember 'todays' lecture as it was 5 days ago"
);

/*
2) Implement a reusable function using the closure feature, 
that should encapsulate information about a person (name, and age) and returns an object with the following methods:
setAge
setName
getInfo (should return a string like Peter, 45)
*/

let person = function() {
	//private
	var age;
	var name;
	function getInfo() {
		return name + ', ' + age;
	}
	function setAge(newAge) {
		age = newAge;
	}
	function setName(newName) {
		name = newName;
	}
	return {
		//public
		setAge,
		setName,
		getInfo
	};
};

let testPerson = person(); //no constructor
testPerson.setName('Peter');
testPerson.setAge(45);
console.log(testPerson.getInfo()); //Peter, 45

/*
3) Implement an ES6 class with a similar functionality as requested in part 2.
Don't use getXX or setXX but use ES6 properties

https://youtu.be/FkTgvvYjuUo?t=540
*/

class Person {
	constructor(age, name) {
		this._age = age;
		this._name = name;
	}
	getInfo = function() {
		return `${this._name}, ${this._age}`;
	};

	get age() {
		return this._age;
	}

	set age(newAge) {
		this._age = newAge;
	}

	get name() {
		return this._name;
	}

	set name(newName) {
		this._name = newName;
	}
}

const peter = new Person(45, 'Peter');
console.log(peter.getInfo()); //Peter, 45
