export class Endereco {

  constructor(
    public endereco?: number,
    public latitude?: number,
    public longitude?: number,
  ){
  }

  static fromJson(jsonData: any): Endereco{
    return Object.assign(new Endereco(), jsonData);
  }
}
