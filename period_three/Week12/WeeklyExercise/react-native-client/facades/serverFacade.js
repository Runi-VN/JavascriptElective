import {SERVER_URL} from '../settings';

ServerFacade = () => {
	async function fetchNearbyPlayers(userName, password, lat, lon, radius_to_search) {
		const payload = {userName, password, lon, lat, distance: Number(radius_to_search)};
		console.log(payload);
		console.log(`${SERVER_URL}/gameapi/nearbyplayers`);
		console.log(typeof radius_to_search);
		const res = await fetch(`${SERVER_URL}/gameapi/nearbyplayers`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {'Content-Type': 'application/json'},
		});
		const result = await res.json();
		console.log('result', result);
		return result;
	}
	// async function fetchGameArea() {
	// 	const res = await fetch(`${SERVER_URL}/geoapi/gamearea`).then((res) => res.json());
	// 	return res.coordinates;
	// }

	// async function isUserInArea(lon, lat) {
	// 	const status = await fetch(`${SERVER_URL}/geoapi/isuserinarea/${lon}/${lat}`).then((res) =>
	// 		res.json()
	// 	);
	// 	return status;
	// }

	return {
		// fetchGameArea,
		// isUserInArea,
		fetchNearbyPlayers,
	};
};

export default ServerFacade();
