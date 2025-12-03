// Simple UUID generation function (since uuid package is not installed)
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Validate group name
export const validateGroupName = (name: string): boolean => {
  return Boolean(name && name.trim().length >= 3 && name.trim().length <= 50)
}

// Validate message content
export const validateMessageContent = (content: string): boolean => {
  return Boolean(content && content.trim().length > 0 && content.trim().length <= 1000)
}

// Check if user has permission to edit group
export const canEditGroup = (user: any, group: any): boolean => {
  if (!user || !group) return false
  
  // Group creator can always edit
  if (group.createdBy === user.id) return true
  
  // Check if user is admin
  const member = group.members.find((m: any) => m.userId === user.id)
  return member?.isAdmin || false
}

// Check if user has permission to delete messages
export const canDeleteMessage = (user: any, message: any, group: any): boolean => {
  if (!user || !message || !group) return false
  
  // Message sender can delete their own messages
  if (message.sender.userId === user.id) return true
  
  // Group admins can delete any message
  return canEditGroup(user, group)
}

// Check if user has permission to edit messages
export const canEditMessage = (user: any, message: any, group: any): boolean => {
  if (!user || !message || !group) return false
  
  // Only message sender can edit their own messages
  return message.sender.userId === user.id
}

// Format message for response
export const formatMessage = (message: any) => {
  return {
    messageId: message.messageId,
    sender: message.sender,
    content: message.content,
    messageType: message.messageType,
    attachments: message.attachments || [],
    replyTo: message.replyTo,
    reactions: message.reactions || [],
    isEdited: message.isEdited,
    editedAt: message.editedAt,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  }
}

// Format group for response (without messages)
export const formatGroup = (group: any) => {
  return {
    groupId: group.groupId,
    groupName: group.groupName,
    groupDescription: group.groupDescription,
    groupIcon: group.groupIcon,
    academyId: group.academyId,
    academyName: group.academyName,
    createdBy: group.createdBy,
    members: group.members,
    isActive: group.isActive,
    settings: group.settings,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  }
}

// Pagination helper
export const paginateResults = (items: any[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedItems = items.slice(startIndex, endIndex)
  
  return {
    items: paginatedItems,
    currentPage: page,
    totalPages: Math.ceil(items.length / limit),
    totalItems: items.length,
    hasNextPage: endIndex < items.length,
    hasPrevPage: page > 1,
  }
} 