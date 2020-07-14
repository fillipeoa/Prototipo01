import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Login extends BaseResourceModel{
    constructor(
        public email?:string,
        public password?:string
    ){
        super();
    }

    static fromJson(jsonData: any): Login{
        return Object.assign(new Login(), jsonData);
    }

}
