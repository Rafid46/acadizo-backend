import { NextFunction, Request, Response } from 'express'
import {
  getUsersFomDb,
  createUserToDb,
  getUsersByIDFomDb,
  updateUserToDb,
} from './user.service'
import { IUser } from './user.interface'
import User from './user.model'
import Academy from '../academy/academy.model'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { firstName, lastName, email, password, role } = req.body
    console.log(req.body)
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
        insertedId: null,
      })
    }
    const data: IUser = {
      firstName,
      lastName,
      email,
      password,
      role,
    } as IUser

    const user = await createUserToDb(data)
    res.status(200).json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { email } = req.params
    const updateData = req.body
    const updatedUser = await updateUserToDb(email, updateData)
    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }
    const memberUpdateFields: any = {}
    if (updateData.firstName)
      memberUpdateFields['academyMembers.$.firstName'] = updateData.firstName
    if (updateData.lastName)
      memberUpdateFields['academyMembers.$.lastName'] = updateData.lastName
    if (updateData.role)
      memberUpdateFields['academyMembers.$.role'] = updateData.role
    if (updateData.photoURL)
      memberUpdateFields['academyMembers.$.imageUrl'] = updateData.photoURL
    if (updateData.photoURL)
      memberUpdateFields['academyMembers.$.photoURL'] = updateData.role
    const fieldsToUpdate = ['firstName', 'lastName', 'role', 'photoURL']
    const memberSetData: Record<string, any> = {}

    fieldsToUpdate.forEach(field => {
      if (updateData[field]) {
        memberSetData[`academyMembers.$[elem].${field}`] = updateData[field]
      }
    })

    if (Object.keys(memberSetData).length > 0) {
      await Academy.updateMany(
        { 'academyMembers.email': email },
        { $set: memberSetData },
        { arrayFilters: [{ 'elem.email': email }] },
      )
    }

    if (updateData?.photoURL) {
      updateData.imageUrl = updateData?.photoURL
    }
    res.status(200).json({
      status: 'success',
      data: updatedUser,
    })
  } catch (error) {
    next(error)
  }
}

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { user } = req.body
//     const result = await createUserToDb(user)
//     res.status(200).json({
//       success: true,
//       message: 'User created successfully',
//       data: result,
//     })
//   } catch (error) {
//     console.error('Error creating user:', error)
//     res.status(400).json({
//       success: false,
//       message: 'Failed to create user!',
//     })
//   }
// }

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await getUsersFomDb()
  res.status(200).json({
    status: 'success',
    data: user,
  })
}

export const getUsersByEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const { email } = req.params
    console.log('Received email:', email)

    if (!email) {
      res.status(400).json({
        status: 'error',
        message: 'Email is required',
      })
      return resolve() // Resolve to indicate completion
    }

    try {
      const user = await getUsersByIDFomDb(email)
      if (!user) {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
        })
        return resolve() // Resolve for this case as well
      }

      res.status(200).json({
        status: 'success',
        data: user,
      })

      resolve() // Resolve once the response is sent successfully
    } catch (error) {
      next(error) // Pass error to the middleware
      reject(error) // Reject the promise with the error
    }
  })
}
