"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (string) => {
    return typeof string === 'string';
};
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest)) {
        throw new Error('Incorrect or missing parameter');
    }
    return nameFromRequest;
};
const parseId = (idFromRequest) => {
    if (typeof idFromRequest !== 'number') {
        throw new Error('Incorrect or missing id');
    }
    return idFromRequest;
};
const parseCredits = (creditsFromRequest) => {
    if (typeof creditsFromRequest !== 'number') {
        throw new Error('Incorrect or missing id');
    }
    return creditsFromRequest;
};
const isTypeCourse = (param) => {
    return Object.values(types_1.TypeCourse).includes(param);
};
const parseTypeCourse = (typeCourseFromRequest) => {
    if (!isString(typeCourseFromRequest) || !isTypeCourse(typeCourseFromRequest)) {
        throw new Error('Incorrect or missing type of course');
    }
    return typeCourseFromRequest;
};
const toNewCourse = (object) => {
    const newCourse = {
        id: parseId(object.id),
        name: parseName(object.name),
        credits: parseCredits(object.credits),
        course: parseTypeCourse(object.typeCourse)
    };
    return newCourse;
};
exports.default = toNewCourse;
