import { IUser } from './user.interface'
import User from './user.model'
import config from '../../../config/index'
import { generateUserId } from './user.utils'
// export const createUserToDb = async (payload: IUser) => {
//   const user = await new User(payload)
//   await user.save()
//   return user
// }

export const createUserToDb = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()

  // default password for student
  user.id = id
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  const createdUser = await User.create(user)

  if (!createUserToDb) {
    throw new Error('Failed to create new user!')
  }
  return createdUser
}

export const updateUserToDb = async (
  email: string,
  updateData: Partial<IUser>,
) => {
  console.log('Updating user with id:', email)
  console.log('Update data:', updateData)
  const updatedNewUser = await User.findOneAndUpdate(
    { email: email },
    { $set: updateData },
    {
      new: true,
    },
  )
  

  return updatedNewUser
}

export const getUsersFomDb = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

export const getUsersByIDFomDb = async (
  payload: string,
): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ email: payload }) // Query the user by email
    return user // Return user if found, null if not found
  } catch (error) {
    throw new Error('Error fetching user from the database')
  }
}
