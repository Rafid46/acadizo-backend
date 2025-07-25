import express from 'express'
import {
  createActivityCon,
  deleteActivity,
  getActivity,
  postAnswer,
  updateActivities,
} from './activity.controller'

const router = express.Router()
router.get('/activityList', getActivity)
router.post('/createActivity', createActivityCon)
router.post('/:activityId/answer', postAnswer)
router.delete('/:activityId/delete', deleteActivity)
router.patch('/:activityId/update', updateActivities)

export default router
