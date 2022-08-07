import express from 'express'

import * as studentServices from '../services/studentServices'
import toNewStudent from '../utils/studentParser'

const router = express.Router()

router.get('/', (_req, res)=>{
    res.send(studentServices.getStudents())
})

router.get('/:code', (req, res)=>{
    const student = studentServices.findByCode(+req.params.code)

    return (student != null) ? res.send(student) : res.sendStatus(404)
})

router.post('/', (req, res)=>{
    try {
    const newStudent = toNewStudent(req.body)

    const addedStudent = studentServices.addStudent(newStudent)

    res.json(addedStudent)
    } catch (e: any) {
        res.status(400).send(e.message)
    }

})

export default router