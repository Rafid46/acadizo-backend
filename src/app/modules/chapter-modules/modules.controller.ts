import { NextFunction, Request, Response } from 'express'
import { IModules } from './modules.interface'
import { createModulesInDb, getModulesFromDB } from './modules.service'

export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { description, title, heading, academyName, academyId } = req.body
    console.log('request body', req.body)
    console.log('Academy ID:', academyId, 'Academy Name:', academyName)
    const file = req.file
    console.log('Request file:', req.file)
    if (!academyName || !academyId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'missing academyName or academyId' })
    }
    const data: IModules = {
      description,
      title,
      heading,
      academyName,
      academyId,
      file: (file && file.filename) || null,
    } as IModules
    const modules = await createModulesInDb(data)
    res.status(200).json({ status: 'success', data: modules })
  } catch (error) {
    next(error)
  }
}

export const getModules = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allModules = await getModulesFromDB()
  res.status(200).json({
    status: 'success',
    data: allModules,
  })
}
