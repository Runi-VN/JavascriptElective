import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

FlatListBasics = () => {
	return (
		<View style={{flex: 1, paddingTop: 22}}>
			{/* <Text style={{fontSize: 18}}>Change me to demonstrate basic use of Flatlist</Text> */}
			<View style={styles.container}>
				<FlatList
					data={[
						{key: 'Devin'},
						{key: 'Dan'},
						{key: 'Dominic'},
						{key: 'Jackson'},
						{key: 'James'},
						{key: 'Joel'},
						{key: 'John'},
						{key: 'Jillian'},
						{key: 'Jimmy'},
						{key: 'Julieaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
						{key: 'bob'},
						{key: 'a'},
						{key: 'Dombinic'},
						{key: 'Jacbkson'},
						{key: 'fda'},
						{key: 'dfdff'},
						{key: 'Jodfdfhn'},
						{key: 'Jilfdfdlian'},
						{key: 'Jimmfdfdy'},
						{key: 'Julfdfdfie'},
					]}
					renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
				/>
			</View>
		</View>
	);
};

//https://reactnative.dev/docs/using-a-listview
export default function FlatlistScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 24}}>Flatlist Basics</Text>
			<FlatListBasics />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});
