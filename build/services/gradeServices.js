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
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeCourseInfo = exports.calculateStudentAvg = exports.updateGrades = exports.delistStudent = exports.enrollStudent = exports.studentEnrolledIn = void 0;
const courseServices = __importStar(require("./courseServices"));
const studentServices = __importStar(require("./studentServices"));
const grades_1 = require("../models/grades");
const enums_1 = require("../models/enums");
const studentEnrolledIn = (studentCode, courseId) => {
    const student = studentServices.findByCode(studentCode);
    if (!student)
        return false;
    return student.getCourses().includes(courseId);
};
exports.studentEnrolledIn = studentEnrolledIn;
const enrollStudent = (info) => {
    const courses = courseServices.getCourses();
    const course = courses.find(c => c.getId() === info.courseId);
    const grades = ((course === null || course === void 0 ? void 0 : course.getTypeCourse()) == enums_1.TypeCourse.Theo)
        ? new grades_1.TheoricalGrades(info.studentCode, info.grades)
        : new grades_1.TheoricalPracticalGrades(info.studentCode, info.grades);
    course === null || course === void 0 ? void 0 : course.getStudents().push(grades);
    courseServices.saveData(courses);
    const students = studentServices.getStudents();
    const student = students.find(s => s.getCode() == info.studentCode);
    student === null || student === void 0 ? void 0 : student.getCourses().push(info.courseId);
    studentServices.saveData(students);
    return grades;
};
exports.enrollStudent = enrollStudent;
const delistStudent = (info) => {
    var _a;
    const courses = courseServices.getCourses();
    const courseStudents = (_a = courses.find(c => c.getId() === info.courseId)) === null || _a === void 0 ? void 0 : _a.getStudents();
    const delistedStudent = courseStudents === null || courseStudents === void 0 ? void 0 : courseStudents.splice(courseStudents.findIndex(g => g.studentCode === info.studentCode), 1)[0];
    courseServices.saveData(courses);
    const students = studentServices.getStudents();
    const student = students.find(s => s.getCode() == info.studentCode);
    const course = student === null || student === void 0 ? void 0 : student.getCourses().splice(student.getCourses().findIndex(c => c === info.courseId), 1);
    studentServices.saveData(students);
    return Object.assign(Object.assign({}, delistedStudent), { courseId: course });
};
exports.delistStudent = delistStudent;
const updateGrades = (info) => {
    (0, exports.delistStudent)(info);
    const updatedGrades = (0, exports.enrollStudent)(info);
    return updatedGrades;
};
exports.updateGrades = updateGrades;
const calculateStudentAvg = (code) => {
    var _a;
    const coursesId = (_a = studentServices.findByCode(code)) === null || _a === void 0 ? void 0 : _a.getCourses();
    let studentAvg = 0;
    let totalCredits = 0;
    coursesId === null || coursesId === void 0 ? void 0 : coursesId.map(c => {
        var _a, _b, _c;
        let finalGrade = (_b = (_a = courseServices.findById(c)) === null || _a === void 0 ? void 0 : _a.getStudents().find(s => s.studentCode == code)) === null || _b === void 0 ? void 0 : _b.finalGrade;
        let credits = (_c = courseServices.findById(c)) === null || _c === void 0 ? void 0 : _c.getCredits();
        totalCredits += credits || 0;
        studentAvg += (finalGrade || 0) * (credits || 0);
    });
    studentAvg = studentAvg / totalCredits;
    return studentAvg | 0;
};
exports.calculateStudentAvg = calculateStudentAvg;
const completeCourseInfo = (course) => {
    let studentsInfo = [];
    course.students.map((s) => {
        let student = studentServices.findByCode(s.studentCode);
        studentsInfo.push(Object.assign(Object.assign({}, s), { name: student === null || student === void 0 ? void 0 : student.getName(), lastName: student === null || student === void 0 ? void 0 : student.getLastName() }));
    });
    return Object.assign(Object.assign({}, course), { students: studentsInfo });
};
exports.completeCourseInfo = completeCourseInfo;
