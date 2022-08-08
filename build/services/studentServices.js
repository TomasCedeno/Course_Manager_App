"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.findByCode = exports.getNotEnrolledStudents = exports.getBestStudents = exports.getSortedStudents = exports.getStudentsAvg = exports.saveData = exports.getStudents = void 0;
const class_transformer_1 = require("class-transformer");
const fs_1 = require("fs");
const student_1 = require("../models/student");
const gradeServices_1 = require("./gradeServices");
//Obtener todos los estudiantes
const getStudents = () => {
    const defaultStudentsData = JSON.parse((0, fs_1.readFileSync)('./src/defaultData/default_students.json', 'utf-8'));
    const studentsData = JSON.parse((0, fs_1.readFileSync)('./database/students.json', 'utf-8'));
    return ((studentsData.length != 0)
        ? (0, class_transformer_1.plainToInstance)(student_1.Student, studentsData)
        : (0, class_transformer_1.plainToInstance)(student_1.Student, defaultStudentsData));
};
exports.getStudents = getStudents;
//Guardar estudiantes
const saveData = (students) => {
    const path = './database/students.json';
    (0, fs_1.writeFileSync)(path, JSON.stringify(students));
};
exports.saveData = saveData;
//Obtener estudiantes con promedio
const getStudentsAvg = () => {
    const students = (0, exports.getStudents)();
    let studentsInfo = [];
    students.map(student => {
        studentsInfo.push(Object.assign(Object.assign({}, student), { studentAvg: (0, gradeServices_1.calculateStudentAvg)(student.getCode()) }));
    });
    return studentsInfo;
};
exports.getStudentsAvg = getStudentsAvg;
//Obtener estudiantes ordenados por promedio
const getSortedStudents = () => {
    return (0, exports.getStudentsAvg)().sort((a, b) => a.studentAvg - b.studentAvg);
};
exports.getSortedStudents = getSortedStudents;
//Obtener estudiantes con mejores 10 promedios
const getBestStudents = () => {
    return (0, exports.getSortedStudents)().slice(0, 10);
};
exports.getBestStudents = getBestStudents;
//Obtener estudiantes que no estan inscritos en ningun curso
const getNotEnrolledStudents = () => {
    return (0, exports.getStudents)().filter(student => student.getCourses().length == 0);
};
exports.getNotEnrolledStudents = getNotEnrolledStudents;
//Encontrar estudiante por codigo
const findByCode = (code) => {
    const student = (0, exports.getStudents)().find(s => s.getCode() === code);
    return student;
};
exports.findByCode = findByCode;
//Agregar estudiante
const addStudent = (student) => {
    const studentsData = JSON.parse((0, fs_1.readFileSync)('./database/students.json', 'utf-8'));
    const students = (0, class_transformer_1.plainToInstance)(student_1.Student, studentsData);
    const newStudent = new student_1.Student(student.code, student.name, student.lastName);
    students.push(newStudent);
    (0, exports.saveData)(students);
    return newStudent;
};
exports.addStudent = addStudent;
//Modificar nombres y apellidos de estudiante
const updateStudent = (newStudent) => {
    const students = (0, exports.getStudents)();
    const student = students.find(s => s.getCode() === newStudent.code);
    student === null || student === void 0 ? void 0 : student.setName(newStudent.name);
    student === null || student === void 0 ? void 0 : student.setLastName(newStudent.lastName);
    (0, exports.saveData)(students);
    return student;
};
exports.updateStudent = updateStudent;
//Eliminar estudiante
const deleteStudent = (code) => {
    const students = (0, exports.getStudents)();
    const deletedStudent = students.splice(students.findIndex(s => s.getCode() === code), 1)[0];
    deletedStudent.getCourses().map((course) => {
        (0, gradeServices_1.delistStudent)({ studentCode: deletedStudent.getCode(), courseId: course });
    });
    (0, exports.saveData)(students);
    return deletedStudent;
};
exports.deleteStudent = deleteStudent;
