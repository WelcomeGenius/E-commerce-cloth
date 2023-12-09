import bcrypt from 'bcrypt'
import User from '../model/User.js'

const handleRegistration = async (req, res) => {
	const { username, pwd } = req.body
	if (!username || !pwd) {
		return res
			.status(400)
			.json({ message: 'Username and Password are required.' })
	}

	// check for a duplicate username or email depending on the unique field in the database
	const duplicate = await User.findOne({ username }).exec()
	if (duplicate) {
		return res
			.status(409)
			.json({ message: 'Username already taken try again.' })
	}

	try {
		// hash the pwd
		const hashedpwd = await bcrypt.hash(pwd, 10)
		// create and store the new user
		const result = await User.create({
			username,
			password: hashedpwd,
		})
		console.log(result)
		res.status(201).json({ message: `New user ${username} created!` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export { handleRegistration }
