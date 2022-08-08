import { plainToInstance } from 'class-transformer'

import defaultStudentsData from '../defaultData/default_students.json'
import { Student } from '../models/student'
import { delistStudent, calculateStudentAvg } from './gradeServices'

const students:Array<Student> = plainToInstance(Student, defaultStudentsData)

export const getStudents = (): Array<Student> => students

export const getStudentsAvg = (): any[] => {
    let studentsInfo: any[] = []

    students.map(student => {
        studentsInfo.push({
            ...student,
            studentAvg: calculateStudentAvg(student.getCode())
        })
    })

    return studentsInfo
}

export const getSortedStudents = (): any[] => {
    return getStudentsAvg().sort((a, b) => a.studentAvg - b.studentAvg)
}

export const getBestStudents = (): any[] => {
    return getSortedStudents().slice(0, 10)
}

export const getNotEnrolledStudents = (): any => {
    return students.filter(student => student.getCourses().length == 0 )
}

export const findByCode = (code: number): Student | undefined => {
    const student = students.find(s => s.getCode() === code)
    return student
} 

export const addStudent = (student: any): Student => {
    const newStudent = new Student(student.code, student.name, student.lastName)
    students.push(newStudent)
    return newStudent
}

export const updateStudent = (newStudent: any): Student | undefined => {
    const student = findByCode(newStudent.code)

    student?.setName(newStudent.name)
    student?.setLastName(newStudent.lastName)

    return student
}

export const deleteStudent = (code: number): Student => {
    const deletedStudent = students.splice(
        students.findIndex(s => s.getCode() === code), 1
    )[0]

    deletedStudent.getCourses().map( (course) => {
            delistStudent({ studentCode: deletedStudent.getCode(), courseId: course })
        }
    )
    
    return deletedStudent
}