//run with npm test
var expect = require('chai').expect;
const modular = require('../app/modular');

function getFileData(dir, ext) {
	return new Promise((resolve, reject) => {
		result = modular(dir, ext, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

describe('Test async readDir/MakeItModular - .md extension', async () => {
	it('Check: File count', async function() {
		const myData = await getFileData('./folder', 'md');
		expect(myData, 'Amount of files check').to.have.lengthOf(7);
	});

	it('Check: File order, contents', async function() {
		const expected = [
			'file copy 2.md',
			'file copy 3.md',
			'file copy 4.md',
			'file copy 5.md',
			'file copy 6.md',
			'file copy.md',
			'file.md'
		];
		const myData = await getFileData('./folder', 'md');
		expect(myData, 'File contain + order check').to.deep.equal(expected);
	});
});

describe('Test async readDir/MakeItModular - .txt extension', async () => {
	it('Check: File count', async function() {
		const myData = await getFileData('./folder', 'txt');
		expect(myData, 'Amount of files check').to.have.lengthOf(3);
	});

	it('Check: File order, contents', async function() {
		const expected = ['wrongfile copy 2.txt', 'wrongfile copy.txt', 'wrongfile.txt'];
		const myData = await getFileData('./folder', 'txt');
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
