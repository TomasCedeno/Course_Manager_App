import { NewStudent } from "../types"

const isString = (string: string): boolean => {
    return typeof string === 'string'
}

const parseName = (nameFromRequest: any): string => {
    if (!isString(nameFromRequest)){
        throw new Error('Incorrect or missing name')
    }

    return nameFromRequest
}

const parseLastName = (lastNameFromRequest: any): string => {
    if (!isString(lastNameFromRequest)){
        throw new Error('Incorrect or missing last name')
    }

    return lastNameFromRequest
}


const toNewStudent = (object: any): NewStudent => {
    const newStudent: NewStudent = {
        name: parseName(object.name),
        lastName: parseLastName(object.lastName)
    }

    return newStudent
}

export default toNewStudent