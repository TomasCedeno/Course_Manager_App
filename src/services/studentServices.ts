import studentsData from '../database/students.json'
import { NewStudent, Student } from '../types'

const students: Array<Student> = studentsData as Array<Student>

export const getStudents = (): Array<Student> => students

export const findByCode = (code: number): Student | undefined => {
    const entry = students.find(s => s.code === code)
    return entry
} 

export const addStudent = (newStudent: NewStudent): Student => {
    const newStudentEntry = {
        code: Math.max(...students.map(s => s.code)) + 1,
        ...newStudent
    }

    students.push(newStudentEntry)

    return newStudentEntry
}