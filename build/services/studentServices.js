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
    const entry = students.find(s => s.code === code);
    return entry;
};
exports.findByCode = findByCode;
const addStudent = (newStudent) => {
    const newStudentEntry = Object.assign({ code: Math.max(...students.map(s => s.code)) + 1 }, newStudent);
    students.push(newStudentEntry);
    return newStudentEntry;
};
exports.addStudent = addStudent;
