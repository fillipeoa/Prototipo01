import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { EnderecoService } from "../../../shared/services/endereco.service";

enderecoService: EnderecoService;

export class Colaboracao extends BaseResourceModel{
    constructor(
        public id?:number,
        public idUsuario?:number,
        public titulo?:string,
        public descricao?:string,
        public dataRegistro?:any,
        public latitude?:number,
        public longitude?:number,
        public rua?:string,
        public numero?:number,
        public bairro?:string,
        public complemento?:string,
        public cidade?:string,
        public flagSituacao?:number
    ){
        super();
    }

    static fromJson(jsonData: any): Colaboracao{
        return Object.assign(new Colaboracao(), jsonData);
    }

}
