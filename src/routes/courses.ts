import express from 'express'
import { body, CustomValidator, validationResult } from 'express-validator'

import * as courseServices from '../services/courseServices'
import { TypeCourse } from '../enums'

const router = express.Router()

router.get('/', (_req, res)=>{
    res.send(courseServices.getCourses())
})

const isTypeCourse: CustomValidator = value => {
    return Object.values(TypeCourse).includes(value)
}

router.post(
    '/',
    body('id').isNumeric(),
    body('name').isAlpha(),
    body('typeCourse').custom(isTypeCourse),
    body('credits').isNumeric(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newCourse = courseServices.addCourse({
            id: req.body.id,
            name: req.body.name,
            typeCourse: req.body.typeCourse,
            credits: req.body.credits
        })

        return res.json(newCourse)
    }
)

export default router