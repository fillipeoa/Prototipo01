import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Usuario extends BaseResourceModel{
    constructor(
        public id?:number,
        public nome?:string,
        public email?:string,
        public password?:string,
        public foto?:string
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }

}
