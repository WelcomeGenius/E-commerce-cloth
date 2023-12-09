import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import cookieOptions from '../config/cookieOptions.js'

const handleLogin = async (req, res) => {
	const { username, pwd } = req.body
	if (!username || !pwd) {
		return res
			.status(400)
			.json({ message: 'Username and Password are required.' })
	}
	const foundUser = await User.findOne({ username }).exec()
	if (!foundUser) return res.sendStatus(401)
	// Evaluate the password
	const matchedPwd = await bcrypt.compare(pwd, foundUser.password)
	if (!matchedPwd) return res.sendStatus(401)
	const roles = Object.values(foundUser.roles).filter(Boolean)
	// define access token and refresh token
	const accessToken = jwt.sign(
		{
			UserInfo: {
				id: foundUser._id,
				username: foundUser.username,
				roles,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30m' }
	)
	const refreshToken = jwt.sign(
		{
			id: foundUser._id,
			username: foundUser.username,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '3d' }
	)
	// save the refresh token into the database
	foundUser.refreshToken = refreshToken
	await foundUser.save()
	res.cookie('jwt', refreshToken, cookieOptions)
	res.status(200).json({ roles, accessToken })
}

export { handleLogin }
