// dependencias
import express from 'express'
import cors from 'cors'

// helpers
import corsOptions from '../helpers/corsOptions'

// controllers
import HomeController from '../controllers/home'

const router = express.Router()

router.get('/', cors(corsOptions), HomeController.index)

export default router
