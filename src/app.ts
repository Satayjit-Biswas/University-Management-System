import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

// use cors
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/users/', usersRouter)

//welcome route
app.get('/', (req: Request, res: Response) => {
  res.json('Welcome to Auth Service!')
})

export default app
