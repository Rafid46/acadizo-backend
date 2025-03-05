import express from 'express'

import {
  createAcademy,
  getAcademy,
  getAcademyByEmail,
} from './academy.controller'
import { createNotice, getNotice } from './notice.controller'
// import { upload } from '../../../middleware/upload'

const router = express.Router()

router.get('/academyList', getAcademy)
router.post('/createAcademy', createAcademy)
router.get('/academyList/:academyCreatedBy', getAcademyByEmail)
router.post('/notice', createNotice)
router.get('/notices', getNotice)
export default router
