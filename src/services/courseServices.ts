import coursesData from '../database/courses.json'
import { CourseEntry } from '../types'

const courses: Array<CourseEntry> = coursesData as Array<CourseEntry>

export const getEntries = (): Array<CourseEntry> => courses

export const addEntry = (): undefined => undefined