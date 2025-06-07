import Activity from './activity.model'

// module id generation
export const findLastActivityId = async () => {
  const lastActivity = await Activity.findOne({}, { activityId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastActivity?.activityId
}

export const generateActivityId = async () => {
  const currentId =
    (await findLastActivityId()) || (0).toString().padStart(3, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0')
  return incrementId
}
