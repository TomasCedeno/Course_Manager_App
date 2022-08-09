import { TypeCourse } from "./enums"
import { Grades } from "./grades"

 export class Course {

    private id: number
    private name: string
    private typeCourse: TypeCourse
    private credits: number 
    private students: Array<Grades>

    constructor(id: number, name: string, typeCourse: TypeCourse, credits: number, students: Array<Grades>){
        this.id = id
        this.name = name
        this.typeCourse = typeCourse
        this.credits = credits
        this.students = students
    }

    public getId(): number {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public setName(name : string) {
        this.name = name;
    }
    
    public getTypeCourse(): TypeCourse {
        return this.typeCourse
    }

    public getCredits(): number {
        return this.credits
    }

    public setCredits(credits : number) {
        this.credits = credits;
    }
    
    public getStudents(): Array<Grades> {
        return this.students
    }

    public enrollStudent(studentGrades: Grades): void {
        this.students.push(studentGrades)
    }
}