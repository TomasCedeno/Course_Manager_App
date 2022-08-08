"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const studentServices = __importStar(require("../services/studentServices"));
const courseServices = __importStar(require("../services/courseServices"));
const gradeServices = __importStar(require("../services/gradeServices"));
const router = express_1.default.Router();
//#region AGREGAR ESTUDIANTE A UN CURSO
const studentExist = value => {
    const student = studentServices.findByCode(value);
    if (!student) {
        return Promise.reject('Student does not exists');
    }
    return true;
};
const courseExist = value => {
    const course = courseServices.findById(value);
    if (!course) {
        return Promise.reject('Course does not exists');
    }
    return true;
};
const studentAlreadyEnrolled = (value, meta) => {
    const isEnrolled = gradeServices.studentEnrolledIn(value, meta.req.body.courseId);
    if (isEnrolled) {
        return Promise.reject('Student already enrolled in this course');
    }
    return true;
};
router.post('/enroll', (0, express_validator_1.body)('courseId').isNumeric().custom(courseExist), (0, express_validator_1.body)('studentCode').isNumeric().custom(studentExist).custom(studentAlreadyEnrolled), (0, express_validator_1.body)('grades').isArray(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const gradesStudent = gradeServices.enrollStudent({
        studentCode: req.body.studentCode,
        courseId: req.body.courseId,
        grades: req.body.grades
    });
    return res.json(Object.assign(Object.assign({}, gradesStudent), { courseId: req.body.courseId }));
});
//#endregion
//#region ELIMINAR ESTUDIANTE DE UN CURSO
const isStudentEnrolled = (value, meta) => {
    const isEnrolled = gradeServices.studentEnrolledIn(value, meta.req.body.courseId);
    if (!isEnrolled) {
        return Promise.reject('Student is not enrolled in tis course');
    }
    return true;
};
router.delete('/delist', (0, express_validator_1.body)('courseId').isNumeric().custom(courseExist), (0, express_validator_1.body)('studentCode').isNumeric().custom(studentExist).custom(isStudentEnrolled), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const delistedStudent = gradeServices.delistStudent({
        studentCode: req.body.studentCode,
        courseId: req.body.courseId
    });
    return res.json(Object.assign(Object.assign({}, delistedStudent), { courseId: req.body.courseId }));
});
//#endregion
//#region MODIFICAR NOTAS DE UN ESTUDIANTE
router.patch('/', (0, express_validator_1.body)('courseId').isNumeric().custom(courseExist), (0, express_validator_1.body)('studentCode').isNumeric().custom(studentExist).custom(isStudentEnrolled), (0, express_validator_1.body)('grades').isArray(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const updatedGrades = gradeServices.updateGrades({
        studentCode: +req.body.studentCode,
        courseId: +req.body.courseId,
        grades: req.body.grades
    });
    return res.json(Object.assign(Object.assign({}, updatedGrades), { courseId: req.body.courseId }));
});
//#endregion
exports.default = router;
