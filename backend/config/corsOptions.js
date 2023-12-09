import allowedOrigins from './allowedOrigins.js'

const corsOptions = {
	origin: (origin, callback) => {
		// the !origin is so that the cors detects for any localhost domains only to be used in development remove that option during production
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
}

export default corsOptions
