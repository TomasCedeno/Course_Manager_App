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
const courseServices = __importStar(require("../services/courseServices"));
const enums_1 = require("../enums");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(courseServices.getCourses());
});
const idAlreadyExist = value => {
    const course = courseServices.findById(value);
    if (course) {
        return Promise.reject('Id already exists');
    }
    return true;
};
const isTypeCourse = value => {
    return Object.values(enums_1.TypeCourse).includes(value);
};
router.post('/', (0, express_validator_1.body)('id').isNumeric().custom(idAlreadyExist), (0, express_validator_1.body)('name').isAlpha(), (0, express_validator_1.body)('typeCourse').custom(isTypeCourse), (0, express_validator_1.body)('credits').isNumeric(), (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCourse = courseServices.addCourse({
        id: req.body.id,
        name: req.body.name,
        typeCourse: req.body.typeCourse,
        credits: req.body.credits
    });
    return res.json(newCourse);
});
exports.default = router;
