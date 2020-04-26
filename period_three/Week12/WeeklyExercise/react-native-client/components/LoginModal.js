import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal} from 'react-native';

const LoginModal = (props) => {
	const [username, setUserName] = useState(props.user.username);
	const [password, setPassword] = useState(props.user.password);
	// const [radius, setRadius] = useState('');
	const usernameInputHandler = (enteredText) => {
		setUserName(enteredText);
	};
	const passwordInputHandler = (enteredText) => {
		setPassword(enteredText);
	};
	// const radiusInputHandler = (enteredText) => {
	// 	setRadius(enteredText);
	// };

	const login = () => {
		props.onLogin({userName: username, password});
		//setUserName('');
	};

	return (
		<Modal visible={props.visible} animationType="fade">
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={usernameInputHandler}
					value={username}
					placeholderTextColor={'black'}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					onChangeText={passwordInputHandler}
					value={password}
					placeholderTextColor={'black'}
				/>
				{/* <TextInput
					placeholder="Radius to search for"
					style={styles.input}
					onChangeText={radiusInputHandler}
					value={radius}
					placeholderTextColor={'black'}
				/> */}
				<View style={styles.buttonContainer}>
					{/* <View style={styles.button}>
						<Button title="Cancel" color="red" onPress={props.onCancel} />
					</View> */}
					<View style={styles.button}>
						<Button title="Login" onPress={login} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		//flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '80%',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 10,
		marginBottom: 10,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		width: '50%',
	},
	button: {
		flex: 1,
		//width: '45%',
	},
});

export default LoginModal;
