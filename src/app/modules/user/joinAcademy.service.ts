import Academy from '../academy/academy.model'
import User from './user.model'

export const joinAcademyForUser = async (
  userId: string,
  academyName: string,
  email: string,
  role: 'student' | 'teacher',
  firstName: string,
  lastName: string,
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

  if (!academy.academyMembers?.some(member => member.id === userId)) {
    // Add the new user to academyMembers array only if they're not already a member
    academy.academyMembers = academy.academyMembers ?? [] // Initialize if undefined
    academy.academyMembers.push({
      id: userId,
      email,
      role,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
    })

    // Save the academy after adding the new member
    await academy.save()
  } else {
    throw { status: 400, message: 'User is already a member of this academy' }
  }
}

// export const joinAcademyForUser = async (
//   userId: string,
//   academyName: string,
//   email: string,
// ) => {
//   // Check if the academy exists
//   const academy = await Academy.findOne({ academyName })
//   if (!academy) {
//     throw { status: 404, message: 'Academy not found' }
//   }

//   // Update the user's academy field
//   const updatedUser = await User.findOneAndUpdate(
//     { id: userId },
//     { academyName: academyName, email: email },
//     { new: true },
//   )

//   if (!updatedUser) {
//     throw { status: 404, message: 'User not found' }
//   }

//   // Ensure academyMembers is defined as an empty array if it's undefined
//   const memberObject = { id: userId, email: email } // Create an object with id and email
//   if (
//     !academy.academyMembers?.some(
//       member => member.id === userId && member.email === email,
//     )
//   ) {
//     academy.academyMembers.push(memberObject) // Add the member as an object
//     await academy.save()
//   }

//   // Return success message
//   return {
//     status: 'success',
//     message: 'User successfully joined the academy.',
//     data: updatedUser,
//   }
// }
