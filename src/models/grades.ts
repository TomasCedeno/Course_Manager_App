export abstract class Grades {
    public studentCode: number 
    protected grade1: number
    protected grade2: number
    protected grade3: number
    public finalGrade: number = 0

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

    constructor(studentCode: number, grades: Array<number>){
        super(studentCode, grades[0]|0, grades[1]|0, grades[2]|0)
        this.calculateFinalGrade()
    }

    calculateFinalGrade(): void {
        this.finalGrade = +(this.grade1*0.35 + this.grade2*0.35 + this.grade3*0.30).toFixed(2)
    }

    public setGrades(grades: number[]): void {
        this.grade1 = grades[0]|0
        this.grade2 = grades[1]|0
        this.grade3 = grades[2]|0
    }

    public getGrades(): Array<number> {
        return [this.grade1, this.grade2, this.getFinalGrade()]
    }
}


export class TheoricalPracticalGrades extends Grades{
    private lab: number

    constructor(studentCode: number, grades: Array<number>){
        super(studentCode, grades[0]|0, grades[1]|0, grades[2]|0)
        this.lab = grades[3]|0
        this.calculateFinalGrade()
    }

    calculateFinalGrade(): void {
        this.finalGrade = +(this.grade1*0.30 + this.grade2*0.25 + this.grade3*0.20 + this.lab*0.25).toFixed(2)
    }

    public setGrades(grades: number[]): void {
        this.grade1 = grades[0]|0
        this.grade2 = grades[1]|0
        this.grade3 = grades[2]|0
        this.lab = grades[3]|0
    }

    public getGrades(): Array<number> {
        return [this.grade1, this.grade2, this.grade3, this.getFinalGrade()]
    }
}