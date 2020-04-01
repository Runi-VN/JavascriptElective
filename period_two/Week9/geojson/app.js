const express = require('express');
const app = express();
const gju = require('geojson-utils');
const {gameArea, players} = require('./gameData');

app.get('/', (req, res) => res.send('Geo Demo!'));

//Check whether the caller is located in the Game Area
app.get('/geoapi/isuserinarea/:lon/:lat', (req, res) => {
	const longitude = req.params['lon'];
	const latitude = req.params['lat'];
	status = gju.pointInPolygon({type: 'Point', coordinates: [longitude, latitude]}, gameArea);
	res.send({longitude, latitude, status});
});

//Find Players near the caller
app.get('/geoapi/findNearbyPlayers/:lon/:lat/:rad', (req, res) => {
	const longitude = req.params['lon'];
	const latitude = req.params['lat'];
	const radius = req.params['rad'];
	const center = {
		type: 'Point',
		coordinates: [longitude, latitude]
	};

	res.send(players.filter(player => gju.geometryWithinRadius(player.geometry, center, radius)));
	//let nearbyPlayers = [];

	// for (let i in players) {
	// 	if (gju.geometryWithinRadius(players[i].geometry, center, radius)) {
	// 		nearbyPlayers.push(players[i]);
	// 	}
	// }

	//res.send(nearbyPlayers);
});

//Find Distance between caller, and another player
app.get('/geoapi/distanceToUser/:lon/:lat/:username', (req, res) => {
	const longitude = req.params['lon'];
	const latitude = req.params['lat'];
	const username = req.params['username'];

	const requestee = {type: 'Point', coordinates: [longitude, latitude]};
	const otherPlayer = players.find(player => player.properties.name == username);

	if (otherPlayer) {
		res.send({
			distance: gju.pointDistance(requestee, otherPlayer.geometry),
			to: username
		});
	} else res.status(404).send({msg: 'User not found'});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
