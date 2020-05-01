import mongoose from 'mongoose';
import {Friends} from './DBConnector';

// class Friend {
// 	constructor(id, {firstName, lastName, gender, age, language, email, contacts}) {
// 		this.id = id;
// 		this.firstName = firstName;
// 		this.lastName = lastName;
// 		this.gender = gender;
// 		this.age = age;
// 		this.language = language;
// 		this.email = email;
// 		this.contacts = contacts;
// 	}
// }

const resolvers = {
	getFriend: ({id}) => {
		return new Friend(id, friendDatabase[id]);
	},
	createFriend: ({input}) => {
		const newFriend = new Friends({
			firstName: input.firstName,
			lastName: input.lastName,
			gender: input.gender,
			age: input.age,
			language: input.language,
			email: input.email,
			contacts: input.contacts,
		});

		newFriend.id = newFriend._id;
		return newFriend.save();
	},
	updateFriend: ({input}) => {
		return Friends.findOneAndUpdate({_id: input.id}, input, {new: true});
	},
	deleteFriend: async ({id}) => {
		const result = await Friends.remove({_id: id});
		console.log(result)
		return `Deleted friend? ${result}`;
	},
};

export default resolvers;
