import { plainToInstance } from 'class-transformer'

import studentsData from '../database/students.json'
import { Student } from '../models/student'

const students:Array<Student> = plainToInstance(Student, studentsData)

export const getStudents = (): Array<Student> => students

export const findByCode = (code: number): Student | undefined => {
    const student = students.find(s => s.getCode() === code)
    return student
} 

export const addStudent = (student: any): Student => {
    const newStudent = new Student(student.code, student.name, student.lastName)

    students.push(newStudent)

    return newStudent
}