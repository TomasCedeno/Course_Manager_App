import coursesData from '../database/courses.json'
import { Course } from '../types'

const courses: Array<Course> = coursesData as Array<Course>

export const getEntries = (): Array<Course> => courses

export const addEntry = (): undefined => undefined