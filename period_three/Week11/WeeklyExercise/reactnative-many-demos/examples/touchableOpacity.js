import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

TouchableOpacityExample = () => {
	const [count, setCount] = useState(0);
	const onPress = () => setCount((prevCount) => prevCount + 1);
	const onLongPress = () => setCount((prevCount) => prevCount - 1);
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			<View style={styles.container}>
				<View style={styles.countContainer}>
					<Text>Count: {count}</Text>
				</View>
				<TouchableOpacity style={styles.button} onLongPress={onLongPress} onPress={onPress}>
					<Text>Press Here</Text>
				</TouchableOpacity>
			</View>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate TouchableOpacity</Text> */}
		</View>
	);
};

//https://reactnative.dev/docs/touchableopacity
export default function TouchableOpacityScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>TouchableOpacity Demo</Text>
			<TouchableOpacityExample />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
	},
	countContainer: {
		alignItems: 'center',
		padding: 10,
	},
});
