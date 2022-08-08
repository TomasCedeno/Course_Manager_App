"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheoricalPracticalGrades = exports.TheoricalGrades = exports.Grades = void 0;
class Grades {
    constructor(studentCode, grade1, grade2, grade3) {
        this.finalGrade = 0;
        this.studentCode = studentCode;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
    }
    getStudentCode() {
        return this.studentCode;
    }
    getFinalGrade() {
        this.calculateFinalGrade();
        return this.finalGrade;
    }
}
exports.Grades = Grades;
class TheoricalGrades extends Grades {
    constructor(studentCode, grades) {
        super(studentCode, grades[0] | 0, grades[1] | 0, grades[2] | 0);
        this.calculateFinalGrade();
    }
    calculateFinalGrade() {
        this.finalGrade = +(this.grade1 * 0.35 + this.grade2 * 0.35 + this.grade3 * 0.30).toFixed(2);
    }
    setGrades(grades) {
        this.grade1 = grades[0] | 0;
        this.grade2 = grades[1] | 0;
        this.grade3 = grades[2] | 0;
    }
    getGrades() {
        return [this.grade1, this.grade2, this.getFinalGrade()];
    }
}
exports.TheoricalGrades = TheoricalGrades;
class TheoricalPracticalGrades extends Grades {
    constructor(studentCode, grades) {
        super(studentCode, grades[0] | 0, grades[1] | 0, grades[2] | 0);
        this.lab = grades[3] | 0;
        this.calculateFinalGrade();
    }
    calculateFinalGrade() {
        this.finalGrade = +(this.grade1 * 0.30 + this.grade2 * 0.25 + this.grade3 * 0.20 + this.lab * 0.25).toFixed(2);
    }
    setGrades(grades) {
        this.grade1 = grades[0] | 0;
        this.grade2 = grades[1] | 0;
        this.grade3 = grades[2] | 0;
        this.lab = grades[3] | 0;
    }
    getGrades() {
        return [this.grade1, this.grade2, this.grade3, this.getFinalGrade()];
    }
}
exports.TheoricalPracticalGrades = TheoricalPracticalGrades;
