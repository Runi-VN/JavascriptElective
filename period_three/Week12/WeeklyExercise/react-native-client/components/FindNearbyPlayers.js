import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MyButton from './myButton';

export default FindNearbyPlayers = ({radiusHandler}) => {
	const [radius, setRadius] = useState('');

	const radiusInputHandler = (enteredText) => {
		setRadius(enteredText);
	};

	const buttonHandler = () => {
		radiusHandler(radius);
		//setUserName('');
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholder="Radius to search for"
				style={styles.input}
				onChangeText={radiusInputHandler}
				value={radius}
				placeholderTextColor={'gray'}
			/>
			<MyButton onPressButton={() => buttonHandler()} txt="Find nearby players" />
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		//flex: 1,
		//flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '80%',
		borderBottomColor: 'black',
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
