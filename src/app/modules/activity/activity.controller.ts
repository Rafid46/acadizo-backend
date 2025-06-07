import { NextFunction, Request, Response } from 'express'
import { IActivity } from './activity.interface'
import { createActivitiesService, getActivityFromDb } from './activity.service'

export const createActivityCon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const {
      activityId,
      firstName,
      lastName,
      teacherId,
      activityTitle,
      activityDescription,
      academyName,
      answers,
      academyId,
      activityDate,
    } = req.body
    console.log('Request Body:', req.body)
    console.log('Request file:', req.body)
    console.log(
      'Academy ID:',
      academyId,
      'Academy Name:',
      academyName,
      'teacher id',
      teacherId,
      'teacher name',
      firstName,
      lastName,
    )
    const file = req.file
    // Check if the academy already exists
    if (
      !academyName ||
      !academyId ||
      !teacherId ||
      !firstName ||
      !lastName ||
      !activityTitle
    ) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing required fields' })
    }
    // const file = req.file ? `/uploads/${req.file.filename}` : null
    // Create the academy in the database
    const data: IActivity = {
      activityId,
      firstName,
      lastName,
      teacherId,
      activityTitle,
      activityDescription,
      academyId,
      academyName,
      answers,
      activityDate,
      file: (file && file.filename) || null,
    } as IActivity

    const activity = await createActivitiesService(data)

    // Respond with the activity data
    res.status(200).json({
      status: 'success',
      data: activity,
    })
  } catch (error) {
    next(error)
  }
}

export const getActivity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const activity = await getActivityFromDb()
  res.status(200).json({
    status: 'success',
    data: activity,
  })
}
