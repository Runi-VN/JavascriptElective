import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default MyButton = ({txt, onPressButton}) => {
	return (
		<TouchableHighlight style={styles.touchable} onPress={onPressButton} underlayColor="#DDDDDD">
			<Text style={styles.touchableTxt}>{txt}</Text>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	touchable: {backgroundColor: '#4682B4', margin: 3},
	touchableTxt: {fontSize: 16, textAlign: 'center', padding: 5},
});
