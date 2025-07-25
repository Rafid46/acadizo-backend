import { NextFunction, Request, Response } from 'express'
import { IActivity } from './activity.interface'
import {
  createActivitiesService,
  getActivityFromDb,
  postAnswersService,
  updateActivityService,
} from './activity.service'
import Activity from './activity.model'

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
      // activityDate,
      startDate,
      endDate,
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
      // activityDate,
      startDate,
      endDate,
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

// post answers
// export const postAnswer = async (req: Request, res: Response) => {
//   try {
//     const { activityId } = req.params
//     const answer = req.body
//     const updatedActivity = await postAnswersService(activityId, answer)
//     res.status(200).json(updatedActivity)
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add answer', details: err })
//   }
// }
export const postAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { activityId } = req.params
    const file = req.file
    const student = JSON.parse(req.body.student)
    const {
      answerDescription,
      academyId,
      academyName,
      // studentId,
      // firstName,
      // lastName,
      // studentEmail,
    } = req.body

    // Validate required fields
    if (
      !activityId ||
      !answerDescription ||
      !academyId ||
      !academyName
      // !studentId ||
      // !firstName ||
      // !lastName ||
      // !studentEmail
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      })
    }

    const answerData = {
      answerDescription,
      academyId,
      academyName,
      student,
      // studentId,
      // firstName,
      // lastName,
      // studentEmail,
      file: file ? file.filename : null,
    } as IActivity['answers'][0]

    const updatedActivity = await postAnswersService(activityId, answerData)

    res.status(200).json({
      status: 'success',
      data: updatedActivity,
    })
  } catch (err) {
    console.error('Error in postAnswer:', err)
    res.status(500).json({
      status: 'error',
      message: 'Failed to add answer',
      details: err,
    })
  }
}

// delete activity
export const deleteActivity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { activityId } = req.params
    if (!activityId) {
      return res.status(400).json({
        status: 'error',
        message: 'activity id is required',
      })
    }

    const deletedActivity = await Activity.findOneAndDelete({ activityId })
    if (!deletedActivity) {
      return res.status(404).json({
        status: 'error',
        message: 'activity not found',
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Activity deleted successfully',
      data: deletedActivity,
    })
  } catch (error) {
    next(error)
  }
}

// update activity
export const updateActivities = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { activityId } = req.params
    if (!activityId) {
      return res.status(400).json({
        status: 'fail',
        message: 'activityId is required',
      })
    }

    const file = req.file
    const activityData = {
      ...req.body,
      file: file?.filename || undefined,
    }

    const updateActivity = await updateActivityService(activityId, activityData)
    if (!updateActivity) {
      return res.status(404).json({
        status: 'fail',
        message: 'activity not found',
      })
    }
    return res.status(200).json({
      status: 'success',
      message: 'activity updated',
    })
  } catch (error) {
    return next(error)
  }
}
