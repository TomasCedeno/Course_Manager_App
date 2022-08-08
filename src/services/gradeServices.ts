import * as courseServices from './courseServices'
import * as studentServices from './studentServices'
import { Grades, TheoricalGrades, TheoricalPracticalGrades } from '../models/grades'
import { TypeCourse } from '../models/enums'

export const getAllInfo = (): any => {
    const courses = courseServices.getCourses()

    let allInfo: any[] = []

    courses.map(course => {
        let studentsInfo: any[] = []
        course.getStudents().map(s => {
            let student = studentServices.findByCode(s.studentCode)
            studentsInfo.push({
                ...s,
                name: student?.getName(),
                lastName: student?.getLastName()
            })
        })

        allInfo.push(
            {...course,
            students: studentsInfo
        })
    })

    return allInfo
}

export const studentEnrolledIn = (studentCode: number, courseId: number): boolean => {
    const student = studentServices.findByCode(studentCode)
    if (!student) return false
    return student.getCourses().includes(courseId)
}

export const enrollStudent = (info: any): Grades => {
    const course =  courseServices.findById(info.courseId)

    const grades = (course?.getTypeCourse() == TypeCourse.Theo)
        ? new TheoricalGrades(info.studentCode, info.grades)
        : new TheoricalPracticalGrades(info.studentCode, info.grades)

    course?.getStudents().push(grades)
    studentServices.findByCode(info.studentCode)?.getCourses().push(info.courseId)

    return grades
}

export const delistStudent = (info: any): any => {
    const courseStudents = courseServices.findById(info.courseId)?.getStudents()
    const student = studentServices.findByCode(info.studentCode)

    const delistedStudent = courseStudents?.splice( 
        courseStudents.findIndex(g => g.studentCode === info.studentCode), 1 
    )[0]
    
    const course = student?.getCourses().splice(
        student.getCourses().findIndex(c => c === info.courseId), 1
    )

    return {...delistedStudent, courseId: course}
}

export const updateGrades = (info: any): Grades | undefined => {
    delistStudent(info)
    const updatedGrades = enrollStudent(info)
    return updatedGrades
}

export const calculateStudentAvg = (code: number): number => {
    const coursesId = studentServices.findByCode(code)?.getCourses()

    let studentAvg = 0
    let totalCredits = 0

    coursesId?.map(c => {
        let finalGrade = courseServices.findById(c)?.getStudents().find(s => s.studentCode == code)?.finalGrade
        let credits = courseServices.findById(c)?.getCredits()
        totalCredits += credits||0
        studentAvg += (finalGrade||0)*(credits||0)
    })

    studentAvg = studentAvg / totalCredits

    return studentAvg
}