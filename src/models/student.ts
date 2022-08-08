export class Student {

    private code: number
    private name: string
    private lastName: string
    private courses: Array<number>

    constructor(code: number, name: string, lastName: string){
        this.code = code
        this.name = name
        this.lastName = lastName
        this.courses = new Array<number>()
    }

    public getCode(): number {
        return this.code
    }

    public getName(): string {
        return this.name
    }

    
    public setName(name : string) {
        this.name = name;
    }
    

    public getLastName(): string {
        return this.lastName
    }

    public setLastName(lastName : string) {
        this.lastName = lastName
    }

    public getCourses(): Array<number> {
        return this.courses
    }
}