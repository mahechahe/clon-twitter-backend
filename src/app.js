import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

//Routes imports
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'

const app = express()

//Settings
app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api', indexRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

export default app