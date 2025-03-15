import express from 'express'
import {
  createModule,
  deleteModule,
  deleteModules,
  getModules,
} from './modules.controller'
const router = express.Router()
router.post('/createModules', createModule)
router.get('/allModules', getModules)
router.delete('/:moduleId', deleteModule)
router.delete('/selected-module/modules-delete', deleteModules)
export default router
