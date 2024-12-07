// Replace with actual Academy model path

import Academy from '../academy/academy.model'
import User from './user.model'

export const getJoinedAcademyDetails = async (userEmail: string) => {
  try {
    // Fetch the user by email
    const user = await User.findOne({ email: userEmail })
    if (!user) {
      console.error(`No user found with email: ${userEmail}`)
      throw new Error('User not found')
    }
    console.log('User:', user)

    // Ensure academyName exists in the user document
    if (!user?.academyName) {
      console.error(`No academyName found for user with email: ${userEmail}`)
      throw new Error('User is not associated with any academy')
    }

    // Fetch the academy details using the `academyName` from the user
    const academy = await Academy.findOne({ academyName: user?.academyName })
    if (!academy) {
      console.error(`No academy found with name: ${user.academyName}`)
      throw new Error('Academy not found')
    }
    console.log('Academy:', academy)

    return academy
  } catch (error: any) {
    console.error('Error fetching academy details:', error.message)
    throw new Error(error.message || 'Error fetching academy details')
  }
}
