import express from 'express'
import { createModule, getModules } from './modules.controller'
const router = express.Router()
router.post('/createModules', createModule)
router.get('/allModules', getModules)
export default router
