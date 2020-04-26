import React, {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	FlatList,
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

FetchDemo = ({data, setData}) => {
	const [isLoading, setLoading] = useState(false);
	const [userName, setUserName] = useState('');
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');

	// useEffect(() => {
	// 	fetch('https://reactnative.dev/movies.json')
	// 		.then((response) => response.json())
	// 		.then((json) => setData(json.movies))
	// 		.catch((error) => console.error(error))
	// 		.finally(() => setLoading(false));
	// });

	const getResponse = async () => {
		setLoading(true);
		//const position_to_update = {userName: 't2', lon: 45.27, lat: 32.57};
		const position_to_update = {userName, lon, lat};
		//console.log(position_to_update);
		try {
			const response = await fetch('http://192.168.1.83:5000/gameapi/updatePos', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(position_to_update),
			});
			//console.log('text', await response.text());
			//console.log(JSON.stringify(response));
			const json = await response.json();
			//console.log(json);
			await setData(json);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onPress = () => {
		getResponse();
		console.log('pressed: ', data);
		console.log(userName, lon, lat);
	};

	return (
		<View style={{flex: 1, paddingTop: 22}}>
			<View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
				{/*wont center, ffs*/}

				<View style={styles.inputstyle}>
					<TextInput
						style={styles.inputstyleTextInput}
						onChangeText={(enteredText) => {
							setUserName(enteredText);
						}}
						placeholder="userName"></TextInput>
					<TextInput
						style={styles.inputstyleTextInput}
						onChangeText={(enteredText) => {
							setLon(enteredText);
						}}
						placeholder="lon"></TextInput>
					<TextInput
						style={styles.inputstyleTextInput}
						onChangeText={(enteredText) => {
							setLat(enteredText);
						}}
						placeholder="lat"></TextInput>
				</View>
				<TouchableHighlight
					activeOpacity={1}
					underlayColor="white"
					style={styles.button}
					onPress={onPress}>
					<Text> Update position </Text>
				</TouchableHighlight>
			</View>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate basic use of Fetch</Text>
			<Text style={{fontSize: 18}}>And IMPORTANT, also useEffect and useState</Text> */}
			<View style={{flex: 1, padding: 24}}>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<FlatList
						data={data}
						keyExtractor={({id}, index) => id}
						renderItem={({item}) => <Text>{item}</Text>}
					/>
				)}
			</View>
		</View>
	);
};

//https://reactnative.dev/docs/network
export default function updatePos() {
	const [data, setData] = useState();
	const [users, setUsers] = useState([]);
	useEffect(() => {}, [data]);
	useEffect(() => {
		//getResponse();
		getUsers();
	}, []);

	const getUsers = async () => {
		const options = {
			method: 'GET',
			credentials: 'same-origin',
			headers: {Accept: 'application/json'},
		};
		const json = await (await fetch('http://192.168.1.83:5000/api/users', options)).json();
		//console.log(json);
		setUsers(json);
		//console.log(users);
	};

	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>Here you can update locations.</Text>
			<FetchDemo data={data} setData={setData} />
			<Text style={{flexDirection: 'column'}}>
				{users && users.map((user) => JSON.stringify(user))}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 10,
	},
	inputstyle: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 10,
	},
	inputstyleTextInput: {
		//alignItems: 'center',
		textAlign: 'center',
		borderColor: 'black',
		borderWidth: 1,
		width: '33%',
		justifyContent: 'space-between',
		//flex: 3,
	},
});
