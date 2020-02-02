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
