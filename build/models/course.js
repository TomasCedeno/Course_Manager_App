"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
class Course {
    constructor(id, name, typeCourse, credits, students) {
        this.id = id;
        this.name = name;
        this.typeCourse = typeCourse;
        this.credits = credits;
        this.students = students;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getTypeCourse() {
        return this.typeCourse;
    }
    getCredits() {
        return this.credits;
    }
    setCredits(credits) {
        this.credits = credits;
    }
    getStudents() {
        return this.students;
    }
    enrollStudent(studentGrades) {
        this.students.push(studentGrades);
    }
}
exports.Course = Course;
