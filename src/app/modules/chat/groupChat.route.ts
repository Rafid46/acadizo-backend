import express from 'express'
import {
  createGroupChatController,
  getGroupsByAcademyController,
  getGroupsByUserController,
  getGroupByIdController,
  updateGroupController,
  addMemberToGroupController,
  removeMemberFromGroupController,
  sendMessageController,
  editMessageController,
  deleteMessageController,
  addReactionController,
  removeReactionController,
  getGroupMessagesController,
  deactivateGroupController,
} from './groupChat.controller'

const router = express.Router()

// Group management routes
router.post('/create', createGroupChatController)
router.get('/academy/:academyId', getGroupsByAcademyController)
router.get('/user', getGroupsByUserController)
router.get('/:groupId', getGroupByIdController)
router.put('/:groupId', updateGroupController)
router.delete('/:groupId', deactivateGroupController)

// Member management routes
router.post('/:groupId/members', addMemberToGroupController)
router.delete('/:groupId/members/:userId', removeMemberFromGroupController)

// Message routes
router.post('/:groupId/messages', sendMessageController)
router.put('/:groupId/messages/:messageId', editMessageController)
router.delete('/:groupId/messages/:messageId', deleteMessageController)
router.get('/:groupId/messages', getGroupMessagesController)

// Reaction routes
router.post('/:groupId/messages/:messageId/reactions', addReactionController)
router.delete('/:groupId/messages/:messageId/reactions', removeReactionController)

export default router 