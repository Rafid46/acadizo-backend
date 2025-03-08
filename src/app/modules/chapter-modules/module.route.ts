import express from 'express'
import { createModule, deleteModule, getModules } from './modules.controller'
const router = express.Router()
router.post('/createModules', createModule)
router.get('/allModules', getModules)
router.delete('/:moduleId', deleteModule)
export default router
