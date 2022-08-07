import express from 'express'
import { body, validationResult } from 'express-validator'

import * as studentServices from '../services/studentServices'

const router = express.Router()

router.get('/', (_req, res)=>{
    res.send(studentServices.getStudents())
})

router.get('/:code', (req, res)=>{
    const student = studentServices.findByCode(+req.params.code)

    return (student != null) ? res.send(student) : res.sendStatus(404)
})

router.post(
    '/', 
    body('name').isString(),
    body('lastName').isString(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newStudent = studentServices.addStudent({
            name: req.body.name,
            lastName: req.body.lastName
        })

        return res.json(newStudent)
    }
)

export default router