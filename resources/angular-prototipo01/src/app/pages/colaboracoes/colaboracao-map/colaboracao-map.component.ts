import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {ColaboracaoService} from "../shared/colaboracao.service";
import {Colaboracao} from "../shared/colaboracao.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EnderecoService} from "../../../shared/services/endereco.service";
import {HttpClient} from "@angular/common/http";
declare let L;
import {Endereco} from "../../../shared/models/endereco.model";

@Component({
  selector: 'app-colaboracao-map',
  templateUrl: './colaboracao-map.component.html',
  styleUrls: ['./colaboracao-map.component.css']
})
export class ColaboracaoMapComponent implements OnInit {
  colaboracoes: Colaboracao[];

  private buscando: boolean;
  private enderecoUrl: string;
  private endereco: Endereco;

  protected router: Router;
  protected route: ActivatedRoute;
  private http: HttpClient;

  constructor(private enderecoService: EnderecoService, private colaboracaoService: ColaboracaoService, protected injector: Injector,) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.http = injector.get(HttpClient);
  }

  public map;
  ngOnInit() {
    if(!this.map){
      this.map = L.map('map');
    }

    this.colaboracaoService.getAll().subscribe(
      colaboracoes => this.colaboracoes = colaboracoes,
      error => alert('Error ao carregar colaborações')
    );

    this.setBuscando();

    if(this.buscando){
      this.enderecoService.getByEndereco(this.enderecoUrl).subscribe(
        value => this.endereco = value
      );
    }

    setTimeout(() =>
      this.loadMap(), 1800);
  }

  loadMap() {
    var coords = [];
    if(this.colaboracoes){
      this.colaboracoes.forEach((c) => {
        coords.push({lat: c.latitude, lon: c.longitude, id: c.id})
      });
    }

    console.log(this.endereco);
    if (this.buscando) {
      this.map.setView([this.endereco.latitude, this.endereco.longitude], 20);
    } else {
      this.map.setView([coords[0].lat, coords[0].lon], 8);

    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var markers = [];
    for (let x in coords) {
      markers.push({coords: [coords[x].lat, coords[x].lon], uri: '/colaboracoes/' + coords[x].id})
    }

    //adicionando link aos markers
    var x = markers.length;

    while (x--) {
      L.marker(markers[x].coords).on('click', function (e) {
        window.location = markers[e.target._leaflet_id].uri;
      }).addTo(this.map)._leaflet_id = x;
    }
  }



  protected setBuscando() {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path == 'busca') {
      this.buscando = true;
      this.enderecoUrl = this.route.snapshot.url[1].path;
    } else {
      this.buscando = false;
    }
  }

  public clickPesquisar(){
    let pesquisa = (<HTMLInputElement>document.getElementById('pesquisa')).value;
    this.router.navigate(['busca', pesquisa]);
    setTimeout(() => {this.ngOnInit()}, 500);
  }
}
