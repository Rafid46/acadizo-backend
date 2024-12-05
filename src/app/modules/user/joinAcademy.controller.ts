import { Request, Response, NextFunction } from 'express'
import { joinAcademyForUser } from './joinAcademy.service'

export const handleJoinAcademy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { userId, academyName, email, role, firstName, lastName } = req.body

    // Validate request payload
    if (!userId || !academyName || !email || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID and Academy Name are required.',
      })
    }

    // Call service to handle logic
    const updatedUser = await joinAcademyForUser(
      userId,
      academyName,
      email,
      role,
      firstName,
      lastName,
    )

    return res.status(200).json({
      status: 'success',
      message: 'User successfully joined the academy.',
      data: updatedUser,
    })
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({
        status: 'error',
        message: error.message,
      })
    } else {
      next(error)
    }
  }
}
