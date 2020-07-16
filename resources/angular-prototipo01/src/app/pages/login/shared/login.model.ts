export class Login{
    constructor(
        public email?:string,
        public password?:string
    ){}

    static fromJson(jsonData: any): Login{
        return Object.assign(new Login(), jsonData);
    }

}
