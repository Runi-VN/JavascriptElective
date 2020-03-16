//run with npm test
var expect = require('chai').expect;
const modular = require('../app/modular');
const fs = require('fs-extra');

function getFileData(dir, ext) {
	return new Promise((resolve, reject) => {
		result = modular(dir, ext, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

describe('EXTENDED Test async readDir/MakeItModular - .js extension', async () => {
	const _DIR = './temp/';
	const _EXT = 'js';
	let myData;

	before(function() {
		// runs once before the first test in this block
		fs.mkdirSync(_DIR);
		console.log('MOCHA: Directory created');
		fs.writeFileSync(_DIR + 'file1.js');
		fs.writeFileSync(_DIR + 'file2.js');
		fs.writeFileSync(_DIR + 'file3.js');
		fs.writeFileSync(_DIR + 'file4.js');
		fs.writeFileSync(_DIR + 'file5.js');
		console.log('MOCHA: Files written');
	});

	after(function() {
		// runs once after the last test in this block
		fs.removeSync(_DIR);
		console.log('MOCHA: Directory deleted');
	});

	beforeEach(async function() {
		myData = await getFileData(_DIR, _EXT);
	});

	it('Check: File count', async function() {
		//const myData = await getFileData(_DIR, _EXT);
		expect(myData, 'Amount of files check').to.have.lengthOf(5);
	});

	it('Check: File order, contents', async function() {
		//const myData = await getFileData(_DIR, _EXT);
		const expected = ['file1.js', 'file2.js', 'file3.js', 'file4.js', 'file5.js'];
		expect(myData, 'File contain + order check').to.deep.equal(expected);
	});
});

/*
//////OLD WAY\\\\\\
it('Amount of files', async function() {
		const myData = await getFileData('./folder', 'md');
		modular('./folder', 'md', (err, data) => {
			if (err) console.log('an error happened: ', err);
		expect(myData, 'Amount of files check').to.have.lengthOf(7);
		});
	});
*/
