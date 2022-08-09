import { plainToInstance } from 'class-transformer'
import { writeFileSync, readFileSync} from 'fs'

import { Student } from '../models/student'
import { delistStudent, calculateStudentAvg } from './gradeServices'

//Obtener todos los estudiantes
export const getStudents = (): Array<Student> => {
    const defaultStudentsData = JSON.parse(readFileSync('./src/defaultData/default_students.json', 'utf-8'))
    const studentsData = JSON.parse(readFileSync('./database/students.json', 'utf-8'))

    return ( (studentsData.length != 0)
        ? plainToInstance(Student, studentsData)  
        : plainToInstance(Student, defaultStudentsData)
    )
}

//Guardar estudiantes
export const saveData = (students: Array<Student>): void => {
    const path = './database/students.json'
    writeFileSync(path, JSON.stringify(students))
}

//Obtener estudiantes con promedio
export const getStudentsAvg = (): any[] => {
    const students = getStudents()
    let studentsInfo: any[] = []

    students.map(student => {
        studentsInfo.push({
            ...student,
            studentAvg: calculateStudentAvg(student.getCode())
        })
    })

    return studentsInfo
}

//Obtener estudiantes ordenados por promedio
export const getSortedStudents = (): any[] => {
    return getStudentsAvg().sort((a, b) => b.studentAvg - a.studentAvg)
}

//Obtener estudiantes con mejores 10 promedios
export const getBestStudents = (): any[] => {
    return getSortedStudents().slice(0, 10)
}

//Obtener estudiantes que no estan inscritos en ningun curso
export const getNotEnrolledStudents = (): any => {
    return getStudents().filter(student => student.getCourses().length == 0 )
}

//Encontrar estudiante por codigo
export const findByCode = (code: number): Student | undefined => {
    const student = getStudents().find(s => s.getCode() === code)
    return student
} 

//Agregar estudiante
export const addStudent = (student: any): Student => {
    const studentsData = JSON.parse(readFileSync('./database/students.json', 'utf-8'))
    const students = plainToInstance(Student, studentsData)

    const newStudent = new Student(student.code, student.name, student.lastName)
    students.push(newStudent)

    saveData(students)

    return newStudent
}

//Modificar nombres y apellidos de estudiante
export const updateStudent = (newStudent: any): Student | undefined => {
    const students = getStudents()
    const student = students.find(s => s.getCode() === newStudent.code)

    student?.setName(newStudent.name)
    student?.setLastName(newStudent.lastName)

    saveData(students)

    return student
}

//Eliminar estudiante
export const deleteStudent = (code: number): Student => {
    const students = getStudents()

    const deletedStudent = students.splice(
        students.findIndex(s => s.getCode() === code), 1
    )[0]

    deletedStudent.getCourses().map( (course) => {
            delistStudent({ studentCode: deletedStudent.getCode(), courseId: course })
        }
    )
    
    saveData(students)

    return deletedStudent
}