import express from 'express'
import {
  createUser,
  getUsers,
  getUsersByEmail,
  updateUser,
} from './user.controller'
import { handleJoinAcademy } from './joinAcademy.controller'
import { handleLeaveAcademy } from './leaveAcademy.controller'
import { getJoinedAcademyDetailsController } from './joinedAcademyDetails.controller'
const router = express.Router()

router.get('/', getUsers)
router.get('/:email', getUsersByEmail)
router.post('/create-user', createUser)
router.put('/update-user/:email', updateUser)
router.post('/join-academy', handleJoinAcademy)
router.post('/leave-academy', handleLeaveAcademy)
router.get('/academyDetails/:email', getJoinedAcademyDetailsController)

export default router
