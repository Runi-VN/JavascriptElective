const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://dev:ax2@fullstack-rykz3.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function mongoTest() {
	try {
		await client.connect();
		const dogs = client.db('kennel');
		const dogsCollection = dogs.collection('dogs');
		await dogsCollection.insertMany([
			{name: 'Togo'},
			{name: 'Fido'},
			{name: 'Tut', race: 'nice dog'}
		]);
		await dogsCollection.insertOne({name: 'Fido2'});

		//Extract again to confirm success
		const allDogs = await dogsCollection.find({}).toArray();
		console.log(allDogs);
	} catch (error) {
		console.log(error);
	} finally {
		client.close();
		console.log('Finished');
	}
}
mongoTest();
