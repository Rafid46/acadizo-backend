import { IActivity } from './activity.interface'
import Activity from './activity.model'
import { generateActivityId } from './activity.utils'
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
