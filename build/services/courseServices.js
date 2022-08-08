"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFailingStudentsCourse = exports.getSortedCourse = exports.deleteCourse = exports.updateCourse = exports.addCourse = exports.findById = exports.saveData = exports.getCourses = void 0;
const class_transformer_1 = require("class-transformer");
const fs_1 = require("fs");
const course_1 = require("../models/course");
const enums_1 = require("../models/enums");
const gradeServices_1 = require("./gradeServices");
//Obtener todos los cursos
const getCourses = () => {
    const defaultCoursesData = JSON.parse((0, fs_1.readFileSync)('./src/defaultData/default_courses.json', 'utf-8'));
    const coursesData = JSON.parse((0, fs_1.readFileSync)('./database/courses.json', 'utf-8'));
    return ((coursesData.length != 0)
        ? (0, class_transformer_1.plainToInstance)(course_1.Course, coursesData)
        : (0, class_transformer_1.plainToInstance)(course_1.Course, defaultCoursesData));
};
exports.getCourses = getCourses;
//Guardar cursos
const saveData = (courses) => {
    const path = './database/courses.json';
    (0, fs_1.writeFileSync)(path, JSON.stringify(courses));
};
exports.saveData = saveData;
//Encontrar un curso por Id
const findById = (id) => {
    const course = (0, exports.getCourses)().find(c => c.getId() === id);
    return course;
};
exports.findById = findById;
//Agregar un curso
const addCourse = (course) => {
    const coursesData = JSON.parse((0, fs_1.readFileSync)('./database/courses.json', 'utf-8'));
    const courses = (0, class_transformer_1.plainToInstance)(course_1.Course, coursesData);
    const studentsGrades = (course.typeCourse == enums_1.TypeCourse.Theo)
        ? new Array
        : new Array;
    const newCourse = new course_1.Course(course.id, course.name, course.typeCourse, course.credits, studentsGrades);
    courses.push(newCourse);
    (0, exports.saveData)(courses);
    return newCourse;
};
exports.addCourse = addCourse;
//Cambiar nombre y creditos de un curso
const updateCourse = (newCourse) => {
    const courses = (0, exports.getCourses)();
    const course = courses.find(c => c.getId() === newCourse.id);
    course === null || course === void 0 ? void 0 : course.setName(newCourse.name);
    course === null || course === void 0 ? void 0 : course.setCredits(newCourse.credits);
    (0, exports.saveData)(courses);
    return course;
};
exports.updateCourse = updateCourse;
//Eliminar curso
const deleteCourse = (id) => {
    const courses = (0, exports.getCourses)();
    const deletedCourse = courses.splice(courses.findIndex(c => c.getId() === id), 1)[0];
    deletedCourse.getStudents().map((student) => {
        (0, gradeServices_1.delistStudent)({ studentCode: student.studentCode, courseId: deletedCourse.getId() });
    });
    (0, exports.saveData)(courses);
    return deletedCourse;
};
exports.deleteCourse = deleteCourse;
//Curso con estudiantes ordenados por mejor nota
const getSortedCourse = (id) => {
    const course = (0, exports.findById)(id);
    const sortedCourse = Object.assign(Object.assign({}, course), { students: course === null || course === void 0 ? void 0 : course.getStudents().sort((a, b) => b.finalGrade - a.finalGrade) });
    return (0, gradeServices_1.completeCourseInfo)(sortedCourse);
};
exports.getSortedCourse = getSortedCourse;
//Estudiantes de un curso con nota menor a 3
const getFailingStudentsCourse = (id) => {
    const course = (0, exports.findById)(id);
    const failingStudentsCourse = Object.assign(Object.assign({}, course), { students: course === null || course === void 0 ? void 0 : course.getStudents().filter(student => student.finalGrade < 3) });
    return (0, gradeServices_1.completeCourseInfo)(failingStudentsCourse);
};
exports.getFailingStudentsCourse = getFailingStudentsCourse;
