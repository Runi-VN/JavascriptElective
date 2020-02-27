"use strict";
//b) Create a function that takes an IBook instance and test it with an object instance.
function test_ibook_isObj(item) {
    console.log(`Is our iBook an object?: ${typeof item === 'object'}\n ${JSON.stringify(item, null, 4)}`);
    //return isObject(obj); //requires import from util
}
const test_ibook = {
    title: 'test book',
    author: 'Hans Hansen',
    published: new Date(Date.now()),
    pages: 500
};
console.log('If I can print this object then it must be an iBook implementation.');
test_ibook_isObj(test_ibook);
//c) Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.
/*
If it walks like a duck, swims like a duck and it quacks like a duck, then it must be a duck

Our object resembles the interface so much that it _must_ be an instance of our interface.
This is proven in the function that _only_ takes an iBook instance.

Detailed answer here: https://stackoverflow.com/a/50118547
*/
//d) Change the interface to make published and pages become optional - Verify the new behaviour.
const optional_entries_ibook = {
    title: 'test book 2',
    author: 'Ny Forfatter'
};
console.log('\n\n\rNotice missing date and page count:');
test_ibook_isObj(optional_entries_ibook);
//e) Change the interface to make author readonly - Verify the new behaviour.
//optional_entries_ibook.author = 'Anders And'; //Not allowed
/*
Only way to verify this is by enforcing the iBook type on our instance.
If we changed the author without having iBook enforced, the object simply wouldn't be an iBook anymore.
*/
//f) Create a class Book and demonstrate the "Java way" of implementing an interface.
//ES6 way(?)
class Book {
    constructor(
    //can take iBook?
    _title, _author, _published, _pages) {
        this._title = _title;
        this._author = _author;
        this._published = _published;
        this._pages = _pages;
    }
    get title() { return this._title; }
    set title(new_title) { this._title = new_title; }
    get author() { return this._author; }
    //set author(new_author: string) { this._author = new_author; } //readonly
    get published() { return this._published; } //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    set published(new_pub) { this._published = new_pub; }
    get pages() { return this._pages; }
    set pages(new_pages) { this._pages = new_pages; }
}
let test_book = new Book("BookTitle", "BookAuthor");
console.log('Testing if Book is iBook (w/ optional values)');
test_ibook_isObj(test_book);
console.log('Testing setter methods on same book');
test_book.published = new Date('2019-12-24');
test_book.pages = 750;
test_ibook_isObj(test_book);
//"Java" way (Difference in methods & constructor.):
class JavaBook {
    constructor(_title, _author, _published, _pages) {
        this._title = _title;
        this._author = _author;
        this._published = _published;
        this._pages = _pages;
        this.title = _title;
        this.author = _author;
        this.published = _published;
        this.pages = _pages;
    }
    getTitle() { return this._title; }
    setTitle(new_title) { this._title = new_title; }
    getAuthor() { return this._author; }
    //setAuthor(new_author: string) { this._author = new_author; } //readonly
    getPublished() { return this._published; } //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    setPublished(new_pub) { this._published = new_pub; }
    getPages() { return this._pages; }
    setPages(new_pages) { this._pages = new_pages; }
}
let test_java_book = new Book("JavaBookTitle", "JavaBookAuthor");
console.log('Testing if JavaBook is iBook (w/ optional values)');
test_ibook_isObj(test_java_book);
console.log('Testing setter methods on same book');
test_java_book.published = new Date('1970-03-10');
test_java_book.pages = 15;
test_ibook_isObj(test_java_book);
//# sourceMappingURL=ex2_interfaces1.js.map