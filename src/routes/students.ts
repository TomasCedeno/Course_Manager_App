import express from 'express'
import { body, validationResult, CustomValidator, param } from 'express-validator'

import * as studentServices from '../services/studentServices'

const router = express.Router()

//#region OBTENER A TODOS LOS ESTUDIANTES
router.get('/', (_req, res)=>{
    res.send(studentServices.getStudents())
})
//#endregion


//#region CREAR UN  ESTUDIANTE
const codeAlreadyExist: CustomValidator = value => {
    const student = studentServices.findByCode(value)
    if (student){
        return Promise.reject('Student code already exists')
    }

    return true;
}

router.post(
    '/',
    body('code').isNumeric().custom(codeAlreadyExist),
    body('name').isString(),
    body('lastName').isString(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newStudent = studentServices.addStudent({
            code: req.body.code,
            name: req.body.name,
            lastName: req.body.lastName
        })

        return res.json(newStudent)
    }
)
//#endregion


//#region MODIFICAR NOMBRE Y APELLIDOS DE UN ESTUDIANTE
const studentExist: CustomValidator = value => {
    const student = studentServices.findByCode(+value)
    if (!student){
        return Promise.reject('Student does not exists')
    }

    return true;
}

router.patch(
    '/',
    body('code').isNumeric().custom(studentExist),
    body('name').isString(),
    body('lastName').isString(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const updatedStudent = studentServices.updateStudent({
            code: req.body.code,
            name: req.body.name,
            lastName: req.body.lastName
        })

        return res.json({...updatedStudent})
    }
)

//#endregion


//#region ELIMINAR ESTUDIANTE
router.delete(
    '/:code',
    param('code').custom(studentExist),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const deletedStudent = studentServices.deleteStudent(+req.params.code)

        return res.json({...deletedStudent})
    }
)
//#endregion


//#region OBTNER 10 ESTUDIANTES CON MEJOR PROMEDIO
router.get('/best', (_req, res)=>{
    res.send(studentServices.getBestStudents())
})
//#endregion


//#region ESTUDIANTES QUE NO ESTAN INSCRITOS EN NINGUN CURSO
router.get('/not-enrolled', (_req, res)=>{
    res.send(studentServices.getNotEnrolledStudents())
})
//#endregion

export default router