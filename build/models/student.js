"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(code, name, lastName) {
        this.code = code;
        this.name = name;
        this.lastName = lastName;
        this.courses = new Array();
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    getCourses() {
        return this.courses;
    }
}
exports.Student = Student;
