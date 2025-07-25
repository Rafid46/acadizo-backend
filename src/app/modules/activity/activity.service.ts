import { IActivity } from './activity.interface'
import Activity from './activity.model'
import { generateActivityId, generateAnswerId } from './activity.utils'
export const createActivitiesService = async (activity: IActivity) => {
  const activityId = await generateActivityId()
  activity.activityId = activityId
  const createActivity = await Activity.create(activity)
  return createActivity
}

export const getActivityFromDb = async (): Promise<IActivity[]> => {
  const activities = await Activity.find()
  return activities
}

// post answers
export const postAnswersService = async (
  activityId: string,
  answer: IActivity['answers'][0],
) => {
  const answerId = await generateAnswerId()
  return await Activity.findOneAndUpdate(
    { activityId },
    {
      $push: { answers: { ...answer, answerId } },
    },
    { new: true },
  )
}

// update activity
export const updateActivityService = async (
  activityId: string,
  activityData: Partial<IActivity>,
): Promise<IActivity | null> => {
  const update = await Activity.findOneAndUpdate({ activityId }, activityData, {
    new: true,
  })
  return update
}
