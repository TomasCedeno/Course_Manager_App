import express from 'express'
import { body, param,  CustomValidator, validationResult } from 'express-validator'

import * as courseServices from '../services/courseServices'
import { TypeCourse } from '../models/enums'

const router = express.Router()

//#region OBTENER A TODOS LOS CURSOS
router.get('/', (_req, res)=>{
    res.send(courseServices.getCourses())
})
//#endregion


//#region CREAR UN CURSO
const idAlreadyExist: CustomValidator = value => {
    const course = courseServices.findById(value)
    if (course){
        return Promise.reject('Id already exists')
    }

    return true;
}

const isTypeCourse: CustomValidator = value => {
    return Object.values(TypeCourse).includes(value)
}

router.post(
    '/',
    body('id').isNumeric().custom(idAlreadyExist),
    body('name').isString(),
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
//#endregion


//#region MODIFICAR NOMBRE DE LOS CURSOS Y SUS CREDITOS
const courseExists: CustomValidator = value => {
    const course = courseServices.findById(+value)
    if (!course){
        return Promise.reject('Course does not exists')
    }

    return true;
}

router.patch(
    '/',
    body('id').isNumeric().custom(courseExists),
    body('name').isString(),
    body('credits').isNumeric(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const updatedCourse = courseServices.updateCourse({
            id: req.body.id,
            name: req.body.name,
            credits: req.body.credits
        })

        return res.json({...updatedCourse})
    }
)
//#endregion


//#region ELIMINAR CURSO
router.delete(
    '/:id',
    param('id').custom(courseExists),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const deletedCourse = courseServices.deleteCourse(+req.params.id)

        return res.json({...deletedCourse})
    }
)
//#endregion

export default router