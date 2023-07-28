import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { glabalErrorHandler } from './app/middlewares/globalErrorHandler'
import { UserRouter } from './app/modules/users/user.route'

const app: Application = express()

// use cors
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', UserRouter)

// //welcome route
app.get('/', (req: Request, res: Response) => {
  res.json('Welcome to   University-Management-System API.........!')
})

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(glabalErrorHandler)

export default app
