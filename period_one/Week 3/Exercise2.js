const fetch = require('node-fetch');

/*
2 Chaining promises (fetch requests)
a) with plain promises
Implement a method which for id = 1 (Luke Skywalker) should log this info:
Name: Luke Skywalker
First film: The Empire Strikes Back
First species: Yoda's species
Homeworld for Specie: unknown
*/
const _URL = 'https://swapi.co/api/people/';
const _LUKEID = 1;

function getPlanetforFirstSpeciesInFirstMovieForPerson(id) {
	let person = {};
	fetch(_URL + id)
		.then(res => res.json())
		.then(data => {
			//Luke all data
			person.name = data.name;
			return data.films[0]; //get first film entry
		})
		.then(film_url => fetch(film_url))
		.then(res => res.json())
		.then(data => {
			//Movie all data
			person['First film'] = data.title;
			return data.species[0]; //get first specie entry
		})
		.then(species_url => fetch(species_url))
		.then(res => res.json())
		.then(data => {
			//Specie all data
			person['First species'] = data.name;
			return (
				(Array.isArray(data.homeworld) && data.homeworld[0]) || data.homeworld
			); //get first homeworld entry
		})
		.then(homeworld_url => fetch(homeworld_url))
		.then(res => res.json())
		.then(data => {
			//Homeworld all data
			person['Homeworld for Specie'] = data.name;
		})
		.catch(err => console.log('Error: ', err))
		.finally(() =>
			console.log('Promises Done, data:\n', JSON.stringify(person, null, '\t'))
		);
}
getPlanetforFirstSpeciesInFirstMovieForPerson(_LUKEID);

/*
b) with async/await
Implement a new version,
that should use the much cleaner syntax of async-await
*/

async function getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
	let person = {};
	try {
		const role = await fetch(_URL + id).then(res => res.json());
		const film = await fetch(role.films[0]).then(res => res.json());
		const specie = await fetch(film.species[0]).then(res => res.json());
		const homeworld = await fetch(specie.homeworld).then(res => res.json());
		person.name = role.name;
		person['First film'] = film.title;
		person['First species'] = specie.name;
		person['Homeworld for Specie'] = homeworld.name;
	} catch (err) {
		console.log(err);
	} finally {
		console.log('Async Done, data:\n', JSON.stringify(person, null, '\t'));
	}
}
getPlanetforFirstSpeciesInFirstMovieForPersonAsync(_LUKEID);

//Plain promises
// fetch('http://api.icndb.com/jokes/random')
// 	.then(res => res.json())
// 	.then(data => console.log(data))
// 	.catch(err => console.log('Error: ', err))
// 	.finally(() => console.log('Finally Done'));

// async function asyncDemo() {
// 	try {
// 		const data = await fetch('http://api.icndb.com/jokes/random').then(res =>
// 			res.json()
// 		);
// 		console.log(data);
// 	} catch (e) {
// 		console.log(`UPPS: ${e}`);
// 	} finally {
// 		console.log('Done');
// 	}
// }
// asyncDemo();
