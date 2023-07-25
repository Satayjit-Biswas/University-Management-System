import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Successfully Created User',
      User: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Sorry not Create User',
    })
  }
}

export default {
  createUser,
}
