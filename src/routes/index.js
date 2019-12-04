// dependencias
import express from 'express'

// routes
import home from './home'
import webhook from './webhook'

const router = express.Router()

router.use('/home', home)
router.use('/webhook', webhook)

export default router
