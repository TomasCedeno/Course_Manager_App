import coursesData from '../database/courses.json'
import { Course, NewCourse } from '../types'

const courses: Array<Course> = coursesData as Array<Course>

export const getCourses = (): Array<Course> => courses

export const addCourse = (newCourseEntry: NewCourse):Course => {
    const newCourse = {
        ...newCourseEntry,
        students: []
    }

    courses.push(newCourse)

    return newCourse
}

