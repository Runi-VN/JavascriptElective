import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

const logo = {
	uri: 'https://reactnative.dev/img/tiny_logo.png',
	width: 64,
	height: 64,
};

ScrollDemo = () => {
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate basics of the ScrollView</Text> */}
			<ScrollView>
				<Text style={{fontSize: 96}}>Scroll me plz</Text>
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Text style={{fontSize: 96}}>If you like</Text>
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Text style={{fontSize: 96}}>Scrolling down</Text>
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Text style={{fontSize: 96}}>What's the best</Text>
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Text style={{fontSize: 96}}>Framework around?</Text>
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Image source={logo} />
				<Text style={{fontSize: 80}}>React Native</Text>
			</ScrollView>
		</View>
	);
};
//https://reactnative.dev/docs/using-a-scrollview
export default function ScrollViewScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Scroll Demo</Text>
			<ScrollDemo />
		</View>
	);
}
