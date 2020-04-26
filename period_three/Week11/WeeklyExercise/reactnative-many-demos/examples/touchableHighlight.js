import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight, Text, View} from 'react-native';

TouchableHighlightExample = () => {
	const [count, setCount] = useState(0);

	const onPress = () => {
		setCount(count + 1);
	};
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			<View style={styles.container}>
				<TouchableHighlight
					activeOpacity={0.2}
					underlayColor="#DDDDDD"
					style={styles.button}
					onLongPress={() => alert('yeet')}
					onPress={onPress}>
					<Text> Touch Here </Text>
				</TouchableHighlight>

				<View style={styles.countContainer}>
					<Text style={styles.countText}>{count !== 0 ? count : null}</Text>
				</View>
			</View>
			{/* <Text style={{fontSize: 18}}>Change meeee to demonstrate TouchableHiglight</Text> */}
		</View>
	);
};

//https://reactnative.dev/docs/touchablehighlight
export default function TouchableHighlightScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>TouchableHighlight</Text>
			<TouchableHighlightExample />
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
		backgroundColor: 'red',
		padding: 10,
	},
	countContainer: {
		alignItems: 'center',
		padding: 10,
	},
	countText: {
		color: '#FF00FF',
	},
});
