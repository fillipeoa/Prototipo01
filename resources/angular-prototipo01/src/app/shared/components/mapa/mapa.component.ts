import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Endereco} from "../../models/endereco.model";
import "leaflet";
import * as L from 'leaflet';
import {DomUtil, marker, Util} from "leaflet";

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnChanges{
  @Input() podeRecarregar: boolean;
  @Input() endereco: Endereco;
  @Input() coords: any[];

  constructor( ) { }

  public map;
  ngOnChanges (): void {
    try{
      this.map = L.map('map');
    }
    catch (e) {
      if(this.podeRecarregar){
        window.location.reload();
      }
    }

    this.atualizarMapa();
  }

  atualizarMapa(){
    //definindo centro do mapa
    if(this.endereco){
      this.map.setView([this.endereco.latitude, this.endereco.longitude], 25);
    }else if(this.coords && this.coords[0]){
      this.map.setView([this.coords[0].lat, this.coords[0].lon], 8);
    }else{
      this.map.setView([0, 0], 1);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    if(this.coords && this.coords[0]){
      //criando markers
      var markers = [];

      for (let x in this.coords) {
        markers.push({coords: [this.coords[x].lat, this.coords[x].lon], uri: '/colaboracoes/' + this.coords[x].id})
      }

      //adicionando link aos markers
      var x;
      for(x in markers)
      {
        L.marker(markers[x].coords).on('click', function() {
          window.location = markers[x].uri;
        }).addTo(this.map);
      }

      var x = markers.length;

      while(x--)
      {
        marker
        L.marker(markers[x].coords).on('click', function(e) {
          window.location = markers[e.target._leaflet_id].uri;
        }).addTo(this.map)._leaflet_id = x;
      }
    }
  }

  excluir() {
    this.map._initEvents(true);
    this.map.off('moveend', this.map._panInsideMaxBounds);

    if (this.map._containerId !== this.map._container._leaflet_id) {
      throw new Error('Map container is being reused by another instance');
    }

    try {
      // throws error in IE6-8
      delete this.map._container._leaflet_id;
      delete this.map._containerId;
    } catch (e) {
      /*eslint-disable */
      this.map._container._leaflet_id = undefined;
      /* eslint-enable */
      this.map._containerId = undefined;
    }

    if (this.map._locationWatchId !== undefined) {
      this.map.stopLocate();
    }

    this.map._stop();

    DomUtil.remove(this.map._mapPane);

    if (this.map._clearControlPos) {
      this.map._clearControlPos();
    }
    if (this.map._resizeRequest) {
      Util.cancelAnimFrame(this.map._resizeRequest);
      this.map._resizeRequest = null;
    }

    this.map._clearHandlers();

    if (this.map._loaded) {
      // @section Map state change events
      // @event unload: Event
      // Fired when the map is destroyed with [remove](#map-remove) method.
      this.map.fire('unload');
    }

    var i;
    for (i in this.map._layers) {
      this.map._layers[i].remove();
    }
    for (i in this.map._panes) {
      DomUtil.remove(this.map._panes[i]);
    }

    this.map._layers = [];
    this.map._panes = [];
    delete this.map._mapPane;
    delete this.map._renderer;

  }
}
