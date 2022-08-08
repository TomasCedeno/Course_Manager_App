import * as courseServices from './courseServices'
import * as studentServices from './studentServices'
import { Grades, TheoricalGrades, TheoricalPracticalGrades } from '../models/grades'
import { TypeCourse } from '../models/enums'


export const studentEnrolledIn = (studentCode: number, courseId: number): boolean => {
    const student = studentServices.findByCode(studentCode)
    if (!student) return false
    return student.getCourses().includes(courseId)
}

export const enrollStudent = (info: any): Grades => {
    const courses = courseServices.getCourses()
    const course = courses.find(c => c.getId() === info.courseId)

    const grades = (course?.getTypeCourse() == TypeCourse.Theo)
        ? new TheoricalGrades(info.studentCode, info.grades)
        : new TheoricalPracticalGrades(info.studentCode, info.grades)

    course?.getStudents().push(grades)
    courseServices.saveData(courses)

    const students = studentServices.getStudents()
    const student = students.find(s => s.getCode() == info.studentCode)
    student?.getCourses().push(info.courseId)
    studentServices.saveData(students)

    return grades
}

export const delistStudent = (info: any): any => {
    const courses = courseServices.getCourses()
    const courseStudents = courses.find(c => c.getId() === info.courseId)?.getStudents()
    
    const delistedStudent = courseStudents?.splice( 
        courseStudents.findIndex(g => g.studentCode === info.studentCode), 1 
    )[0]
    courseServices.saveData(courses)
      
    const students = studentServices.getStudents()
    const student = students.find(s => s.getCode() == info.studentCode)
    const course = student?.getCourses().splice(
        student.getCourses().findIndex(c => c === info.courseId), 1
    )
    studentServices.saveData(students)

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

    return studentAvg | 0
}

export const completeCourseInfo = (course: any): any => {
    let studentsInfo: any[] = []

    course.students.map((s: any) => {
        let student = studentServices.findByCode(s.studentCode)
        studentsInfo.push({
            ...s,
            name: student?.getName(),
            lastName: student?.getLastName()
        })
    })

    return { ...course, students: studentsInfo }
}