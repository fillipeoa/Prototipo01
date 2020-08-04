import {AfterViewInit, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ColaboracaoService} from "../shared/colaboracao.service";
import {Colaboracao} from "../shared/colaboracao.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../../../shared/models/endereco.model";
import {MapaComponent} from "../../../shared/components/mapa/mapa.component";

@Component({
  selector: 'app-colaboracao-map',
  templateUrl: './colaboracao-map.component.html',
  styleUrls: ['./colaboracao-map.component.css']
})
export class ColaboracaoMapComponent implements OnInit {
  @ViewChild(MapaComponent) mapa: MapaComponent;

  colaboracoes: Colaboracao[];
  coords = [];

  private enderecoUrl: string;
  public endereco: Endereco;

  protected router: Router;
  protected route: ActivatedRoute;
  private http: HttpClient;
  public carregou: boolean;

  constructor(private enderecoService: EnderecoService, private colaboracaoService: ColaboracaoService, protected injector: Injector,) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.http = injector.get(HttpClient);
  }

  async ngOnInit() {
    await this.carregarColaboracoes();

    if(this.colaboracoes){
      this.carregarCoordenadas();
    }

    if(this.buscando()){
      await this.carregarEndereco();
    }

    this.carregou = true;
  }

  carregarColaboracoes(): Promise<void> {
    this.colaboracaoService.getAll().subscribe(
      colaboracoes => this.colaboracoes = colaboracoes,
      error => alert('Error ao carregar colaborações')
    );

    return new Promise(resolve =>{
      setTimeout(() => resolve() , 1000)
    });
  }

  carregarCoordenadas() {
    this.colaboracoes.forEach((c) => {
        this.coords.push({lat: c.latitude, lon: c.longitude, id: c.id})
      });
  }

  protected buscando(): boolean {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path == 'busca') {
      this.enderecoUrl = this.route.snapshot.url[1].path;
      return true;
    } else {
      return false;
    }
  }

  carregarEndereco(): Promise<void>{
    this.enderecoService.getByEndereco(this.enderecoUrl).subscribe(
      value => this.endereco = value
    );

    return new Promise(resolve =>{
      setTimeout(() => resolve() , 1800);
    });
  }

  public clickPesquisar(){
    let pesquisa = (<HTMLInputElement>document.getElementById('pesquisa')).value;
    this.router.navigate(['busca', pesquisa]);
    setTimeout(() => {this.ngOnInit()}, 500);
  }

  public clickColaborar(){
    this.router.navigate(['colaboracoes','new'])
  }
}
