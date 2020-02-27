//Generics

//a) Implement a generic function which will take an array of any kind,
// and return the array reversed (just use the built-in reverse function), 
//so the three first calls below will print the reversed array, and the last call will fail.

function reverseArr<T>(arr: T[]) {
    return arr.reverse()
}

console.log(reverseArr<string>(["a", "b", "c"]));
console.log(reverseArr<number>([1, 2, 3]));
console.log(reverseArr<boolean>([true, true, false]));
//console.log(reverseArr<number>(["a", "b", "c"])); //Actually works compiled, but yeah

//b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:

class DataHolder<T> {
    private _value: T
    constructor(value: T) {
        this._value = value
    }
    set value(new_value: T) { this._value = new_value }
    get value() { return this._value }
}
let d = new DataHolder<string>("Hello");
console.log(d.value);
d.value = "World";
console.log(d.value);

let d2 = new DataHolder<number>(123);
console.log(d2.value);
//Verify that once created, an instance can only be used with the type it was created from.
//d2.setValue('500'); //Not allowed
d2.value = 500;
console.log(d2.value);

//c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods
