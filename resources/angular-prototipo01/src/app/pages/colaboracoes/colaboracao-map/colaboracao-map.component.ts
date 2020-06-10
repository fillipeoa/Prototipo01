import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {ColaboracaoService} from "../shared/colaboracao.service";
import {Colaboracao} from "../shared/colaboracao.model";
declare let L;

@Component({
  selector: 'app-colaboracao-map',
  templateUrl: './colaboracao-map.component.html',
  styleUrls: ['./colaboracao-map.component.css']
})
export class ColaboracaoMapComponent implements OnInit {

  constructor(private colaboracaoService: ColaboracaoService) {

  }
  ngOnInit() {

    var coords = [{lat:-30,lon:-60}];

    const map = L.map('map').setView([coords[0].lat, coords[0].lon], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markers = [];
    for(var x in coords){
      markers.push({coords: [coords[x].lat, coords[x].lon], uri: '/'})
    }
    for(var x in markers)
    {
      L.marker(markers[x].coords).on('click', function() {
        window.location.href = markers[x].uri;
      }).addTo(map);
    }
  }

}
