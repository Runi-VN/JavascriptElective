import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

function Cat(props) {
	const [isHungry, setIsHungry] = useState(true);

	return (
		<View>
			<Text>
				I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
			</Text>
			<Button
				onPress={() => {
					setIsHungry(false);
				}}
				disabled={!isHungry}
				title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
			/>
		</View>
	);
}

Cafe = () => {
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate State in React with Hooks</Text> */}
			<Cat name="Munkustrap" />
			<Cat name="Spot" />
		</View>
	);
};

//https://reactnative.dev/docs/intro-react#state
export default function StateScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>State Demo</Text>
			<Cafe />
		</View>
	);
}
