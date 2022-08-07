import studentsData from '../database/students.json'
import { NewStudent, Student } from '../types'

const students: Array<Student> = studentsData as Array<Student>

export const getStudents = (): Array<Student> => students

export const findByCode = (code: number): Student | undefined => {
    const student = students.find(s => s.code === code)
    return student
} 

export const addStudent = (newStudentEntry: NewStudent): Student => {
    const newStudent = {
        ...newStudentEntry,
        grades: []
    }

    students.push(newStudent)

    return newStudent
}