import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from "cors"
import { protect } from './modules/auth'
import { createUser, signin } from './handlers/user'
const app = express()
const customLogger = (mes) => (req, res, next) => {
    console.log(`this is a massage sent ${mes}`)
    next()
}
app.use(cors())
app.use(morgan('dev'))
app.use(customLogger('my name middel ware'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => { 
    res.shhhh_secret = 'doggy'
    next()
 })
app.get('/', (req, res, next) => {
    setTimeout(() => {
        next(new Error('you can use /api or signin or register path first'))
    }, 1);
})
app.use('/api', protect, router)
app.post('/signin', signin)
app.post('/register', createUser)
app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401)
        res.json({message: "unauthorized"})
    } else if (err.type === 'input') {
        res.status(400).json({message: "invalid input"})
    } else {
        res.status(500).json({message: "oops, that is not us"})
    }
    console.log(err)
    res.json({message: err.message})
})
export default app
