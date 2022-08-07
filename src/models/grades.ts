export abstract class Grades {
    protected studentCode: number 
    protected grade1: number
    protected grade2: number
    protected grade3: number
    protected finalGrade: number = 0

    constructor(studentCode: number, grade1: number, grade2: number, grade3: number){
        this.studentCode = studentCode
        this.grade1 = grade1
        this.grade2 = grade2
        this.grade3 = grade3
    }

    public getStudentCode(): number {
        return this.studentCode
    }

    protected abstract calculateFinalGrade(): void

    public abstract setGrades(grades: Array<number>): void

    public abstract getGrades(): Array<number>

    public getFinalGrade(): number {
        this.calculateFinalGrade()
        return this.finalGrade
    }
}


export class TheoricalGrades extends Grades{

    constructor(studentCode: number, grade1: number, grade2: number, grade3: number){
        super(studentCode, grade1, grade2, grade3)
    }

    calculateFinalGrade(): void {
        this.finalGrade = (this.grade1*0.35 + this.grade2*0.35 + this.grade3*0.30)
    }

    public setGrades(grades: number[]): void {
        this.grade1 = grades[0]
        this.grade2 = grades[1]
        this.grade3 = grades[2]
    }

    public getGrades(): Array<number> {
        return [this.grade1, this.grade2, this.grade3]
    }
}


export class TheoricalPracticalGrades extends Grades{
    private lab: number

    constructor(studentCode: number, grade1: number, grade2: number, grade3: number, lab: number){
        super(studentCode, grade1, grade2, grade3)
        this.lab = lab
    }

    calculateFinalGrade(): void {
        this.finalGrade = (this.grade1*0.30 + this.grade2*0.25 + this.grade3*0.20 + this.lab*0.25)
    }

    public setGrades(grades: number[]): void {
        this.grade1 = grades[0]
        this.grade2 = grades[1]
        this.grade3 = grades[2]
        this.lab = grades[3]
    }

    public getGrades(): Array<number> {
        return [this.grade1, this.grade2, this.grade3, this.lab]
    }
}