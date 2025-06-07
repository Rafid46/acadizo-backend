import express from 'express'
import { createActivityCon, getActivity } from './activity.controller'

const router = express.Router()
router.get('/activityList', getActivity)
router.post('/createActivity', createActivityCon)

export default router
