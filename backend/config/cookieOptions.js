const cookieOptions = {
	httpOnly: true,
	sameSite: 'None',
	maxAge: 3 * 24 * 60 * 60 * 1000,
	secure: true,
}

export default cookieOptions
