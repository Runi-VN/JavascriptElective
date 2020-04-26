import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Constants from 'expo-constants';

import LoginModal from './components/LoginModal';
import PlayerMap from './components/PlayerMap';
import FindNearbyPlayers from './components/FindNearbyPlayers';
import MyButton from './components/myButton';
import facade from './facades/serverFacade';

export default function App() {
	const USER_DEFAULT_VALUE = {
		userName: 't1',
		password: 'secret',
		radius: '10000',
		lat: 55.77,
		lon: 12.48,
	};
	const [isLoginMode, setIsLoginMode] = useState(false); //for displaying login modal TODO CHANGE TO TRUE
	const [user, setUser] = useState(USER_DEFAULT_VALUE); //TODO CHANGE
	const [nearbyPlayers, setNearbyPlayers] = useState([]);
	//const [radius, setRadius] = useState('');

	const loginHandler = (userInput) => {
		setUser(userInput);
		//setCourseGoals(() => [...courseGoals, {id: Math.random().toString(), value: goalTitle}]);
		setIsLoginMode(false);
	};

	const locationHandler = (lat, lon) => {
		if ((lat, lon)) setUser((oldUser) => ({...oldUser, lat, lon}));
	};

	const radiusHandler = async (enteredText) => {
		setUser((oldUser) => ({...oldUser, radius: enteredText}));
	};

	useEffect(() => {
		if (user && user.userName && user.password && user.lat && user.lon && user.radius)
			fetchHelper();
	}, [user.radius]);
	const fetchHelper = async () => {
		const result = await facade.fetchNearbyPlayers(
			user.userName,
			user.password,
			user.lat,
			user.lon,
			user.radius
		);
		if (result.code) {
			Alert.alert('Error', JSON.stringify(result));
		} else {
			setNearbyPlayers(result);
		}
	};

	const logOut = () => {
		setUser(USER_DEFAULT_VALUE); //disable to keep data for re-use
		setIsLoginMode(true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.mainInfo}>Created by Rúni</Text>
				<MyButton style={styles.myButton} onPressButton={() => logOut()} txt="Logout" />
			</View>
			<PlayerMap user={user} nearbyPlayers={nearbyPlayers} locationHandler={locationHandler} />
			<FindNearbyPlayers radiusHandler={radiusHandler} />
			<LoginModal visible={isLoginMode} onLogin={loginHandler} user={user} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		paddingTop: Constants.statusBarHeight,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
	},
	mainInfo: {},
	myButton: {alignItems: 'flex-end'},
});
