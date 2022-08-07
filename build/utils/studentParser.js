"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (string) => {
    return typeof string === 'string';
};
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest)) {
        throw new Error('Incorrect or missing name');
    }
    return nameFromRequest;
};
const parseLastName = (lastNameFromRequest) => {
    if (!isString(lastNameFromRequest)) {
        throw new Error('Incorrect or missing last name');
    }
    return lastNameFromRequest;
};
const toNewStudent = (object) => {
    const newStudent = {
        name: parseName(object.name),
        lastName: parseLastName(object.lastName)
    };
    return newStudent;
};
exports.default = toNewStudent;
