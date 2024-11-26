import express from 'express'
import { createAcademy, getAcademy } from './academy.controller'
const router = express.Router()

router.get('/academyList', getAcademy)
router.post('/createAcademy', createAcademy)
export default router
