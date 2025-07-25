// controllers/user.controller.ts

import { Request, Response, NextFunction } from 'express'
import { removeAcademyMember } from './RemoveUser.service'

export const removeAcademyMemberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { academyId, userId } = req.params

    if (!academyId || !userId) {
      return res.status(400).json({ message: 'Missing required data' })
    }

    const result = await removeAcademyMember(academyId, userId)
    res.status(200).json({ message: 'User removed from academy', data: result })
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Internal Server Error' })
  }
}
