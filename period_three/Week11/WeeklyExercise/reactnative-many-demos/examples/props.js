import React from 'react';
import {Text, View} from 'react-native';

function Cat(props) {
	return (
		<View>
			<Text>
				Hello, I am {props.name}. Age: {props.age}!
			</Text>
		</View>
	);
}

Cafe = () => {
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate basics of React Props</Text> */}
			<Cat name="Maru" age={4} />
			<Cat name="Jellylorum" age={3} />
			<Cat name="Spot" />
		</View>
	);
};

//https://reactnative.dev/docs/intro-react#props
export default function PropsScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>PropsDemo</Text>
			<Cafe />
		</View>
	);
}
