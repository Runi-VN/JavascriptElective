"use strict";
//Interfaces 2 (Function types)
/*
Resource used:
https://www.logicbig.com/tutorials/misc/typescript/interface-describing-function.html
*/
//b) Design a function "implementing" this interface which returns an array with the three strings
let add_to_array = (str1, str2, str3) => {
    return [str1, str2, str3];
};
console.log(add_to_array('hej', 'med', 'dig'));
//c) Design another implementation that returns an array, with the three strings uppercased.
let uppercase_to_array = (str1, str2, str3) => {
    return [str1, str2, str3].map(str => { return str.toUpperCase(); });
};
console.log(uppercase_to_array('hej', 'med', 'dig'));
//d) The function, given below, uses the ES-6 (and TypeScript) feature for destructuring Arrays into individual variables,
// to simulate a method that uses the interface.
let f2 = function logger(f1) {
    //Simulate that we get data from somewhere and uses the provided function
    let [a, b, c] = ["A", "B", "C"];
    console.log(f1(a, b, c));
};
//e) Test f2 with the two implementations created in b+c
console.log('Testing f2 implementation');
f2(add_to_array);
f2(uppercase_to_array);
//f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
//f2((c) => { return c.toLowerCase()] }) //Warns that it -needs- to return an array thanks to myFunc
//# sourceMappingURL=ex3_interfaces2.js.map