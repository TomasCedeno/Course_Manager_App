import { NewCourse, TypeCourse } from "../types"

const isString = (string: string): boolean => {
    return typeof string === 'string'
}

const parseName = (nameFromRequest: any): string => {
    if (!isString(nameFromRequest)){
        throw new Error('Incorrect or missing parameter')
    }

    return nameFromRequest
}

const parseId = (idFromRequest: any): number => {
    if (typeof idFromRequest !== 'number'){
        throw new Error('Incorrect or missing id')
    }

    return idFromRequest
}

const parseCredits = (creditsFromRequest: any): number => {
    if (typeof creditsFromRequest !== 'number'){
        throw new Error('Incorrect or missing id')
    }

    return creditsFromRequest
}

const isTypeCourse = (param: any): boolean => {
    return Object.values(TypeCourse).includes(param)
}

const parseTypeCourse = (typeCourseFromRequest: any): TypeCourse => {
    if (!isString(typeCourseFromRequest) || !isTypeCourse(typeCourseFromRequest)){
        throw new Error('Incorrect or missing type of course')
    }

    return typeCourseFromRequest
}


const toNewCourse = (object: any): NewCourse => {
    const newCourse: NewCourse = {
        id: parseId(object.id),
        name: parseName(object.name),
        credits: parseCredits(object.credits),
        course: parseTypeCourse(object.typeCourse)
    }

    return newCourse
}

export default toNewCourse