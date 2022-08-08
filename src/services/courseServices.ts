import { plainToInstance } from 'class-transformer'

import defaultCoursesData from '../defaultData/default_courses.json'
import { Course } from '../models/course'
import { TypeCourse } from '../models/enums'
import { TheoricalGrades, TheoricalPracticalGrades } from '../models/grades'
import { delistStudent } from './gradeServices'

const courses: Array<Course> = plainToInstance(Course, defaultCoursesData)

export const getCourses = (): Array<Course> => courses

export const findById = (id: number): Course | undefined => {
    const course = courses.find(c => c.getId() === id)
    return course
}

export const addCourse = (course: any):Course => {
    const studentsGrades = (course.typeCourse == TypeCourse.Theo)
        ? new Array<TheoricalGrades>
        : new Array<TheoricalPracticalGrades>

    const newCourse = new Course(course.id, course.name, course.typeCourse, course.credits,studentsGrades )
    courses.push(newCourse)

    return newCourse
}

export const updateCourse = (newCourse: any): Course | undefined => {
    const course = findById(newCourse.id)

    course?.setName(newCourse.name)
    course?.setCredits(newCourse.credits)

    return course
}

export const deleteCourse = (id: number): Course => {
    const deletedCourse = courses.splice(
        courses.findIndex(c => c.getId() === id), 1
    )[0]

    deletedCourse.getStudents().map( (student) => {
            delistStudent({ studentCode: student.studentCode, courseId: deletedCourse.getId() })
        }
    )
    
    return deletedCourse
}

export const getSortedCourse = (id: number): any => {
    const course = findById(id)

    const sortedCourse = {
        ...course, 
        students: course?.getStudents().sort((a, b) => a.finalGrade - b.finalGrade)
    }

    return sortedCourse
}

export const getFailingStudentsCourse = (id: number): any => {
    const course = findById(id)

    const failingStudentsCourse = {
        ...course, 
        students: course?.getStudents().filter(student => student.finalGrade < 3)
    }

    return failingStudentsCourse
}