"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = exports.findByCode = exports.getStudents = void 0;
const students_json_1 = __importDefault(require("../database/students.json"));
const students = students_json_1.default;
const getStudents = () => students;
exports.getStudents = getStudents;
const findByCode = (code) => {
    const student = students.find(s => s.code === code);
    return student;
};
exports.findByCode = findByCode;
const addStudent = (newStudentEntry) => {
    const newStudent = Object.assign(Object.assign({}, newStudentEntry), { grades: [] });
    students.push(newStudent);
    return newStudent;
};
exports.addStudent = addStudent;
