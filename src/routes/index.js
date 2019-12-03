// dependencias
import express from 'express'

// routes
import home from './home'

const router = express.Router()

router.use('/home', home)

export default router
