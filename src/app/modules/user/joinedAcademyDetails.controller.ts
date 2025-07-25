import { Request, Response, NextFunction } from 'express'
import { getJoinedAcademyDetails } from './joinedAcademyDetails.service'

export const getJoinedAcademyDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const userEmail = req.params.email // Assume the email is passed as a route parameter

  try {
    // Fetch the academy details for the given user email
    const academyDetails = await getJoinedAcademyDetails(userEmail)

    // Return the academy details
    res.status(200).json({
      success: true,
      data: academyDetails,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
