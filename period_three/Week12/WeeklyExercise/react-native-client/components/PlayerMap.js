import React, {useState, useEffect, useRef} from 'react';
import {Platform, Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Constants from 'expo-constants';
import facade from '../facades/serverFacade';

import MyButton from '../components/myButton';

//const SERVER_URL = 'https://1bf1238a.ngrok.io'; //in settings.js

export default PlayerMap = ({user, locationHandler, nearbyPlayers}) => {
	//HOOKS
	const [position, setPosition] = useState({latitude: null, longitude: null});
	const [errorMessage, setErrorMessage] = useState(null);
	const [gameArea, setGameArea] = useState([]);
	const [region, setRegion] = useState(null);
	const [serverIsUp, setServerIsUp] = useState(false);
	const [status, setStatus] = useState('');
	let mapRef = useRef(null);

	useEffect(() => {
		if (errorMessage) console.log(errorMessage);
	}, [errorMessage]);

	// useEffect(() => {
	// 	getGameArea();
	// }, []);

	useEffect(() => {
		getLocationAsync();
	}, []);

	useEffect(() => {
		locationHandler(position.latitude, position.longitude);
	}, [position]);

	// async function getGameArea() {
	// 	//Fetch gameArea via the facade, and call this method from within (top) useEffect
	// 	try {
	// 		const area = await facade.fetchGameArea();
	// 		setGameArea(area);
	// 		setServerIsUp(true);
	// 	} catch (err) {
	// 		setErrorMessage('Could not fetch GameArea');
	// 	}
	// }

	getLocationAsync = async () => {
		//Request permission for users location, get the location and call this method from useEffect

		let {status} = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			setErrorMessage('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
		setPosition({latitude: location.coords.latitude, longitude: location.coords.longitude});
		setRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

	/*
  When a press is done on the map, coordinates (lat,lon) are provided via the event object
  */
	// onMapPress = async (event) => {
	// 	//Get location from where user pressed on map, and check it against the server
	// 	const coordinate = event.nativeEvent.coordinate;
	// 	const lon = coordinate.longitude;
	// 	const lat = coordinate.latitude;
	// 	try {
	// 		const status = await facade.isUserInArea(lon, lat);
	// 		showStatusFromServer(setStatus, status);
	// 	} catch (err) {
	// 		console.log(err);
	// 		Alert.alert('Error', 'Server could not be reached');
	// 		setServerIsUp(false);
	// 	}
	// };

	// onCenterGameArea = () => {
	// 	// (RED) Center map around the gameArea fetched from the backend
	// 	const latitude = 55.777055745928664;
	// 	const longitude = 12.55897432565689;
	// 	mapRef.current.animateToRegion(
	// 		{
	// 			latitude,
	// 			longitude,
	// 			latitudeDelta: 0.002,
	// 			longitudeDelta: 0.04,
	// 		},
	// 		1000
	// 	);
	// };

	// sendRealPosToServer = async () => {
	// 	//Upload users current position to the isuserinarea endpoint and present result
	// 	const lat = position.latitude;
	// 	const lon = position.longitude;
	// 	try {
	// 		const status = await facade.isUserInArea(lon, lat);
	// 		showStatusFromServer(setStatus, status);
	// 	} catch (err) {
	// 		console.log('MESSAGEHERE', err.message);
	// 		setErrorMessage('Could not get result from server');
	// 		setServerIsUp(false);
	// 	}
	// };

	// const info = serverIsUp ? status : ' Server is not up';
	return (
		<View style={{flex: 1, paddingTop: 20}}>
			{!region && <Text style={styles.fetching}>.. Fetching data</Text>}
			{/* Add MapView */}
			{region && (
				<MapView
					ref={mapRef}
					style={{flex: 14}}
					//onPress={onMapPress}
					mapType="standard"
					region={region}
					showsUserLocation={true}
					showsCompass
					showsMyLocationButton={true}>
					{/*App MapView.Polygon to show gameArea*/}

					{/* {serverIsUp && (
						<MapView.Polygon
							coordinates={gameArea}
							strokeWidth={1}
							// onPress={onMapPress}
							fillColor="rgba(128, 153, 177, 0.5)"
						/>
					)} */}

					{/*App MapView.Marker to show users current position*/}
					{/* <MapView.Marker
					title="You"
					pinColor="blue"
					coordinate={{longitude: position.longitude, latitude: position.latitude}}
				/> */}

					{nearbyPlayers.length > 0 &&
						nearbyPlayers.map((player) => {
							return (
								<MapView.Marker
									key={player.lon + player.lat}
									title={player.userName}
									pinColor="blue"
									coordinate={{longitude: player.lon, latitude: player.lat}}
								/>
							);
						})}
				</MapView>
			)}
			<Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>
				Your position (lat,long): {position.latitude}, {position.longitude}
			</Text>
			{/* <Text style={{flex: 1, textAlign: 'center'}}>{info}</Text> */}
			<Text>{nearbyPlayers.length > 0 && 'Nearby: \n' + JSON.stringify(nearbyPlayers)}</Text>
			<Text>{user && 'Your user: \n' + JSON.stringify(user)}</Text>
			{/* <MyButton style={{flex: 2}} onPressButton={sendRealPosToServer} txt="Upload real Position" /> */}
			{/* <MyButton style={{flex: 2}} onPressButton={() => onCenterGameArea()} txt="Show Game Area" /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	fetching: {
		fontSize: 35,
		flex: 14,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center',
	},
});

function showStatusFromServer(setStatus, status) {
	setStatus(status.msg);
	setTimeout(() => setStatus('- - - - - - - - - - - - - - - - - - - -'), 3000);
}
