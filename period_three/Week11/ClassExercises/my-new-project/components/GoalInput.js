import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal} from 'react-native';
const GoalInput = (props) => {
	const [enteredGoal, setEnteredGoal] = useState('');
	const goalInputHandler = (enteredText) => {
		setEnteredGoal(enteredText);
	};

	const addGoalHandler = () => {
		props.onAddGoal(enteredGoal);
		setEnteredGoal('');
	};

	return (
		<Modal visible={props.visible} animationType="fade">
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Course Goal"
					style={styles.input}
					onChangeText={goalInputHandler}
					value={enteredGoal}
				/>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title="Cancel" color="red" onPress={props.onCancel} />
					</View>
					<View style={styles.button}>
						<Button title="Add Goal" onPress={addGoalHandler} />
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
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '50%',
	},
	button: {
		//width: '45%',
	},
});

export default GoalInput;
