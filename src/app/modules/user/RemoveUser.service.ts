import { IAcademy } from '../academy/academy.interface'
import Academy from '../academy/academy.model'
import { IUser } from './user.interface'
import User from './user.model'

export const removeAcademyMember = async (
  academyId: string,
  userId: string,
): Promise<IUser | null> => {
  const academy = await Academy.findOne({ academyId })

  if (!academy) {
    throw { status: 404, message: 'Academy not found' }
  }

  const isMember = academy.academyMembers?.some(member => member.id === userId)

  if (!isMember) {
    throw { status: 400, message: 'User is not a member of this academy' }
  }

  const removedUser = await User.findOneAndUpdate(
    { id: userId },
    { academyName: null, academyId: null },
    { new: true },
  )

  academy.academyMembers = academy.academyMembers.filter(
    member => member.id !== userId,
  )
  await academy.save()

  if (!removedUser) {
    throw { status: 404, message: 'User not found' }
  }

  return removedUser
}
