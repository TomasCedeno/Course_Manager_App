import express from 'express'

import studentsRouter from './routes/students'
import coursesRouter from './routes/courses'

const app = express()

//Middlewares
app.use(express.json())

const PORT = 3000

app.use('/students', studentsRouter)
app.use('/courses', coursesRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})