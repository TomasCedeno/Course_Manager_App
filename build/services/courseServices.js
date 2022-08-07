"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourse = exports.findById = exports.getCourses = void 0;
const courses_json_1 = __importDefault(require("../database/courses.json"));
const courses = courses_json_1.default;
const getCourses = () => courses;
exports.getCourses = getCourses;
const findById = (id) => {
    const course = courses.find(c => c.id === id);
    return course;
};
exports.findById = findById;
const addCourse = (newCourseEntry) => {
    const newCourse = Object.assign(Object.assign({}, newCourseEntry), { students: [] });
    courses.push(newCourse);
    return newCourse;
};
exports.addCourse = addCourse;
