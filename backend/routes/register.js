import express from 'express'
import { handleRegistration } from '../controllers/registerController.js'

const router = express.Router()

router.post('/', handleRegistration)

export default router
