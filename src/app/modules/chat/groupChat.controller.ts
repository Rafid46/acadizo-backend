import { Request, Response } from 'express'
import {
  createGroupChat,
  getGroupsByAcademy,
  getGroupsByUser,
  getGroupById,
  updateGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  sendMessage,
  editMessage,
  deleteMessage,
  addReaction,
  removeReaction,
  getGroupMessages,
  deactivateGroup,
} from './groupChat.service'

// Create a new group chat
export const createGroupChatController = async (req: Request, res: Response) => {
  try {
    const { groupName, groupDescription, groupIcon, academyId, academyName, memberIds } = req.body
    const createdBy = (req as any).user?.id // Assuming JWT middleware sets user info

    if (!groupName || !academyId || !academyName || !memberIds || !Array.isArray(memberIds)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: groupName, academyId, academyName, memberIds (array)',
      })
    }

    const result = await createGroupChat(
      { groupName, groupDescription, groupIcon, academyId, academyName, memberIds },
      createdBy
    )

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Group chat created successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Get groups by academy
export const getGroupsByAcademyController = async (req: Request, res: Response) => {
  try {
    const { academyId } = req.params

    if (!academyId) {
      return res.status(400).json({
        success: false,
        message: 'Academy ID is required',
      })
    }

    const result = await getGroupsByAcademy(academyId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Groups retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Get groups by user
export const getGroupsByUserController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await getGroupsByUser(userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User groups retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Get group by ID
export const getGroupByIdController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required',
      })
    }

    const result = await getGroupById(groupId)

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Group retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Update group
export const updateGroupController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params
    const updateData = req.body
    const userId = (req as any).user?.id

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await updateGroup(groupId, updateData)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Group updated successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Add member to group
export const addMemberToGroupController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params
    const { userId, name, role, photoURL, isAdmin } = req.body

    if (!groupId || !userId || !name || !role || !photoURL) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, name, role, photoURL',
      })
    }

    const result = await addMemberToGroup(groupId, {
      userId,
      name,
      role,
      photoURL,
      isAdmin,
    })

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Member added successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Remove member from group
export const removeMemberFromGroupController = async (req: Request, res: Response) => {
  try {
    const { groupId, userId } = req.params

    if (!groupId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and User ID are required',
      })
    }

    const result = await removeMemberFromGroup(groupId, userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Send message
export const sendMessageController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params
    const { content, messageType, attachments, replyTo } = req.body
    const sender = (req as any).user

    if (!groupId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and message content are required',
      })
    }

    if (!sender) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await sendMessage(groupId, {
      content,
      messageType,
      attachments,
      replyTo,
    }, sender)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Edit message
export const editMessageController = async (req: Request, res: Response) => {
  try {
    const { groupId, messageId } = req.params
    const { content } = req.body
    const userId = (req as any).user?.id

    if (!groupId || !messageId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Group ID, Message ID, and new content are required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await editMessage(groupId, messageId, content, userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message edited successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Delete message
export const deleteMessageController = async (req: Request, res: Response) => {
  try {
    const { groupId, messageId } = req.params
    const userId = (req as any).user?.id

    if (!groupId || !messageId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and Message ID are required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await deleteMessage(groupId, messageId, userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Add reaction
export const addReactionController = async (req: Request, res: Response) => {
  try {
    const { groupId, messageId } = req.params
    const { reaction } = req.body
    const userId = (req as any).user?.id

    if (!groupId || !messageId || !reaction) {
      return res.status(400).json({
        success: false,
        message: 'Group ID, Message ID, and reaction are required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await addReaction(groupId, messageId, userId, reaction)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Reaction added successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Remove reaction
export const removeReactionController = async (req: Request, res: Response) => {
  try {
    const { groupId, messageId } = req.params
    const userId = (req as any).user?.id

    if (!groupId || !messageId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and Message ID are required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await removeReaction(groupId, messageId, userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Reaction removed successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Get group messages
export const getGroupMessagesController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 50

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required',
      })
    }

    const result = await getGroupMessages(groupId, page, limit)

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Messages retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

// Deactivate group
export const deactivateGroupController = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params
    const userId = (req as any).user?.id

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required',
      })
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }

    const result = await deactivateGroup(groupId, userId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Group deactivated successfully',
      data: result.data,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
} 