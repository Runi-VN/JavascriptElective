import React from 'react';
import {View, Text} from 'react-native';

AlignItemsBasics = () => {
	// Try setting `alignItems` to 'flex-start'
	// Try setting `justifyContent` to `flex-end`.
	// Try setting `flexDirection` to `row`.
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate basics use of AlignItems</Text> */}
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'stretch',
				}}>
				<View style={{width: 75, height: 50, backgroundColor: 'powderblue'}} />
				<View style={{height: 50, backgroundColor: 'skyblue'}} />
				<View style={{height: 100, backgroundColor: 'steelblue'}} />
			</View>
		</View>
	);
};

//https://reactnative.dev/docs/flexbox#flex-direction
//https://reactnative.dev/docs/flexbox#align-items
export default function AlignItemsScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>Aligh Items</Text>
			<AlignItemsBasics />
		</View>
	);
}
