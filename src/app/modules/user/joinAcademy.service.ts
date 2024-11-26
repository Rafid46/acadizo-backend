import Academy from '../academy/academy.model'
import User from './user.model'

export const joinAcademyForUser = async (
  userId: string,
  academyName: string,
) => {
  // Check if the academy exists
  const academy = await Academy?.findOne({ academyName })
  if (!academy) {
    throw { status: 404, message: 'Academy not found' }
  }

  // Update the user's academy field
  const updatedUser = await User.findOneAndUpdate(
    { id: userId },
    { academyName: academyName },
    { new: true },
  )

  if (!updatedUser) {
    throw { status: 404, message: 'User not found' }
  }

  // Ensure academyMembers is defined as an empty array if it's undefined
  if (!academy.academyMembers?.includes(userId)) {
    academy.academyMembers = academy.academyMembers ?? [] // Initialize as empty array if undefined
    academy.academyMembers.push(userId)
    await academy.save() // Don't forget to save the academy
  }
}
