import Academy from '../academy/academy.model'
import User from './user.model'

export const leaveAcademyForUser = async (
  userId: string,
  academyName: string,
) => {
  // Check if the academy exists
  const academy = await Academy?.findOne({ academyName })
  if (!academy) {
    throw { status: 404, message: 'Academy not found' }
  }

  // Check if the user is part of the academy
  if (!academy?.academyMembers?.some((member: any) => member?.id === userId)) {
    throw { status: 400, message: 'User is not a member of this academy' }
  }

  // Remove the user from the academy's members
  academy.academyMembers = academy?.academyMembers?.filter(
    (member: any) => member.id !== userId,
  )
  await academy.save()

  // Clear the user's academyName field
  const updatedUser = await User?.findOneAndUpdate(
    { id: userId },
    { academyName: null, academyId: null },
    { new: true },
  )

  if (!updatedUser) {
    throw { status: 404, message: 'User not found' }
  }

  // Return the updated user
  return updatedUser
}
