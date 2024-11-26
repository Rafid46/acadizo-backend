import express from 'express'
import {
  createAcademy,
  getAcademy,
  getAcademyByEmail,
} from './academy.controller'
const router = express.Router()

router.get('/academyList', getAcademy)
router.post('/createAcademy', createAcademy)
router.get('/academyList/:academyCreatedBy', getAcademyByEmail)
export default router
