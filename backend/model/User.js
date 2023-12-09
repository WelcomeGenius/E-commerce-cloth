import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	roles: {
		Users: {
			type: Number,
			default: 1001,
		},
		Admin: Number,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
})

const userModel = mongoose.model('User', userSchema)

export default userModel
