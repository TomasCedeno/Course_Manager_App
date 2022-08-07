import { plainToInstance } from 'class-transformer'

import coursesData from '../database/courses.json'
import { Course } from '../models/course'
import { TypeCourse } from '../models/enums'
import { TheoricalGrades, TheoricalPracticalGrades } from '../models/grades'

const courses: Array<Course> = plainToInstance(Course, coursesData)

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

