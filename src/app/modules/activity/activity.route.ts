import express from 'express'
import {
  createActivityCon,
  getActivity,
  postAnswer,
} from './activity.controller'

const router = express.Router()
router.get('/activityList', getActivity)
router.post('/createActivity', createActivityCon)
router.post('/:activityId/answer', postAnswer)

export default router
