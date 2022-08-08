import express from 'express'
import { body, validationResult, CustomValidator } from 'express-validator'

import * as studentServices from '../services/studentServices'
import * as courseServices from '../services/courseServices'
import * as gradeServices from '../services/gradeServices'

const router = express.Router()


//#region AGREGAR ESTUDIANTE A UN CURSO
const studentExist: CustomValidator = value => {
    const student = studentServices.findByCode(value)
    if (!student){
        return Promise.reject('Student does not exists')
    }

    return true;
}

const courseExist: CustomValidator = value => {
    const course = courseServices.findById(value)
    if (!course){
        return Promise.reject('Course does not exists')
    }

    return true
}

const studentAlreadyEnrolled: CustomValidator = (value, meta) => {
    const isEnrolled = gradeServices.studentEnrolledIn(value, meta.req.body.courseId)
    if(isEnrolled){
        return Promise.reject('Student already enrolled in this course')
    }

    return true
}

router.post(
    '/enroll',
    body('courseId').isNumeric().custom(courseExist),
    body('studentCode').isNumeric().custom(studentExist).custom(studentAlreadyEnrolled),
    body('grades').isArray(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const gradesStudent = gradeServices.enrollStudent({
            studentCode: req.body.studentCode,
            courseId: req.body.courseId,
            grades: req.body.grades
        })

        return res.json({...gradesStudent, courseId: req.body.courseId})
    }
)
//#endregion


//#region ELIMINAR ESTUDIANTE DE UN CURSO
const isStudentEnrolled: CustomValidator = (value, meta) => {
    const isEnrolled = gradeServices.studentEnrolledIn(value, meta.req.body.courseId)
    if(!isEnrolled){
        return Promise.reject('Student is not enrolled in tis course')
    }

    return true
}

router.delete(
    '/delist',
    body('courseId').isNumeric().custom(courseExist),
    body('studentCode').isNumeric().custom(studentExist).custom(isStudentEnrolled),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const delistedStudent = gradeServices.delistStudent({
            studentCode: req.body.studentCode,
            courseId: req.body.courseId
        })

        return res.json({...delistedStudent, courseId: req.body.courseId})
    }
)
//#endregion


//#region MODIFICAR NOTAS DE UN ESTUDIANTE
router.patch(
    '/',
    body('courseId').isNumeric().custom(courseExist),
    body('studentCode').isNumeric().custom(studentExist).custom(isStudentEnrolled),
    body('grades').isArray(),

    (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const updatedGrades = gradeServices.updateGrades({
            studentCode: +req.body.studentCode,
            courseId: +req.body.courseId,
            grades: req.body.grades
        })

        return res.json({...updatedGrades, courseId: req.body.courseId})
    }
)
//#endregion


//#region OBTENER INFORMACION COMPLETA DE TODOS LOS CURSOS, ESTUDINTES, NOTAS
router.get('/all', (_req, res)=>{
    res.send(gradeServices.getAllInfo())
})
//#endregion

export default router