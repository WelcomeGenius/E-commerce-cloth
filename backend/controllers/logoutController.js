import User from '../model/User.js'
import cookieOptions from '../config/cookieOptions.js'

const handleLogout = async (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204)
	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		res.clearCookie('jwt', cookieOptions)
		return res.sendStatus(204)
	}

	foundUser.refreshToken = ''
	await foundUser.save()

	res.clearCookie('jwt', cookieOptions)
	res.sendStatus(204)
}

export default handleLogout
