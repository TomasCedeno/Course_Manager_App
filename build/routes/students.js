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
const router = express_1.default.Router();
//#region OBTENER A TODOS LOS ESTUDIANTES
router.get('/', (_req, res) => {
    res.send(studentServices.getStudents());
});
//#endregion
//#region CREAR UN  ESTUDIANTE
const codeAlreadyExist = value => {
    const student = studentServices.findByCode(value);
    if (student) {
        return Promise.reject('Student code already exists');
    }
    return true;
};
router.post('/', (0, express_validator_1.body)('code').isNumeric().custom(codeAlreadyExist), (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('lastName').isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newStudent = studentServices.addStudent({
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName
    });
    return res.json(newStudent);
});
//#endregion
//#region MODIFICAR NOMBRE Y APELLIDOS DE UN ESTUDIANTE
const studentExist = value => {
    const student = studentServices.findByCode(+value);
    if (!student) {
        return Promise.reject('Student does not exists');
    }
    return true;
};
router.patch('/', (0, express_validator_1.body)('code').isNumeric().custom(studentExist), (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('lastName').isString(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const updatedStudent = studentServices.updateStudent({
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName
    });
    return res.json(Object.assign({}, updatedStudent));
});
//#endregion
//#region ELIMINAR ESTUDIANTE
router.delete('/:code', (0, express_validator_1.param)('code').custom(studentExist), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const deletedStudent = studentServices.deleteStudent(+req.params.code);
    return res.json(Object.assign({}, deletedStudent));
});
//#endregion
//#region OBTNER 10 ESTUDIANTES CON MEJOR PROMEDIO
router.get('/best', (_req, res) => {
    res.send(studentServices.getBestStudents());
});
//#endregion
//#region ESTUDIANTES QUE NO ESTAN INSCRITOS EN NINGUN CURSO
router.get('/not-enrolled', (_req, res) => {
    res.send(studentServices.getNotEnrolledStudents());
});
//#endregion
exports.default = router;
