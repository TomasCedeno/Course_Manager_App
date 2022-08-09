import express from 'express'
import cors from 'cors'

import studentsRouter from './routes/students'
import coursesRouter from './routes/courses'
import gradesRouter from './routes/grades'

const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

const PORT = 3000

app.use('/students', studentsRouter)
app.use('/courses', coursesRouter)
app.use('/grades', gradesRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})