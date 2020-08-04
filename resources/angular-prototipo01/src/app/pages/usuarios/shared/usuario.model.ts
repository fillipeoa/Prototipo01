import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import {TokenPayload} from "../../../authentication.service";

export class Usuario extends BaseResourceModel implements TokenPayload{
    constructor(
        public id?:number,
        public nome?:string,
        public email?:string,
        public password?:string,
        public foto?:any
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }

}
