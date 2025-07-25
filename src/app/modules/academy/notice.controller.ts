import { NextFunction, Request, Response } from 'express'
import { INotice } from './notice.interface'
import { createNoticeInDb, getNoticeFomDb } from './notice.service'

export const createNotice = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { description, title, academyName, academyId } = req.body
    console.log('Request Body:', req.body)
    console.log('Request file:', req.body)
    console.log('Academy ID:', academyId, 'Academy Name:', academyName)
    const file = req.file
    // Check if the academy already exists
    if (!academyName || !academyId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Missing required fields' })
    }
    // const file = req.file ? `/uploads/${req.file.filename}` : null
    // Create the academy in the database
    const data: INotice = {
      description,
      title,
      academyName,
      academyId,
      file: (file && file.filename) || null,
    } as INotice

    const notice = await createNoticeInDb(data)

    // Respond with the notice data
    res.status(200).json({
      status: 'success',
      data: notice,
    })
  } catch (error) {
    next(error)
  }
}

export const getNotice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notice = await getNoticeFomDb()
  res.status(200).json({
    status: 'success',
    data: notice,
  })
}
