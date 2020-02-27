"use strict";
//Generics
//a) Implement a generic function which will take an array of any kind,
// and return the array reversed (just use the built-in reverse function), 
//so the three first calls below will print the reversed array, and the last call will fail.
function reverseArr(arr) {
    return arr.reverse();
}
console.log(reverseArr(["a", "b", "c"]));
console.log(reverseArr([1, 2, 3]));
console.log(reverseArr([true, true, false]));
//console.log(reverseArr<number>(["a", "b", "c"])); //Actually works compiled, but yeah
//b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:
class DataHolder {
    constructor(value) {
        this._value = value;
    }
    set value(new_value) { this._value = new_value; }
    get value() { return this._value; }
}
let d = new DataHolder("Hello");
console.log(d.value);
d.value = "World";
console.log(d.value);
let d2 = new DataHolder(123);
console.log(d2.value);
//Verify that once created, an instance can only be used with the type it was created from.
//d2.setValue('500'); //Not allowed
d2.value = 500;
console.log(d2.value);
//c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods
//# sourceMappingURL=ex5_generics.js.map