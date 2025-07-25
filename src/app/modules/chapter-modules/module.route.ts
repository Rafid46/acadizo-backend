import express from 'express'
import {
  createModule,
  deleteModule,
  deleteModules,
  getModules,
  updateModules,
} from './modules.controller'
const router = express.Router()
router.post('/createModules', createModule)
router.get('/allModules', getModules)
router.delete('/:moduleId', deleteModule)
router.delete('/selected-module/modules-delete', deleteModules)
router.patch('/update-module/:moduleId', updateModules)
export default router
