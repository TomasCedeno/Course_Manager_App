export interface Student {
    code: number,
    name: string,
    lastName: string,
    grades: {
        courseName: string
        grade: number
    }[]
}

export type NewStudent = Omit<Student, 'code', 'grades'>


export enum TypeCourse {
    Theo = 'teórico',
    TheoPrac = 'teórico-práctico'
}

export interface Course {
    id: number,
    name: string,
    typeCourse: TypeCourse,
    credits: number,
    students: {
        code: number,
        grade: number
    }[]
}

export type NewCourse = Omit<NewCourse, 'students'>