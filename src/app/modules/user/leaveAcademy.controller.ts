import { Request, Response, NextFunction } from 'express'
import { leaveAcademyForUser } from './leaveAcademy.service'

export const handleLeaveAcademy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { userId, academyName } = req.body

    // Validate request payload
    if (!userId || !academyName) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID and Academy Name are required.',
      })
    }

    // Call service to handle logic
    const updatedUser = await leaveAcademyForUser(userId, academyName)

    return res.status(200).json({
      status: 'success',
      message: 'User successfully left the academy.',
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
