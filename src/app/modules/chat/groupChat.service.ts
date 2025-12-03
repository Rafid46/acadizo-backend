import { Request } from 'express'
import GroupChat from './groupChat.model'
import { 
  IGroupChat, 
  ICreateGroupRequest, 
  IUpdateGroupRequest, 
  IAddMemberRequest, 
  ISendMessageRequest 
} from './groupChat.interface'
import { generateUUID } from './groupChat.utils'

export const createGroupChat = async (groupData: ICreateGroupRequest, createdBy: string) => {
  try {
    const groupId = generateUUID()
    
    // Create initial members array with the creator as admin
    const members = groupData.memberIds.map((memberId, index) => ({
      userId: memberId,
      name: `Member ${index + 1}`, // This should be fetched from user data
      role: 'student' as const, // This should be fetched from user data
      joinedAt: new Date(),
      photoURL: '', // This should be fetched from user data
      isAdmin: index === 0, // First member (creator) is admin
    }))

    const newGroup = new GroupChat({
      groupId,
      groupName: groupData.groupName,
      groupDescription: groupData.groupDescription,
      groupIcon: groupData.groupIcon,
      academyId: groupData.academyId,
      academyName: groupData.academyName,
      createdBy,
      members,
      messages: [],
      isActive: true,
      settings: {
        allowMemberInvite: true,
        allowMessageEdit: true,
        allowMessageDelete: true,
        allowFileSharing: true,
      },
    })

    const savedGroup = await newGroup.save()
    return { success: true, data: savedGroup }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getGroupsByAcademy = async (academyId: string) => {
  try {
    const groups = await GroupChat.find({ 
      academyId, 
      isActive: true 
    }).select('-messages')
    
    return { success: true, data: groups }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getGroupsByUser = async (userId: string) => {
  try {
    const groups = await GroupChat.find({ 
      'members.userId': userId, 
      isActive: true 
    }).select('-messages')
    
    return { success: true, data: groups }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getGroupById = async (groupId: string) => {
  try {
    const group = await GroupChat.findOne({ 
      groupId, 
      isActive: true 
    })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    return { success: true, data: group }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateGroup = async (groupId: string, updateData: IUpdateGroupRequest) => {
  try {
    const group = await GroupChat.findOneAndUpdate(
      { groupId, isActive: true },
      { $set: updateData },
      { new: true }
    )
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    return { success: true, data: group }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const addMemberToGroup = async (groupId: string, memberData: IAddMemberRequest) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    // Check if user is already a member
    const existingMember = group.members.find(member => member.userId === memberData.userId)
    if (existingMember) {
      return { success: false, error: 'User is already a member of this group' }
    }
    
    const newMember = {
      userId: memberData.userId,
      name: memberData.name,
      role: memberData.role,
      joinedAt: new Date(),
      photoURL: memberData.photoURL,
      isAdmin: memberData.isAdmin || false,
    }
    
    group.members.push(newMember)
    const updatedGroup = await group.save()
    
    return { success: true, data: updatedGroup }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const removeMemberFromGroup = async (groupId: string, userId: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const memberIndex = group.members.findIndex(member => member.userId === userId)
    if (memberIndex === -1) {
      return { success: false, error: 'User is not a member of this group' }
    }
    
    group.members.splice(memberIndex, 1)
    const updatedGroup = await group.save()
    
    return { success: true, data: updatedGroup }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const sendMessage = async (groupId: string, messageData: ISendMessageRequest, sender: any) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    // Check if sender is a member of the group
    const isMember = group.members.some(member => member.userId === sender.userId)
    if (!isMember) {
      return { success: false, error: 'You are not a member of this group' }
    }
    
    const messageId = generateUUID()
    const newMessage = {
      messageId,
      sender: {
        userId: sender.userId,
        name: sender.name,
        role: sender.role,
        photoURL: sender.photoURL,
      },
      content: messageData.content,
      messageType: messageData.messageType || 'text',
      attachments: messageData.attachments || [],
      replyTo: messageData.replyTo,
      reactions: [],
      isEdited: false,
      isDeleted: false,
    }
    
    group.messages.push(newMessage)
    const updatedGroup = await group.save()
    
    return { success: true, data: newMessage }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const editMessage = async (groupId: string, messageId: string, newContent: string, userId: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const message = group.messages.find(msg => msg.messageId === messageId)
    if (!message) {
      return { success: false, error: 'Message not found' }
    }
    
    if (message.sender.userId !== userId) {
      return { success: false, error: 'You can only edit your own messages' }
    }
    
    if (!group.settings.allowMessageEdit) {
      return { success: false, error: 'Message editing is not allowed in this group' }
    }
    
    message.content = newContent
    message.isEdited = true
    message.editedAt = new Date()
    
    const updatedGroup = await group.save()
    
    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deleteMessage = async (groupId: string, messageId: string, userId: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const message = group.messages.find(msg => msg.messageId === messageId)
    if (!message) {
      return { success: false, error: 'Message not found' }
    }
    
    // Check if user is message sender or group admin
    const isSender = message.sender.userId === userId
    const isAdmin = group.members.find(member => member.userId === userId)?.isAdmin
    
    if (!isSender && !isAdmin) {
      return { success: false, error: 'You can only delete your own messages or must be an admin' }
    }
    
    if (!group.settings.allowMessageDelete) {
      return { success: false, error: 'Message deletion is not allowed in this group' }
    }
    
    message.isDeleted = true
    message.deletedAt = new Date()
    
    const updatedGroup = await group.save()
    
    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const addReaction = async (groupId: string, messageId: string, userId: string, reaction: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const message = group.messages.find(msg => msg.messageId === messageId)
    if (!message) {
      return { success: false, error: 'Message not found' }
    }
    
    // Remove existing reaction from this user
    message.reactions = message.reactions.filter(r => r.userId !== userId)
    
    // Add new reaction
    message.reactions.push({ userId, reaction })
    
    const updatedGroup = await group.save()
    
    return { success: true, data: message.reactions }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const removeReaction = async (groupId: string, messageId: string, userId: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const message = group.messages.find(msg => msg.messageId === messageId)
    if (!message) {
      return { success: false, error: 'Message not found' }
    }
    
    message.reactions = message.reactions.filter(r => r.userId !== userId)
    
    const updatedGroup = await group.save()
    
    return { success: true, data: message.reactions }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getGroupMessages = async (groupId: string, page: number = 1, limit: number = 50) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    const skip = (page - 1) * limit
    const messages = group.messages
      .filter(msg => !msg.isDeleted)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(skip, skip + limit)
    
    return { 
      success: true, 
      data: {
        messages,
        totalMessages: group.messages.filter(msg => !msg.isDeleted).length,
        currentPage: page,
        totalPages: Math.ceil(group.messages.filter(msg => !msg.isDeleted).length / limit)
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deactivateGroup = async (groupId: string, userId: string) => {
  try {
    const group = await GroupChat.findOne({ groupId, isActive: true })
    
    if (!group) {
      return { success: false, error: 'Group not found' }
    }
    
    // Check if user is group creator or admin
    const isCreator = group.createdBy === userId
    const isAdmin = group.members.find(member => member.userId === userId)?.isAdmin
    
    if (!isCreator && !isAdmin) {
      return { success: false, error: 'Only group creator or admins can deactivate the group' }
    }
    
    group.isActive = false
    const updatedGroup = await group.save()
    
    return { success: true, data: updatedGroup }
  } catch (error) {
    return { success: false, error: error.message }
  }
} 