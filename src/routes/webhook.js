// dependencias
import express from 'express'

// config
import { WebhookAuth } from '../config'

// controllers
import WebhookController from '../controllers/webhook'

const router = express.Router()

router.post('/', WebhookAuth, WebhookController.post)

export default router
