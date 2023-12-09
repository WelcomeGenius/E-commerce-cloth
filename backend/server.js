import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import 'dotenv/config'
import corsOptions from './config/corsOptions.js'
import credentials from './middleware/credentials.js'
import { handleRouteError } from './controllers/errorController.js'
import connectDB from './config/dbConnection.js'
import registerRouter from './routes/register.js'
import authRouter from './routes/login.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'

// the port for the app to listen on
const PORT = process.env.PORT || 3500

// Defining the app instance using express
const app = express()

// connect to DB in this case i used mongo db as i did not figure the database structure in sql completely
connectDB()
// all the middleware to use with express

// for fetching cookie credentials requirement
app.use(credentials)
// cors
app.use(cors(corsOptions))
// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }))
// built-in middleware for json
app.use(express.json())
// cookie-parser middleware
app.use(cookieParser())

// routes which are important
app.use('/register', registerRouter)
app.use('/login', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)

// handles the route error for all undefined routes
app.all('*', handleRouteError)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})
