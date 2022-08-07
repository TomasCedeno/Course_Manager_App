import studentsData from '../database/students.json'
import { NewStudent, Student } from '../types'

const students: Array<Student> = studentsData as Array<Student>

export const getStudents = (): Array<Student> => students

export const findByCode = (code: number): Student | undefined => {
    const entry = students.find(s => s.code === code)
    return entry
} 

export const addStudent = (newStudentEntry: NewStudent): Student => {
    const newStudent = {
        code: Math.max(...students.map(s => s.code)) + 1,
        ...newStudentEntry,
        grades: []
    }

    students.push(newStudent)

    return newStudent
}