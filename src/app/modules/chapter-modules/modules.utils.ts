import Modules from './modules.model'

// module id generation
export const findLastModulesId = async () => {
  const lastModule = await Modules.findOne({}, { moduleId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastModule?.moduleId
}

export const generateModulesId = async () => {
  const currentId =
    (await findLastModulesId()) || (0).toString().padStart(3, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0')
  return incrementId
}
