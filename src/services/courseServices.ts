import { plainToInstance } from 'class-transformer'
import { writeFileSync, readFileSync} from 'fs'

import { Course } from '../models/course'
import { TypeCourse } from '../models/enums'
import { TheoricalGrades, TheoricalPracticalGrades } from '../models/grades'
import { delistStudent, completeCourseInfo } from './gradeServices'


//Obtener todos los cursos
export const getCourses = (): Array<Course> => {
    const defaultCoursesData = JSON.parse(readFileSync('./src/defaultData/default_courses.json', 'utf-8'))
    const coursesData = JSON.parse(readFileSync('./database/courses.json', 'utf-8'))

    return ( (coursesData.length != 0)
        ? plainToInstance(Course, coursesData)  
        : plainToInstance(Course, defaultCoursesData)
    )
}

//Guardar cursos
export const saveData = (courses: Array<Course>): void => {
    const path = './database/courses.json'
    writeFileSync(path, JSON.stringify(courses))
}

//Encontrar un curso por Id
export const findById = (id: number): Course | undefined => {
    const course = getCourses().find(c => c.getId() === id)
    return course
}

//Agregar un curso
export const addCourse = (course: any):Course => {
    const coursesData = JSON.parse(readFileSync('./database/courses.json', 'utf-8'))
    const courses = plainToInstance(Course, coursesData)

    const studentsGrades = (course.typeCourse == TypeCourse.Theo)
        ? new Array<TheoricalGrades>
        : new Array<TheoricalPracticalGrades>

    const newCourse = new Course(course.id, course.name, course.typeCourse, course.credits,studentsGrades )
    courses.push(newCourse)

    saveData(courses)

    return newCourse
}

//Cambiar nombre y creditos de un curso
export const updateCourse = (newCourse: any): Course | undefined => {
    const courses = getCourses()
    const course = courses.find(c => c.getId() === newCourse.id)

    course?.setName(newCourse.name)
    course?.setCredits(newCourse.credits)

    saveData(courses)

    return course
}

//Eliminar curso
export const deleteCourse = (id: number): Course => {
    const courses = getCourses()

    const deletedCourse = courses.splice(
        courses.findIndex(c => c.getId() === id), 1
    )[0]

    deletedCourse.getStudents().map( (student) => {
            delistStudent({ studentCode: student.studentCode, courseId: deletedCourse.getId() })
        }
    )

    saveData(courses)
    
    return deletedCourse
}

//Curso con estudiantes ordenados por mejor nota
export const getSortedCourse = (id: number): any => {
    const course = findById(id)

    const sortedCourse = {
        ...course, 
        students: course?.getStudents().sort((a, b) => b.finalGrade - a.finalGrade)
    }

    return completeCourseInfo(sortedCourse)
}

//Estudiantes de un curso con nota menor a 3
export const getFailingStudentsCourse = (id: number): any => {
    const course = findById(id)

    const failingStudentsCourse = {
        ...course, 
        students: course?.getStudents().filter(student => student.finalGrade < 3)
    }

    return completeCourseInfo(failingStudentsCourse)
}