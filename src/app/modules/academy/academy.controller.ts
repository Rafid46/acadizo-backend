import User from '../user/user.model'
import { IAcademy } from './academy.interface'
import Academy from './academy.model'
import {
  createAcademyToDb,
  getAcademyByEmailFromDb,
  getAcademyFomDb,
} from './academy.service'
import { NextFunction, Request, Response } from 'express'
// export const createAcademy = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   try {
//     const {
//       academyName,
//       academyDescription,
//       academyNumber,
//       academyMembers,
//       academyIcon,
//       academyCreatedBy,
//     } = req.body
//     console.log(req.body)
//     const existingAcademy = await Academy.findOne({ academyName })
//     if (existingAcademy) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Academy already exist',
//         insertedId: null,
//       })
//     }
//     const data: IAcademy = {
//       academyName,
//       academyDescription,
//       academyNumber,
//       academyMembers,
//       academyIcon,
//       academyCreatedBy,
//     } as IAcademy
//     const academy = await createAcademyToDb(data)

//     if (academy) {
//       await User.findByIdAndUpdate(
//         academyCreatedBy, // The user's ID
//         { createdAcademy: academy.academyName },
//         { new: true }, // Return the updated document
//       )
//     }
//     res.status(200).json({
//       status: 'success',
//       data: academy,
//     })
//   } catch (error) {
//     next(error)
//   }
// }
export const createAcademy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const {
      academyName,
      academyDescription,
      academyNumber,
      academyMembers,
      academyIcon,
      academyCreatedBy, // Custom identifier like email or user ID
    } = req.body

    // Check if the academy already exists
    const existingAcademy = await Academy.findOne({ academyName })
    if (existingAcademy) {
      return res.status(400).json({
        status: 'error',
        message: 'Academy name already exists, try another one',
        insertedId: null,
      })
    }

    // Create the academy in the database
    const data: IAcademy = {
      academyName,
      academyDescription,
      academyNumber,
      academyMembers,
      academyIcon,
      academyCreatedBy,
    } as IAcademy

    const academy = await createAcademyToDb(data)

    // If academy creation is successful, update the user's data
    if (academy) {
      // Update the user using a custom field like email or id
      const user = await User.findOneAndUpdate(
        { email: academyCreatedBy }, // Adjust the field based on your logic (e.g., { id: academyCreatedBy })
        { createdAcademy: academy?.academyName },
        { new: true }, // Return the updated document
      )
    }

    // Respond with the academy data
    res.status(200).json({
      status: 'success',
      data: academy,
    })
  } catch (error) {
    next(error)
  }
}

export const getAcademy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const academy = await getAcademyFomDb()
  res.status(200).json({
    status: 'success',
    data: academy,
  })
}

// get academy by email

export const getAcademyByEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const { academyCreatedBy } = req.params
    console.log(academyCreatedBy, 'received email for academy')

    if (!academyCreatedBy) {
      res.json(400).json({
        status: 'error',
        message: 'Email is required',
      })
      return resolve()
    }

    try {
      const academy = await getAcademyByEmailFromDb(academyCreatedBy)
      if (!academy) {
        res.status(404).json({
          status: 'error',
          message: 'academy not found',
        })
        return resolve()
      }
      res.status(200).json({
        status: 'success',
        data: academy,
      })
      resolve()
    } catch (error) {
      next(error)
      reject(error)
    }
  })
}
