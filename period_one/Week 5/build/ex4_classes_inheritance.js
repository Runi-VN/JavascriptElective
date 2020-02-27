"use strict";
//Classes and Inheritance
/*
A) The declaration below defines a Shape class,
which as it's only properties has
a color field
a getArea()
a getPerimeter()
function which both returns undefined. This is the closest we get to an abstract method in Java.

Provide the class with a nice (using template literals) toString() method
a getter/setter for the colour property.

Verify that you cannot (why) make an instance of this class.
*/
class Shape {
    constructor(color) {
        this.toString = () => {
            //Would be cool to make abstract too
            return `Shape with color ${this._color}.`;
        };
        this._color = color;
    }
    get color() { return this._color; }
    set color(new_color) { this._color = new_color; }
}
//const shape_test = new Shape('Yellow'); //not possible
/*
Abstract classes needs to be inherited and implemented. https://stackoverflow.com/a/52358194
*/
//B) Create a new class Circle that should extend the Shape class.
//Provide the class with:
class Circle extends Shape {
    //A constructor that takes both colour and radius.
    constructor(radius, color) {
        super(color);
        this._radius = radius;
        //this.color = color
    }
    //Overwritten versions of the methods defined in the Base
    //Area (A) = π · r^2
    get area() { return Math.PI * Math.pow(this._radius, 2); }
    //Perimeter (P) = 2 · π · r
    get perimeter() { return 2 * Math.PI * this._radius; }
    //Getter/Setter for radius
    get radius() { return this._radius; }
    set radius(value) { this._radius = value; }
}
//Test the class constructor, the getters/setters and the three methods.
const shape_test = new Circle(45, 'Yellow');
console.log('Circle: ', shape_test);
console.log('ToString(): ', shape_test.toString());
console.log('Circle Area: ', shape_test.area);
console.log('Circle Perimeter (Circumference): ', shape_test.perimeter);
//C) Create a new class Cylinder that should extend the Circle class.
//Provide the class with:
class Cylinder extends Circle {
    //A constructor that takes colour, radius and height.
    constructor(color, radius, height) {
        super(radius, color);
        this._height = height;
    }
    //Overwritten versions of relevant methods defined in the Base 
    //Surface Area = 2(π r 2) + (2 π r)* h
    get area() { return 2 * (Math.PI * Math.pow(this.radius, 2) + (2 * Math.PI * this.radius) * this._height); }
    //(getter for perimeter should throw "not implemented")
    get perimeter() { throw new Error("Method not implemented."); }
    //A getVolume() method  (or better, a getter called volume)
    //V = πr^2h
    get volume() { return Math.PI * Math.pow(this.radius, 2) * this._height; }
    //Getter/Setter for height
    get height() { return this._height; }
    set height(value) { this._height = value; }
}
//Test the new class
let test_cylinder = new Cylinder('Red', 22, 4);
console.log('Cylinder: ', test_cylinder);
console.log('ToString(): ', test_cylinder.toString());
console.log('Cylinder Area: ', test_cylinder.area);
console.log('Cylinder Volume: ', test_cylinder.volume);
try {
    console.log('Cylinder Perimeter: ', test_cylinder.perimeter);
}
catch (err) {
    console.log('Perimeter error:', err.message);
}
//# sourceMappingURL=ex4_classes_inheritance.js.map